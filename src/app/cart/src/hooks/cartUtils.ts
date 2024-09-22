import { GroceryItem, SharedData } from '../types/cart';

export const formatNumber = (num: number | null | undefined): string => {
  if (num == null) return '0.00';
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const encodeData = (data: SharedData): string => {
  const itemsString = data.items.map(item => `${item.name}:${item.price}:${item.quantity}`).join(';');
  const countryString = data.countryCode ? `C:${data.countryCode}` : '';
  const regionString = data.region ? `R:${data.region}` : '';
  return [itemsString, countryString, regionString].filter(Boolean).join(';');
};

export const decodeData = (encodedData: string): SharedData => {
  const parts = encodedData.split(';');
  const items: GroceryItem[] = [];
  let countryCode: string | null = null;
  let region: string | null = null;

  parts.forEach(part => {
    if (part.startsWith('C:')) {
      countryCode = part.slice(2);
    } else if (part.startsWith('R:')) {
      region = part.slice(2);
    } else {
      const [name, price, quantity] = part.split(':');
      items.push({
        id: Date.now() + Math.random(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10)
      });
    }
  });

  return { items, countryCode, region };
};

export const calculateSubtotal = (items: GroceryItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (subtotal: number, taxAmount: number): number => {
  return subtotal + taxAmount;
};

export const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};