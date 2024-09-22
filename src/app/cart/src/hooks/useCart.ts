import { useEffect, useReducer } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { countries, Country, TaxRegion } from "@/helpers/taxes";
import { encodeData, decodeData } from './cartUtils';

interface GroceryItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface SharedData {
    items: GroceryItem[];
    countryCode: string | null;
    region: string | null;
}

interface CartState {
    items: GroceryItem[];
    selectedCountry: Country | null;
    selectedRegion: TaxRegion | null;
    newItemName: string;
    newItemPrice: string;
}

type CartAction =
    | { type: 'SET_ITEMS'; payload: GroceryItem[] }
    | { type: 'ADD_ITEM'; payload: GroceryItem }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_ITEM_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'SET_COUNTRY'; payload: Country | null }
    | { type: 'SET_REGION'; payload: TaxRegion | null }
    | { type: 'SET_NEW_ITEM_NAME'; payload: string }
    | { type: 'SET_NEW_ITEM_PRICE'; payload: string }
    | { type: 'CLEAR_CART' };

const initialState: CartState = {
    items: [],
    selectedCountry: null,
    selectedRegion: null,
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
        case 'SET_COUNTRY':
            return { ...state, selectedCountry: action.payload };
        case 'SET_REGION':
            return { ...state, selectedRegion: action.payload };
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
            if (storedItems) {
                dispatch({ type: 'SET_ITEMS', payload: JSON.parse(storedItems) });
            }
            const storedCountry = localStorage.getItem('selectedCountry');
            if (storedCountry) {
                dispatch({ type: 'SET_COUNTRY', payload: JSON.parse(storedCountry) });
            }
            const storedRegion = localStorage.getItem('selectedRegion');
            if (storedRegion) {
                dispatch({ type: 'SET_REGION', payload: JSON.parse(storedRegion) });
            }
        };

        loadFromLocalStorage();
        const data = searchParams.get('data');
        if (data) {
            const decodedData = decodeData(data);
            dispatch({ type: 'SET_ITEMS', payload: decodedData.items });
            if (decodedData.countryCode) {
                const country = countries.find(c => c.code === decodedData.countryCode);
                if (country) dispatch({ type: 'SET_COUNTRY', payload: country });
            }
            if (decodedData.region) {
                const country = countries.find(c => c.code === decodedData.countryCode);
                const region = country?.regions?.find((r: TaxRegion) => r.name === decodedData.region);
                if (region) dispatch({ type: 'SET_REGION', payload: region });
            }
        }
    }, [searchParams]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
    }, [state.items]);

    useEffect(() => {
        if (state.selectedCountry) {
            localStorage.setItem('selectedCountry', JSON.stringify(state.selectedCountry));
        }
    }, [state.selectedCountry]);

    useEffect(() => {
        if (state.selectedRegion) {
            localStorage.setItem('selectedRegion', JSON.stringify(state.selectedRegion));
        }
    }, [state.selectedRegion]);

    const addItem = (name: string, price: number) => {
        const newItem: GroceryItem = {
            id: Date.now(),
            name,
            price,
            quantity: 1,
        };
        dispatch({ type: 'ADD_ITEM', payload: newItem });
    };

    const removeItem = (id: number) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateItemQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
    };

    const handleShare = async () => {
        const sharedData: SharedData = {
            items: state.items,
            countryCode: state.selectedCountry?.code || null,
            region: state.selectedRegion?.name || null
        };
        const encodedData = encodeData(sharedData);
        const shareableUrl = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(encodedData)}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My cart 🛒',
                    text: 'Check out what I have in my cart 😎',
                    url: shareableUrl,
                });
                toast({
                    title: "Shared Successfully!",
                    description: "Your cart has been shared.",
                    variant: "default",
                    style: {
                        backgroundColor: "#191919",
                        color: "white",
                        border: "none",
                    }
                });
            } catch (error) {
                console.error('Error sharing:', error);
                fallbackShare(shareableUrl);
            }
        } else {
            fallbackShare(shareableUrl);
        }

        router.push(`${window.location.pathname}?data=${encodedData}`, { scroll: false });
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

    const setSelectedCountry = (country: Country | null) => {
        dispatch({ type: 'SET_COUNTRY', payload: country });
    };

    const setSelectedRegion = (region: TaxRegion | null) => {
        dispatch({ type: 'SET_REGION', payload: region });
    };

    return {
        ...state,
        addItem,
        removeItem,
        updateItemQuantity,
        handleShare,
        clearCart,
        setNewItemName,
        setNewItemPrice,
        setSelectedCountry,
        setSelectedRegion,
    };
}