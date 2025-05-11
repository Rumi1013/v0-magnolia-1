import { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  createCheckout, 
  addItemsToCheckout, 
  updateCheckoutItems, 
  removeItemsFromCheckout 
} from './client';

// Initial state for the Shopify context
const initialState = {
  isCartOpen: false,
  checkout: null,
  products: [],
  collections: [],
  loading: false,
  error: null,
};

// Define action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_COLLECTIONS: 'SET_COLLECTIONS',
  SET_CHECKOUT: 'SET_CHECKOUT',
  TOGGLE_CART: 'TOGGLE_CART',
  ADD_ITEM_TO_CHECKOUT: 'ADD_ITEM_TO_CHECKOUT',
  UPDATE_CHECKOUT_ITEM: 'UPDATE_CHECKOUT_ITEM',
  REMOVE_CHECKOUT_ITEM: 'REMOVE_CHECKOUT_ITEM',
};

// Reducer function to manage state changes
function shopifyReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload, loading: false };
    case ACTIONS.SET_COLLECTIONS:
      return { ...state, collections: action.payload, loading: false };
    case ACTIONS.SET_CHECKOUT:
      return { ...state, checkout: action.payload, loading: false };
    case ACTIONS.TOGGLE_CART:
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      return state;
  }
}

// Create the Shopify context
const ShopifyContext = createContext();

// Provider component to wrap application with Shopify context
export function ShopifyProvider({ children }) {
  const [state, dispatch] = useReducer(shopifyReducer, initialState);

  // Initialize checkout when the component mounts
  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for existing checkout in localStorage
      const existingCheckoutId = localStorage.getItem('checkoutId');
      
      if (existingCheckoutId) {
        try {
          // Use existing checkout
          const checkout = await createCheckout();
          if (checkout) {
            localStorage.setItem('checkoutId', checkout.id);
            dispatch({ type: ACTIONS.SET_CHECKOUT, payload: checkout });
          }
        } catch (error) {
          console.error('Failed to retrieve existing checkout:', error);
          // If retrieval fails, create a new checkout
          createNewCheckout();
        }
      } else {
        // No existing checkout found, create a new one
        createNewCheckout();
      }
    };

    const createNewCheckout = async () => {
      try {
        const checkout = await createCheckout();
        if (checkout) {
          localStorage.setItem('checkoutId', checkout.id);
          dispatch({ type: ACTIONS.SET_CHECKOUT, payload: checkout });
        }
      } catch (error) {
        console.error('Failed to create new checkout:', error);
        dispatch({ 
          type: ACTIONS.SET_ERROR, 
          payload: 'Failed to initialize checkout. Please try refreshing the page.'
        });
      }
    };

    initializeCheckout();
  }, []);

  // Handler for adding items to the cart
  const addItemToCheckout = async (variantId, quantity) => {
    if (!state.checkout) return;
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const lineItemsToAdd = [{
        variantId,
        quantity: parseInt(quantity, 10),
      }];
      
      const checkout = await addItemsToCheckout(state.checkout.id, lineItemsToAdd);
      
      if (checkout) {
        dispatch({ type: ACTIONS.SET_CHECKOUT, payload: checkout });
      }
    } catch (error) {
      console.error('Failed to add item to checkout:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to add item to cart. Please try again.'
      });
    }
  };

  // Handler for updating cart items
  const updateCheckoutItem = async (lineItemId, quantity) => {
    if (!state.checkout) return;
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity: parseInt(quantity, 10),
      }];
      
      const checkout = await updateCheckoutItems(state.checkout.id, lineItemsToUpdate);
      
      if (checkout) {
        dispatch({ type: ACTIONS.SET_CHECKOUT, payload: checkout });
      }
    } catch (error) {
      console.error('Failed to update checkout item:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to update cart item. Please try again.'
      });
    }
  };

  // Handler for removing items from the cart
  const removeCheckoutItem = async (lineItemId) => {
    if (!state.checkout) return;
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const checkout = await removeItemsFromCheckout(state.checkout.id, [lineItemId]);
      
      if (checkout) {
        dispatch({ type: ACTIONS.SET_CHECKOUT, payload: checkout });
      }
    } catch (error) {
      console.error('Failed to remove checkout item:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to remove cart item. Please try again.'
      });
    }
  };

  // Handler for toggling the cart sidebar
  const toggleCart = () => {
    dispatch({ type: ACTIONS.TOGGLE_CART });
  };

  // Value object containing state and methods to pass via context
  const contextValue = {
    ...state,
    addItemToCheckout,
    updateCheckoutItem,
    removeCheckoutItem,
    toggleCart,
    dispatch,
  };

  return (
    <ShopifyContext.Provider value={contextValue}>
      {children}
    </ShopifyContext.Provider>
  );
}

// Custom hook for accessing the Shopify context
export function useShopify() {
  const context = useContext(ShopifyContext);
  
  if (context === undefined) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  
  return context;
}