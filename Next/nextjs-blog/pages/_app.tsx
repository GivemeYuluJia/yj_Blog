import App from 'next/app';
import { cookie, setCookie } from 'utils/cookie';
import Layout from '../components/Layout';
import { initStore,  StoreProvider } from 'store';
import type { AppProps } from 'next/app';

import '../styles/globals.css';


const MyApp = ({ Component, pageProps }: AppProps) => {
  initStore();
  const renderLayout = () => {
    if((Component as any).Layout === null) {
      return <Component {...pageProps} />
    } else {
      <Layout>
        <Component {...pageProps} />
      </Layout>
    }
  }
  return (
    <StoreProvider>
      {renderLayout()}
    </StoreProvider>
  )
};

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const { id, nickname, avatar } = appContext.ctx.req?.cookies || {};
  initStore();
  console.log(id, '???', avatar);
  if (id && nickname) {
    setCookie(cookie, { id, nickname, avatar});
  }
  return { ...appProps }
};

export default MyApp;

