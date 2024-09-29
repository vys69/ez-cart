import { GroceryItem, SharedData } from '../types/cart';

export const formatNumber = (num: number | null | undefined): string => {
  if (num == null) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const encodeData = (data: SharedData): string => {
  const itemsString = data.items.map(item => `${item.name}:${item.price}:${item.quantity}`).join(';');
  return itemsString;
};

export const decodeData = (encodedData: string): SharedData => {
  const parts = encodedData.split(';');
  const items: GroceryItem[] = parts.map(part => {
    const [name, price, quantity] = part.split(':');
    return {
      id: Date.now() + Math.random(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10)
    };
  });

  return { items };
};

export const calculateSubtotal = (items: GroceryItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};