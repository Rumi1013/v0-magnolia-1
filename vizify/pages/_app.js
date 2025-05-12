import '../styles/globals.css';
import { ShopifyProvider } from '../lib/shopify/context';
import MainLayout from '../components/layout/MainLayout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Only wrap shop pages with ShopifyProvider
  const isShopPage = router.pathname.startsWith('/shop');

  // Check if the page should use the main layout
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  // If it's a shop page, wrap with ShopifyProvider
  if (isShopPage) {
    return (
      <ShopifyProvider>
        {getLayout(<Component {...pageProps} />)}
      </ShopifyProvider>
    );
  }

  // Otherwise, render with layout but without ShopifyProvider
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;