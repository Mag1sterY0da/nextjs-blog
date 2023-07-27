import Layout from '@/components/Layout';
import { AppProps } from 'next/app';
import '../styles/general.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout title='Next.js blog'>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
