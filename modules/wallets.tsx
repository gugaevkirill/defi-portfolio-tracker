import React, {FC, useState} from 'react';
import useSearch from '../hooks/useSearch';

type Props = unknown;

const WalletStats: FC<Props> = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);

  const addWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      setAddresses([...addresses, walletAddress]);
      setWalletAddress('');
    }
  };

  return (
    <>
      <div className="mt-6 sm:mt-10 text-sm">
        <form
          className="mt-6 max-w-md gap-x-4 mx-auto text-center"
          onSubmit={addWallet}
        >
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter wallet address"
          />

          <ul role="list" className="mt-5">
            {addresses.map((address, index) => (
              <li key={index} className="justify-between py-2">
                {address}
              </li>
            ))}
          </ul>

          <button
            className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg my-5"
          >
            Compute
          </button>
        </form>
      </div>
    </>
  );
};

export default WalletStats;
