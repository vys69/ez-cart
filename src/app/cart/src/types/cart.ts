export interface GroceryItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface SharedData {
    items: GroceryItem[];
  }