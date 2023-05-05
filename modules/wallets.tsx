import React, {FC, useState} from 'react';
import useSearch from '../hooks/useSearch';

type Props = unknown;

const WalletStats: FC<Props> = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      setAddresses([...addresses, walletAddress]);
      setWalletAddress('');
    }
  };

  // const [showAdd, setShowAdd] = useState(false);
  // const toggleShowAdd = useCallback(() => setShowAdd((prevState) => !prevState), []);
  //
  // const { data, loading, refetch } = useQuery<getAudiences, getAudiencesVariables>(GET_AUDIENCES, {
  //   variables: {
  //     where: {
  //       enabled: {
  //         _eq: true,
  //       },
  //     },
  //   },
  //   fetchPolicy: 'cache-and-network',
  // });

  // const handleClose = useCallback(() => {
  //   setShowAdd(false);
  //   refetch();
  // }, [refetch]);
  //
  // const handleSuccess = useCallback(() => {
  //   refetch();
  // }, [refetch]);
  //
  // const items = useMemo(
  //   () => data?.audiences.filter((el) => !search || el.name.toLowerCase().includes(search.toString())),
  //   [data, search],
  // );

  return (
    <>
      <div className="mt-6 sm:mt-10 text-sm">
        <form
          className="mt-6 flex max-w-md gap-x-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter wallet address"
          />
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
          >
            Compute
          </button>
        </form>
      <div className="mt-6">
        <ul role="list" className="divide-y">
        {addresses.map((address, index) => (
          <li key={index} className="justify-between py-2">
            {address}
          </li>
        ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default WalletStats;
