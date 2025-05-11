import '../styles/globals.css';
import { ShopifyProvider } from '../lib/shopify/context';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Only wrap shop pages with ShopifyProvider
  const isShopPage = router.pathname.startsWith('/shop');

  // If it's a shop page, wrap with ShopifyProvider
  if (isShopPage) {
    return (
      <ShopifyProvider>
        <Component {...pageProps} />
      </ShopifyProvider>
    );
  }

  // Otherwise, render normally
  return <Component {...pageProps} />;
}

export default MyApp;