import { useEffect, useReducer } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { usStates, TaxRegion } from "@/helpers/taxes";
import { encodeData, decodeData } from './cartUtils';
import { SharedData as EncodedSharedData } from '../types/cart';

export interface GroceryItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface SharedData {
    items: GroceryItem[];
    stateName: string | null;
}

interface CartState {
    items: GroceryItem[];
    selectedState: TaxRegion | null;
    newItemName: string;
    newItemPrice: string;
}

type CartAction =
    | { type: 'SET_ITEMS'; payload: GroceryItem[] }
    | { type: 'ADD_ITEM'; payload: GroceryItem }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_ITEM_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'SET_STATE'; payload: TaxRegion | null }
    | { type: 'SET_NEW_ITEM_NAME'; payload: string }
    | { type: 'SET_NEW_ITEM_PRICE'; payload: string }
    | { type: 'CLEAR_CART' };

const initialState: CartState = {
    items: [],
    selectedState: null,
    newItemName: "",
    newItemPrice: "",
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'SET_ITEMS':
            return { ...state, items: action.payload };
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        case 'UPDATE_ITEM_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                )
            };
        case 'SET_STATE':
            return { ...state, selectedState: action.payload };
        case 'SET_NEW_ITEM_NAME':
            return { ...state, newItemName: action.payload };
        case 'SET_NEW_ITEM_PRICE':
            return { ...state, newItemPrice: action.payload };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        default:
            return state;
    }
}

export function useCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
        const loadFromLocalStorage = () => {
          const storedItems = localStorage.getItem('cartItems');
          console.log('[useCart] Stored cart items:', storedItems);
          if (storedItems) {
            try {
              const parsedItems = JSON.parse(storedItems);
              console.log('[useCart] Parsed cart items:', parsedItems);
              if (parsedItems.length > 0) {
                dispatch({ type: 'SET_ITEMS', payload: parsedItems });
              }
            } catch (error) {
              console.error('[useCart] Error parsing stored cart items:', error);
            }
          }
          const storedState = localStorage.getItem('selectedState');
          if (storedState) {
            dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
          }
        };
      
        console.log('[useCart] Loading data from localStorage');
        loadFromLocalStorage();
      
        // Only load data from URL if there are no items in localStorage
        if (!localStorage.getItem('cartItems')) {
          const data = searchParams.get('data');
          if (data) {
            const decodedData = decodeData(data) as EncodedSharedData;
            dispatch({ type: 'SET_ITEMS', payload: decodedData.items });
            if (decodedData.region) {
              const state = usStates.find(s => s.name === decodedData.region);
              if (state) dispatch({ type: 'SET_STATE', payload: state });
            }
          }
        }
      }, [searchParams]);

    useEffect(() => {
        if (state.items.length > 0) {
          console.log('[useCart] Updating localStorage with cart items:', state.items);
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
    }, [state.items]);

    useEffect(() => {
        if (state.selectedState) {
            localStorage.setItem('selectedState', JSON.stringify(state.selectedState));
        }
    }, [state.selectedState]);

    const addItem = (name: string, price: number) => {
        const newItem: GroceryItem = {
            id: Date.now(),
            name,
            price,
            quantity: 1,
        };
        dispatch({ type: 'ADD_ITEM', payload: newItem });
        console.log('Item added:', newItem);
        console.log('Updated cart items:', [...state.items, newItem]);
    };

    const removeItem = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
    };

    const setBackConfirmed = (confirmed: boolean) => {
        localStorage.setItem('backConfirmed', confirmed.toString());
    };

    const getBackConfirmed = (): boolean => {
        return localStorage.getItem('backConfirmed') === 'true';
    };

    const handleShare = async () => {
        const sharedData: SharedData = {
            items: state.items,
            stateName: state.selectedState?.name || null
        };
        
        const encodedData: EncodedSharedData = {
            items: sharedData.items,
            countryCode: 'US', // Hardcoded for US
            region: sharedData.stateName || ''
        };
        
        const encodedString = encodeData(encodedData);
        // ... rest of the function
    };

    const fallbackShare = (shareableUrl: string) => {
        navigator.clipboard.writeText(shareableUrl).then(() => {
            toast({
                title: "Link Copied!",
                description: "The shareable link has been copied to your clipboard.",
                variant: "default",
                style: {
                    backgroundColor: "#191919",
                    color: "white",
                    border: "none",
                }
            });
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const setNewItemName = (name: string) => {
        dispatch({ type: 'SET_NEW_ITEM_NAME', payload: name });
    };

    const setNewItemPrice = (price: string) => {
        dispatch({ type: 'SET_NEW_ITEM_PRICE', payload: price });
    };

    const setSelectedState = (stateName: string) => {
        const newState = usStates.find(state => state.name === stateName) || null;
        dispatch({ type: 'SET_STATE', payload: newState });
    };

    const taxRate = state.selectedState?.taxRate || 0;
    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAmount = subtotal * (taxRate / 100);

    return {
        ...state,
        addItem,
        removeItem,
        updateItemQuantity,
        handleShare,
        clearCart,
        setNewItemName,
        setNewItemPrice,
        setSelectedState,
        setBackConfirmed,
        getBackConfirmed,
        taxRate,
        subtotal,
        taxAmount,
    };
}