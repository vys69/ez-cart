"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Minus, Trash2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { states } from "@/helpers/states"
import { useRouter, useSearchParams } from "next/navigation"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { LinearBlur } from "progressive-blur"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import LottieTrash from "@/components/LottieTrash"
import LottieArrow from "@/components/LottieArrow"

interface GroceryItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface SharedData {
  items: GroceryItem[];
  currency: string | null;
  state: string | null;
}

const formatNumber = (num: number | null | undefined): string => {
  if (num == null) return '0.00'; // Return '0.00' for null or undefined
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Cart() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [items, setItems] = useState<GroceryItem[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [backModalOpen, setBackModalOpen] = useState(false)
  const [clearModalOpen, setClearModalOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const itemNameInputRef = useRef<HTMLInputElement>(null)
  const itemPriceInputRef = useRef<HTMLInputElement>(null)

  const encodeData = (data: SharedData): string => {
    return btoa(JSON.stringify(data));
  };

  const decodeData = (encodedData: string): SharedData => {
    return JSON.parse(atob(encodedData));
  };

  const handleShare = async () => {
    const sharedData: SharedData = {
      items,
      currency: selectedCountry,
      state: selectedCountry === 'USD' ? selectedState : null
    };
    const encodedData = encodeData(sharedData);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Shopping Cart',
          text: 'Check out my shopping cart!',
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

    // Optionally, update the URL without reloading the page
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
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast({
        title: "Error",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      });
    });
  };

  useEffect(() => {
    const sharedData = searchParams.get('data');
    if (sharedData) {
      try {
        const parsedData: SharedData = decodeData(sharedData);
        
        if (parsedData.items && Array.isArray(parsedData.items)) {
          setItems(parsedData.items);
          saveItemsToLocalStorage(parsedData.items);
        } else {
          setItems([]);
        }

        if (parsedData.currency) {
          setSelectedCountry(parsedData.currency);
          localStorage.setItem("currency", parsedData.currency);
        }

        if (parsedData.currency === 'USD' && parsedData.state) {
          setSelectedState(parsedData.state);
          localStorage.setItem("state", parsedData.state);
        }
      } catch (error) {
        console.error('Failed to parse shared data:', error);
        loadFromLocalStorage();
      }
    } else {
      loadFromLocalStorage();
    }
  }, [searchParams]);

  const loadFromLocalStorage = () => {
    const storedCurrency = localStorage.getItem("currency");
    const storedState = localStorage.getItem("state");

    if (storedCurrency) {
      setSelectedCountry(storedCurrency);
      if (storedCurrency === 'USD' && storedState) {
        setSelectedState(storedState);
      }
    }

    const storedItems = localStorage.getItem("groceryItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setItems(Array.isArray(parsedItems) ? parsedItems : []);
    } else {
      setItems([]);
    }
  };

  const saveItemsToLocalStorage = (newItems: GroceryItem[]) => {
    localStorage.setItem("groceryItems", JSON.stringify(newItems));
  };

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setNewItemName(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and a single decimal point, max 10 digits before decimal
    if (/^\d{0,10}(\.\d*)?$/.test(value)) {
      setNewItemPrice(value);
    }
  };

  const handleItemNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemName.trim() !== '') {
      e.preventDefault() // Prevent form submission
      itemPriceInputRef.current?.focus()
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemPrice.trim() !== '') {
      e.preventDefault() // Prevent form submission
      addItem()
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug log

    if (newItemName.length > 100) {
      console.log("Item name too long"); // Debug log
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Item name cannot exceed 100 characters.",
        action: <ToastAction altText="Try again">Close</ToastAction>,
      });
      setNewItemName("");
      return;
    }

    if (newItemPrice.split('.')[0].length > 10) {
      console.log("Price too long"); // Debug log
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Price cannot exceed 10 digits before the decimal point.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setNewItemPrice("");
      return;
    }

    console.log("Validation passed, calling addItem"); // Debug log
    addItem();
  };

  const addItem = () => {
    console.log("addItem called"); // Debug log
    if (newItemName.trim() && newItemPrice.trim()) {
      const price = parseFloat(newItemPrice);
      if (isNaN(price) || !isFinite(price)) {
        console.log("Invalid price"); // Debug log
        toast({
          variant: "destructive",
          title: "Input Error",
          description: "Please enter a valid price.",
        });
        setNewItemPrice("");
        return;
      }
      const newItem: GroceryItem = {
        id: Date.now(),
        name: newItemName.trim(),
        price: parseFloat(price.toFixed(2)),
        quantity: 1
      };
      console.log("New item:", newItem); // Debug log
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveItemsToLocalStorage(updatedItems);
      setNewItemName("");
      setNewItemPrice("");

      if (itemNameInputRef.current) {
        itemNameInputRef.current.focus();
      }

      // Schedule the scroll after the state has been updated and the DOM has been re-rendered
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 0);
    } else {
      console.log("Item name or price is empty"); // Debug log
    }
  };

  const removeItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    saveItemsToLocalStorage(updatedItems)
  }

  const updateItemQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  }

  const subtotal = items ? items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0
  const taxRate = selectedCountry === 'USD' && selectedState && selectedState !== " " ?
    states.find(s => s.name === selectedState)?.taxRate || 0 : 0
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [items])

  const handleBackToStep = () => {
    setBackModalOpen(true)
  }

  const handleClearList = () => {
    if (items.length > 0) {
      setClearModalOpen(true)
    }
  }

  const handleConfirmBack = () => {
    saveItemsToLocalStorage(items)
    router.push('/step/2')
  }

  const handleConfirmClear = () => {
    setItems([])
    saveItemsToLocalStorage([])
    setClearModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col">
      <Card className="flex-grow flex flex-col rounded-none overflow-auto border-none">
        <CardHeader className="py-4 flex flex-row items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToStep}
            className="h-10 w-10 bg-transparent text-white hover:text-gray-400 hover:bg-transparent"
          >
            <LottieArrow
              style={{ color: 'white', fill: 'white', transform: 'scaleX(-1)' }}
              size={40}
              speed={2.5}
              onClick={handleBackToStep}
            />
          </Button>
          <CardTitle className="text-2xl font-bold text-center flex-grow text-white">Cart</CardTitle>
          <div className="flex">
            <Button
              variant="default"
              size="icon"
              onClick={handleShare}
              className="h-10 w-10 bg-transparent text-white hover:text-gray-400 hover:bg-transparent mr-2"
            >
              <Share2 className="h-6 w-6" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handleClearList}
              className="h-10 w-10 bg-transparent text-white hover:text-gray-400 hover:bg-transparent"
            >
              <LottieTrash
                style={{ color: 'white', fill: 'white' }}
                size={40}
                speed={2.5}
                onClick={handleClearList}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col relative px-4">
          <ul ref={listRef} className="flex-grow overflow-y-auto space-y-4 pb-10">
            {items.map(item => (
              <li
                key={item.id}
                className={`
                  relative overflow-hidden
                  flex flex-col
                  bg-gradient-custom
                  p-4 rounded-lg shadow fade-in
                  transition-all duration-300 ease-in-out
                  hover:bg-[#383838]
                  ${items.length > 1 ? 'staggered-animation' : ''}
                `}
              >
                <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#121212] opacity-80 shadow-custom-red"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#1a1a1a] shadow-custom-white"></div>

                <div className="flex justify-between items-center mb-2 relative">
                  <span className="text-xl break-words text-white">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="link"
                      size="icon"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 rounded-full text-white hover:text-red-300"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="link"
                      size="icon"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-full text-white hover:text-green-300"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="default" 
                      size="icon" 
                      onClick={() => removeItem(item.id)} 
                      className="h-8 w-8 flex-shrink-0 bg-[#191919] z-0 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <span className="text-md font-regular text-white">
                    {formatNumber(item.price)} {selectedCountry !== " " ? selectedCountry : ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="sticky bottom-0 w-full bg-[#000000] pt-2 relative">
        <LinearBlur
          side="bottom"
          steps={16}
          strength={32}
          tint="rgba(0, 0, 0, 1)"
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateY(-100%)",
            height: "100px",
            pointerEvents: "none",
          }}
        />
        <div className="px-4">
          <div className="flex flex-col py-2 mb-2 w-full">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Subtotal:</span>
              <span className="text-sm text-white">
                {formatNumber(subtotal)} {selectedCountry !== " " ? selectedCountry : ''}
              </span>
            </div>
            {selectedCountry === 'USD' && selectedState !== " " && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-white">Tax ({taxRate}%):</span>
                <span className="text-sm text-white">
                  {formatNumber(taxAmount)} {selectedCountry}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg font-bold text-white">Total:</span>
              <span className="text-lg font-bold text-white">
                {formatNumber(total)} {selectedCountry !== " " ? selectedCountry : ''}
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2 pb-4 w-full">
            <Input
              type="text"
              placeholder="Item name"
              value={newItemName}
              onChange={handleItemNameChange}
              onKeyDown={handleItemNameKeyDown}
              className="w-full text-lg h-12 text-white font-normal border-2 border-[#383838] rounded-md placeholder-gray-400"
              ref={itemNameInputRef}
              maxLength={100}
            />
            <div className="flex space-x-2 w-full">
              <Input
                type="text"
                inputMode="decimal"
                placeholder="Price"
                value={newItemPrice}
                onChange={handlePriceChange}
                onKeyDown={handlePriceKeyDown}
                className="flex-grow text-lg h-12 text-white font-normal border-2 border-[#383838] rounded-md placeholder-gray-400"
                ref={itemPriceInputRef}
              />
              <Button type="submit" size="icon" className="h-12 w-12 text-white">
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isOpen={backModalOpen}
        onClose={() => setBackModalOpen(false)}
        config={{
          id: 'back',
          title: 'Go Back',
          message: 'Are you sure you want to go back? Your changes will be saved.',
          cancelText: 'Cancel',
          confirmText: 'Confirm',
          onConfirm: handleConfirmBack
        }}
      />
      <ConfirmationModal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        config={{
          id: 'clear',
          title: 'Clear List',
          message: 'Are you sure you want to clear the entire list?',
          cancelText: 'Cancel',
          confirmText: 'Clear',
          onConfirm: handleConfirmClear
        }}
      />
    </div>
  )
}