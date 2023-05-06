import {FC} from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css'
import Layout from '@/components/Layout';

interface CustomProps {}

const MyApp = ({Component, pageProps}: AppProps<CustomProps>) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;