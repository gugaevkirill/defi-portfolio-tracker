import React from 'react'
import {FC} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useCallback} from 'react';
import axios from 'axios';
import {get} from 'lodash';
import {round} from 'lodash';

import useSearch from '@/hooks/useSearch';
import {DebankUserSearchItem} from "@/types/Wallets";

type Props = unknown;

const WalletStats: FC<Props> = () => {
  const {currentValue, search, setSearch} = useSearch();
  const [suggestions, setSuggestions] = useState<DebankUserSearchItem[]>([]);
  const [wallets, setWallets] = useState<string[]>([]);

  const fetchSuggestions = useCallback(async (search) => {
    try {
      const response = await axios.get( 'https://api.debank.com/user/search_v3', {
          params: {q: search},
      });
      setSuggestions(get(response, 'data.data.users', []));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
      if (search) {
        fetchSuggestions(search);
      } else {
        setSuggestions([]);
      }
    },
    [search]
  );

  const addWallet = useCallback((suggestion: DebankUserSearchItem, wallets) => {
    setWallets([...wallets, suggestion.id]);
    setSuggestions([]);
    setSearch('');
  }, []);

  // const addWallet = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (search.trim()) {
  //     setWallets([...wallets, search]);
  //     setSearch('');
  //   }
  // };

  return (
    <>
      <div className="mt-6 sm:mt-10 text-sm">
        <div className="mt-6 max-w-md gap-x-4 mx-auto text-center">

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
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
                  onClick={() => addWallet(el, wallets)}
              >
                {el.id}
                <div className="text-gray-400">${round(el.desc.usd_value, 2)}</div>
              </li>
            ))}
          </ul>

          <div>
            {wallets.map((el, index) => (
              <div key={index} className="flex justify-between py-3 border-b">{el}</div>
            ))}
          </div>

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
