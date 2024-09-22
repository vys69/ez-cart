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
import { ToastAction } from "@/components/ui/toast"
import LottieTrash from "@/components/LottieTrash"
import LottieArrow from "@/components/LottieArrow"
import ShinyGrid from "@/components/ui/ShinyGrid"
import TextTransition, { presets } from "react-text-transition";
import CartCard from "@/components/cart/CartCard";
import { useCart } from '@/app/cart/src/hooks/useCart';
import { formatNumber } from '@/app/cart/src/hooks/cartUtils';
import { Plus, Share2 } from "lucide-react"

function CartContent() {
  const router = useRouter()
  const { toast } = useToast()
  const {
    items,
    selectedCountry,
    selectedRegion,
    newItemName,
    newItemPrice,
    addItem,
    removeItem,
    updateItemQuantity,
    handleShare,
    clearCart,
    setNewItemName,
    setNewItemPrice,
    setSelectedCountry,
    setSelectedRegion,
  } = useCart();

  const [backModalOpen, setBackModalOpen] = useState(false)
  const [clearModalOpen, setClearModalOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const itemNameInputRef = useRef<HTMLInputElement>(null)
  const itemPriceInputRef = useRef<HTMLInputElement>(null)
  const [previousTotal, setPreviousTotal] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<"up" | "down">("down");
  const [transitionColor, setTransitionColor] = useState("text-white");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = selectedRegion?.taxRate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const handleItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 100) {
      setNewItemName(value);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,10}(\.\d*)?$/.test(value)) {
      setNewItemPrice(value);
    }
  };

  const handleItemNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemName.trim() !== '') {
      e.preventDefault()
      itemPriceInputRef.current?.focus()
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemPrice.trim() !== '') {
      e.preventDefault()
      handleSubmit(e)
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim() && newItemPrice.trim()) {
      const price = parseFloat(newItemPrice);
      if (!isNaN(price) && isFinite(price)) {
        addItem(newItemName, price);
        setNewItemName("");
        setNewItemPrice("");
        itemNameInputRef.current?.focus();
      } else {
        toast({
          variant: "destructive",
          title: "Input Error",
          description: "Please enter a valid price.",
        });
      }
    }
  };

  const handleBackToStep = () => {
    if (items.length > 0) {
      setBackModalOpen(true);
    } else {
      router.push('/onboarding');
    }
  };

  const handleClearList = () => {
    if (items.length > 0) {
      setClearModalOpen(true);
    }
  };

  const handleConfirmBack = () => {
    setBackModalOpen(false);
    router.push('/onboarding');
  };

  const handleConfirmClear = () => {
    clearCart();
    setClearModalOpen(false);
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }

    const newTotal = subtotal + taxAmount;
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
    }, 1000);

    return () => clearTimeout(timer);
  }, [items, subtotal, taxAmount, previousTotal]);

  return (
    <div className="min-h-screen bg-[#00000050] flex flex-col relative z-10">
      <Card className="bg-[#000000] flex-grow flex flex-col rounded-none overflow-auto border-none relative z-10">
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
          <ul ref={listRef} className="flex-grow overflow-y-auto space-y-4 pb-10 cursor-grab">
            {items.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                selectedCountry={selectedCountry}
                formatNumber={formatNumber}
                removeItem={removeItem}
                updateItemQuantity={updateItemQuantity}
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
            <div className="flex justify-between items-center">
              <span className="text-sm text-white">Subtotal:</span>
              {formatNumber(subtotal)} {selectedCountry?.code || ''}
            </div>
            {selectedRegion && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-white">Tax ({taxRate}%):</span>
                {formatNumber(taxAmount)} {selectedCountry?.code}
              </div>
            )}
            <div className="flex justify-between items-center mt-1">
              <span className="text-lg font-bold text-white">Total:</span>
              <TextTransition springConfig={presets.gentle} direction={transitionDirection} inline={true} className={`text-lg font-bold ${transitionColor}`}>
                {formatNumber(total)} {selectedCountry?.code || ''}
              </TextTransition>
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
              <Button type="submit" size="icon" className="h-12 w-12 bg-white text-black">
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
      <ShinyGrid className='shinygrid opacity-[1] fixed inset-0 z-[1]' />
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