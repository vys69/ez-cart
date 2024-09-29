"use client"

import { useState, useRef, useEffect } from 'react';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { LinearBlur } from "progressive-blur"
import { useToast } from "@/hooks/use-toast"
import LottieTrash from "@/components/LottieTrash"
import LottieArrow from "@/components/LottieArrow"
import TextTransition, { presets } from "react-text-transition";
import CartCard from "@/components/cart/CartCard";
import { useCart } from '@/app/cart/src/hooks/useCart';
import { formatNumber } from '@/app/cart/src/hooks/cartUtils';
import { Plus, Share2 } from "lucide-react"
import TwinklingGrid from "@/components/ui/TwinklingGrid"
import { GroceryItem } from '@/app/cart/src/hooks/useCart';

interface CartCardProps {
  item: GroceryItem;
  formatNumber: (num: number | null | undefined) => string;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  isItemChanged: boolean;
}

function CartContent() {
  const router = useRouter()
  const { toast } = useToast()
  const {
    items,
    newItemName,
    newItemPrice,
    addItem,
    removeItem,
    updateItemQuantity,
    handleShare,
    clearCart,
    setNewItemName,
    setNewItemPrice,
    subtotal,
  } = useCart();

  const [backModalOpen, setBackModalOpen] = useState(false)
  const [clearModalOpen, setClearModalOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const itemNameInputRef = useRef<HTMLInputElement>(null)
  const itemPriceInputRef = useRef<HTMLInputElement>(null)
  const [previousTotal, setPreviousTotal] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<"up" | "down">("down");
  const [transitionColor, setTransitionColor] = useState("text-white");
  const [isItemChanged, setIsItemChanged] = useState(false);
  const [totalChanged, setTotalChanged] = useState(false);

  const handleItemNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      itemPriceInputRef.current?.focus();
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem('itemName') as HTMLInputElement;
    const priceInput = form.elements.namedItem('itemPrice') as HTMLInputElement;

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name && !isNaN(price) && isFinite(price)) {
      addItem(name, price);
      form.reset();
      nameInput.focus();
      setIsItemChanged(true);
      setTimeout(() => setIsItemChanged(false), 300);
    } else {
      toast({
        variant: "destructive",
        title: "Input Error",
        description: "Please enter a valid item name and price.",
      });
    }
  };

  const handleBackToStep = () => {
    if (items.length > 0) {
      setBackModalOpen(true);
    } else {
      router.push('/');
    }
  };

  const handleClearList = () => {
    if (items.length > 0) {
      setClearModalOpen(true);
    }
  };

  const handleConfirmBack = () => {
    setBackModalOpen(false);
    router.push('/');
  };

  const handleConfirmClear = () => {
    clearCart();
    setClearModalOpen(false);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    };

    scrollToBottom();

    return scrollToBottom;
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }

    if (isItemChanged) {
      const newTotal = subtotal;
      if (newTotal !== previousTotal) {
        setTotalChanged(true);
        if (newTotal > previousTotal) {
          setTransitionDirection("up");
          setTransitionColor("text-green-500");
        } else if (newTotal < previousTotal) {
          setTransitionDirection("down");
          setTransitionColor("text-red-500");
        }
        setPreviousTotal(newTotal);

        const timer = setTimeout(() => {
          setTransitionColor("text-white");
          setTotalChanged(false);
          setIsItemChanged(false);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        setIsItemChanged(false);
      }
    }
  }, [isItemChanged, subtotal, previousTotal]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-10">
      <Card className="bg-transparent flex-grow flex flex-col rounded-none overflow-auto border-none relative z-10">
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
            {items.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                formatNumber={formatNumber}
                removeItem={(id) => {
                  removeItem(id);
                  setIsItemChanged(true);
                  setTimeout(() => setIsItemChanged(false), 300);
                }}
                updateItemQuantity={(id, quantity) => {
                  updateItemQuantity(id, quantity);
                  setIsItemChanged(true);
                  setTimeout(() => setIsItemChanged(false), 300);
                }}
                isItemChanged={isItemChanged}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="sticky bottom-0 w-full bg-[#000000] pt-2 relative z-10">
        <LinearBlur
          side="bottom"
          steps={32}
          strength={8}
          tint="rgba(0, 0, 0, 1)"
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateY(-100%)",
            height: "100px",
            pointerEvents: "none",
          }}
        />
        <div className="px-4 bg-black">
          <div className="flex flex-col py-2 mb-2 w-full">
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg font-bold text-white">Total:</span>
              <TextTransition springConfig={presets.gentle} direction={transitionDirection} inline={true} className={`text-lg font-bold ${totalChanged ? transitionColor : 'text-white'}`}>
                {formatNumber(subtotal)} USD
              </TextTransition>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2 pb-4 w-full">
              <Input
                type="text"
                name="itemName"
                placeholder="Item name"
                className="w-full text-lg h-12 text-white font-normal border-2 border-[#383838] rounded-md placeholder-gray-400"
                ref={itemNameInputRef}
                maxLength={100}
                onKeyDown={handleItemNameKeyDown}
              />
              <div className="flex space-x-2 w-full">
                <Input
                  type="text"
                  name="itemPrice"
                  inputMode="decimal"
                  placeholder="Price"
                  className="flex-grow text-lg h-12 text-white font-normal border-2 border-[#383838] rounded-md placeholder-gray-400"
                  ref={itemPriceInputRef}
                  maxLength={10}
                  onKeyDown={handlePriceKeyDown}
                />
                <Button type="submit" size="icon" className="h-12 w-12 bg-white text-black">
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
            </form>
          </div>
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
      {/* <ShinyGrid className='shinygrid opacity-[1] fixed inset-0 z-[1]' /> */}
      <TwinklingGrid className='twinklinggrid opacity-[1] brightness-[0.4] fixed inset-0 z-[1]' />
    </div >
  )
}

export default function Cart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartContent />
    </Suspense>
  );
}