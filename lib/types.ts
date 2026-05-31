export type Retailer =
  | 'amazon'
  | 'ebay'
  | 'argos'
  | 'currys'
  | 'johnlewis'
  | 'tesco'
  | 'asda'
  | 'sainsburys'
  | 'temu'
  | 'shein'
  | 'aliexpress'
  | 'wayfair'
  | 'ikea'
  | 'b&q'
  | 'walmart';

export type Category =
  | 'electronics'
  | 'fashion'
  | 'beauty'
  | 'grocery'
  | 'home'
  | 'furniture'
  | 'gaming'
  | 'sports'
  | 'toys'
  | 'outdoor'
  | 'pet'
  | 'cameras';

export interface Product {
  id: string;            // unique per offer (retailer + product)
  productKey: string;    // shared across retailers for the same product
  title: string;
  description?: string;
  image: string;
  price: number;         // GBP
  currency: 'GBP';
  retailer: Retailer;
  url: string;           // affiliate-wrapped URL
  rating?: number;       // 0..5
  reviews?: number;
  category: Category;
  inStock: boolean;
  source: 'ebay' | 'amazon' | 'awin' | 'mock';
}

export interface SearchParams {
  q?: string;
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  retailer?: Retailer;
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'relevance';
  limit?: number;
}
