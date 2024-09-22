import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import SwipeableCard from "@/components/ui/SwipeableCard";

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartCardProps {
  item: GroceryItem;
  selectedCountry: { code: string } | null;
  formatNumber: (num: number) => string;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  item,
  selectedCountry,
  formatNumber,
  removeItem,
  updateItemQuantity,
}) => {
  return (
    <SwipeableCard onDelete={() => removeItem(item.id)}>
      <li
        className={`
          relative overflow-hidden
          flex flex-col
          bg-gradient-custom
          p-4 rounded-lg shadow fade-in
          transition-all duration-300 ease-in-out
          cursor-grab active:cursor-grabbing
          staggered-animation
        `}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xl break-words text-white select-none">{item.name}</span>
            <span className="text-md font-regular text-white select-none">
              {formatNumber(item.price)} {selectedCountry?.code || ''}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="link"
              size="icon"
              onClick={() => {
                if (item.quantity === 1) {
                  removeItem(item.id);
                } else {
                  updateItemQuantity(item.id, item.quantity - 1);
                }
              }}
              className="h-8 w-8 rounded-full text-white hover:text-red-300"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                  updateItemQuantity(item.id, newQuantity);
                }
              }}
              className="w-12 h-8 text-center text-white bg-transparent border-0 border-gray-600 rounded no-spinner"
              min="1"
            />
            <Button
              variant="link"
              size="icon"
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              className="h-8 w-8 rounded-full text-white hover:text-green-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </li>
    </SwipeableCard>
  );
};

export default CartCard;