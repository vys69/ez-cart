export interface GroceryItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface SharedData {
    items: GroceryItem[];
    countryCode: string | null;
    region: string | null;
  }
  
  export interface Country {
    code: string;
    name: string;
    regions: TaxRegion[];
  }
  
  export interface TaxRegion {
    name: string;
    rate: number;
  }