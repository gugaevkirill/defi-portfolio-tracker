import React from 'react'
import {FC} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import axios from 'axios';
import {get} from 'lodash';
import {round} from 'lodash';
import {sumBy} from 'lodash';
import {values} from 'lodash';
import {forEach} from 'lodash';
import {has} from 'lodash';
import {reverse} from 'lodash';
import {sortBy} from 'lodash';
import {isEmpty} from 'lodash';
import Image from 'next/image';

import useSearch from '@/hooks/useSearch';
import {DebankUserSearchItem} from "@/types/Wallets";
import {WalletBalanceByCoin} from "@/types/Wallets";
import {Portfolio} from "@/types/Wallets";

type Props = unknown;

const WalletStats: FC<Props> = () => {
  const {currentValue, search, setSearch} = useSearch();
  const [suggestions, setSuggestions] = useState<DebankUserSearchItem[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    wallets: [],
    usd_value: 0,
    by_coin: {},
    by_exchange: {},
  });

  const fetchSuggestions = useCallback(async (search) => {
    try {
      const response = await axios.get( 'https://api.debank.com/user/search_v3', {
          params: {q: search},
      });
      setSuggestions(get(response, 'data.data.users', []));
    } catch (error) {
      alert(`Debank API error: ${error}`);
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
      if (search && search.trim()) {
        fetchSuggestions(search.trim());
      } else {
        setSuggestions([]);
      }
    },
    [search]
  );

  const addWallet = useCallback(async (suggestion: DebankUserSearchItem, portfolio: Portfolio) => {
    setSuggestions([]);
    setSearch('');

    // Do nothing if wallet already exists in Portfolio
    console.log(suggestion.id, portfolio.wallets);
    if (portfolio.wallets.includes(suggestion.id)) {
      return
    }

    try {
      const response = await axios.get( `https://api.debank.com/asset/classify`, {
          params: {user_addr: suggestion.id},
      });

      const coin_list = get(response, 'data.data.coin_list', []);
      const token_list = get(response, 'data.data.token_list', []);

      // Update Portfolio by_coin
      coin_list.concat(token_list).map(el => {
        if (has(portfolio.by_coin, el.id)) {
          const pfc = portfolio.by_coin[el.id]
          pfc.amount = pfc.amount + el.amount;
          pfc.usd_value = pfc.amount * pfc.price;
        } else {
          portfolio.by_coin[el.id] = {
            id: el.id,
            symbol: el.symbol,
            price: el.price,
            logo_url: el.logo_url,
            amount: el.amount,
            usd_value: el.amount * el.price,
            value_pct: 0,
          }
        }
      });

      const usdValueTotal = sumBy(values(portfolio.by_coin), 'usd_value');
      forEach(portfolio.by_coin, (el) => {
        el.value_pct = el.usd_value * 100/ usdValueTotal;
      });

      const pf_updated: Portfolio = {
        wallets: [...portfolio.wallets, suggestion.id],
        usd_value: usdValueTotal,
        by_coin: portfolio.by_coin,
        by_exchange: portfolio.by_exchange,
      };
      console.log(pf_updated);
      setPortfolio(pf_updated);
    } catch (error) {
      alert(`Debank API error: ${error}`);
    }
  }, []);

  return (
    <>
      <div className="mt-6 sm:mt-10 text-sm">
        <div className="mt-6 max-w-md gap-x-4 mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={currentValue}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Enter wallet address"
            />
          </div>

          <ul role="list" className="mt-2 rounded-lg border overflow-hidden w-full text-left">
            {suggestions.map((el, index) => (
              <li key={index}
                  className="pl-5 justify-between py-3 border-b cursor-pointer bg-white hover:bg-blue-700 hover:text-white"
                  onClick={() => addWallet(el, portfolio)}
              >
                {el.id}
                <div className="text-gray-400">${round(el.desc.usd_value, 2)}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 max-w-2xl gap-x-4 mx-auto text-center">
          {!isEmpty(portfolio.wallets) && <>
            <h3 className="text-2xl font-bold">Total: ${round(portfolio.usd_value, 2)}</h3>
            <ul className='text-center'>
              {portfolio.wallets.map((el, index) => (
                <li key={index} className="py-3 border-b">{el}</li>
              ))}
            </ul>
          </>}

          {portfolio.usd_value && <>
            <h3 className="pt-8 text-2xl font-bold">Portfolio by Coin:</h3>
            <div className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Asset
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USD Value
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Percent
                  </th>
                </tr>
                </thead>
                <tbody>
                {reverse(sortBy(values(portfolio.by_coin), ['value_pct'])).map((el: WalletBalanceByCoin) => (
                  <tr key={el.id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="flex align-middle px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {el.logo_url && <Image
                        src={el.logo_url}
                        width={24}
                        height={24}
                        alt={el.id}
                        className='mr-2'
                      />}
                      {el.symbol}
                    </th>
                    <td className="px-6 py-4">
                      ${round(el.price, 4)}
                    </td>
                    <td className="px-6 py-4">
                      {round(el.amount, 4)}
                    </td>
                    <td className="px-6 py-4">
                      ${round(el.usd_value, 2)}
                    </td>
                    <td className="px-6 py-4">
                      {round(el.value_pct, 2)}%
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </>}

          {/*<button*/}
          {/*  className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg my-5"*/}
          {/*>*/}
          {/*  Compute*/}
          {/*</button>*/}
        </div>
      </div>
    </>
  );
};

export default WalletStats;
