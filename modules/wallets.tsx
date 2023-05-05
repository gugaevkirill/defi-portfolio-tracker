import { useQuery } from '@apollo/client';
import React, { FC, useCallback, useMemo, useState } from 'react';
import useSearch from '../hooks/useSearch';
import AudienceTable from './AudienceTable';
import { GET_AUDIENCES } from '../../schema/audience';
import { getAudiences, getAudiencesVariables } from '../../schema/types/getAudiences';
import Button from '../../components/Button/Button';
import ButtonGroup from '../../components/Button/ButtonGroup';
import InputText from '../components/InputText/InputText';
import PlaceholderText from '../../components/placeholder/PlaceholderText';
import TableHeaderActions from '../../components/Table/TableHeaderActions';
import TableHeaderActionsRow from '../../components/Table/TableHeaderActionsRow';
import Text from '../../components/Text/Text';
import ModalAddAudience from './ModalAddAudience';

type Props = unknown;

const WalletStats: FC<Props> = () => {
  const { currentValue, search, setSearch } = useSearch();

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
    <div>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">Nostrud amet eu ullamco nisi aute in ad minim nostrud
                adipisicing velit quis. Duis tempor incididunt dolore.</p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required
                       className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="Enter your email"
                       value={currentValue}
                        onChange={(event) => setSearch(event.target.value)}
                        variant="x-small"
                        prefix="icon-search"
                        placeholder="Search audiences..."
                        width={300}
                />
                  <button type="submit"
                          className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    Subscribe
                  </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/>
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                <dd className="mt-2 leading-7 text-gray-400">Non laboris consequat cupidatat laborum magna. Eiusmod non
                  irure cupidatat duis commodo amet.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"/>
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-white">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-400">Officia excepteur ullamco ut sint duis proident non
                  adipisicing. Voluptate incididunt anim.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
               style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
      </div>

      {/*<TableHeaderActions>*/}
      {/*  <TableHeaderActionsRow*/}
      {/*    variant="large"*/}
      {/*    rightArea={*/}
      {/*      <ButtonGroup>*/}
      {/*        <Button variant="secondary" height="short" onClick={toggleShowAdd}>*/}
      {/*          Create Audience*/}
      {/*        </Button>*/}
      {/*      </ButtonGroup>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    {items ? (*/}
      {/*      <Text variant="gray" size="md">*/}
      {/*        <strong>{items.length}</strong> Audience(s)*/}
      {/*      </Text>*/}
      {/*    ) : (*/}
      {/*      <Text variant="gray" size="md">*/}
      {/*        <PlaceholderText /> Audience(s)*/}
      {/*      </Text>*/}
      {/*    )}*/}

      {/*    <InputText*/}
      {/*      value={currentValue}*/}
      {/*      onChange={(event) => setSearch(event.target.value)}*/}
      {/*      variant="x-small"*/}
      {/*      prefix={<i className="icon-search" />}*/}
      {/*      placeholder="Search audiences..."*/}
      {/*      width={300}*/}
      {/*    />*/}
      {/*  </TableHeaderActionsRow>*/}
      {/*</TableHeaderActions>*/}

      {/*<AudienceTable data={items} loading={loading} noRowsLabel="No audiences found" onSuccess={handleSuccess} />*/}

      {/*<ModalAddAudience show={showAdd} onClose={handleClose} />*/}
    </div>
  );
};

export default WalletStats;
