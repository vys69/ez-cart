export interface TaxRegion {
    name: string;
    taxRate: number;
    gst?: number;
    pst?: number;
    hst?: number;
  }
  
  export interface Country {
    name: string;
    code: string;
    regions: TaxRegion[];
  }
  
  export const countries: Country[] = [
    {
      name: "United States",
      code: "USD",
      regions: [
        { name: "None", taxRate: 0 },
        { name: "Alabama", taxRate: 4 },
        { name: "Alaska", taxRate: 0 },
        { name: "Arizona", taxRate: 5.6 },
        { name: "Arkansas", taxRate: 6.5 },
        { name: "California", taxRate: 7.25 },
        { name: "Colorado", taxRate: 2.9 },
        { name: "Connecticut", taxRate: 6.35 },
        { name: "Delaware", taxRate: 0 },
        { name: "District of Columbia", taxRate: 6 },
        { name: "Florida", taxRate: 6 },
        { name: "Georgia", taxRate: 4 },
        { name: "Hawaii", taxRate: 4 },
        { name: "Idaho", taxRate: 6 },
        { name: "Illinois", taxRate: 6.25 },
        { name: "Indiana", taxRate: 7 },
        { name: "Iowa", taxRate: 6 },
        { name: "Kansas", taxRate: 6.5 },
        { name: "Kentucky", taxRate: 6 },
        { name: "Louisiana", taxRate: 4.45 },
        { name: "Maine", taxRate: 5.5 },
        { name: "Maryland", taxRate: 6 },
        { name: "Massachusetts", taxRate: 6.25 },
        { name: "Michigan", taxRate: 6 },
        { name: "Minnesota", taxRate: 6.88 },
        { name: "Mississippi", taxRate: 7 },
        { name: "Missouri", taxRate: 4.23 },
        { name: "Montana", taxRate: 0 },
        { name: "Nebraska", taxRate: 5.5 },
        { name: "Nevada", taxRate: 6.85 },
        { name: "New Hampshire", taxRate: 0 },
        { name: "New Jersey", taxRate: 6.63 },
        { name: "New Mexico", taxRate: 5 },
        { name: "New York", taxRate: 4 },
        { name: "North Carolina", taxRate: 4.75 },
        { name: "North Dakota", taxRate: 5 },
        { name: "Ohio", taxRate: 5.75 },
        { name: "Oklahoma", taxRate: 4.5 },
        { name: "Oregon", taxRate: 0 },
        { name: "Pennsylvania", taxRate: 6 },
        { name: "Rhode Island", taxRate: 7 },
        { name: "South Carolina", taxRate: 6 },
        { name: "South Dakota", taxRate: 4.5 },
        { name: "Tennessee", taxRate: 7 },
        { name: "Texas", taxRate: 6.25 },
        { name: "Utah", taxRate: 6.1 },
        { name: "Vermont", taxRate: 6 },
        { name: "Virginia", taxRate: 5.3 },
        { name: "Washington", taxRate: 6.5 },
        { name: "West Virginia", taxRate: 6 },
        { name: "Wisconsin", taxRate: 5 },
        { name: "Wyoming", taxRate: 4 },
      ]
    },
    {
      name: "Canada",
      code: "CAD",
      regions: [
        { name: "None", gst: 0, pst: 0, hst: 0, taxRate: 0 },
        { name: "Alberta", gst: 5, pst: 0, hst: 0, taxRate: 5 },
        { name: "British Columbia", gst: 5, pst: 7, hst: 0, taxRate: 12 },
        { name: "Manitoba", gst: 5, pst: 7, hst: 0, taxRate: 12 },
        { name: "New Brunswick", gst: 0, pst: 0, hst: 15, taxRate: 15 },
        { name: "Newfoundland and Labrador", gst: 0, pst: 0, hst: 15, taxRate: 15 },
        { name: "Northwest Territories", gst: 5, pst: 0, hst: 0, taxRate: 5 },
        { name: "Nova Scotia", gst: 0, pst: 0, hst: 15, taxRate: 15 },
        { name: "Nunavut", gst: 5, pst: 0, hst: 0, taxRate: 5 },
        { name: "Ontario", gst: 0, pst: 0, hst: 13, taxRate: 13 },
        { name: "Prince Edward Island", gst: 0, pst: 0, hst: 15, taxRate: 15 },
        { name: "Quebec", gst: 5, pst: 9.975, hst: 0, taxRate: 14.975 },
        { name: "Saskatchewan", gst: 5, pst: 6, hst: 0, taxRate: 11 },
        { name: "Yukon", gst: 5, pst: 0, hst: 0, taxRate: 5 }
      ]
    },
    {
      name: "United Kingdom",
      code: "GBP",
      regions: [
        { name: "Standard", taxRate: 20 },
        { name: "Reduced Rate", taxRate: 5 },
        { name: "Zero Rate", taxRate: 0 }
      ]
    },
    {
      name: "Australia",
      code: "AUD",
      regions: [
        { name: "Goods and Services Tax", taxRate: 10 }
      ]
    },
    {
      name: "Japan",
      code: "JPY",
      regions: [
        { name: "Consumption Tax", taxRate: 10 }
      ]
    },
    {
      name: "Germany",
      code: "EUR",
      regions: [
        { name: "Standard", taxRate: 19 },
        { name: "Reduced", taxRate: 7 }
      ]
    }
  ];