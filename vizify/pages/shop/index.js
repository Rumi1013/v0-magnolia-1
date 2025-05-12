import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useShopify } from '../../lib/shopify/context';
import ProductCard from '../../src/components/shopify/ProductCard';
import ShoppingCart from '../../src/components/shopify/ShoppingCart';
import { getAllProducts, getAllCollections } from '../../lib/shopify/client';
import styles from '../../styles/shopify/Shop.module.css';

// This gets called at build time on server-side.
export async function getStaticProps() {
  try {
    const products = await getAllProducts();
    const collections = await getAllCollections();

    return {
      props: {
        initialProducts: JSON.parse(JSON.stringify(products)) || [],
        initialCollections: JSON.parse(JSON.stringify(collections)) || [],
      },
      // No revalidate for static export
    };
  } catch (error) {
    console.error('Error fetching shop data:', error);
    return {
      props: {
        initialProducts: [],
        initialCollections: [],
      },
    };
  }
}

export default function ShopPage({ initialProducts, initialCollections }) {
  const { dispatch, ACTIONS } = useShopify();
  const [activeCollection, setActiveCollection] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortOption, setSortOption] = useState('featured');
  
  // Load product data into context
  useEffect(() => {
    dispatch({ type: ACTIONS.SET_PRODUCTS, payload: initialProducts });
    dispatch({ type: ACTIONS.SET_COLLECTIONS, payload: initialCollections });
  }, [dispatch, ACTIONS, initialProducts, initialCollections]);
  
  // Filter products when collection changes
  useEffect(() => {
    if (activeCollection === 'all') {
      setFilteredProducts(initialProducts);
    } else {
      const collection = initialCollections.find(c => c.handle === activeCollection);
      if (collection) {
        const collectionProducts = initialProducts.filter(product => 
          collection.products.some(p => p.id === product.id)
        );
        setFilteredProducts(collectionProducts);
      }
    }
  }, [activeCollection, initialProducts, initialCollections]);
  
  // Sort products when sort option changes
  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...filteredProducts];
      
      switch (sortOption) {
        case 'price-low':
          sorted.sort((a, b) => {
            const priceA = a.variants[0]?.price || 0;
            const priceB = b.variants[0]?.price || 0;
            return parseFloat(priceA) - parseFloat(priceB);
          });
          break;
        
        case 'price-high':
          sorted.sort((a, b) => {
            const priceA = a.variants[0]?.price || 0;
            const priceB = b.variants[0]?.price || 0;
            return parseFloat(priceB) - parseFloat(priceA);
          });
          break;
        
        case 'title-asc':
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        
        case 'title-desc':
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
        
        case 'newest':
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        
        // Featured is default, no sorting needed
        default:
          break;
      }
      
      setFilteredProducts(sorted);
    };
    
    sortProducts();
  }, [sortOption, activeCollection]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Shop | Midnight Magnolia</title>
        <meta name="description" content="Shop Midnight Magnolia's selection of premium event planning services and packages." />
      </Head>
      
      <header className={styles.header}>
        <h1>Midnight Magnolia Shop</h1>
        <ShoppingCart />
      </header>
      
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h2>Collections</h2>
            <ul className={styles.collectionList}>
              <li>
                <button
                  className={`${styles.collectionButton} ${activeCollection === 'all' ? styles.active : ''}`}
                  onClick={() => setActiveCollection('all')}
                >
                  All Products
                </button>
              </li>
              {initialCollections.map(collection => (
                <li key={collection.id}>
                  <button
                    className={`${styles.collectionButton} ${activeCollection === collection.handle ? styles.active : ''}`}
                    onClick={() => setActiveCollection(collection.handle)}
                  >
                    {collection.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={styles.productSection}>
          <div className={styles.productControls}>
            <div className={styles.productCount}>
              {filteredProducts.length} products
            </div>
            
            <div className={styles.sortOptions}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-asc">Alphabetically: A-Z</option>
                <option value="title-desc">Alphabetically: Z-A</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <div key={product.id} className={styles.productGridItem}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <p>No products found in this collection.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}