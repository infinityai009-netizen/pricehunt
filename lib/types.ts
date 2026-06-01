export type Retailer =
  | 'amazon'
  | 'ebay'
  | 'argos'
  | 'currys'
  | 'johnlewis'
  | 'tesco'
  | 'asda'
  | 'sainsburys'
  | 'morrisons'
  | 'waitrose'
  | 'aldi'
  | 'lidl'
  | 'iceland'
  | 'ocado'
  | 'coop'
  | 'marksandspencer'
  | 'temu'
  | 'shein'
  | 'aliexpress'
  | 'wayfair'
  | 'ikea'
  | 'b&q'
  | 'walmart'
  | 'apple'
  | 'facebook'
  | 'ubereats'
  | 'deliveroo'
  | 'justeat'
  // Cars
  | 'autotrader'
  | 'motors'
  | 'gumtree'
  | 'carwow'
  | 'cinch'
  | 'heycar'
  | 'arnoldclark'
  // Insurance comparison
  | 'comparethemarket'
  | 'moneysupermarket'
  | 'gocompare'
  | 'confused'
  | 'admiral'
  | 'aviva'
  | 'directline'
  | 'churchill'
  // Broadband
  | 'sky'
  | 'bt'
  | 'virginmedia'
  | 'talktalk'
  | 'nowbroadband'
  | 'plusnet'
  | 'hyperoptic'
  // Mobile networks
  | 'ee'
  | 'vodafone'
  | 'three'
  | 'o2'
  | 'giffgaff'
  | 'tescomobile'
  | 'skymobile'
  | 'voxi'
  | 'smarty'
  | 'idmobile'
  | 'carphonewarehouse'
  // Discount stores
  | 'bm'
  | 'homebargains'
  | 'poundland'
  | 'wilko'
  // Clothing & shoes
  | 'zara'
  | 'hm'
  | 'office'
  | 'asos'
  | 'next'
  | 'primark'
  | 'jdsports'
  | 'schuh'
  | 'sportsdirect'
  | 'prettylittlething'
  | 'boohoo'
  | 'riverisland'
  | 'newlook'
  | 'clarks'
  | 'mango'
  | 'selfridges'
  | 'fatface'
  | 'uniqlo'
  // Discount fashion / homeware
  | 'tkmaxx'
  | 'homesense'
  // Watch retailers & brands
  | 'watchshop'
  | 'watchesofswitzerland'
  | 'goldsmiths'
  | 'beaverbrooks'
  | 'ernestjones'
  | 'hsamuel'
  | 'fossil'
  | 'tagheuer'
  | 'casioshop'
  // Premium / outdoor / branded clothing
  | 'tommyhilfiger'
  | 'hugoboss'
  | 'ralphlauren'
  | 'calvinklein'
  | 'boden'
  | 'joules'
  | 'whitestuff'
  | 'mountainwarehouse'
  | 'cotswoldoutdoor'
  | 'footasylum'
  | 'size'
  | 'flannels';

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
  | 'cameras'
  | 'food'
  | 'cars'
  | 'insurance'
  | 'broadband'
  | 'mobileplan';

export interface Product {
  id: string;            // unique per offer (retailer + product)
  productKey: string;    // shared across retailers for the same product
  title: string;
  description?: string;
  image: string;
  price: number;         // GBP — shelf / in-store / online price
  currency: 'GBP';
  retailer: Retailer;
  url: string;           // affiliate-wrapped URL
  rating?: number;       // 0..5
  reviews?: number;
  category: Category;
  inStock: boolean;
  source: 'ebay' | 'amazon' | 'awin' | 'mock';
  // Fulfilment details
  deliveryFee?: number;       // GBP delivery fee. 0 = free. undefined = no delivery.
  freeDeliveryOver?: number;  // GBP basket threshold for free delivery
  clickCollect?: boolean;     // available for click & collect
  inStoreOnly?: boolean;      // only available in physical store
  deliveryOnly?: boolean;     // online-only / delivery-only retailer
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
