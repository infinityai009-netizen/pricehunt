import type { Product, Retailer, Category, SearchParams } from '../types';
import { productKey } from '../productKey';

// ----------------------------------------------------------------------------
// Mock catalog generator
// Builds hundreds of realistic UK products across many retailers so the site
// looks populated while you wait for affiliate APIs to be approved.
// ----------------------------------------------------------------------------

interface Seed {
  title: string;
  category: Category;
  basePrice: number;
  image: string;
}

const SEEDS_RAW: any[] = [
  // Phones
  { title: 'Apple iPhone 11 64GB', category: 'electronics', basePrice: 329, image: 'https://images.unsplash.com/photo-1574755393849-623942496936?w=400' },
  { title: 'Apple iPhone 12 128GB', category: 'electronics', basePrice: 449, image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400' },
  { title: 'Apple iPhone 13 128GB', category: 'electronics', basePrice: 549, image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400' },
  { title: 'Apple iPhone 14 128GB', category: 'electronics', basePrice: 649, image: 'https://images.unsplash.com/photo-1663781292073-079e6b3c5b71?w=400' },
  { title: 'Apple iPhone 14 Pro 256GB', category: 'electronics', basePrice: 949, image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400' },
  { title: 'Apple iPhone 15 128GB', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1696446702183-be9605d2e7fe?w=400' },
  { title: 'Apple iPhone 15 Pro Max 256GB', category: 'electronics', basePrice: 1199, image: 'https://images.unsplash.com/photo-1696446702183-be9605d2e7fe?w=400' },
  { title: 'Apple iPhone SE 2022 64GB', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Samsung Galaxy S24 256GB', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
  { title: 'Samsung Galaxy S23 Ultra', category: 'electronics', basePrice: 899, image: 'https://images.unsplash.com/photo-1675953935267-e039f13d4b91?w=400' },
  { title: 'Samsung Galaxy A54 5G', category: 'electronics', basePrice: 329, image: 'https://images.unsplash.com/photo-1610792516775-01de03eae630?w=400' },
  { title: 'Google Pixel 8 128GB', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { title: 'Google Pixel 8 Pro', category: 'electronics', basePrice: 899, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { title: 'OnePlus 12 256GB', category: 'electronics', basePrice: 749, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Xiaomi Redmi Note 13', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },

  // Laptops / Tablets
  { title: 'Apple MacBook Air M3 13"', category: 'electronics', basePrice: 1099, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { title: 'Apple MacBook Pro 14" M3', category: 'electronics', basePrice: 1699, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
  { title: 'Dell XPS 13 Plus', category: 'electronics', basePrice: 1299, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400' },
  { title: 'HP Pavilion 15 Laptop', category: 'electronics', basePrice: 549, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
  { title: 'Lenovo ThinkPad X1 Carbon', category: 'electronics', basePrice: 1499, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400' },
  { title: 'Apple iPad Air 11" 2024', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400' },
  { title: 'Apple iPad Pro 12.9" M2', category: 'electronics', basePrice: 1249, image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400' },
  { title: 'Samsung Galaxy Tab S9', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400' },

  // Gaming
  { title: 'Sony PlayStation 5 Slim', category: 'gaming', basePrice: 479, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400' },
  { title: 'PlayStation 5 Pro 2TB', category: 'gaming', basePrice: 699, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400' },
  { title: 'Xbox Series X 1TB', category: 'gaming', basePrice: 479, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400' },
  { title: 'Xbox Series S 512GB', category: 'gaming', basePrice: 249, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400' },
  { title: 'Nintendo Switch OLED', category: 'gaming', basePrice: 309, image: 'https://images.unsplash.com/photo-1612801799932-2d61e9b97c5d?w=400' },
  { title: 'Steam Deck OLED 512GB', category: 'gaming', basePrice: 569, image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=400' },
  { title: 'Meta Quest 3 128GB', category: 'gaming', basePrice: 479, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400' },
  { title: 'Razer DeathAdder V3 Mouse', category: 'gaming', basePrice: 69, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400' },
  { title: 'Logitech G Pro X Headset', category: 'gaming', basePrice: 119, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },

  // Audio / TVs
  { title: 'Sony WH-1000XM5 Headphones', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Bose QuietComfort Ultra', category: 'electronics', basePrice: 449, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Apple AirPods Pro 2', category: 'electronics', basePrice: 229, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400' },
  { title: 'Apple AirPods Max', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400' },
  { title: 'Samsung 55" QLED 4K TV', category: 'electronics', basePrice: 699, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'LG OLED C3 65" TV', category: 'electronics', basePrice: 1799, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
  { title: 'Sony Bravia XR 55" OLED', category: 'electronics', basePrice: 1399, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },

  // ─── TVs (more brands & sizes) ──────────────────────────────────────────────
  { title: 'Samsung 32" HD Smart TV', category: 'electronics', basePrice: 179, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Samsung 43" Crystal UHD 4K Smart TV', category: 'electronics', basePrice: 329, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Samsung 50" Crystal UHD 4K Smart TV', category: 'electronics', basePrice: 399, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Samsung 65" QLED 4K Smart TV', category: 'electronics', basePrice: 999, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Samsung 75" Neo QLED 4K TV', category: 'electronics', basePrice: 1599, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Samsung 85" Crystal UHD 4K TV', category: 'electronics', basePrice: 1499, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'LG 32" HD Ready Smart TV', category: 'electronics', basePrice: 179, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
  { title: 'LG 43" 4K UHD Smart TV', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
  { title: 'LG 55" OLED B3 4K TV', category: 'electronics', basePrice: 999, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
  { title: 'LG 65" OLED C3 4K TV', category: 'electronics', basePrice: 1799, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
  { title: 'LG 77" OLED Evo G3 4K TV', category: 'electronics', basePrice: 3499, image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400' },
  { title: 'Sony Bravia 43" 4K Smart TV', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Sony Bravia 50" 4K Google TV', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Sony Bravia 65" XR OLED', category: 'electronics', basePrice: 1899, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Sony Bravia 75" XR Mini-LED', category: 'electronics', basePrice: 2499, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Hisense 32" HD Smart TV', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Hisense 43" 4K UHD Smart TV', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Hisense 55" U7K Mini-LED 4K', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Hisense 65" U7K Mini-LED 4K', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'TCL 43" 4K HDR Smart TV', category: 'electronics', basePrice: 279, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'TCL 55" QLED 4K Smart TV', category: 'electronics', basePrice: 449, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'TCL 65" Mini-LED 4K TV', category: 'electronics', basePrice: 699, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Panasonic 55" OLED 4K TV', category: 'electronics', basePrice: 1199, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Panasonic 65" OLED MZ980', category: 'electronics', basePrice: 1599, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Toshiba 43" 4K Smart Fire TV', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Toshiba 55" UF3D 4K Fire TV', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Amazon Fire TV 4-Series 43"', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Amazon Fire TV Omni QLED 55"', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'Bush 24" HD Smart TV', category: 'electronics', basePrice: 119, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
  { title: 'JVC Fire TV Edition 50" 4K', category: 'electronics', basePrice: 279, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },

  // ─── Smartwatches & digital watches ────────────────────────────────────────
  { title: 'Apple Watch Series 9 GPS 41mm', category: 'electronics', basePrice: 399, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Apple Watch Series 9 GPS 45mm', category: 'electronics', basePrice: 429, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Apple Watch Series 9 GPS + Cellular 45mm', category: 'electronics', basePrice: 529, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Apple Watch SE 2nd Gen 40mm', category: 'electronics', basePrice: 259, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Apple Watch Ultra 2', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Samsung Galaxy Watch 6 40mm', category: 'electronics', basePrice: 289, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { title: 'Samsung Galaxy Watch 6 44mm', category: 'electronics', basePrice: 319, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { title: 'Samsung Galaxy Watch 6 Classic 47mm', category: 'electronics', basePrice: 399, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { title: 'Samsung Galaxy Watch Active 2', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { title: 'Google Pixel Watch 2', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
  { title: 'Fitbit Versa 4', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Fitbit Sense 2', category: 'electronics', basePrice: 269, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Fitbit Charge 6', category: 'electronics', basePrice: 139, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Fitbit Inspire 3', category: 'electronics', basePrice: 84, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Garmin Forerunner 265', category: 'electronics', basePrice: 429, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Garmin Forerunner 165', category: 'electronics', basePrice: 269, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Garmin Forerunner 965', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Garmin Venu 3', category: 'electronics', basePrice: 449, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Garmin Fenix 7 Pro', category: 'electronics', basePrice: 729, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Garmin Instinct 2', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Casio G-Shock GA-2100', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
  { title: 'Casio G-Shock GBD-200', category: 'electronics', basePrice: 129, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
  { title: 'Casio F-91W Classic Digital Watch', category: 'electronics', basePrice: 13, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
  { title: 'Casio Vintage A158WA', category: 'electronics', basePrice: 25, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
  { title: 'Timex Ironman Classic 30', category: 'electronics', basePrice: 39, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
  { title: 'Amazfit GTR 4', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Amazfit GTS 4 Mini', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Amazfit Bip 5', category: 'electronics', basePrice: 79, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Huawei Watch GT 4 46mm', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Huawei Band 9', category: 'electronics', basePrice: 49, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Xiaomi Smart Band 8', category: 'electronics', basePrice: 35, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Xiaomi Watch 2 Pro', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'TicWatch Pro 5 Enduro', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Withings ScanWatch 2', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'OnePlus Watch 2', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },

  // ─── Branded watches (Fossil, Casio, Tissot, Seiko, Tag, Daniel Wellington…)
  { title: 'Fossil Gen 6 Smartwatch 44mm Black', category: 'electronics', basePrice: 279, image: '' },
  { title: 'Fossil Gen 6 Hybrid Smartwatch', category: 'electronics', basePrice: 199, image: '' },
  { title: 'Fossil Townsman Chronograph Brown Leather Watch', category: 'electronics', basePrice: 159, image: '' },
  { title: 'Fossil Q Explorist HR Gold-Tone Watch', category: 'electronics', basePrice: 219, image: '' },
  { title: 'Fossil Neutra Chronograph Black Watch', category: 'electronics', basePrice: 129, image: '' },
  { title: 'Fossil Carlie Mini Rose Gold Watch', category: 'electronics', basePrice: 119, image: '' },
  { title: 'Fossil Jacqueline Three-Hand Watch', category: 'electronics', basePrice: 95, image: '' },
  { title: 'Casio G-Shock GA-2100-1AER', category: 'electronics', basePrice: 99, image: '' },
  { title: 'Casio G-Shock GBD-200-1ER Bluetooth', category: 'electronics', basePrice: 129, image: '' },
  { title: 'Casio G-Shock Mudmaster GG-B100', category: 'electronics', basePrice: 269, image: '' },
  { title: 'Casio Edifice EFR-526L Chronograph', category: 'electronics', basePrice: 119, image: '' },
  { title: 'Casio Pro Trek PRG-330 Tough Solar', category: 'electronics', basePrice: 199, image: '' },
  { title: 'Casio F-91W Classic Digital Watch', category: 'electronics', basePrice: 13, image: '' },
  { title: 'Casio A158WA Vintage Stainless Steel', category: 'electronics', basePrice: 25, image: '' },
  { title: 'Casio Vintage A168WA Gold Watch', category: 'electronics', basePrice: 45, image: '' },
  { title: 'Tissot PRX Powermatic 80 Watch', category: 'electronics', basePrice: 575, image: '' },
  { title: 'Tissot Le Locle Powermatic 80 Watch', category: 'electronics', basePrice: 475, image: '' },
  { title: 'Tissot Seastar 1000 Powermatic 80', category: 'electronics', basePrice: 725, image: '' },
  { title: 'Tissot Gentleman Powermatic 80 Silicium', category: 'electronics', basePrice: 685, image: '' },
  { title: 'Seiko 5 Sports SRPD55K1 Automatic', category: 'electronics', basePrice: 249, image: '' },
  { title: 'Seiko Presage Cocktail Time SRPB41J1', category: 'electronics', basePrice: 419, image: '' },
  { title: 'Seiko Prospex Diver SPB143J1', category: 'electronics', basePrice: 1099, image: '' },
  { title: 'Seiko Solar SUP858P1 Two-Tone', category: 'electronics', basePrice: 199, image: '' },
  { title: 'Citizen Eco-Drive Bullhead Chronograph', category: 'electronics', basePrice: 379, image: '' },
  { title: 'Citizen Promaster Diver BN0150', category: 'electronics', basePrice: 295, image: '' },
  { title: 'Citizen Tsuyosa Automatic NJ0151', category: 'electronics', basePrice: 320, image: '' },
  { title: 'TAG Heuer Aquaracer Professional 300', category: 'electronics', basePrice: 2900, image: '' },
  { title: 'TAG Heuer Carrera Chronograph Calibre 16', category: 'electronics', basePrice: 3450, image: '' },
  { title: 'TAG Heuer Formula 1 Chronograph 43mm', category: 'electronics', basePrice: 1550, image: '' },
  { title: 'Hamilton Khaki Field Mechanical 38mm', category: 'electronics', basePrice: 525, image: '' },
  { title: 'Hamilton Khaki Field Auto 42mm', category: 'electronics', basePrice: 625, image: '' },
  { title: 'Tudor Black Bay 58 Burgundy', category: 'electronics', basePrice: 3380, image: '' },
  { title: 'Tudor Black Bay 41 Steel', category: 'electronics', basePrice: 3370, image: '' },
  { title: 'Omega Seamaster Diver 300M Co-Axial', category: 'electronics', basePrice: 5300, image: '' },
  { title: 'Omega Speedmaster Professional Moonwatch', category: 'electronics', basePrice: 6600, image: '' },
  { title: 'Rolex Submariner Date 41mm Black', category: 'electronics', basePrice: 9100, image: '' },
  { title: 'Rolex Oyster Perpetual 41 Silver Dial', category: 'electronics', basePrice: 6300, image: '' },
  { title: 'Rolex Datejust 41 Two-Tone Wimbledon', category: 'electronics', basePrice: 12500, image: '' },
  { title: 'Daniel Wellington Classic Petite Sterling', category: 'electronics', basePrice: 159, image: '' },
  { title: 'Daniel Wellington Iconic Link Watch', category: 'electronics', basePrice: 199, image: '' },
  { title: 'Daniel Wellington Petite Melrose Rose Gold', category: 'electronics', basePrice: 149, image: '' },
  { title: 'Olivia Burton Floral Bee Mesh Watch', category: 'electronics', basePrice: 89, image: '' },
  { title: 'Olivia Burton 3D Bee Mesh Rose Gold', category: 'electronics', basePrice: 99, image: '' },
  { title: 'Cluse Minuit Rose Gold White Watch', category: 'electronics', basePrice: 89, image: '' },
  { title: 'Cluse Triomphe Mesh Gold Watch', category: 'electronics', basePrice: 109, image: '' },
  { title: 'Skagen Holst Stainless Steel Black Watch', category: 'electronics', basePrice: 145, image: '' },
  { title: 'Skagen Aaren Kulor Black Resin Watch', category: 'electronics', basePrice: 89, image: '' },
  { title: 'Michael Kors Bradshaw Chronograph Rose Gold', category: 'electronics', basePrice: 249, image: '' },
  { title: 'Michael Kors Lexington Three-Hand Watch', category: 'electronics', basePrice: 219, image: '' },
  { title: 'Armani Exchange Hampton Black Leather', category: 'electronics', basePrice: 159, image: '' },
  { title: 'Hugo Boss Champion Chronograph Watch', category: 'electronics', basePrice: 299, image: '' },
  { title: 'Hugo Boss Centre Court Chronograph', category: 'electronics', basePrice: 229, image: '' },
  { title: 'Tommy Hilfiger Decker Multi-Function', category: 'electronics', basePrice: 159, image: '' },
  { title: 'Tommy Hilfiger Theo Black Silicon Strap', category: 'electronics', basePrice: 99, image: '' },
  { title: 'Calvin Klein Minimal Round Mesh Watch', category: 'electronics', basePrice: 139, image: '' },
  { title: 'Sekonda Classic Day-Date Stainless Steel', category: 'electronics', basePrice: 49, image: '' },
  { title: 'Timex Marlin Hand-Wound 34mm', category: 'electronics', basePrice: 199, image: '' },
  { title: 'Timex Weekender 38mm Classic Watch', category: 'electronics', basePrice: 79, image: '' },
  { title: 'Bulova Lunar Pilot Chronograph Watch', category: 'electronics', basePrice: 595, image: '' },
  { title: 'Orient Bambino Version II Automatic', category: 'electronics', basePrice: 175, image: '' },
  { title: 'Swatch Big Bold White Bioceramic', category: 'electronics', basePrice: 105, image: '' },
  { title: 'Swatch x Omega MoonSwatch Mission to Moon', category: 'electronics', basePrice: 250, image: '' },

  // ─── Headphones — Over-ear (wireless) ──────────────────────────────────────
  { title: 'Sony WH-1000XM5 Wireless Headphones', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Sony WH-1000XM4 Wireless Headphones', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Sony WH-CH720N Noise Cancelling', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Sony WH-CH520 Wireless', category: 'electronics', basePrice: 49, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Bose QuietComfort Ultra Headphones', category: 'electronics', basePrice: 449, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Bose QuietComfort 45 Headphones', category: 'electronics', basePrice: 279, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Bose 700 Noise Cancelling Headphones', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Apple AirPods Max', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400' },
  { title: 'Sennheiser Momentum 4 Wireless', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Sennheiser Accentum Wireless', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Sennheiser HD 660S2 Open-Back', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Bowers & Wilkins PX7 S2e', category: 'electronics', basePrice: 379, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Bowers & Wilkins Px8', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Beats Studio Pro Wireless', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Beats Solo 4 On-Ear', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'JBL Live 770NC Wireless', category: 'electronics', basePrice: 169, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'JBL Tune 770NC Wireless', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'JBL Tune 510BT On-Ear Wireless', category: 'electronics', basePrice: 39, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Marshall Major V On-Ear', category: 'electronics', basePrice: 129, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Marshall Monitor III A.N.C.', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Skullcandy Crusher Evo Wireless', category: 'electronics', basePrice: 129, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Anker Soundcore Space Q45', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Anker Soundcore Life Q30', category: 'electronics', basePrice: 65, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Anker Soundcore Q20i Budget Wireless', category: 'electronics', basePrice: 35, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Jabra Elite 85h Wireless', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400' },
  { title: 'Audio-Technica ATH-M50xBT2', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
  { title: 'Audio-Technica ATH-M40x Studio Wired', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },

  // ─── Earbuds / in-ear (wireless) ───────────────────────────────────────────
  { title: 'Apple AirPods Pro 2 (USB-C)', category: 'electronics', basePrice: 229, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400' },
  { title: 'Apple AirPods 4', category: 'electronics', basePrice: 129, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400' },
  { title: 'Apple AirPods 4 with ANC', category: 'electronics', basePrice: 179, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400' },
  { title: 'Apple AirPods 3rd Generation', category: 'electronics', basePrice: 169, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400' },
  { title: 'Sony WF-1000XM5 Earbuds', category: 'electronics', basePrice: 259, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Sony WF-C700N Earbuds', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Sony LinkBuds S', category: 'electronics', basePrice: 159, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Bose QuietComfort Earbuds II', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Bose Ultra Open Earbuds', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Bose Sport Earbuds', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Samsung Galaxy Buds3 Pro', category: 'electronics', basePrice: 219, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Samsung Galaxy Buds2 Pro', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Samsung Galaxy Buds FE', category: 'electronics', basePrice: 79, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Google Pixel Buds Pro 2', category: 'electronics', basePrice: 219, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Google Pixel Buds A-Series', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Nothing Ear (2024)', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Nothing Ear (stick)', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Beats Studio Buds +', category: 'electronics', basePrice: 169, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Beats Powerbeats Pro', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Beats Fit Pro Earbuds', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'JBL Tune Flex Earbuds', category: 'electronics', basePrice: 69, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'JBL Vibe Beam', category: 'electronics', basePrice: 39, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Jabra Elite 8 Active', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Jabra Elite 4 Earbuds', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Anker Soundcore Liberty 4 NC', category: 'electronics', basePrice: 79, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Anker Soundcore Liberty 4 Pro', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Huawei FreeBuds Pro 3', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'Xiaomi Redmi Buds 5 Pro', category: 'electronics', basePrice: 69, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },
  { title: 'OnePlus Buds 3', category: 'electronics', basePrice: 79, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400' },

  // ─── Gaming headsets ───────────────────────────────────────────────────────
  { title: 'SteelSeries Arctis Nova 7 Wireless', category: 'gaming', basePrice: 179, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'SteelSeries Arctis Nova Pro Wireless', category: 'gaming', basePrice: 329, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'HyperX Cloud III Wireless', category: 'gaming', basePrice: 149, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'HyperX Cloud II Gaming Headset', category: 'gaming', basePrice: 89, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Razer BlackShark V2 Pro', category: 'gaming', basePrice: 179, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Razer Kraken V3 Gaming Headset', category: 'gaming', basePrice: 89, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Razer Barracuda X', category: 'gaming', basePrice: 99, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Corsair HS80 RGB Wireless', category: 'gaming', basePrice: 149, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Corsair Virtuoso RGB SE', category: 'gaming', basePrice: 229, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Astro A50 X Wireless', category: 'gaming', basePrice: 379, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Turtle Beach Stealth 700 Gen 2', category: 'gaming', basePrice: 149, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Sony Pulse Elite PS5 Wireless', category: 'gaming', basePrice: 129, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },
  { title: 'Sony Pulse 3D Wireless Headset', category: 'gaming', basePrice: 89, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400' },

  // ─── More smartphones ──────────────────────────────────────────────────────
  { title: 'Apple iPhone 16 128GB', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1696446702183-be9605d2e7fe?w=400' },
  { title: 'Apple iPhone 16 Pro 256GB', category: 'electronics', basePrice: 1099, image: 'https://images.unsplash.com/photo-1696446702183-be9605d2e7fe?w=400' },
  { title: 'Apple iPhone 16 Pro Max 256GB', category: 'electronics', basePrice: 1199, image: 'https://images.unsplash.com/photo-1696446702183-be9605d2e7fe?w=400' },
  { title: 'Apple iPhone 16e 128GB', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1696446702183-be9605d2e7fe?w=400' },
  { title: 'Samsung Galaxy S25 Ultra', category: 'electronics', basePrice: 1249, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
  { title: 'Samsung Galaxy Z Flip 6', category: 'electronics', basePrice: 1049, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
  { title: 'Samsung Galaxy Z Fold 6', category: 'electronics', basePrice: 1799, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
  { title: 'Samsung Galaxy A35 5G', category: 'electronics', basePrice: 349, image: 'https://images.unsplash.com/photo-1610792516775-01de03eae630?w=400' },
  { title: 'Google Pixel 9 Pro', category: 'electronics', basePrice: 999, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { title: 'Google Pixel 9', category: 'electronics', basePrice: 799, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { title: 'Google Pixel 8a', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { title: 'Nothing Phone (2a) Plus', category: 'electronics', basePrice: 399, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Nothing Phone (3)', category: 'electronics', basePrice: 699, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Motorola Moto G84 5G', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Motorola Edge 50 Pro', category: 'electronics', basePrice: 599, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'OPPO Find X8 Pro', category: 'electronics', basePrice: 1049, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'OnePlus 13', category: 'electronics', basePrice: 899, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'OnePlus Nord 4', category: 'electronics', basePrice: 429, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Honor Magic 6 Pro', category: 'electronics', basePrice: 1099, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Xiaomi 14T Pro', category: 'electronics', basePrice: 699, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Xiaomi Redmi Note 14 Pro', category: 'electronics', basePrice: 329, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400' },
  { title: 'Nokia G42 5G', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { title: 'Doro 8210 4G Easy Smartphone', category: 'electronics', basePrice: 129, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },

  // ─── Smart home / speakers / streaming ─────────────────────────────────────
  { title: 'Amazon Echo Dot 5th Gen', category: 'electronics', basePrice: 55, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Amazon Echo Show 8', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Amazon Echo Show 15', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Amazon Echo Studio', category: 'electronics', basePrice: 219, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Apple HomePod (2nd Gen)', category: 'electronics', basePrice: 299, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Apple HomePod mini', category: 'electronics', basePrice: 99, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Google Nest Mini', category: 'electronics', basePrice: 49, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Google Nest Audio', category: 'electronics', basePrice: 89, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Google Nest Hub (2nd Gen)', category: 'electronics', basePrice: 89, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Sonos One SL', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Sonos Era 100', category: 'electronics', basePrice: 249, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Sonos Era 300', category: 'electronics', basePrice: 449, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Sonos Beam (Gen 2) Soundbar', category: 'electronics', basePrice: 499, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'Sonos Arc Premium Soundbar', category: 'electronics', basePrice: 899, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400' },
  { title: 'JBL Charge 5 Portable Speaker', category: 'electronics', basePrice: 159, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
  { title: 'JBL Flip 6 Portable Speaker', category: 'electronics', basePrice: 119, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
  { title: 'Bose SoundLink Flex', category: 'electronics', basePrice: 149, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
  { title: 'Anker Soundcore Boom 2', category: 'electronics', basePrice: 79, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400' },
  { title: 'Amazon Fire TV Stick 4K Max', category: 'electronics', basePrice: 69, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Amazon Fire TV Stick Lite', category: 'electronics', basePrice: 35, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Google Chromecast with Google TV 4K', category: 'electronics', basePrice: 59, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Roku Streaming Stick 4K', category: 'electronics', basePrice: 49, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Apple TV 4K (3rd Gen)', category: 'electronics', basePrice: 169, image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
  { title: 'Ring Video Doorbell Plus', category: 'electronics', basePrice: 159, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'Ring Indoor Cam 2nd Gen', category: 'electronics', basePrice: 49, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'Philips Hue White & Colour Starter Kit', category: 'electronics', basePrice: 159, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'TP-Link Tapo Smart Plug 4-Pack', category: 'electronics', basePrice: 25, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'Eufy Security Cam 2C 2-pack', category: 'electronics', basePrice: 199, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'Tile Mate Bluetooth Tracker', category: 'electronics', basePrice: 25, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'Apple AirTag 4-pack', category: 'electronics', basePrice: 119, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
  { title: 'Samsung SmartTag 2', category: 'electronics', basePrice: 39, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },

  // ─── Phone cases & screen protectors ───────────────────────────────────────
  { title: 'Apple iPhone 15 Pro Silicone Case', category: 'electronics', basePrice: 55, image: 'https://loremflickr.com/400/400/iphone,case,silicone' },
  { title: 'Apple iPhone 15 Pro Clear Case with MagSafe', category: 'electronics', basePrice: 55, image: 'https://loremflickr.com/400/400/iphone,case,clear' },
  { title: 'Apple iPhone 15 Pro Leather Case', category: 'electronics', basePrice: 69, image: 'https://loremflickr.com/400/400/iphone,case,leather' },
  { title: 'Apple iPhone 16 Pro Silicone Case', category: 'electronics', basePrice: 55, image: 'https://loremflickr.com/400/400/iphone16,case,silicone' },
  { title: 'Apple iPhone 16 Pro Clear Case with MagSafe', category: 'electronics', basePrice: 55, image: 'https://loremflickr.com/400/400/iphone16,case,clear' },
  { title: 'Spigen Tough Armor iPhone 15 Pro Case', category: 'electronics', basePrice: 25, image: 'https://loremflickr.com/400/400/spigen,case,armor' },
  { title: 'Spigen Ultra Hybrid iPhone 15 Case', category: 'electronics', basePrice: 18, image: 'https://loremflickr.com/400/400/spigen,case,hybrid' },
  { title: 'OtterBox Defender iPhone 15 Pro', category: 'electronics', basePrice: 60, image: 'https://loremflickr.com/400/400/otterbox,case,rugged' },
  { title: 'OtterBox Symmetry iPhone 16 Pro', category: 'electronics', basePrice: 50, image: 'https://loremflickr.com/400/400/otterbox,case,symmetry' },
  { title: 'Tech21 Evo Clear iPhone 15 Pro', category: 'electronics', basePrice: 35, image: 'https://loremflickr.com/400/400/tech21,case,clear' },
  { title: 'Case-Mate Pelican Protector iPhone 15', category: 'electronics', basePrice: 30, image: 'https://loremflickr.com/400/400/casemate,case,rugged' },
  { title: 'Samsung Galaxy S24 Ultra Silicone Case', category: 'electronics', basePrice: 40, image: 'https://loremflickr.com/400/400/samsung,case,silicone' },
  { title: 'Samsung Galaxy S24 Clear Case', category: 'electronics', basePrice: 25, image: 'https://loremflickr.com/400/400/samsung,case,clear' },
  { title: 'Spigen Liquid Air Samsung S24', category: 'electronics', basePrice: 18, image: 'https://loremflickr.com/400/400/spigen,samsung,case' },
  { title: 'Universal Wallet Phone Case', category: 'electronics', basePrice: 12, image: 'https://loremflickr.com/400/400/wallet,phone,case' },
  { title: 'Tempered Glass Screen Protector iPhone 15 Pro (2-pack)', category: 'electronics', basePrice: 10, image: 'https://loremflickr.com/400/400/screen,protector,glass' },
  { title: 'Tempered Glass Screen Protector iPhone 16 Pro (2-pack)', category: 'electronics', basePrice: 10, image: 'https://loremflickr.com/400/400/screen,protector,iphone' },
  { title: 'Whitestone Dome Glass iPhone 15 Pro Max', category: 'electronics', basePrice: 35, image: 'https://loremflickr.com/400/400/whitestone,screen,glass' },
  { title: 'Spigen GlasTR Samsung S24 Ultra Screen Protector', category: 'electronics', basePrice: 12, image: 'https://loremflickr.com/400/400/screen,protector,samsung' },
  { title: 'Apple AirPods Pro 2 Silicone Case', category: 'electronics', basePrice: 35, image: 'https://loremflickr.com/400/400/airpods,case,silicone' },

  // ─── Chargers & power adapters ─────────────────────────────────────────────
  { title: 'Apple 20W USB-C Power Adapter', category: 'electronics', basePrice: 19, image: 'https://loremflickr.com/400/400/apple,charger,usbc' },
  { title: 'Apple 30W USB-C Power Adapter', category: 'electronics', basePrice: 39, image: 'https://loremflickr.com/400/400/apple,charger,30w' },
  { title: 'Apple 35W Dual USB-C Port Compact Adapter', category: 'electronics', basePrice: 55, image: 'https://loremflickr.com/400/400/apple,dual,charger' },
  { title: 'Apple 67W USB-C Power Adapter', category: 'electronics', basePrice: 65, image: 'https://loremflickr.com/400/400/apple,charger,laptop' },
  { title: 'Apple 96W USB-C Power Adapter', category: 'electronics', basePrice: 79, image: 'https://loremflickr.com/400/400/apple,charger,96w' },
  { title: 'Apple MagSafe Charger', category: 'electronics', basePrice: 39, image: 'https://loremflickr.com/400/400/magsafe,charger,apple' },
  { title: 'Apple MagSafe Duo Charger', category: 'electronics', basePrice: 119, image: 'https://loremflickr.com/400/400/magsafe,duo,charger' },
  { title: 'Anker 511 Nano Pro 20W USB-C Charger', category: 'electronics', basePrice: 15, image: 'https://loremflickr.com/400/400/anker,charger,nano' },
  { title: 'Anker 313 Charger 30W USB-C', category: 'electronics', basePrice: 25, image: 'https://loremflickr.com/400/400/anker,charger,gan' },
  { title: 'Anker 735 Nano II 65W GaN Charger', category: 'electronics', basePrice: 45, image: 'https://loremflickr.com/400/400/anker,gan,charger' },
  { title: 'Anker 747 GaNPrime 150W Charger', category: 'electronics', basePrice: 89, image: 'https://loremflickr.com/400/400/anker,150w,charger' },
  { title: 'Anker PowerPort III 3-Port 65W', category: 'electronics', basePrice: 45, image: 'https://loremflickr.com/400/400/anker,multiport,charger' },
  { title: 'Belkin Boost Charge Pro 25W USB-C', category: 'electronics', basePrice: 28, image: 'https://loremflickr.com/400/400/belkin,charger,boost' },
  { title: 'Belkin 3-in-1 Wireless Charger MagSafe', category: 'electronics', basePrice: 129, image: 'https://loremflickr.com/400/400/belkin,wireless,magsafe' },
  { title: 'Samsung 25W Super Fast Charger', category: 'electronics', basePrice: 19, image: 'https://loremflickr.com/400/400/samsung,charger,fast' },
  { title: 'Samsung 45W Super Fast Charger', category: 'electronics', basePrice: 35, image: 'https://loremflickr.com/400/400/samsung,charger,45w' },
  { title: 'Google 30W USB-C Power Charger', category: 'electronics', basePrice: 25, image: 'https://loremflickr.com/400/400/google,pixel,charger' },
  { title: 'UGREEN Nexode 100W GaN 4-Port Charger', category: 'electronics', basePrice: 65, image: 'https://loremflickr.com/400/400/ugreen,gan,charger' },
  { title: 'RAVPower 65W GaN Wall Charger', category: 'electronics', basePrice: 39, image: 'https://loremflickr.com/400/400/ravpower,charger,wall' },

  // ─── Wireless chargers & power banks ───────────────────────────────────────
  { title: 'Anker PowerWave Pad Qi Wireless Charger 10W', category: 'electronics', basePrice: 20, image: 'https://loremflickr.com/400/400/wireless,charger,pad' },
  { title: 'Belkin Wireless Charging Stand 15W', category: 'electronics', basePrice: 49, image: 'https://loremflickr.com/400/400/wireless,charger,stand' },
  { title: 'Anker PowerCore 10000 Portable Charger', category: 'electronics', basePrice: 25, image: 'https://loremflickr.com/400/400/power,bank,portable' },
  { title: 'Anker PowerCore 20000 PD Power Bank', category: 'electronics', basePrice: 55, image: 'https://loremflickr.com/400/400/anker,powerbank,large' },
  { title: 'Anker MagGo Magnetic Battery 5000mAh', category: 'electronics', basePrice: 45, image: 'https://loremflickr.com/400/400/anker,maggo,battery' },
  { title: 'INIU 20000mAh Portable Charger', category: 'electronics', basePrice: 32, image: 'https://loremflickr.com/400/400/iniu,powerbank,portable' },
  { title: 'Mophie Powerstation Mini', category: 'electronics', basePrice: 35, image: 'https://loremflickr.com/400/400/mophie,powerbank,portable' },
  { title: 'EcoFlow RIVER 2 Portable Power Station 256Wh', category: 'electronics', basePrice: 269, image: 'https://loremflickr.com/400/400/ecoflow,power,station' },

  // ─── Cables ────────────────────────────────────────────────────────────────
  { title: 'Apple USB-C to Lightning Cable 1m', category: 'electronics', basePrice: 19, image: 'https://loremflickr.com/400/400/lightning,cable,apple' },
  { title: 'Apple USB-C to Lightning Cable 2m', category: 'electronics', basePrice: 29, image: 'https://loremflickr.com/400/400/lightning,cable,2m' },
  { title: 'Apple USB-C Charge Cable 1m', category: 'electronics', basePrice: 19, image: 'https://loremflickr.com/400/400/usbc,cable,apple' },
  { title: 'Apple USB-C Charge Cable 2m', category: 'electronics', basePrice: 29, image: 'https://loremflickr.com/400/400/usbc,cable,long' },
  { title: 'Apple Thunderbolt 4 Pro Cable 1.8m', category: 'electronics', basePrice: 129, image: 'https://loremflickr.com/400/400/thunderbolt,cable,pro' },
  { title: 'Apple USB-C to MagSafe 3 Cable 2m', category: 'electronics', basePrice: 49, image: 'https://loremflickr.com/400/400/magsafe,cable,macbook' },
  { title: 'Anker PowerLine III USB-C to Lightning 0.9m', category: 'electronics', basePrice: 14, image: 'https://loremflickr.com/400/400/anker,powerline,cable' },
  { title: 'Anker PowerLine III USB-C to Lightning 1.8m', category: 'electronics', basePrice: 18, image: 'https://loremflickr.com/400/400/anker,lightning,cable' },
  { title: 'Anker 333 USB-C to USB-C Braided Cable 1.8m', category: 'electronics', basePrice: 12, image: 'https://loremflickr.com/400/400/anker,usbc,cable' },
  { title: 'Anker Bio Charging Cable USB-C 1.8m', category: 'electronics', basePrice: 13, image: 'https://loremflickr.com/400/400/anker,bio,cable' },
  { title: 'UGREEN USB-C to USB-C 100W Cable 1m', category: 'electronics', basePrice: 9, image: 'https://loremflickr.com/400/400/ugreen,usbc,cable' },
  { title: 'UGREEN USB-C to USB-C 100W Cable 2m', category: 'electronics', basePrice: 12, image: 'https://loremflickr.com/400/400/ugreen,usbc,2m' },
  { title: 'UGREEN HDMI 2.1 Ultra HD Cable 2m', category: 'electronics', basePrice: 14, image: 'https://loremflickr.com/400/400/hdmi,cable,8k' },
  { title: 'Amazon Basics HDMI 2.0 Cable 3m', category: 'electronics', basePrice: 8, image: 'https://loremflickr.com/400/400/hdmi,cable,3m' },
  { title: 'Cable Matters HDMI 2.1 Cable 4K 8K 1m', category: 'electronics', basePrice: 10, image: 'https://loremflickr.com/400/400/hdmi,cable,short' },
  { title: 'DisplayPort 1.4 Cable 2m', category: 'electronics', basePrice: 12, image: 'https://loremflickr.com/400/400/displayport,cable,monitor' },
  { title: 'CAT 8 Ethernet Cable 5m', category: 'electronics', basePrice: 11, image: 'https://loremflickr.com/400/400/ethernet,cable,cat8' },
  { title: 'CAT 6 Ethernet Cable 10m', category: 'electronics', basePrice: 9, image: 'https://loremflickr.com/400/400/ethernet,cable,long' },
  { title: '3.5mm AUX Audio Cable 1.5m', category: 'electronics', basePrice: 6, image: 'https://loremflickr.com/400/400/aux,cable,audio' },
  { title: 'USB-C to 3.5mm Audio Adapter', category: 'electronics', basePrice: 8, image: 'https://loremflickr.com/400/400/usbc,adapter,audio' },
  { title: 'Apple Lightning to 3.5mm Headphone Jack Adapter', category: 'electronics', basePrice: 9, image: 'https://loremflickr.com/400/400/lightning,adapter,jack' },
  { title: 'Anker USB-C Hub 7-in-1', category: 'electronics', basePrice: 35, image: 'https://loremflickr.com/400/400/usbc,hub,adapter' },
  { title: 'Anker 555 USB-C Hub 8-in-1 4K HDMI', category: 'electronics', basePrice: 65, image: 'https://loremflickr.com/400/400/usbc,hub,multiport' },
  { title: 'Apple USB-C Digital AV Multiport Adapter', category: 'electronics', basePrice: 75, image: 'https://loremflickr.com/400/400/apple,hub,multiport' },
  { title: 'Micro USB Cable 2m (2-pack)', category: 'electronics', basePrice: 7, image: 'https://loremflickr.com/400/400/micro,usb,cable' },
  { title: 'Anker Magnetic Cable Organiser', category: 'electronics', basePrice: 10, image: 'https://loremflickr.com/400/400/cable,organiser,magnetic' },

  // Beauty
  { title: 'Dyson Airwrap Complete', category: 'beauty', basePrice: 479, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400' },
  { title: 'Dyson Supersonic Hairdryer', category: 'beauty', basePrice: 329, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400' },
  { title: 'GHD Platinum+ Styler', category: 'beauty', basePrice: 229, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400' },
  { title: 'Charlotte Tilbury Magic Cream', category: 'beauty', basePrice: 69, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
  { title: 'The Ordinary Niacinamide 10%', category: 'beauty', basePrice: 6, image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400' },
  { title: 'Olaplex No.3 Hair Treatment', category: 'beauty', basePrice: 28, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400' },

  // Fashion
  { title: 'Nike Air Force 1 \'07', category: 'fashion', basePrice: 109, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { title: 'Adidas Samba OG', category: 'fashion', basePrice: 90, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
  { title: 'Levi\'s 501 Original Jeans', category: 'fashion', basePrice: 100, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
  { title: 'Uniqlo Heattech Crew Neck', category: 'fashion', basePrice: 14, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { title: 'North Face Nuptse Jacket', category: 'fashion', basePrice: 300, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
  { title: 'Ray-Ban Wayfarer Classic', category: 'fashion', basePrice: 139, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400' },

  // ─── Women's clothing (Shein/Temu/ASOS style) ──────────────────────────────
  { title: "Women's Floral Summer Maxi Dress", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/maxi,dress,floral' },
  { title: "Women's Bodycon Mini Dress", category: 'fashion', basePrice: 12, image: 'https://loremflickr.com/400/400/bodycon,dress,women' },
  { title: "Women's Satin Slip Midi Dress", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/satin,slip,dress' },
  { title: "Women's Cottagecore Floral Dress", category: 'fashion', basePrice: 26, image: 'https://loremflickr.com/400/400/cottage,dress,floral' },
  { title: "Women's Knit Bodycon Dress", category: 'fashion', basePrice: 16, image: 'https://loremflickr.com/400/400/knit,dress,women' },
  { title: "Women's Y2K Crop Top", category: 'fashion', basePrice: 8, image: 'https://loremflickr.com/400/400/y2k,crop,top' },
  { title: "Women's Square Neck Crop Top", category: 'fashion', basePrice: 10, image: 'https://loremflickr.com/400/400/crop,top,square' },
  { title: "Women's Ribbed Tank Top", category: 'fashion', basePrice: 7, image: 'https://loremflickr.com/400/400/tank,top,ribbed' },
  { title: "Women's Mesh Long Sleeve Top", category: 'fashion', basePrice: 11, image: 'https://loremflickr.com/400/400/mesh,top,women' },
  { title: "Women's Oversized Graphic Tee", category: 'fashion', basePrice: 12, image: 'https://loremflickr.com/400/400/graphic,tee,oversized' },
  { title: "Women's Bralette Lace Set", category: 'fashion', basePrice: 14, image: 'https://loremflickr.com/400/400/bralette,lace,set' },
  { title: "Women's High Waist Wide Leg Jeans", category: 'fashion', basePrice: 24, image: 'https://loremflickr.com/400/400/wide,leg,jeans' },
  { title: "Women's Skinny Mom Jeans", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/mom,jeans,women' },
  { title: "Women's Cargo Pants", category: 'fashion', basePrice: 19, image: 'https://loremflickr.com/400/400/cargo,pants,women' },
  { title: "Women's Pleated Mini Skirt", category: 'fashion', basePrice: 13, image: 'https://loremflickr.com/400/400/pleated,skirt,mini' },
  { title: "Women's Denim Mini Skirt", category: 'fashion', basePrice: 16, image: 'https://loremflickr.com/400/400/denim,skirt,mini' },
  { title: "Women's Tennis Skort", category: 'fashion', basePrice: 14, image: 'https://loremflickr.com/400/400/tennis,skort,women' },
  { title: "Women's Faux Leather Jacket", category: 'fashion', basePrice: 32, image: 'https://loremflickr.com/400/400/leather,jacket,women' },
  { title: "Women's Oversized Denim Jacket", category: 'fashion', basePrice: 26, image: 'https://loremflickr.com/400/400/denim,jacket,women' },
  { title: "Women's Cropped Puffer Jacket", category: 'fashion', basePrice: 35, image: 'https://loremflickr.com/400/400/puffer,jacket,cropped' },
  { title: "Women's Trench Coat Belted", category: 'fashion', basePrice: 45, image: 'https://loremflickr.com/400/400/trench,coat,beige' },
  { title: "Women's Oversized Blazer", category: 'fashion', basePrice: 28, image: 'https://loremflickr.com/400/400/blazer,women,oversized' },
  { title: "Women's Knit Cardigan", category: 'fashion', basePrice: 21, image: 'https://loremflickr.com/400/400/cardigan,knit,women' },
  { title: "Women's Hoodie Oversized", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/hoodie,oversized,women' },
  { title: "Women's Pyjama Set Satin", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/pyjama,satin,women' },
  { title: "Women's Lounge Set 2-piece", category: 'fashion', basePrice: 19, image: 'https://loremflickr.com/400/400/lounge,set,women' },
  { title: "Women's High Waist Yoga Leggings", category: 'fashion', basePrice: 14, image: 'https://loremflickr.com/400/400/yoga,leggings,women' },
  { title: "Women's Seamless Sports Bra", category: 'fashion', basePrice: 11, image: 'https://loremflickr.com/400/400/sports,bra,seamless' },
  { title: "Women's Activewear Two-piece Set", category: 'fashion', basePrice: 25, image: 'https://loremflickr.com/400/400/activewear,set,women' },
  { title: "Women's Triangle Bikini Set", category: 'fashion', basePrice: 16, image: 'https://loremflickr.com/400/400/bikini,triangle,set' },
  { title: "Women's One Piece Swimsuit", category: 'fashion', basePrice: 19, image: 'https://loremflickr.com/400/400/swimsuit,one,piece' },
  { title: "Women's Beach Cover Up Kaftan", category: 'fashion', basePrice: 14, image: 'https://loremflickr.com/400/400/kaftan,beach,coverup' },

  // ─── Men's clothing ────────────────────────────────────────────────────────
  { title: "Men's Oversized T-Shirt", category: 'fashion', basePrice: 12, image: 'https://loremflickr.com/400/400/men,tshirt,oversized' },
  { title: "Men's Slim Fit Polo Shirt", category: 'fashion', basePrice: 16, image: 'https://loremflickr.com/400/400/polo,shirt,men' },
  { title: "Men's Skinny Jeans Black", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/skinny,jeans,men' },
  { title: "Men's Slim Fit Chinos", category: 'fashion', basePrice: 25, image: 'https://loremflickr.com/400/400/chinos,men,slim' },
  { title: "Men's Cargo Trousers", category: 'fashion', basePrice: 24, image: 'https://loremflickr.com/400/400/cargo,trousers,men' },
  { title: "Men's Joggers Tech Fleece", category: 'fashion', basePrice: 35, image: 'https://loremflickr.com/400/400/joggers,tech,fleece' },
  { title: "Men's Hoodie Pullover", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/hoodie,men,pullover' },
  { title: "Men's Zip-up Hoodie", category: 'fashion', basePrice: 26, image: 'https://loremflickr.com/400/400/hoodie,zip,men' },
  { title: "Men's Puffer Jacket Black", category: 'fashion', basePrice: 55, image: 'https://loremflickr.com/400/400/puffer,jacket,men' },
  { title: "Men's Overshirt Flannel", category: 'fashion', basePrice: 28, image: 'https://loremflickr.com/400/400/flannel,shirt,men' },
  { title: "Men's Bomber Jacket", category: 'fashion', basePrice: 32, image: 'https://loremflickr.com/400/400/bomber,jacket,men' },
  { title: "Men's Crew Neck Sweatshirt", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/sweatshirt,crew,men' },
  { title: "Men's Boxer Briefs 5-pack", category: 'fashion', basePrice: 15, image: 'https://loremflickr.com/400/400/boxer,briefs,men' },
  { title: "Men's Cotton Socks 10-pack", category: 'fashion', basePrice: 8, image: 'https://loremflickr.com/400/400/cotton,socks,men' },
  { title: "Men's Slim Fit Suit 2-piece", category: 'fashion', basePrice: 89, image: 'https://loremflickr.com/400/400/suit,slim,men' },
  { title: "Men's Swim Shorts Quick Dry", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/swim,shorts,men' },

  // ─── Shoes ─────────────────────────────────────────────────────────────────
  { title: 'Nike Air Max 90 Trainers', category: 'fashion', basePrice: 130, image: 'https://loremflickr.com/400/400/nike,airmax,90' },
  { title: 'Nike Air Force 1 Low White', category: 'fashion', basePrice: 109, image: 'https://loremflickr.com/400/400/nike,airforce,white' },
  { title: 'Adidas Stan Smith White', category: 'fashion', basePrice: 85, image: 'https://loremflickr.com/400/400/stan,smith,adidas' },
  { title: 'Adidas Gazelle OG Trainers', category: 'fashion', basePrice: 90, image: 'https://loremflickr.com/400/400/adidas,gazelle,trainers' },
  { title: 'Adidas Spezial Trainers', category: 'fashion', basePrice: 80, image: 'https://loremflickr.com/400/400/adidas,spezial,trainers' },
  { title: 'Converse Chuck Taylor All Star High', category: 'fashion', basePrice: 65, image: 'https://loremflickr.com/400/400/converse,chuck,high' },
  { title: 'Vans Old Skool Trainers', category: 'fashion', basePrice: 70, image: 'https://loremflickr.com/400/400/vans,oldskool,trainers' },
  { title: 'New Balance 530 Trainers', category: 'fashion', basePrice: 100, image: 'https://loremflickr.com/400/400/newbalance,530,trainers' },
  { title: 'Dr. Martens 1460 8-Eye Boots', category: 'fashion', basePrice: 169, image: 'https://loremflickr.com/400/400/drmartens,1460,boots' },
  { title: 'UGG Classic Mini II Boots', category: 'fashion', basePrice: 145, image: 'https://loremflickr.com/400/400/ugg,classic,boots' },
  { title: "Women's Block Heel Court Shoes", category: 'fashion', basePrice: 26, image: 'https://loremflickr.com/400/400/heels,court,women' },
  { title: "Women's Strappy Heeled Sandals", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/heels,strappy,sandals' },
  { title: "Women's Knee High Boots", category: 'fashion', basePrice: 39, image: 'https://loremflickr.com/400/400/boots,knee,high' },
  { title: "Women's Chunky Loafers", category: 'fashion', basePrice: 28, image: 'https://loremflickr.com/400/400/loafers,chunky,women' },
  { title: "Women's Birkenstock-style Sandals", category: 'fashion', basePrice: 19, image: 'https://loremflickr.com/400/400/sandals,women,strap' },

  // ─── Bags & accessories ────────────────────────────────────────────────────
  { title: "Women's Crossbody Bag", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/crossbody,bag,women' },
  { title: "Women's Tote Bag Canvas", category: 'fashion', basePrice: 12, image: 'https://loremflickr.com/400/400/tote,bag,canvas' },
  { title: "Women's Mini Shoulder Bag", category: 'fashion', basePrice: 15, image: 'https://loremflickr.com/400/400/shoulder,bag,mini' },
  { title: "Women's Backpack Mini", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/backpack,mini,women' },
  { title: 'Eastpak Padded Pak\'r Backpack', category: 'fashion', basePrice: 49, image: 'https://loremflickr.com/400/400/eastpak,backpack' },
  { title: 'Jansport SuperBreak Backpack', category: 'fashion', basePrice: 35, image: 'https://loremflickr.com/400/400/jansport,backpack' },
  { title: "Card Wallet RFID Slim", category: 'fashion', basePrice: 13, image: 'https://loremflickr.com/400/400/wallet,rfid,slim' },
  { title: "Women's Bifold Wallet", category: 'fashion', basePrice: 11, image: 'https://loremflickr.com/400/400/bifold,wallet,women' },
  { title: 'Aviator Sunglasses UV400', category: 'fashion', basePrice: 12, image: 'https://loremflickr.com/400/400/aviator,sunglasses' },
  { title: 'Cat Eye Sunglasses Trendy', category: 'fashion', basePrice: 11, image: 'https://loremflickr.com/400/400/cateye,sunglasses,women' },
  { title: 'Oversized Square Sunglasses', category: 'fashion', basePrice: 13, image: 'https://loremflickr.com/400/400/square,sunglasses,oversized' },
  { title: "Statement Hoop Earrings Gold", category: 'fashion', basePrice: 9, image: 'https://loremflickr.com/400/400/hoop,earrings,gold' },
  { title: "Layered Necklace Set Gold", category: 'fashion', basePrice: 11, image: 'https://loremflickr.com/400/400/layered,necklace,gold' },
  { title: "Pearl Drop Earrings", category: 'fashion', basePrice: 8, image: 'https://loremflickr.com/400/400/pearl,earrings,drop' },
  { title: "Chunky Chain Bracelet", category: 'fashion', basePrice: 10, image: 'https://loremflickr.com/400/400/chain,bracelet,chunky' },
  { title: "Ring Set 12 Pack Stackable", category: 'fashion', basePrice: 9, image: 'https://loremflickr.com/400/400/rings,stackable,set' },
  { title: "Hair Clips Pearl 6 pack", category: 'fashion', basePrice: 6, image: 'https://loremflickr.com/400/400/hair,clips,pearl' },
  { title: "Claw Hair Clips Tortoiseshell", category: 'fashion', basePrice: 7, image: 'https://loremflickr.com/400/400/claw,clips,hair' },
  { title: "Wool Beanie Hat", category: 'fashion', basePrice: 9, image: 'https://loremflickr.com/400/400/beanie,wool,hat' },
  { title: "Baseball Cap Dad Hat", category: 'fashion', basePrice: 11, image: 'https://loremflickr.com/400/400/baseball,cap,dad' },
  { title: "Bucket Hat", category: 'fashion', basePrice: 10, image: 'https://loremflickr.com/400/400/bucket,hat,fashion' },
  { title: "Wide Brim Felt Hat", category: 'fashion', basePrice: 16, image: 'https://loremflickr.com/400/400/wide,brim,hat' },
  { title: "Leather Belt Men's", category: 'fashion', basePrice: 14, image: 'https://loremflickr.com/400/400/leather,belt,men' },
  { title: "Skinny Belt Women's", category: 'fashion', basePrice: 9, image: 'https://loremflickr.com/400/400/skinny,belt,women' },
  { title: "Cashmere Scarf Long", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/cashmere,scarf,long' },
  { title: "Sheer Tights Black 60 Denier", category: 'fashion', basePrice: 6, image: 'https://loremflickr.com/400/400/tights,sheer,women' },

  // ─── Temu/Shein-style viral home gadgets & decor ───────────────────────────
  { title: "Electric Mini Hand Vacuum Cleaner USB", category: 'home', basePrice: 9, image: 'https://loremflickr.com/400/400/mini,vacuum,usb' },
  { title: "Silicone Drain Plug Hair Catcher", category: 'home', basePrice: 4, image: 'https://loremflickr.com/400/400/drain,plug,silicone' },
  { title: "Magnetic Refrigerator Side Storage Rack", category: 'home', basePrice: 8, image: 'https://loremflickr.com/400/400/fridge,rack,magnetic' },
  { title: "Stainless Steel Garlic Press Mincer", category: 'home', basePrice: 5, image: 'https://loremflickr.com/400/400/garlic,press,mincer' },
  { title: "Multifunctional Vegetable Slicer Chopper", category: 'home', basePrice: 12, image: 'https://loremflickr.com/400/400/vegetable,slicer,chopper' },
  { title: "Egg Slicer Cutter Stainless Steel", category: 'home', basePrice: 4, image: 'https://loremflickr.com/400/400/egg,slicer,kitchen' },
  { title: "Silicone Stretch Lids Set of 6", category: 'home', basePrice: 6, image: 'https://loremflickr.com/400/400/silicone,lids,kitchen' },
  { title: "Adjustable Drawer Dividers 4-pack", category: 'home', basePrice: 9, image: 'https://loremflickr.com/400/400/drawer,divider,organizer' },
  { title: "Under-shelf Hanging Storage Basket", category: 'home', basePrice: 8, image: 'https://loremflickr.com/400/400/storage,basket,shelf' },
  { title: "Acrylic Makeup Organiser 7 Drawers", category: 'home', basePrice: 19, image: 'https://loremflickr.com/400/400/makeup,organiser,acrylic' },
  { title: "Bedside Caddy Hanging Pocket Organiser", category: 'home', basePrice: 7, image: 'https://loremflickr.com/400/400/bedside,caddy,organiser' },
  { title: "Spinning Lazy Susan Turntable", category: 'home', basePrice: 11, image: 'https://loremflickr.com/400/400/lazy,susan,turntable' },
  { title: "Cordless Sweeper Mop", category: 'home', basePrice: 24, image: 'https://loremflickr.com/400/400/cordless,sweeper,mop' },
  { title: "Self-Adhesive Wall Hooks 20-pack", category: 'home', basePrice: 5, image: 'https://loremflickr.com/400/400/wall,hooks,adhesive' },
  { title: "Bedroom Fairy String Lights 10m USB", category: 'home', basePrice: 6, image: 'https://loremflickr.com/400/400/fairy,lights,bedroom' },
  { title: "Galaxy Star Projector Night Light", category: 'home', basePrice: 22, image: 'https://loremflickr.com/400/400/galaxy,projector,night,light' },
  { title: "Sunset Lamp Projector", category: 'home', basePrice: 14, image: 'https://loremflickr.com/400/400/sunset,lamp,projector' },
  { title: "Bluetooth LED Light Strip 5m", category: 'home', basePrice: 11, image: 'https://loremflickr.com/400/400/led,strip,bluetooth' },
  { title: "RGB LED Light Strip 10m Music Sync", category: 'home', basePrice: 17, image: 'https://loremflickr.com/400/400/rgb,led,strip' },
  { title: "Aesthetic Moon Lamp 3D LED", category: 'home', basePrice: 16, image: 'https://loremflickr.com/400/400/moon,lamp,led' },
  { title: "Aromatherapy Diffuser Wood Grain 300ml", category: 'home', basePrice: 18, image: 'https://loremflickr.com/400/400/diffuser,aromatherapy,wood' },
  { title: "Soy Wax Scented Candle 200g", category: 'home', basePrice: 9, image: 'https://loremflickr.com/400/400/soy,candle,scented' },
  { title: "Faux Plants Set of 3", category: 'home', basePrice: 14, image: 'https://loremflickr.com/400/400/fake,plants,artificial' },
  { title: "Hanging Macrame Plant Holder 2-pack", category: 'home', basePrice: 10, image: 'https://loremflickr.com/400/400/macrame,plant,holder' },
  { title: "Boho Tufted Round Cushion", category: 'home', basePrice: 13, image: 'https://loremflickr.com/400/400/boho,cushion,tufted' },
  { title: "Memory Foam Bath Mat Non-Slip", category: 'home', basePrice: 12, image: 'https://loremflickr.com/400/400/memory,foam,bath,mat' },
  { title: "Tufted Area Rug 80x150cm", category: 'home', basePrice: 26, image: 'https://loremflickr.com/400/400/tufted,area,rug' },
  { title: "Pet Hair Lint Roller Reusable", category: 'pet', basePrice: 7, image: 'https://loremflickr.com/400/400/lint,roller,pet' },
  { title: "Self-Cleaning Cat Brush", category: 'pet', basePrice: 9, image: 'https://loremflickr.com/400/400/cat,brush,grooming' },
  { title: "Slow Feeder Dog Bowl", category: 'pet', basePrice: 11, image: 'https://loremflickr.com/400/400/slow,feeder,dog' },
  { title: "Interactive Cat Laser Toy Automatic", category: 'pet', basePrice: 13, image: 'https://loremflickr.com/400/400/cat,laser,toy' },

  // ─── Shein/Temu beauty & viral grooming ────────────────────────────────────
  { title: "Heatless Hair Curling Ribbon Rod", category: 'beauty', basePrice: 7, image: 'https://loremflickr.com/400/400/heatless,curler,hair' },
  { title: "Bamboo Hair Brush Detangling Wet/Dry", category: 'beauty', basePrice: 5, image: 'https://loremflickr.com/400/400/bamboo,hair,brush' },
  { title: "Hair Wax Stick Slick Edges", category: 'beauty', basePrice: 4, image: 'https://loremflickr.com/400/400/hair,wax,stick' },
  { title: "Silicone Hair Scalp Massager", category: 'beauty', basePrice: 5, image: 'https://loremflickr.com/400/400/scalp,massager,silicone' },
  { title: "Jade Roller and Gua Sha Set", category: 'beauty', basePrice: 9, image: 'https://loremflickr.com/400/400/jade,roller,gua,sha' },
  { title: "Ice Roller for Face & Eyes", category: 'beauty', basePrice: 7, image: 'https://loremflickr.com/400/400/ice,roller,face' },
  { title: "Cleansing Brush Silicone Face Scrubber", category: 'beauty', basePrice: 8, image: 'https://loremflickr.com/400/400/silicone,face,brush' },
  { title: "Makeup Sponge Blender Set of 4", category: 'beauty', basePrice: 6, image: 'https://loremflickr.com/400/400/makeup,sponge,blender' },
  { title: "Eyelash Curler Heated USB", category: 'beauty', basePrice: 9, image: 'https://loremflickr.com/400/400/heated,eyelash,curler' },
  { title: "False Eyelashes 10 Pairs Natural", category: 'beauty', basePrice: 5, image: 'https://loremflickr.com/400/400/false,eyelashes,natural' },
  { title: "Magnetic Eyeliner with Lashes Kit", category: 'beauty', basePrice: 11, image: 'https://loremflickr.com/400/400/magnetic,eyeliner,lashes' },
  { title: "Lip Plumper Gloss Clear", category: 'beauty', basePrice: 6, image: 'https://loremflickr.com/400/400/lip,plumper,gloss' },
  { title: "Press On Nails 24-pack Almond Shape", category: 'beauty', basePrice: 5, image: 'https://loremflickr.com/400/400/press,on,nails' },
  { title: "Nail Polish Set 12 Colours", category: 'beauty', basePrice: 9, image: 'https://loremflickr.com/400/400/nail,polish,set' },
  { title: "Vanity Mirror with LED Lights", category: 'beauty', basePrice: 22, image: 'https://loremflickr.com/400/400/vanity,mirror,lights' },
  { title: "Vegan Lip Balm Set of 5", category: 'beauty', basePrice: 6, image: 'https://loremflickr.com/400/400/lip,balm,vegan' },
  { title: "Sheet Mask Variety Pack 20-piece", category: 'beauty', basePrice: 11, image: 'https://loremflickr.com/400/400/sheet,mask,korean' },
  { title: "Pimple Patches Acne 36-pack", category: 'beauty', basePrice: 7, image: 'https://loremflickr.com/400/400/pimple,patches,acne' },
  { title: "Self-Tanning Mousse 200ml", category: 'beauty', basePrice: 9, image: 'https://loremflickr.com/400/400/self,tanning,mousse' },
  { title: "Hair Removal Cream 100ml", category: 'beauty', basePrice: 5, image: 'https://loremflickr.com/400/400/hair,removal,cream' },

  // ─── Shein/Temu accessories & viral fashion items ──────────────────────────
  { title: "Y2K Butterfly Hair Clips 20-pack", category: 'fashion', basePrice: 5, image: 'https://loremflickr.com/400/400/y2k,butterfly,clips' },
  { title: "Tinted Trendy Square Sunglasses", category: 'fashion', basePrice: 8, image: 'https://loremflickr.com/400/400/sunglasses,tinted,trendy' },
  { title: "Cargo Crossbody Bag with Multiple Pockets", category: 'fashion', basePrice: 17, image: 'https://loremflickr.com/400/400/cargo,crossbody,bag' },
  { title: "Mini Pearl Beaded Handbag", category: 'fashion', basePrice: 19, image: 'https://loremflickr.com/400/400/pearl,handbag,mini' },
  { title: "Fluffy Faux Fur Tote Bag", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/fur,tote,fluffy' },
  { title: "Knitted Beanie Hat Slouchy", category: 'fashion', basePrice: 7, image: 'https://loremflickr.com/400/400/beanie,slouchy,knit' },
  { title: "Trendy Phone Strap Pearl Beaded", category: 'fashion', basePrice: 6, image: 'https://loremflickr.com/400/400/phone,strap,pearl' },
  { title: "Coquette Bow Hair Ribbons 5-pack", category: 'fashion', basePrice: 4, image: 'https://loremflickr.com/400/400/coquette,bow,ribbons' },
  { title: "Anklet Bracelet Set Gold 5-pack", category: 'fashion', basePrice: 8, image: 'https://loremflickr.com/400/400/anklet,gold,bracelet' },
  { title: "Body Chain Layered Belly Necklace", category: 'fashion', basePrice: 9, image: 'https://loremflickr.com/400/400/body,chain,belly' },
  { title: "Toe Rings Set Silver 6 pcs", category: 'fashion', basePrice: 5, image: 'https://loremflickr.com/400/400/toe,rings,silver' },
  { title: "Hair Scrunchies Velvet 12-pack", category: 'fashion', basePrice: 6, image: 'https://loremflickr.com/400/400/scrunchies,velvet,pack' },
  { title: "Statement Drop Crystal Earrings", category: 'fashion', basePrice: 7, image: 'https://loremflickr.com/400/400/crystal,drop,earrings' },
  { title: "Aesthetic Ring Set Vintage 16-pack", category: 'fashion', basePrice: 7, image: 'https://loremflickr.com/400/400/aesthetic,rings,vintage' },
  { title: "Leg Warmers Knitted Y2K", category: 'fashion', basePrice: 10, image: 'https://loremflickr.com/400/400/leg,warmers,y2k' },
  { title: "Fishnet Tights Patterned", category: 'fashion', basePrice: 6, image: 'https://loremflickr.com/400/400/fishnet,tights,pattern' },
  { title: "Faux Leather Belt Y2K Studded", category: 'fashion', basePrice: 9, image: 'https://loremflickr.com/400/400/leather,belt,studded' },
  { title: "Cosplay Maid Costume Set", category: 'fashion', basePrice: 18, image: 'https://loremflickr.com/400/400/cosplay,maid,outfit' },
  { title: "Cosy Hoodie Blanket Oversized", category: 'fashion', basePrice: 24, image: 'https://loremflickr.com/400/400/hoodie,blanket,oversized' },
  { title: "Animal Onesie Pyjamas Unisex", category: 'fashion', basePrice: 22, image: 'https://loremflickr.com/400/400/animal,onesie,pyjamas' },

  // ─── Temu-style toys & gadgets ─────────────────────────────────────────────
  { title: "Magnetic Building Blocks 100 Pieces", category: 'toys', basePrice: 24, image: 'https://loremflickr.com/400/400/magnetic,building,blocks' },
  { title: "Pop It Fidget Toy Tie Dye", category: 'toys', basePrice: 5, image: 'https://loremflickr.com/400/400/pop,it,fidget' },
  { title: "Fidget Spinner Stress Relief Set", category: 'toys', basePrice: 6, image: 'https://loremflickr.com/400/400/fidget,spinner,toy' },
  { title: "Magic Sand Kinetic 1kg", category: 'toys', basePrice: 11, image: 'https://loremflickr.com/400/400/kinetic,sand,magic' },
  { title: "Slime Making Kit DIY", category: 'toys', basePrice: 9, image: 'https://loremflickr.com/400/400/slime,kit,diy' },
  { title: "Bubble Machine Automatic", category: 'toys', basePrice: 14, image: 'https://loremflickr.com/400/400/bubble,machine,toy' },
  { title: "Plushie Cute Kawaii 30cm", category: 'toys', basePrice: 12, image: 'https://loremflickr.com/400/400/plushie,kawaii,cute' },
  { title: "Squishmallow-style Plush 20cm", category: 'toys', basePrice: 15, image: 'https://loremflickr.com/400/400/squishmallow,plush,soft' },
  { title: "Remote Control Mini Car Drift", category: 'toys', basePrice: 18, image: 'https://loremflickr.com/400/400/rc,car,mini' },
  { title: "RC Drone Mini Quadcopter", category: 'toys', basePrice: 32, image: 'https://loremflickr.com/400/400/drone,mini,rc' },

  // ─── Outdoor/sports cheap items ────────────────────────────────────────────
  { title: "Resistance Bands Set with Handles", category: 'sports', basePrice: 12, image: 'https://loremflickr.com/400/400/resistance,bands,fitness' },
  { title: "Yoga Mat Non-slip 6mm", category: 'sports', basePrice: 15, image: 'https://loremflickr.com/400/400/yoga,mat,nonslip' },
  { title: "Foam Roller Deep Tissue", category: 'sports', basePrice: 13, image: 'https://loremflickr.com/400/400/foam,roller,fitness' },
  { title: "Insulated Water Bottle 1L Stainless Steel", category: 'sports', basePrice: 14, image: 'https://loremflickr.com/400/400/water,bottle,insulated' },
  { title: "Stanley-style Tumbler 40oz with Straw", category: 'sports', basePrice: 18, image: 'https://loremflickr.com/400/400/stanley,tumbler,straw' },
  { title: "Skipping Rope Adjustable Speed", category: 'sports', basePrice: 7, image: 'https://loremflickr.com/400/400/skipping,rope,speed' },
  { title: "Mini Stepper with Resistance Bands", category: 'sports', basePrice: 39, image: 'https://loremflickr.com/400/400/mini,stepper,workout' },
  { title: "Camping LED Lantern Rechargeable", category: 'outdoor', basePrice: 16, image: 'https://loremflickr.com/400/400/camping,lantern,led' },
  { title: "Travel Vacuum Storage Bags 10-pack", category: 'outdoor', basePrice: 12, image: 'https://loremflickr.com/400/400/vacuum,bags,travel' },
  { title: "Inflatable Beach Lounger Air Sofa", category: 'outdoor', basePrice: 18, image: 'https://loremflickr.com/400/400/inflatable,lounger,air' },

  // Furniture / Home
  { title: 'IKEA MALM Bed Frame Double', category: 'furniture', basePrice: 179, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400' },
  { title: 'IKEA POÄNG Armchair', category: 'furniture', basePrice: 89, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400' },
  { title: 'IKEA BILLY Bookcase White', category: 'furniture', basePrice: 60, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400' },
  { title: 'Wayfair 3 Seater Sofa Grey', category: 'furniture', basePrice: 499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
  { title: 'Argos Home Pine Dining Table', category: 'furniture', basePrice: 199, image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400' },
  { title: 'John Lewis Anyday Office Chair', category: 'furniture', basePrice: 149, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400' },
  { title: 'Dyson V15 Detect Cordless Vacuum', category: 'home', basePrice: 599, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
  { title: 'Shark Stratos Cordless Vacuum', category: 'home', basePrice: 379, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
  { title: 'Nespresso Vertuo Pop Machine', category: 'home', basePrice: 99, image: 'https://images.unsplash.com/photo-1572286258217-215cf8e35858?w=400' },
  { title: 'Ninja Foodi Air Fryer 7.6L', category: 'home', basePrice: 199, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400' },
  { title: 'Tower Vortx Air Fryer 4L', category: 'home', basePrice: 59, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400' },

  // ─── Fridges / freezers ────────────────────────────────────────────────────
  { title: 'Samsung RB34T602ESA Fridge Freezer 50/50 Silver', category: 'home', basePrice: 549, image: 'https://loremflickr.com/400/400/refrigerator,kitchen' },
  { title: 'Samsung RS68A8830S9 American Fridge Freezer', category: 'home', basePrice: 1299, image: 'https://loremflickr.com/400/400/refrigerator,american,stainless' },
  { title: 'Samsung Family Hub RF65A977FSR Smart Fridge', category: 'home', basePrice: 3499, image: 'https://loremflickr.com/400/400/refrigerator,modern,screen' },
  { title: 'LG GBB72PZUGN Fridge Freezer Frost-Free', category: 'home', basePrice: 749, image: 'https://loremflickr.com/400/400/refrigerator,kitchen,white' },
  { title: 'LG InstaView Door-in-Door American Fridge', category: 'home', basePrice: 1999, image: 'https://loremflickr.com/400/400/refrigerator,american,door' },
  { title: 'Bosch KGN36VLCT Series 4 Fridge Freezer', category: 'home', basePrice: 599, image: 'https://loremflickr.com/400/400/refrigerator,kitchen,appliance' },
  { title: 'Bosch Serie 6 KGN39LBE0G Fridge Freezer', category: 'home', basePrice: 849, image: 'https://loremflickr.com/400/400/refrigerator,kitchen,stainless' },
  { title: 'Hisense RB390N4WW1 Fridge Freezer White', category: 'home', basePrice: 379, image: 'https://loremflickr.com/400/400/refrigerator,white,kitchen' },
  { title: 'Hisense RS694N4TIE American Fridge Freezer', category: 'home', basePrice: 799, image: 'https://loremflickr.com/400/400/refrigerator,american,silver' },
  { title: 'Beko CFG3582DVS Fridge Freezer Silver', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/refrigerator,silver,appliance' },
  { title: 'Beko Tall Larder Fridge LBSP1573W', category: 'home', basePrice: 279, image: 'https://loremflickr.com/400/400/refrigerator,tall,kitchen' },
  { title: 'Hotpoint H3T811IOX Fridge Freezer', category: 'home', basePrice: 499, image: 'https://loremflickr.com/400/400/refrigerator,freezer,kitchen' },
  { title: 'Hotpoint Under Counter Fridge', category: 'home', basePrice: 199, image: 'https://loremflickr.com/400/400/refrigerator,small,counter' },
  { title: 'Indesit Fridge Freezer LD70S1W', category: 'home', basePrice: 329, image: 'https://loremflickr.com/400/400/refrigerator,white,silver' },
  { title: 'Indesit Under Counter Freezer', category: 'home', basePrice: 189, image: 'https://loremflickr.com/400/400/freezer,small,white' },
  { title: 'Smeg FAB30RPB5 Retro Fridge Pastel Blue', category: 'home', basePrice: 1899, image: 'https://loremflickr.com/400/400/retro,refrigerator,blue' },
  { title: 'Smeg FAB28RDIT3 Retro Fridge Italian Flag', category: 'home', basePrice: 1599, image: 'https://loremflickr.com/400/400/retro,refrigerator,vintage' },
  { title: 'Russell Hobbs Mini Fridge 43L', category: 'home', basePrice: 99, image: 'https://loremflickr.com/400/400/mini,refrigerator,small' },
  { title: 'Cookology Mini Fridge 70L', category: 'home', basePrice: 129, image: 'https://loremflickr.com/400/400/mini,refrigerator,table' },
  { title: 'Husky Cosmetic Mini Fridge 6L Pink', category: 'home', basePrice: 79, image: 'https://loremflickr.com/400/400/mini,refrigerator,pink' },
  { title: 'Husky Beer Mini Fridge 43L', category: 'home', basePrice: 159, image: 'https://loremflickr.com/400/400/mini,refrigerator,small' },
  { title: 'Whirlpool 6th Sense Side-by-Side Fridge', category: 'home', basePrice: 1299, image: 'https://loremflickr.com/400/400/refrigerator,side,kitchen' },
  { title: 'Miele KFN 29283 D Fridge Freezer', category: 'home', basePrice: 1599, image: 'https://loremflickr.com/400/400/refrigerator,premium,kitchen' },
  { title: 'Liebherr Premium NoFrost Fridge Freezer', category: 'home', basePrice: 1199, image: 'https://loremflickr.com/400/400/refrigerator,kitchen,modern' },
  { title: 'Hisense Chest Freezer 200L White', category: 'home', basePrice: 269, image: 'https://loremflickr.com/400/400/chest,freezer,white' },
  { title: 'Russell Hobbs Tall Freezer 161L', category: 'home', basePrice: 219, image: 'https://loremflickr.com/400/400/freezer,tall,kitchen' },
  { title: 'Wine Cooler 24 Bottle Dual Zone', category: 'home', basePrice: 299, image: 'https://loremflickr.com/400/400/wine,cooler,glass' },
  { title: 'Cookology Drinks Display Fridge 80L', category: 'home', basePrice: 199, image: 'https://loremflickr.com/400/400/display,fridge,drinks' },

  // ─── Washing machines ──────────────────────────────────────────────────────
  { title: 'Samsung WW90T684DLN EcoBubble Washing Machine 9kg', category: 'home', basePrice: 549, image: 'https://loremflickr.com/400/400/washing,machine,front' },
  { title: 'Samsung Series 5+ WW80TA046AE Washing Machine 8kg', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/washing,machine,white' },
  { title: 'Samsung WW11BB904AGB Bespoke AI 11kg Washing Machine', category: 'home', basePrice: 899, image: 'https://loremflickr.com/400/400/washing,machine,laundry' },
  { title: 'LG TurboWash F4V710WTS Washing Machine 10.5kg', category: 'home', basePrice: 649, image: 'https://loremflickr.com/400/400/washing,machine,front' },
  { title: 'LG F4V310WSE Washing Machine 10kg AI DD', category: 'home', basePrice: 599, image: 'https://loremflickr.com/400/400/washing,machine,silver' },
  { title: 'Bosch Serie 4 WAN28282GB Washing Machine 8kg', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/washing,machine,laundry' },
  { title: 'Bosch Serie 6 WGG244A0GB Washing Machine 9kg', category: 'home', basePrice: 599, image: 'https://loremflickr.com/400/400/washing,machine,modern' },
  { title: 'Hotpoint NSWM743UWUKN Washing Machine 7kg', category: 'home', basePrice: 269, image: 'https://loremflickr.com/400/400/washing,machine,front' },
  { title: 'Hotpoint Anti-Stain NSWM 945C 9kg Washer', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/washing,machine,white' },
  { title: 'Indesit BWE 71452 W UK N Washing Machine 7kg', category: 'home', basePrice: 249, image: 'https://loremflickr.com/400/400/washing,machine,laundry' },
  { title: 'Beko RecycledTub 8kg WTL84141W Washing Machine', category: 'home', basePrice: 279, image: 'https://loremflickr.com/400/400/washing,machine,front' },
  { title: 'Beko AquaTech 10kg WEC840522W Washing Machine', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/washing,machine,silver' },
  { title: 'Hoover H-Wash 500 HW437XMBB 7kg Washing Machine', category: 'home', basePrice: 299, image: 'https://loremflickr.com/400/400/washing,machine,modern' },
  { title: 'Hisense WFGA80141VM Washing Machine 8kg', category: 'home', basePrice: 269, image: 'https://loremflickr.com/400/400/washing,machine,laundry' },
  { title: 'Candy Smart Pro 9kg CSO1493TWE Washing Machine', category: 'home', basePrice: 299, image: 'https://loremflickr.com/400/400/washing,machine,white' },
  { title: 'AEG 6000 Series ProSense 8kg Washing Machine', category: 'home', basePrice: 499, image: 'https://loremflickr.com/400/400/washing,machine,front' },
  { title: 'Miele WSA023 WCS Active Washing Machine 7kg', category: 'home', basePrice: 749, image: 'https://loremflickr.com/400/400/washing,machine,premium' },
  { title: 'Hotpoint Integrated Washing Machine 8kg', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/washing,machine,integrated' },
  { title: 'Samsung WD90T534DBN Washer Dryer 9kg/6kg', category: 'home', basePrice: 749, image: 'https://loremflickr.com/400/400/washer,dryer,combo' },
  { title: 'Hotpoint Carve WDD 9640 G UK Washer Dryer 9kg/6kg', category: 'home', basePrice: 549, image: 'https://loremflickr.com/400/400/washer,dryer,laundry' },
  { title: 'Beko RecycledTub WDER8543121W Washer Dryer 8kg/5kg', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/washer,dryer,white' },

  // ─── Tumble dryers ─────────────────────────────────────────────────────────
  { title: 'Hotpoint NT M11 92SK UK Heat Pump Dryer 9kg', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/tumble,dryer,laundry' },
  { title: 'Hotpoint H3 D81B UK Condenser Dryer 8kg', category: 'home', basePrice: 299, image: 'https://loremflickr.com/400/400/tumble,dryer,white' },
  { title: 'Hotpoint TVFM 70BGP Vented Dryer 7kg White', category: 'home', basePrice: 229, image: 'https://loremflickr.com/400/400/tumble,dryer,front' },
  { title: 'Beko B5T4923IW Heat Pump Tumble Dryer 9kg', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/tumble,dryer,laundry' },
  { title: 'Beko DTLCE80051W Condenser Dryer 8kg', category: 'home', basePrice: 269, image: 'https://loremflickr.com/400/400/tumble,dryer,silver' },
  { title: 'Bosch Serie 6 WTH85223GB Heat Pump Dryer 8kg', category: 'home', basePrice: 549, image: 'https://loremflickr.com/400/400/tumble,dryer,modern' },
  { title: 'Bosch Serie 4 WTN83202GB Condenser Dryer 8kg', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/tumble,dryer,white' },
  { title: 'Samsung Series 5 DV80TA020TE Heat Pump Dryer 8kg', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/tumble,dryer,laundry' },
  { title: 'Samsung DV90T6240LH Optimal Dry Heat Pump 9kg', category: 'home', basePrice: 599, image: 'https://loremflickr.com/400/400/tumble,dryer,front' },
  { title: 'LG FDV909W EcoHybrid Heat Pump Dryer 9kg', category: 'home', basePrice: 649, image: 'https://loremflickr.com/400/400/tumble,dryer,silver' },
  { title: 'LG FDT708W Heat Pump Tumble Dryer 8kg', category: 'home', basePrice: 549, image: 'https://loremflickr.com/400/400/tumble,dryer,laundry' },
  { title: 'Hoover H-Dry 500 HLE C9DCEB Vented Dryer 9kg', category: 'home', basePrice: 269, image: 'https://loremflickr.com/400/400/tumble,dryer,white' },
  { title: 'Indesit YT M11 82K UK Heat Pump Dryer 8kg', category: 'home', basePrice: 329, image: 'https://loremflickr.com/400/400/tumble,dryer,modern' },
  { title: 'Hisense DHGE901NL Heat Pump Tumble Dryer 9kg', category: 'home', basePrice: 379, image: 'https://loremflickr.com/400/400/tumble,dryer,laundry' },
  { title: 'Miele TWB140WP Tumble Dryer 7kg', category: 'home', basePrice: 749, image: 'https://loremflickr.com/400/400/tumble,dryer,premium' },

  // ─── Dishwashers ───────────────────────────────────────────────────────────
  { title: 'Bosch Serie 4 SMS4HCW40G Dishwasher Full Size', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/bosch,dishwasher' },
  { title: 'Bosch Serie 6 Integrated Dishwasher 13 Place', category: 'home', basePrice: 599, image: 'https://loremflickr.com/400/400/integrated,dishwasher' },
  { title: 'Hotpoint H7I HT58 TS UK Dishwasher 15 Place', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/hotpoint,dishwasher' },
  { title: 'Beko Slimline Dishwasher 10 Place Setting', category: 'home', basePrice: 279, image: 'https://loremflickr.com/400/400/slim,dishwasher,beko' },
  { title: 'Samsung DW60M5050FW Dishwasher Full Size White', category: 'home', basePrice: 379, image: 'https://loremflickr.com/400/400/samsung,dishwasher' },
  { title: 'Indesit Tabletop Mini Dishwasher 6 Place', category: 'home', basePrice: 249, image: 'https://loremflickr.com/400/400/tabletop,dishwasher' },

  // ─── Ovens / cookers / hobs / microwaves ───────────────────────────────────
  { title: 'Bosch Serie 4 Built-in Single Oven Electric', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/built,in,oven' },
  { title: 'Hotpoint Built-in Double Electric Oven', category: 'home', basePrice: 499, image: 'https://loremflickr.com/400/400/double,oven,electric' },
  { title: 'Samsung Smart Steam Oven NV7B5740TAK', category: 'home', basePrice: 899, image: 'https://loremflickr.com/400/400/samsung,smart,oven' },
  { title: 'AEG SteamBoost Built-in Single Oven', category: 'home', basePrice: 799, image: 'https://loremflickr.com/400/400/aeg,steam,oven' },
  { title: 'Belling Cookcentre 100E Electric Range Cooker', category: 'home', basePrice: 899, image: 'https://loremflickr.com/400/400/belling,range,cooker' },
  { title: 'Stoves Sterling 600E Cooker Electric', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/stoves,electric,cooker' },
  { title: 'Bosch Serie 6 Induction Hob 60cm', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/induction,hob' },
  { title: 'Russell Hobbs RHEH1701B Double Hot Plate', category: 'home', basePrice: 49, image: 'https://loremflickr.com/400/400/hot,plate,electric' },
  { title: 'Panasonic NN-CT56JBBPQ Microwave 27L', category: 'home', basePrice: 169, image: 'https://loremflickr.com/400/400/panasonic,microwave' },
  { title: 'Russell Hobbs 17L Microwave RHM1731B', category: 'home', basePrice: 69, image: 'https://loremflickr.com/400/400/russell,hobbs,microwave' },
  { title: 'Sharp R860SLM Combination Microwave 25L', category: 'home', basePrice: 199, image: 'https://loremflickr.com/400/400/sharp,microwave' },
  { title: 'Tower Manhattan 800W Microwave 20L Black', category: 'home', basePrice: 79, image: 'https://loremflickr.com/400/400/tower,microwave,black' },
  { title: 'Daewoo Touch Control 800W Microwave', category: 'home', basePrice: 89, image: 'https://loremflickr.com/400/400/daewoo,microwave' },

  // ─── Fans & cooling ────────────────────────────────────────────────────────
  { title: 'Dyson Cool AM07 Tower Fan', category: 'home', basePrice: 299, image: 'https://loremflickr.com/400/400/bladeless,tower,fan' },
  { title: 'Dyson Pure Cool TP07 Air Purifier Fan', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/air,purifier,bladeless' },
  { title: 'Dyson Hot+Cool AM09 Fan Heater', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/bladeless,fan,heater' },
  { title: 'MeacoFan 1056 Air Circulator Quiet Pedestal', category: 'home', basePrice: 129, image: 'https://loremflickr.com/400/400/pedestal,fan,silent' },
  { title: 'MeacoFan 650 Desk Fan', category: 'home', basePrice: 69, image: 'https://loremflickr.com/400/400/desk,fan,small' },
  { title: 'Honeywell QuietSet HYF290E4 Tower Fan', category: 'home', basePrice: 89, image: 'https://loremflickr.com/400/400/honeywell,tower,fan' },
  { title: 'Russell Hobbs RHPF1601 16" Pedestal Fan', category: 'home', basePrice: 39, image: 'https://loremflickr.com/400/400/pedestal,fan,16inch' },
  { title: 'Russell Hobbs Tower Fan 30" Black', category: 'home', basePrice: 49, image: 'https://loremflickr.com/400/400/tower,fan,russell' },
  { title: 'Beldray 12" Desk Fan White', category: 'home', basePrice: 19, image: 'https://loremflickr.com/400/400/desk,fan,white' },
  { title: 'Status 16" Oscillating Stand Fan', category: 'home', basePrice: 29, image: 'https://loremflickr.com/400/400/oscillating,stand,fan' },
  { title: 'Black+Decker BXFP51002GB 16" Pedestal Fan', category: 'home', basePrice: 35, image: 'https://loremflickr.com/400/400/black,decker,fan' },
  { title: 'Princess Smart Tower Fan 360°', category: 'home', basePrice: 79, image: 'https://loremflickr.com/400/400/smart,tower,fan' },
  { title: 'Igenix DF0030T Tower Fan Quiet', category: 'home', basePrice: 49, image: 'https://loremflickr.com/400/400/igenix,tower,fan' },
  { title: 'USB Desk Fan Mini 4-inch Portable', category: 'home', basePrice: 12, image: 'https://loremflickr.com/400/400/usb,mini,fan' },
  { title: 'Handheld Mini Fan Rechargeable Portable', category: 'home', basePrice: 9, image: 'https://loremflickr.com/400/400/handheld,fan,portable' },
  { title: 'Clip-on Pram Fan with Flexible Tripod', category: 'home', basePrice: 14, image: 'https://loremflickr.com/400/400/clip,on,fan' },
  { title: 'Bladeless Tower Fan 36" Remote Control', category: 'home', basePrice: 119, image: 'https://loremflickr.com/400/400/bladeless,tower,fan' },
  { title: 'Bladeless Ceiling Fan with LED Light Modern', category: 'home', basePrice: 159, image: 'https://loremflickr.com/400/400/ceiling,fan,modern' },
  { title: 'Hunter Original 52" Ceiling Fan with Lights', category: 'home', basePrice: 249, image: 'https://loremflickr.com/400/400/hunter,ceiling,fan' },
  { title: 'Vortex Air VAX MyFan Portable AC', category: 'home', basePrice: 199, image: 'https://loremflickr.com/400/400/portable,ac,unit' },
  { title: 'AEG ChillFlex Pro Portable Air Conditioner', category: 'home', basePrice: 449, image: 'https://loremflickr.com/400/400/portable,air,conditioner' },
  { title: 'Stadler Form Anna Heater Fan', category: 'home', basePrice: 99, image: 'https://loremflickr.com/400/400/heater,fan,stadler' },
  { title: 'De\'Longhi Pinguino Air Conditioner Portable', category: 'home', basePrice: 399, image: 'https://loremflickr.com/400/400/delonghi,pinguino,ac' },
  { title: 'Vornado 660 Whole Room Air Circulator', category: 'home', basePrice: 149, image: 'https://loremflickr.com/400/400/vornado,air,circulator' },

  // ─── Grocery (UK supermarket-style) ─────────────────────────────────────────

  // Milk & dairy
  { title: 'Cravendale Whole Milk 2L', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { title: 'Semi-Skimmed Milk 4 Pints (2.27L)', category: 'grocery', basePrice: 1.7, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { title: 'Whole Milk 4 Pints (2.27L)', category: 'grocery', basePrice: 1.7, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { title: 'Skimmed Milk 2 Pints', category: 'grocery', basePrice: 1.1, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
  { title: 'Alpro Oat Milk 1L', category: 'grocery', basePrice: 1.8, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400' },
  { title: 'Oatly Barista Edition 1L', category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400' },
  { title: 'Alpro Almond Milk Unsweetened 1L', category: 'grocery', basePrice: 1.8, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400' },
  { title: 'Lactofree Semi-Skimmed Milk 1L', category: 'grocery', basePrice: 1.9, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },

  // Cheese
  { title: 'Cathedral City Mature Cheddar 350g', category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400' },
  { title: 'Pilgrims Choice Extra Mature Cheddar 550g', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { title: 'Babybel Mini Cheese 12 pack', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { title: 'Philadelphia Original Soft Cheese 280g', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { title: 'Galbani Mozzarella 125g', category: 'grocery', basePrice: 1.2, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400' },
  { title: 'Boursin Garlic & Herbs 150g', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { title: 'Parmigiano Reggiano 200g', category: 'grocery', basePrice: 5.5, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400' },
  { title: 'Feta Cheese 200g', category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { title: 'Halloumi 225g', category: 'grocery', basePrice: 2.8, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400' },

  // Yoghurt, butter, eggs
  { title: 'Lurpak Slightly Salted Butter 500g', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
  { title: 'Anchor Spreadable Butter 500g', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
  { title: 'Free Range Large Eggs (12 pack)', category: 'grocery', basePrice: 3.2, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400' },
  { title: 'Free Range Medium Eggs (6 pack)', category: 'grocery', basePrice: 1.7, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400' },
  { title: 'Yeo Valley Natural Yoghurt 500g', category: 'grocery', basePrice: 1.6, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { title: 'Fage Total 0% Greek Yoghurt 450g', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { title: 'Müller Corner Strawberry 6 pack', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { title: 'Activia Strawberry Yoghurt 4 pack', category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },

  // Fresh vegetables
  { title: 'British Carrots 1kg', category: 'grocery', basePrice: 0.85, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
  { title: 'White Potatoes 2.5kg', category: 'grocery', basePrice: 1.85, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
  { title: 'Maris Piper Potatoes 2kg', category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
  { title: 'Brown Onions 1kg', category: 'grocery', basePrice: 0.95, image: 'https://loremflickr.com/400/400/brown,onion,vegetable' },
  { title: 'Red Onions 500g', category: 'grocery', basePrice: 0.85, image: 'https://loremflickr.com/400/400/red,onion,vegetable' },
  { title: 'Garlic Bulb (3 pack)', category: 'grocery', basePrice: 0.99, image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f2bdb?w=400' },
  { title: 'Tomatoes on the Vine 500g', category: 'grocery', basePrice: 1.4, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
  { title: 'Cherry Tomatoes 250g', category: 'grocery', basePrice: 1.2, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
  { title: 'Baby Spinach 250g', category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400' },
  { title: 'Iceberg Lettuce', category: 'grocery', basePrice: 0.85, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400' },
  { title: 'Cucumber Whole', category: 'grocery', basePrice: 0.85, image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400' },
  { title: 'Bell Pepper Mixed 3 pack', category: 'grocery', basePrice: 1.7, image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=400' },
  { title: 'Broccoli 350g', category: 'grocery', basePrice: 0.85, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400' },
  { title: 'Cauliflower Whole', category: 'grocery', basePrice: 1.1, image: 'https://images.unsplash.com/photo-1568584711271-6c929fb49b60?w=400' },
  { title: 'Mushrooms Closed Cup 250g', category: 'grocery', basePrice: 0.9, image: 'https://images.unsplash.com/photo-1602273532010-9c8a9faf5ea3?w=400' },
  { title: 'Aubergine', category: 'grocery', basePrice: 0.9, image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400' },
  { title: 'Courgettes 500g', category: 'grocery', basePrice: 0.99, image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400' },
  { title: 'Sweet Potato 1kg', category: 'grocery', basePrice: 1.6, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
  { title: 'Avocado (2 pack)', category: 'grocery', basePrice: 1.85, image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400' },
  { title: 'Ginger Root 100g', category: 'grocery', basePrice: 0.7, image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f2bdb?w=400' },
  { title: 'Spring Onions Bunch', category: 'grocery', basePrice: 0.6, image: 'https://loremflickr.com/400/400/spring,onion,green' },

  // Fresh fruit
  { title: 'Bananas Loose 1kg', category: 'grocery', basePrice: 0.79, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { title: 'Pink Lady Apples 4 pack', category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400' },
  { title: 'Gala Apples 6 pack', category: 'grocery', basePrice: 1.6, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400' },
  { title: 'Strawberries 400g', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=400' },
  { title: 'Blueberries 300g', category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400' },
  { title: 'Raspberries 150g', category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400' },
  { title: 'Green Seedless Grapes 500g', category: 'grocery', basePrice: 2.3, image: 'https://loremflickr.com/400/400/green,grapes,fruit' },
  { title: 'Easy Peeler Satsumas 600g', category: 'grocery', basePrice: 1.9, image: 'https://images.unsplash.com/photo-1457296259969-cc63d9ed7c45?w=400' },
  { title: 'Lemons 5 pack', category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1582287014914-1db836b8ce5c?w=400' },
  { title: 'Pineapple Whole', category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400' },
  { title: 'Watermelon Whole', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
  { title: 'Mango Ripen at Home', category: 'grocery', basePrice: 0.9, image: 'https://images.unsplash.com/photo-1605027990121-cbae9ecd5b18?w=400' },

  // Meat & poultry
  { title: 'British Chicken Breast Fillets 650g', category: 'grocery', basePrice: 5.5, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400' },
  { title: 'British Chicken Thighs 1kg', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400' },
  { title: 'British Beef Mince 5% Fat 500g', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { title: 'British Beef Steak Mince 12% Fat 500g', category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { title: 'Richmond Thick Pork Sausages 8 pack', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { title: 'British Smoked Back Bacon 300g', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { title: 'British Pork Loin Steaks 500g', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { title: 'Lamb Mince 500g', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400' },
  { title: 'Whole Chicken 1.5kg', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400' },

  // Fish & seafood
  { title: 'Atlantic Salmon Fillets 240g', category: 'grocery', basePrice: 4.5, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
  { title: 'Smoked Salmon Slices 100g', category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
  { title: 'Cod Fillets 320g', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
  { title: 'King Prawns Cooked 200g', category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
  { title: 'Tinned Tuna in Spring Water 4x80g', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=400' },

  // Frozen
  { title: 'Birds Eye Garden Peas 800g (Frozen)', category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'Birds Eye Sweetcorn 720g (Frozen)', category: 'grocery', basePrice: 2.4, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'McCain Home Chips 1.5kg (Frozen)', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'Aunt Bessies Roast Potatoes 700g (Frozen)', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'Birds Eye Chicken Fillets 12 pack (Frozen)', category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'Birds Eye Fish Fingers 24 pack', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'Chicago Town Pepperoni Pizzas 4 pack (Frozen)', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
  { title: 'Goodfellas Stonebaked Margherita Pizza (Frozen)', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
  { title: 'Quorn Chicken Style Pieces 300g (Frozen)', category: 'grocery', basePrice: 2.7, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: 'Frozen Mixed Berries 500g', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400' },
  { title: "Ben & Jerry's Cookie Dough Ice Cream 465ml", category: 'grocery', basePrice: 5.5, image: 'https://images.unsplash.com/photo-1581088382144-cffdbf85b8b3?w=400' },
  { title: "Magnum Classic Ice Cream 6 pack", category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1581088382144-cffdbf85b8b3?w=400' },
  { title: "Cornetto Classico 6 pack", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1581088382144-cffdbf85b8b3?w=400' },
  { title: "Häagen-Dazs Vanilla 460ml", category: 'grocery', basePrice: 4.5, image: 'https://images.unsplash.com/photo-1581088382144-cffdbf85b8b3?w=400' },

  // Bakery
  { title: "Warburtons Toastie Thick Sliced White Loaf 800g", category: 'grocery', basePrice: 1.4, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Hovis Soft White Medium Sliced 800g", category: 'grocery', basePrice: 1.3, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Kingsmill Wholemeal Medium 800g", category: 'grocery', basePrice: 1.3, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Tiger Bloomer Loaf", category: 'grocery', basePrice: 1.6, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Butter Croissants 4 pack", category: 'grocery', basePrice: 1.8, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { title: "Pain au Chocolat 4 pack", category: 'grocery', basePrice: 1.9, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { title: "Warburtons White Bagels 5 pack", category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Soft White Tortilla Wraps 8 pack", category: 'grocery', basePrice: 1.3, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Brioche Burger Buns 4 pack", category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },

  // Pantry: pasta, rice, sauces
  { title: "Tilda Basmati Rice 1kg", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { title: "Long Grain Easy Cook Rice 2kg", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { title: "Napolina Penne Pasta 500g", category: 'grocery', basePrice: 1.2, image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=400' },
  { title: "Napolina Spaghetti 500g", category: 'grocery', basePrice: 1.2, image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=400' },
  { title: "Dolmio Bolognese Sauce 500g", category: 'grocery', basePrice: 1.85, image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=400' },
  { title: "Heinz Baked Beans 415g x6", category: 'grocery', basePrice: 6, image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400' },
  { title: "Heinz Tomato Soup 400g x4", category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400' },
  { title: "Heinz Tomato Ketchup 460g", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Hellmann's Real Mayonnaise 600ml", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Branston Pickle 360g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Filippo Berio Extra Virgin Olive Oil 500ml", category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { title: "Tate & Lyle Granulated Sugar 1kg", category: 'grocery', basePrice: 1.3, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400' },
  { title: "Saxa Table Salt 750g", category: 'grocery', basePrice: 0.85, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400' },
  // Breakfast cereals & morning food
  { title: "Quaker Oats Rolled Oats 1kg", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/quaker,oats,porridge' },
  { title: "Quaker Oat So Simple Original 12 sachets", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/oats,porridge,breakfast' },
  { title: "Quaker Oat So Simple Golden Syrup 8 sachets", category: 'grocery', basePrice: 2.3, image: 'https://loremflickr.com/400/400/oats,porridge,sachet' },
  { title: "Kellogg's Corn Flakes 500g", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/cornflakes,cereal,breakfast' },
  { title: "Kellogg's Crunchy Nut Cornflakes 500g", category: 'grocery', basePrice: 3.5, image: 'https://loremflickr.com/400/400/cereal,crunchy,breakfast' },
  { title: "Kellogg's Special K Original 440g", category: 'grocery', basePrice: 3.5, image: 'https://loremflickr.com/400/400/special,k,cereal' },
  { title: "Kellogg's Coco Pops 480g", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/coco,pops,cereal' },
  { title: "Kellogg's Frosties 470g", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/frosties,cereal,breakfast' },
  { title: "Kellogg's Rice Krispies 510g", category: 'grocery', basePrice: 3.2, image: 'https://loremflickr.com/400/400/rice,krispies,cereal' },
  { title: "Weetabix 24 pack", category: 'grocery', basePrice: 3.5, image: 'https://loremflickr.com/400/400/weetabix,cereal,breakfast' },
  { title: "Weetabix 48 pack", category: 'grocery', basePrice: 5.5, image: 'https://loremflickr.com/400/400/weetabix,cereal,breakfast' },
  { title: "Weetabix Banana 24 pack", category: 'grocery', basePrice: 3.8, image: 'https://loremflickr.com/400/400/weetabix,banana,cereal' },
  { title: "Weetabix Chocolate 24 pack", category: 'grocery', basePrice: 3.8, image: 'https://loremflickr.com/400/400/weetabix,chocolate,cereal' },
  { title: "Nestlé Cheerios 565g", category: 'grocery', basePrice: 3.5, image: 'https://loremflickr.com/400/400/cheerios,cereal,breakfast' },
  { title: "Nestlé Shreddies 460g", category: 'grocery', basePrice: 3.5, image: 'https://loremflickr.com/400/400/shreddies,cereal,breakfast' },
  { title: "Nestlé Honey Cheerios 565g", category: 'grocery', basePrice: 3.7, image: 'https://loremflickr.com/400/400/honey,cheerios,cereal' },
  { title: "Nestlé Shredded Wheat 16 pack", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/shredded,wheat,cereal' },
  { title: "Nestlé Cookie Crisp 375g", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/cookie,crisp,cereal' },
  { title: "Alpen Original Muesli 1.3kg", category: 'grocery', basePrice: 5, image: 'https://loremflickr.com/400/400/muesli,cereal,oats' },
  { title: "Alpen No Added Sugar Muesli 550g", category: 'grocery', basePrice: 3.5, image: 'https://loremflickr.com/400/400/muesli,cereal,healthy' },
  { title: "Jordans Country Crisp Strawberry 500g", category: 'grocery', basePrice: 3.2, image: 'https://loremflickr.com/400/400/granola,cereal,crunchy' },
  { title: "Dorset Cereals Berries & Cherries Muesli 550g", category: 'grocery', basePrice: 4, image: 'https://loremflickr.com/400/400/muesli,berries,cereal' },
  { title: "Bran Flakes Cereal 750g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/bran,flakes,cereal' },
  { title: "Belvita Breakfast Biscuits Choc Chip 6 pack", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/belvita,breakfast,biscuit' },
  { title: "Belvita Breakfast Biscuits Honey & Nut 6 pack", category: 'grocery', basePrice: 3, image: 'https://loremflickr.com/400/400/belvita,breakfast,biscuit' },
  { title: "Nature Valley Crunchy Oats & Honey 5 pack", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/nature,valley,granola,bar' },
  { title: "Special K Strawberry & Yogurt Bars 6 pack", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/cereal,bar,breakfast' },
  { title: "Greggs Pain au Chocolat 4 pack", category: 'grocery', basePrice: 2, image: 'https://loremflickr.com/400/400/pain,chocolat,pastry' },
  { title: "Crumpets 6 pack", category: 'grocery', basePrice: 0.85, image: 'https://loremflickr.com/400/400/crumpets,breakfast,british' },
  { title: "English Muffins 4 pack", category: 'grocery', basePrice: 1, image: 'https://loremflickr.com/400/400/english,muffins,breakfast' },
  { title: "Pancake Mix Aunt Bessies", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/pancake,breakfast,mix' },
  { title: "Maple Syrup 250ml", category: 'grocery', basePrice: 4, image: 'https://loremflickr.com/400/400/maple,syrup,bottle' },
  { title: "Nutella Hazelnut Spread 400g", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Robertson's Strawberry Jam 340g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Yorkshire Tea 240 Bags", category: 'grocery', basePrice: 7, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400' },
  { title: "PG Tips Pyramid Tea 160 Bags", category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400' },
  { title: "Nescafé Gold Blend Instant Coffee 200g", category: 'grocery', basePrice: 6.5, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400' },
  { title: "Lavazza Qualità Oro Ground Coffee 250g", category: 'grocery', basePrice: 4.5, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400' },

  // ─── Beer, cider, wine, spirits ────────────────────────────────────────────
  { title: "Stella Artois Lager 18x440ml", category: 'grocery', basePrice: 18, image: 'https://loremflickr.com/400/400/stella,beer,lager' },
  { title: "Carling Original Lager 18x440ml", category: 'grocery', basePrice: 16, image: 'https://loremflickr.com/400/400/beer,can,lager' },
  { title: "Heineken Lager 15x330ml Bottle", category: 'grocery', basePrice: 14, image: 'https://loremflickr.com/400/400/heineken,beer,bottle' },
  { title: "Corona Extra Premium Lager 12x330ml", category: 'grocery', basePrice: 15, image: 'https://loremflickr.com/400/400/corona,beer,bottle' },
  { title: "Peroni Nastro Azzurro 12x330ml", category: 'grocery', basePrice: 14, image: 'https://loremflickr.com/400/400/peroni,beer,bottle' },
  { title: "Budweiser Lager 15x300ml", category: 'grocery', basePrice: 14, image: 'https://loremflickr.com/400/400/budweiser,beer,bottle' },
  { title: "Beck's Lager 15x275ml", category: 'grocery', basePrice: 13, image: 'https://loremflickr.com/400/400/becks,beer,bottle' },
  { title: "Asahi Super Dry 12x330ml", category: 'grocery', basePrice: 15, image: 'https://loremflickr.com/400/400/asahi,beer,bottle' },
  { title: "Madri Excepcional 18x330ml", category: 'grocery', basePrice: 17, image: 'https://loremflickr.com/400/400/madri,beer,lager' },
  { title: "Cobra Premium Beer 12x330ml", category: 'grocery', basePrice: 14, image: 'https://loremflickr.com/400/400/cobra,beer,bottle' },
  { title: "Kingfisher Premium Lager 12x330ml", category: 'grocery', basePrice: 14, image: 'https://loremflickr.com/400/400/kingfisher,beer,bottle' },
  { title: "BrewDog Punk IPA 12x330ml", category: 'grocery', basePrice: 17, image: 'https://loremflickr.com/400/400/brewdog,ipa,beer' },
  { title: "Guinness Draught 8x440ml", category: 'grocery', basePrice: 11, image: 'https://loremflickr.com/400/400/guinness,beer,stout' },
  { title: "Old Speckled Hen Ale 8x500ml", category: 'grocery', basePrice: 10, image: 'https://loremflickr.com/400/400/ale,beer,bottle' },
  { title: "Hobgoblin Gold 8x500ml", category: 'grocery', basePrice: 10, image: 'https://loremflickr.com/400/400/ale,beer,bottle' },
  { title: "Strongbow Original Cider 18x440ml", category: 'grocery', basePrice: 16, image: 'https://loremflickr.com/400/400/strongbow,cider,can' },
  { title: "Kopparberg Strawberry & Lime 10x500ml", category: 'grocery', basePrice: 15, image: 'https://loremflickr.com/400/400/kopparberg,cider,bottle' },
  { title: "Magners Original Apple Cider 8x568ml", category: 'grocery', basePrice: 13, image: 'https://loremflickr.com/400/400/magners,cider,bottle' },
  { title: "Rekorderlig Wild Berries 4x500ml", category: 'grocery', basePrice: 9, image: 'https://loremflickr.com/400/400/rekorderlig,cider,bottle' },
  { title: "Smirnoff Red Label Vodka 70cl", category: 'grocery', basePrice: 17, image: 'https://loremflickr.com/400/400/smirnoff,vodka,bottle' },
  { title: "Absolut Vodka 70cl", category: 'grocery', basePrice: 18, image: 'https://loremflickr.com/400/400/absolut,vodka,bottle' },
  { title: "Gordon's London Dry Gin 70cl", category: 'grocery', basePrice: 16, image: 'https://loremflickr.com/400/400/gordons,gin,bottle' },
  { title: "Bombay Sapphire Gin 70cl", category: 'grocery', basePrice: 20, image: 'https://loremflickr.com/400/400/bombay,gin,bottle' },
  { title: "Captain Morgan Spiced Rum 70cl", category: 'grocery', basePrice: 17, image: 'https://loremflickr.com/400/400/captain,morgan,rum' },
  { title: "Bacardi Carta Blanca Rum 70cl", category: 'grocery', basePrice: 16, image: 'https://loremflickr.com/400/400/bacardi,rum,bottle' },
  { title: "Jack Daniel's Tennessee Whiskey 70cl", category: 'grocery', basePrice: 24, image: 'https://loremflickr.com/400/400/jack,daniels,whiskey' },
  { title: "Famous Grouse Blended Whisky 70cl", category: 'grocery', basePrice: 17, image: 'https://loremflickr.com/400/400/grouse,whisky,bottle' },
  { title: "Jameson Irish Whiskey 70cl", category: 'grocery', basePrice: 22, image: 'https://loremflickr.com/400/400/jameson,whiskey,bottle' },
  { title: "Hardys VR Chardonnay 75cl", category: 'grocery', basePrice: 7, image: 'https://loremflickr.com/400/400/wine,white,chardonnay' },
  { title: "Echo Falls Rosé Wine 75cl", category: 'grocery', basePrice: 6.5, image: 'https://loremflickr.com/400/400/wine,rose,bottle' },
  { title: "Yellow Tail Shiraz Red Wine 75cl", category: 'grocery', basePrice: 7.5, image: 'https://loremflickr.com/400/400/wine,red,shiraz' },
  { title: "Casillero del Diablo Merlot 75cl", category: 'grocery', basePrice: 8, image: 'https://loremflickr.com/400/400/wine,red,merlot' },
  { title: "Freixenet Cordon Negro Cava 75cl", category: 'grocery', basePrice: 9, image: 'https://loremflickr.com/400/400/cava,sparkling,wine' },
  { title: "Prosecco DOC 75cl", category: 'grocery', basePrice: 8, image: 'https://loremflickr.com/400/400/prosecco,sparkling,bottle' },

  // Soft drinks
  { title: "Coca-Cola Original 24x330ml", category: 'grocery', basePrice: 14, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400' },
  { title: "Diet Coke 24x330ml", category: 'grocery', basePrice: 12, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400' },
  { title: "Pepsi Max 24x330ml", category: 'grocery', basePrice: 11, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400' },
  { title: "Tropicana Smooth Orange Juice 1.4L", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400' },
  { title: "Innocent Smooth Orange Juice 900ml", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400' },
  { title: "Robinsons Apple & Blackcurrant Squash 1L", category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400' },
  { title: "Evian Still Water 6x1.5L", category: 'grocery', basePrice: 4.5, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { title: "Highland Spring Still Water 12x500ml", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
  { title: "Red Bull Energy Drink 4x250ml", category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400' },
  { title: "Lucozade Original Sport 4x500ml", category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400' },

  // Snacks & sweets
  { title: "Cadbury Dairy Milk 360g", category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
  { title: "Cadbury Dairy Milk Buttons 240g", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
  { title: "Galaxy Smooth Milk Chocolate 200g", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
  { title: "Maltesers Sharing Bag 175g", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
  { title: "Kit Kat 4 Finger Multipack 9 pack", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
  // Crisps & savoury snacks
  { title: "Walkers Crisps Variety 18x25g", category: 'grocery', basePrice: 5, image: 'https://loremflickr.com/400/400/walkers,crisps,packet' },
  { title: "Walkers Ready Salted 6x25g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/walkers,crisps,salted' },
  { title: "Walkers Cheese & Onion 6x25g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/walkers,cheese,onion' },
  { title: "Walkers Salt & Vinegar 6x25g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/walkers,salt,vinegar' },
  { title: "Walkers Sensations Thai Sweet Chilli 150g", category: 'grocery', basePrice: 2.2, image: 'https://loremflickr.com/400/400/sensations,crisps,packet' },
  { title: "Walkers Max Flame Grilled Steak 140g", category: 'grocery', basePrice: 2, image: 'https://loremflickr.com/400/400/walkers,max,crisps' },
  { title: "Doritos Chilli Heatwave 150g", category: 'grocery', basePrice: 2, image: 'https://loremflickr.com/400/400/doritos,chilli,crisps' },
  { title: "Doritos Cool Original 150g", category: 'grocery', basePrice: 2, image: 'https://loremflickr.com/400/400/doritos,cool,crisps' },
  { title: "Doritos Tangy Cheese 150g", category: 'grocery', basePrice: 2, image: 'https://loremflickr.com/400/400/doritos,cheese,crisps' },
  { title: "Pringles Original 200g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/pringles,can,original' },
  { title: "Pringles Sour Cream & Onion 200g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/pringles,sour,cream' },
  { title: "Pringles Salt & Vinegar 200g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/pringles,salt,vinegar' },
  { title: "Pringles Texas BBQ Sauce 200g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/pringles,bbq,texas' },
  { title: "Hula Hoops Original 6x24g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/hula,hoops,crisps' },
  { title: "Hula Hoops Big Hoops BBQ 70g", category: 'grocery', basePrice: 1, image: 'https://loremflickr.com/400/400/hula,hoops,bbq' },
  { title: "Quavers Cheese 6x16g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/quavers,crisps,cheese' },
  { title: "Wotsits Really Cheesy 6x16.5g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/wotsits,crisps,cheese' },
  { title: "Monster Munch Pickled Onion 6x22g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/monster,munch,pickled' },
  { title: "Monster Munch Roast Beef 6x22g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/monster,munch,beef' },
  { title: "McCoy's Salt & Malt Vinegar 6x25g", category: 'grocery', basePrice: 1.8, image: 'https://loremflickr.com/400/400/mccoys,crisps,vinegar' },
  { title: "McCoy's Flame Grilled Steak 70g", category: 'grocery', basePrice: 1.1, image: 'https://loremflickr.com/400/400/mccoys,crisps,steak' },
  { title: "Kettle Chips Lightly Salted 130g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/kettle,chips,crisps' },
  { title: "Kettle Chips Sea Salt & Balsamic Vinegar 130g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/kettle,chips,balsamic' },
  { title: "Tyrrells Lightly Sea Salted 150g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/tyrrells,crisps,salted' },
  { title: "Tyrrells Mature Cheddar & Chive 150g", category: 'grocery', basePrice: 2.5, image: 'https://loremflickr.com/400/400/tyrrells,cheddar,chive' },
  { title: "Popchips Sea Salt 85g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/popchips,crisps,salt' },
  { title: "Twiglets 105g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/twiglets,snack,uk' },
  { title: "Mini Cheddars 6x25g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/mini,cheddars,biscuit' },
  { title: "Pom-Bear Original 6x13g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/pombear,crisps,bear' },
  { title: "Snack a Jacks Cheese 6x22g", category: 'grocery', basePrice: 1.7, image: 'https://loremflickr.com/400/400/snack,jacks,rice' },
  { title: "Skips Prawn Cocktail 6x13g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/skips,crisps,prawn' },
  { title: "Frazzles Crispy Bacon 6x18g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/frazzles,bacon,crisps' },
  { title: "Discos Cheese & Onion 6x25g", category: 'grocery', basePrice: 1.5, image: 'https://loremflickr.com/400/400/discos,crisps,cheese' },
  { title: "Tortilla Chips Lightly Salted 200g", category: 'grocery', basePrice: 1.8, image: 'https://loremflickr.com/400/400/tortilla,chips,salted' },
  { title: "Bombay Mix 200g", category: 'grocery', basePrice: 1.2, image: 'https://loremflickr.com/400/400/bombay,mix,snack' },
  { title: "McVitie's Digestive Biscuits 360g", category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
  { title: "McVitie's Chocolate Digestives 433g", category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
  { title: "Jaffa Cakes 30 pack", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
  { title: "Haribo Starmix 700g", category: 'grocery', basePrice: 4.5, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },

  // Indian / world food
  { title: "Patak's Tikka Masala Cooking Sauce 450g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Patak's Korma Curry Paste 290g", category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "TRS Chana Dal 500g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { title: "TRS Kala Chana 500g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { title: "TRS Red Lentils 1kg", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { title: "Sharwood's Plain Naan Bread 2 pack", category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { title: "Patak's Mango Chutney 340g", category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Kikkoman Soy Sauce 250ml", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Old El Paso Fajita Kit", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Sriracha Hot Chilli Sauce 481g", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },

  // Household & toiletries (still grocery-cart category in UK supermarkets)
  { title: "Andrex Classic Clean Toilet Roll 16 pack", category: 'grocery', basePrice: 9.5, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Plenty Kitchen Roll 6 pack", category: 'grocery', basePrice: 7, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Fairy Original Washing Up Liquid 870ml", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Persil Bio Washing Liquid 1.43L", category: 'grocery', basePrice: 7, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Comfort Pure Fabric Conditioner 1.5L", category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Cif Cream Lemon 500ml", category: 'grocery', basePrice: 1.5, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Colgate Total Toothpaste 75ml", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
  { title: "Head & Shoulders Classic Clean Shampoo 500ml", category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
  { title: "Pampers Baby Dry Size 4 Nappies 50 pack", category: 'grocery', basePrice: 9, image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400' },
  { title: "Pampers Baby Dry Size 1 Newborn 88 pack", category: 'grocery', basePrice: 12, image: '' },
  { title: "Pampers Baby Dry Size 2 Mini 96 pack", category: 'grocery', basePrice: 13, image: '' },
  { title: "Pampers Baby Dry Size 3 Midi 90 pack", category: 'grocery', basePrice: 13, image: '' },
  { title: "Pampers Baby Dry Size 5 Junior 44 pack", category: 'grocery', basePrice: 11, image: '' },
  { title: "Pampers Baby Dry Size 6 Extra Large 39 pack", category: 'grocery', basePrice: 11, image: '' },
  { title: "Pampers Pure Protection Size 4", category: 'grocery', basePrice: 14, image: '' },
  { title: "Huggies Pull-Ups Boys Size 5-7", category: 'grocery', basePrice: 12, image: '' },
  { title: "Huggies Little Movers Size 4", category: 'grocery', basePrice: 10, image: '' },
  { title: "Aldi Mamia Newborn Nappies Size 1", category: 'grocery', basePrice: 3, image: '' },

  // ─── Baby food & formula ───────────────────────────────────────────────────
  { title: "SMA Pro First Infant Milk Stage 1 800g", category: 'grocery', basePrice: 13.50, image: '' },
  { title: "SMA Pro Follow-on Milk Stage 2 800g", category: 'grocery', basePrice: 13.50, image: '' },
  { title: "Aptamil First Infant Milk Stage 1 800g", category: 'grocery', basePrice: 14, image: '' },
  { title: "Aptamil Profutura First Milk 800g", category: 'grocery', basePrice: 18, image: '' },
  { title: "Cow & Gate First Infant Milk 800g", category: 'grocery', basePrice: 11, image: '' },
  { title: "Cow & Gate Follow-on Milk 800g", category: 'grocery', basePrice: 11, image: '' },
  { title: "HiPP Organic Combiotic First Milk 800g", category: 'grocery', basePrice: 13, image: '' },
  { title: "Kendamil Organic First Infant Milk 800g", category: 'grocery', basePrice: 16, image: '' },
  { title: "Ella's Kitchen Stage 1 Pouch Variety Pack", category: 'grocery', basePrice: 4.50, image: '' },
  { title: "Ella's Kitchen The Yellow One Smoothie Pouch", category: 'grocery', basePrice: 1.20, image: '' },
  { title: "Ella's Kitchen Spaghetti Bolognese Pouch", category: 'grocery', basePrice: 1.50, image: '' },
  { title: "Heinz By Nature Pear & Apple Jar 4+ months", category: 'grocery', basePrice: 0.85, image: '' },
  { title: "Heinz First Steps Baby Rice 125g", category: 'grocery', basePrice: 1.30, image: '' },
  { title: "Plum Baby Stage 2 Organic Pouch", category: 'grocery', basePrice: 1.40, image: '' },
  { title: "Organix Stage 1 Apple Pure Pouch", category: 'grocery', basePrice: 1.20, image: '' },
  { title: "Organix Baby Banana Rice Cakes", category: 'grocery', basePrice: 1.50, image: '' },
  { title: "Cow & Gate Cereal Baby Porridge", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Nestle Cerelac Wheat Cereal", category: 'grocery', basePrice: 3, image: '' },
  { title: "Hipp Organic Strawberry Yoghurt Stage 2", category: 'grocery', basePrice: 0.95, image: '' },
  { title: "Petits Filous Strawberry & Banana Yoghurt 6 pack", category: 'grocery', basePrice: 2.30, image: '' },
  { title: "Aptamil Toddler Growing Up Milk 1L", category: 'grocery', basePrice: 2, image: '' },
  { title: "Heinz Toddler Pasta Meal Jar", category: 'grocery', basePrice: 1, image: '' },

  // ─── Baby accessories ──────────────────────────────────────────────────────
  { title: "Tommee Tippee Closer to Nature Bottle 260ml", category: 'grocery', basePrice: 8, image: '' },
  { title: "Tommee Tippee Anti-Colic Bottle Set", category: 'grocery', basePrice: 25, image: '' },
  { title: "MAM Easy Start Anti-Colic Bottle 260ml", category: 'grocery', basePrice: 9, image: '' },
  { title: "MAM Original Soothing Sleep Soother", category: 'grocery', basePrice: 5.50, image: '' },
  { title: "Avent Natural Response Baby Bottle 260ml", category: 'grocery', basePrice: 9, image: '' },
  { title: "Cussons Baby Wipes Fragrance Free 12 pack", category: 'grocery', basePrice: 12, image: '' },
  { title: "WaterWipes Sensitive Baby Wipes 12 pack", category: 'grocery', basePrice: 18, image: '' },
  { title: "Pampers Aqua Pure Wipes 12 pack", category: 'grocery', basePrice: 12, image: '' },
  { title: "Johnson's Baby Shampoo 500ml", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Johnson's Baby Bath 500ml", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Aveeno Baby Daily Care Lotion 250ml", category: 'grocery', basePrice: 6, image: '' },
  { title: "Sudocrem Antiseptic Healing Cream 250g", category: 'grocery', basePrice: 5.50, image: '' },
  { title: "Bepanthen Nappy Care Ointment 100g", category: 'grocery', basePrice: 6.50, image: '' },
  { title: "Calpol Infant Suspension Strawberry 200ml", category: 'grocery', basePrice: 5, image: '' },
  { title: "Tommee Tippee Steam Steriliser", category: 'home', basePrice: 35, image: '' },

  // ─── Kitchen products ──────────────────────────────────────────────────────
  { title: "Stainless Steel Knife Set 6 piece with Block", category: 'home', basePrice: 35, image: '' },
  { title: "Wusthof Classic 20cm Chef's Knife", category: 'home', basePrice: 99, image: '' },
  { title: "Bamboo Chopping Board Large", category: 'home', basePrice: 12, image: '' },
  { title: "Plastic Chopping Board Set 3 piece", category: 'home', basePrice: 8, image: '' },
  { title: "Tefal Non-Stick Frying Pan 28cm", category: 'home', basePrice: 22, image: '' },
  { title: "Tefal Ingenio 8 piece Pan Set", category: 'home', basePrice: 95, image: '' },
  { title: "Stainless Steel Saucepan Set 5 piece", category: 'home', basePrice: 75, image: '' },
  { title: "Le Creuset Signature Casserole 24cm", category: 'home', basePrice: 285, image: '' },
  { title: "Pyrex Glass Casserole Dish with Lid 2.5L", category: 'home', basePrice: 18, image: '' },
  { title: "Cooking Utensil Set 12 piece Silicone", category: 'home', basePrice: 16, image: '' },
  { title: "Stainless Steel Mixing Bowls Set 3 piece", category: 'home', basePrice: 14, image: '' },
  { title: "Joseph Joseph Nest Measuring Cups Set", category: 'home', basePrice: 18, image: '' },
  { title: "Kitchen Tea Towels Cotton 6 pack", category: 'home', basePrice: 6, image: '' },
  { title: "Heat Resistant Silicone Oven Gloves Pair", category: 'home', basePrice: 8, image: '' },
  { title: "Cotton Apron with Pocket Adjustable", category: 'home', basePrice: 8, image: '' },
  { title: "Rotating Spice Rack with 16 Glass Jars", category: 'home', basePrice: 28, image: '' },
  { title: "Bread Bin Stainless Steel Large", category: 'home', basePrice: 24, image: '' },
  { title: "Mug Tree Holder 6 hooks", category: 'home', basePrice: 12, image: '' },
  { title: "Denby Halo 16 piece Dinner Set", category: 'home', basePrice: 169, image: '' },
  { title: "Bormioli Rocco Tumblers 6 pack", category: 'home', basePrice: 14, image: '' },
  { title: "Riedel Vinum Cabernet Wine Glass Set of 2", category: 'home', basePrice: 65, image: '' },
  { title: "Springform Cake Tin 23cm Non-stick", category: 'home', basePrice: 9, image: '' },
  { title: "Baking Tray Heavy Duty Non-stick 3 pack", category: 'home', basePrice: 14, image: '' },
  { title: "Salter Digital Kitchen Scales", category: 'home', basePrice: 18, image: '' },
  { title: "Kenwood KMix Stand Mixer KMX750", category: 'home', basePrice: 299, image: '' },
  { title: "KitchenAid Artisan Stand Mixer 4.8L", category: 'home', basePrice: 499, image: '' },
  { title: "Magimix 5200XL Food Processor", category: 'home', basePrice: 449, image: '' },
  { title: "NutriBullet 600 Series Blender", category: 'home', basePrice: 79, image: '' },
  { title: "Russell Hobbs Inspire Toaster 4 Slice", category: 'home', basePrice: 39, image: '' },
  { title: "Bosch Tassimo Style Coffee Pod Machine", category: 'home', basePrice: 55, image: '' },

  // ─── More cleaning products ────────────────────────────────────────────────
  { title: "Dettol Mould & Mildew Remover Spray 750ml", category: 'grocery', basePrice: 4, image: '' },
  { title: "Dettol All-in-One Disinfectant Spray", category: 'grocery', basePrice: 4, image: '' },
  { title: "Mr Muscle Drain Unblocker Gel 500ml", category: 'grocery', basePrice: 3.50, image: '' },
  { title: "Mr Muscle Oven Cleaner Spray", category: 'grocery', basePrice: 3, image: '' },
  { title: "Cif Cream Original 500ml", category: 'grocery', basePrice: 1.50, image: '' },
  { title: "Cif Power & Shine Spray 700ml", category: 'grocery', basePrice: 2, image: '' },
  { title: "Method Multi-Surface Spray Grapefruit 828ml", category: 'grocery', basePrice: 4, image: '' },
  { title: "Method Glass Cleaner 828ml", category: 'grocery', basePrice: 4, image: '' },
  { title: "Astonish Cream Cleaner 500g", category: 'grocery', basePrice: 1.20, image: '' },
  { title: "Stardrops The Pink Stuff Paste 500g", category: 'grocery', basePrice: 1.50, image: '' },
  { title: "The Pink Stuff Multi-Purpose Spray 850ml", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Flash Cleaning Wipes Lemon 60 pack", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Flash All Purpose Cleaner Lemon 1L", category: 'grocery', basePrice: 1.50, image: '' },
  { title: "Domestos Original Thick Bleach 750ml", category: 'grocery', basePrice: 1.20, image: '' },
  { title: "Toilet Duck Fresh Discs Lavender", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Windowlene Original 500ml", category: 'grocery', basePrice: 2, image: '' },
  { title: "Mr Sheen Multi-Surface Polish 250ml", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Pledge Furniture Polish Spray 250ml", category: 'grocery', basePrice: 3, image: '' },
  { title: "Heavy Duty Bin Bags 50L 100 pack", category: 'grocery', basePrice: 8, image: '' },
  { title: "Tie Top Kitchen Bin Bags 30L 100 pack", category: 'grocery', basePrice: 4, image: '' },
  { title: "Scotch-Brite Heavy Duty Sponges 10 pack", category: 'grocery', basePrice: 3, image: '' },
  { title: "Microfibre Cloths 10 pack Multi Colour", category: 'grocery', basePrice: 4, image: '' },
  { title: "Yellow Dusters Cotton 10 pack", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Marigold Extra Life Rubber Gloves Medium", category: 'grocery', basePrice: 1.80, image: '' },
  { title: "Viakal Limescale Remover 750ml", category: 'grocery', basePrice: 3, image: '' },
  { title: "Calgon Water Softener Tabs 75 pack", category: 'grocery', basePrice: 9, image: '' },
  { title: "Lenor Tumble Dryer Sheets Spring Awakening", category: 'grocery', basePrice: 3, image: '' },
  { title: "Bold All-in-1 Pods Lavender & Camomile 24 pack", category: 'grocery', basePrice: 6, image: '' },
  { title: "Surf Tropical Lily Washing Powder 65 wash", category: 'grocery', basePrice: 7, image: '' },
  { title: "Vanish Gold Oxi Action Stain Remover Powder", category: 'grocery', basePrice: 7, image: '' },

  // ─── More chocolate ────────────────────────────────────────────────────────
  { title: "Cadbury Wispa Multipack 8 bars", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Cadbury Twirl Multipack 5 bars", category: 'grocery', basePrice: 2, image: '' },
  { title: "Cadbury Flake Multipack 6 bars", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Cadbury Crunchie Multipack 4 bars", category: 'grocery', basePrice: 1.50, image: '' },
  { title: "Cadbury Curly Wurly Multipack 5 bars", category: 'grocery', basePrice: 1.20, image: '' },
  { title: "Cadbury Heroes Tub 600g", category: 'grocery', basePrice: 6, image: '' },
  { title: "Cadbury Roses Tub 600g", category: 'grocery', basePrice: 6, image: '' },
  { title: "Quality Street Tub 600g", category: 'grocery', basePrice: 6, image: '' },
  { title: "Celebrations Chocolate Tub 600g", category: 'grocery', basePrice: 6, image: '' },
  { title: "Lindt Lindor Milk Chocolate 200g", category: 'grocery', basePrice: 5, image: '' },
  { title: "Lindt Excellence 70% Dark Chocolate 100g", category: 'grocery', basePrice: 2, image: '' },
  { title: "Ferrero Rocher 24 pack Boxed", category: 'grocery', basePrice: 9, image: '' },
  { title: "Toblerone Milk Chocolate 360g", category: 'grocery', basePrice: 5, image: '' },
  { title: "Reese's Peanut Butter Cups 4 pack", category: 'grocery', basePrice: 2.50, image: '' },
  { title: "Hershey's Cookies & Creme Bar 43g", category: 'grocery', basePrice: 1, image: '' },
  { title: "Twirl Orange Multipack 5 bars", category: 'grocery', basePrice: 2, image: '' },

  // ─── More water & soft drinks ──────────────────────────────────────────────
  { title: "Buxton Still Mineral Water 12x500ml", category: 'grocery', basePrice: 5, image: '' },
  { title: "Buxton Sparkling Water 12x500ml", category: 'grocery', basePrice: 5, image: '' },
  { title: "Volvic Touch of Strawberry 6x500ml", category: 'grocery', basePrice: 4, image: '' },
  { title: "Volvic Original Still Water 8x1.5L", category: 'grocery', basePrice: 6, image: '' },
  { title: "San Pellegrino Sparkling 6x500ml", category: 'grocery', basePrice: 4.50, image: '' },
  { title: "Perrier Sparkling Mineral Water 10x330ml", category: 'grocery', basePrice: 6, image: '' },
  { title: "Belu Still Glass Bottle 6x330ml", category: 'grocery', basePrice: 8, image: '' },
  { title: "Vita Coco Coconut Water 1L", category: 'grocery', basePrice: 3, image: '' },
  { title: "Fanta Orange 24x330ml", category: 'grocery', basePrice: 12, image: '' },
  { title: "Sprite Lemon Lime 24x330ml", category: 'grocery', basePrice: 12, image: '' },
  { title: "7UP Free 24x330ml", category: 'grocery', basePrice: 11, image: '' },
  { title: "Dr Pepper 24x330ml", category: 'grocery', basePrice: 13, image: '' },
  { title: "Schweppes Slimline Tonic Water 8x150ml", category: 'grocery', basePrice: 4, image: '' },
  { title: "Fever-Tree Premium Indian Tonic 8x500ml", category: 'grocery', basePrice: 6, image: '' },

  // ─── Food delivery (Uber Eats / Deliveroo / Just Eat) ──────────────────────
  // Pizza
  { title: "Domino's Pepperoni Passion Large", category: 'food', basePrice: 18.99, image: '' },
  { title: "Domino's Mighty Meaty Medium", category: 'food', basePrice: 15.99, image: '' },
  { title: "Domino's Vegi Sizzler Large", category: 'food', basePrice: 17.99, image: '' },
  { title: "Pizza Hut Margherita Medium", category: 'food', basePrice: 13.99, image: '' },
  { title: "Pizza Hut Meat Feast Large", category: 'food', basePrice: 19.99, image: '' },
  { title: "Papa John's Hot Pepper Passion Large", category: 'food', basePrice: 16.99, image: '' },
  { title: "Franco Manca Sourdough Pizza No 4", category: 'food', basePrice: 9.95, image: '' },

  // Burgers
  { title: "McDonald's Big Mac Meal Large", category: 'food', basePrice: 8.49, image: '' },
  { title: "McDonald's Quarter Pounder with Cheese Meal", category: 'food', basePrice: 8.99, image: '' },
  { title: "McDonald's Chicken Big Mac Meal", category: 'food', basePrice: 8.49, image: '' },
  { title: "Burger King Whopper Meal", category: 'food', basePrice: 9.49, image: '' },
  { title: "Burger King Bacon Double Cheeseburger Meal", category: 'food', basePrice: 9.99, image: '' },
  { title: "Five Guys Cheeseburger with Fries", category: 'food', basePrice: 14.95, image: '' },
  { title: "Honest Burgers Tribute Burger", category: 'food', basePrice: 13.50, image: '' },
  { title: "GBK Classic Cheese Burger", category: 'food', basePrice: 12.95, image: '' },
  { title: "Shake Shack ShackBurger Meal", category: 'food', basePrice: 13.95, image: '' },

  // Chicken
  { title: "KFC Bargain Bucket 10 Piece", category: 'food', basePrice: 22.99, image: '' },
  { title: "KFC Boneless Banquet for One", category: 'food', basePrice: 7.99, image: '' },
  { title: "KFC Zinger Tower Burger Meal", category: 'food', basePrice: 8.99, image: '' },
  { title: "Nando's Half Chicken PERi-PERi", category: 'food', basePrice: 11.50, image: '' },
  { title: "Nando's Chicken Pitta with Two Sides", category: 'food', basePrice: 12.95, image: '' },
  { title: "Wingstop 10 Wings Combo", category: 'food', basePrice: 13.99, image: '' },

  // Indian / Curry
  { title: "Dishoom Chicken Ruby Curry", category: 'food', basePrice: 16.50, image: '' },
  { title: "Indian Tikka Masala Set Meal for Two", category: 'food', basePrice: 24.99, image: '' },
  { title: "Lamb Biryani with Raita", category: 'food', basePrice: 13.99, image: '' },
  { title: "Veg Thali Indian Platter", category: 'food', basePrice: 14.99, image: '' },

  // Asian / Sushi
  { title: "Wagamama Chicken Katsu Curry", category: 'food', basePrice: 13.50, image: '' },
  { title: "Wagamama Yaki Soba", category: 'food', basePrice: 12.95, image: '' },
  { title: "Itsu Salmon Teriyaki Bento", category: 'food', basePrice: 9.95, image: '' },
  { title: "Yo Sushi Mixed Sushi Platter", category: 'food', basePrice: 18.95, image: '' },
  { title: "Wasabi Chicken Katsu Curry", category: 'food', basePrice: 8.95, image: '' },
  { title: "Ramen Noodle Bowl Tonkotsu", category: 'food', basePrice: 12.50, image: '' },
  { title: "Pho Vietnamese Beef Noodle Soup", category: 'food', basePrice: 11.95, image: '' },

  // Mexican
  { title: "Chipotle Chicken Burrito Bowl", category: 'food', basePrice: 9.95, image: '' },
  { title: "Taco Bell Crunchwrap Supreme Meal", category: 'food', basePrice: 8.99, image: '' },

  // Sandwiches / Salads
  { title: "Subway Italian B.M.T. Footlong Meal", category: 'food', basePrice: 9.49, image: '' },
  { title: "Subway Chicken Teriyaki 6 inch", category: 'food', basePrice: 5.49, image: '' },
  { title: "Pret a Manger Chicken Avocado Baguette", category: 'food', basePrice: 5.95, image: '' },
  { title: "Pret a Manger Tuna Cucumber Baguette", category: 'food', basePrice: 4.85, image: '' },
  { title: "Leon Sweet Potato Falafel Hot Box", category: 'food', basePrice: 9.45, image: '' },
  { title: "Caesar Salad with Grilled Chicken", category: 'food', basePrice: 10.95, image: '' },

  // Greek / Mediterranean
  { title: "Doner Kebab with Salad & Chilli Sauce", category: 'food', basePrice: 8.50, image: '' },
  { title: "Halloumi Wrap with Chips", category: 'food', basePrice: 9.95, image: '' },
  { title: "Lamb Shawarma Plate", category: 'food', basePrice: 12.99, image: '' },

  // Breakfast / Bakery
  { title: "Greggs Sausage Roll", category: 'food', basePrice: 1.30, image: '' },
  { title: "Greggs Steak Bake", category: 'food', basePrice: 2.00, image: '' },
  { title: "Greggs Breakfast Roll Bacon", category: 'food', basePrice: 2.85, image: '' },
  { title: "Full English Breakfast Plate", category: 'food', basePrice: 11.50, image: '' },
  { title: "Eggs Benedict with Smoked Salmon", category: 'food', basePrice: 12.95, image: '' },

  // Coffee / Drinks
  { title: "Starbucks Caramel Macchiato Grande", category: 'food', basePrice: 4.45, image: '' },
  { title: "Costa Coffee Flat White Medium", category: 'food', basePrice: 3.75, image: '' },
  { title: "Caffe Nero Cappuccino Regular", category: 'food', basePrice: 3.65, image: '' },
  { title: "Pret a Manger Latte", category: 'food', basePrice: 3.45, image: '' },
  { title: "Bubble Tea Brown Sugar Boba", category: 'food', basePrice: 5.50, image: '' },

  // Desserts
  { title: "Krispy Kreme Original Glazed 12 pack", category: 'food', basePrice: 14.95, image: '' },
  { title: "Cinnabon Classic Roll", category: 'food', basePrice: 4.95, image: '' },

  // ─── Used cars (AutoTrader / Motors / Carwow style listings) ───────────────
  { title: "Ford Fiesta 1.0 EcoBoost Zetec 2019 Used", category: 'cars', basePrice: 8995, image: '' },
  { title: "Ford Fiesta ST-Line 2020 Used", category: 'cars', basePrice: 11495, image: '' },
  { title: "Ford Focus Titanium 1.5 2020 Used", category: 'cars', basePrice: 13995, image: '' },
  { title: "Ford Kuga ST-Line Hybrid 2021 SUV", category: 'cars', basePrice: 21995, image: '' },
  { title: "Volkswagen Golf GTI 2020 Used", category: 'cars', basePrice: 18995, image: '' },
  { title: "Volkswagen Polo Match 1.0 2020", category: 'cars', basePrice: 12495, image: '' },
  { title: "BMW 3 Series 320d M Sport 2020 Used", category: 'cars', basePrice: 22495, image: '' },
  { title: "BMW 1 Series 118i M Sport 2021", category: 'cars', basePrice: 19995, image: '' },
  { title: "BMW X3 xDrive 30e M Sport 2022 SUV", category: 'cars', basePrice: 38995, image: '' },
  { title: "Audi A3 Sportback 1.5 S Line 2021 Used", category: 'cars', basePrice: 21995, image: '' },
  { title: "Audi A4 Avant 2.0 TFSI 2020 Used", category: 'cars', basePrice: 23995, image: '' },
  { title: "Audi Q3 SUV 2.0 TFSI 2021", category: 'cars', basePrice: 27995, image: '' },
  { title: "Mercedes-Benz A-Class A180 AMG Line 2020", category: 'cars', basePrice: 22495, image: '' },
  { title: "Mercedes-Benz C-Class C220d AMG Line 2021", category: 'cars', basePrice: 28995, image: '' },
  { title: "Mercedes-Benz GLA 200 AMG Line 2021 SUV", category: 'cars', basePrice: 27495, image: '' },
  { title: "MINI Cooper S 3-Door 2020 Used", category: 'cars', basePrice: 17995, image: '' },
  { title: "MINI Countryman Cooper Sport 2021", category: 'cars', basePrice: 21995, image: '' },
  { title: "Vauxhall Corsa 1.2 SE Premium 2020", category: 'cars', basePrice: 9995, image: '' },
  { title: "Vauxhall Astra SRi 1.4 2020", category: 'cars', basePrice: 12495, image: '' },
  { title: "Toyota Yaris Hybrid Icon 2021", category: 'cars', basePrice: 14495, image: '' },
  { title: "Toyota Corolla Hybrid Excel 2021", category: 'cars', basePrice: 17995, image: '' },
  { title: "Toyota RAV4 Hybrid AWD 2021 SUV", category: 'cars', basePrice: 26995, image: '' },
  { title: "Honda Civic 1.0 VTEC Turbo SR 2020", category: 'cars', basePrice: 15995, image: '' },
  { title: "Honda HR-V SE Hybrid 2022 SUV", category: 'cars', basePrice: 23995, image: '' },
  { title: "Nissan Qashqai N-Connecta 2020 SUV", category: 'cars', basePrice: 17995, image: '' },
  { title: "Nissan Juke Tekna Manual 2021 SUV", category: 'cars', basePrice: 16995, image: '' },
  { title: "Nissan Leaf Tekna 40kWh Electric 2021", category: 'cars', basePrice: 17995, image: '' },
  { title: "Tesla Model 3 Long Range AWD 2022 Electric", category: 'cars', basePrice: 32995, image: '' },
  { title: "Tesla Model Y Performance 2023 Electric SUV", category: 'cars', basePrice: 44995, image: '' },
  { title: "Hyundai Tucson Premium Hybrid 2022 SUV", category: 'cars', basePrice: 23995, image: '' },
  { title: "Hyundai i20 Premium 2021", category: 'cars', basePrice: 13495, image: '' },
  { title: "Kia Sportage GT-Line 1.6 T-GDi 2021 SUV", category: 'cars', basePrice: 22995, image: '' },
  { title: "Kia Niro EV 4 Long Range 2022 Electric SUV", category: 'cars', basePrice: 26995, image: '' },
  { title: "Peugeot 208 GT Line 2020", category: 'cars', basePrice: 12495, image: '' },
  { title: "Peugeot 3008 GT Premium 2021 SUV", category: 'cars', basePrice: 20995, image: '' },
  { title: "Citroen C3 Shine Plus 2020", category: 'cars', basePrice: 10495, image: '' },
  { title: "Renault Clio RS Line 2020", category: 'cars', basePrice: 11995, image: '' },
  { title: "Renault Captur S Edition 2021 SUV", category: 'cars', basePrice: 14995, image: '' },
  { title: "SEAT Leon FR 1.5 TSI 2021", category: 'cars', basePrice: 17995, image: '' },
  { title: "Skoda Octavia SE Technology 2020", category: 'cars', basePrice: 15495, image: '' },
  { title: "Mazda CX-5 Sport Nav+ AWD 2021 SUV", category: 'cars', basePrice: 23995, image: '' },
  { title: "Mazda MX-5 Roadster GT Sport 2019", category: 'cars', basePrice: 21495, image: '' },
  { title: "Range Rover Evoque R-Dynamic SE 2020 SUV", category: 'cars', basePrice: 29995, image: '' },
  { title: "Land Rover Discovery Sport HSE 2021 SUV", category: 'cars', basePrice: 31995, image: '' },
  { title: "Volvo XC40 Recharge T5 Hybrid 2022 SUV", category: 'cars', basePrice: 32995, image: '' },
  { title: "Volvo XC60 Inscription D4 2020 SUV", category: 'cars', basePrice: 28495, image: '' },
  { title: "Suzuki Swift Sport 1.4 Boosterjet 2019", category: 'cars', basePrice: 11995, image: '' },
  { title: "Jaguar XE 2.0 S 2019 Used", category: 'cars', basePrice: 18995, image: '' },
  { title: "Lexus IS 300h F Sport 2020", category: 'cars', basePrice: 24995, image: '' },
  { title: "Polestar 2 Long Range Single Motor 2022 Electric", category: 'cars', basePrice: 34995, image: '' },

  // ─── Insurance ─────────────────────────────────────────────────────────────
  { title: "Car Insurance Comprehensive Annual Cover", category: 'insurance', basePrice: 580, image: '' },
  { title: "Car Insurance Third Party Fire & Theft", category: 'insurance', basePrice: 380, image: '' },
  { title: "Young Driver Car Insurance with Black Box", category: 'insurance', basePrice: 980, image: '' },
  { title: "Multi-Car Insurance Family Policy", category: 'insurance', basePrice: 1290, image: '' },
  { title: "Classic Car Insurance Comprehensive", category: 'insurance', basePrice: 420, image: '' },
  { title: "Van Insurance Commercial Use Annual", category: 'insurance', basePrice: 740, image: '' },
  { title: "Motorbike Insurance Comprehensive", category: 'insurance', basePrice: 320, image: '' },
  { title: "Caravan Insurance Touring Annual", category: 'insurance', basePrice: 290, image: '' },
  { title: "Home Buildings & Contents Insurance Annual", category: 'insurance', basePrice: 250, image: '' },
  { title: "Home Contents Only Insurance", category: 'insurance', basePrice: 160, image: '' },
  { title: "Home Emergency Cover Annual", category: 'insurance', basePrice: 110, image: '' },
  { title: "Landlord Building Insurance Annual", category: 'insurance', basePrice: 320, image: '' },
  { title: "Pet Insurance Lifetime Cover Dog", category: 'insurance', basePrice: 380, image: '' },
  { title: "Pet Insurance Maximum Benefit Dog", category: 'insurance', basePrice: 280, image: '' },
  { title: "Pet Insurance Accident Only Cat", category: 'insurance', basePrice: 110, image: '' },
  { title: "Travel Insurance Worldwide Annual Multi-Trip", category: 'insurance', basePrice: 95, image: '' },
  { title: "Travel Insurance Europe Single Trip 14 Days", category: 'insurance', basePrice: 28, image: '' },
  { title: "Travel Insurance Backpacker 12 Month", category: 'insurance', basePrice: 180, image: '' },
  { title: "Cruise Travel Insurance Single Trip", category: 'insurance', basePrice: 65, image: '' },
  { title: "Life Insurance Level Term 20 Year £100k", category: 'insurance', basePrice: 110, image: '' },
  { title: "Life Insurance Decreasing Term 25 Year", category: 'insurance', basePrice: 85, image: '' },
  { title: "Whole of Life Insurance Over 50s", category: 'insurance', basePrice: 180, image: '' },
  { title: "Private Health Insurance Family Plan", category: 'insurance', basePrice: 1290, image: '' },
  { title: "Private Medical Insurance Individual", category: 'insurance', basePrice: 580, image: '' },
  { title: "Critical Illness Cover 20 Year Level", category: 'insurance', basePrice: 240, image: '' },
  { title: "Income Protection Insurance Long Term", category: 'insurance', basePrice: 290, image: '' },
  { title: "Mortgage Protection Insurance", category: 'insurance', basePrice: 190, image: '' },
  { title: "Dental Insurance Family Plan Annual", category: 'insurance', basePrice: 220, image: '' },
  { title: "Gadget Insurance Phone & Laptop Cover", category: 'insurance', basePrice: 95, image: '' },
  { title: "Wedding Insurance Standard Plan", category: 'insurance', basePrice: 45, image: '' },

  // ─── Broadband ─────────────────────────────────────────────────────────────
  { title: "Sky Stream Full Fibre 100Mb 18 Month Contract", category: 'broadband', basePrice: 25, image: '' },
  { title: "Sky Stream Full Fibre 500Mb 18 Month", category: 'broadband', basePrice: 35, image: '' },
  { title: "Sky Gigafast 1Gb Broadband 18 Month", category: 'broadband', basePrice: 45, image: '' },
  { title: "Sky TV & Broadband Ultimate On Demand", category: 'broadband', basePrice: 49, image: '' },
  { title: "BT Full Fibre 100Mb 24 Month Contract", category: 'broadband', basePrice: 27.99, image: '' },
  { title: "BT Full Fibre 500Mb 24 Month", category: 'broadband', basePrice: 39.99, image: '' },
  { title: "BT Full Fibre 900Mb Gig 24 Month", category: 'broadband', basePrice: 49.99, image: '' },
  { title: "BT TV & Broadband Big Sport Bundle", category: 'broadband', basePrice: 55, image: '' },
  { title: "Virgin Media M125 Fibre Broadband 18 Month", category: 'broadband', basePrice: 26, image: '' },
  { title: "Virgin Media M250 Fibre Broadband 18 Month", category: 'broadband', basePrice: 32, image: '' },
  { title: "Virgin Media M500 Gig 18 Month", category: 'broadband', basePrice: 36, image: '' },
  { title: "Virgin Media Gig1 1.1Gb 18 Month", category: 'broadband', basePrice: 42, image: '' },
  { title: "TalkTalk Fibre 65 Broadband 24 Month", category: 'broadband', basePrice: 23, image: '' },
  { title: "TalkTalk Fibre 150 Broadband 24 Month", category: 'broadband', basePrice: 28, image: '' },
  { title: "NOW Brilliant Broadband 11Mb Monthly", category: 'broadband', basePrice: 23, image: '' },
  { title: "NOW Super Fibre Broadband 63Mb", category: 'broadband', basePrice: 26, image: '' },
  { title: "NOW Fibre Plus Broadband 145Mb", category: 'broadband', basePrice: 31, image: '' },
  { title: "Plusnet Full Fibre 74 Broadband 24 Month", category: 'broadband', basePrice: 25, image: '' },
  { title: "Plusnet Full Fibre 145 Broadband 24 Month", category: 'broadband', basePrice: 28, image: '' },
  { title: "Vodafone Pro II Full Fibre 100Mb 24 Month", category: 'broadband', basePrice: 26, image: '' },
  { title: "Vodafone Gigafast 1Gb 24 Month", category: 'broadband', basePrice: 44, image: '' },
  { title: "Hyperoptic 1Gb Symmetrical 24 Month", category: 'broadband', basePrice: 35, image: '' },
  { title: "Hyperoptic 500Mb Symmetrical Fibre", category: 'broadband', basePrice: 30, image: '' },

  // ─── Mobile plans (SIM only & contracts) ────────────────────────────────────
  { title: "EE 100GB Smart SIM Only 24 Month 5G", category: 'mobileplan', basePrice: 18, image: '' },
  { title: "EE Unlimited Data SIM Only 24 Month", category: 'mobileplan', basePrice: 28, image: '' },
  { title: "EE Smart Plan iPhone 15 Pro 256GB Unlimited", category: 'mobileplan', basePrice: 75, image: '' },
  { title: "EE iPhone 16 Pro Max Smart Plan 100GB", category: 'mobileplan', basePrice: 79, image: '' },
  { title: "EE Samsung Galaxy S24 Ultra Plan 100GB", category: 'mobileplan', basePrice: 65, image: '' },
  { title: "Vodafone Unlimited Lite SIM Only 24 Month", category: 'mobileplan', basePrice: 22, image: '' },
  { title: "Vodafone Unlimited Max SIM Only", category: 'mobileplan', basePrice: 30, image: '' },
  { title: "Vodafone Pay Monthly iPhone 16 Pro 100GB", category: 'mobileplan', basePrice: 68, image: '' },
  { title: "Vodafone 100GB Pay Monthly SIM", category: 'mobileplan', basePrice: 20, image: '' },
  { title: "Three Unlimited Data 5G SIM Only 24 Month", category: 'mobileplan', basePrice: 18, image: '' },
  { title: "Three 100GB SIM Only 24 Month 5G", category: 'mobileplan', basePrice: 12, image: '' },
  { title: "Three Pixel 9 Pro 100GB Pay Monthly", category: 'mobileplan', basePrice: 55, image: '' },
  { title: "Three Unlimited SIM Only 1 Month Rolling", category: 'mobileplan', basePrice: 25, image: '' },
  { title: "O2 100GB SIM Only 12 Month", category: 'mobileplan', basePrice: 15, image: '' },
  { title: "O2 Unlimited SIM Only 12 Month", category: 'mobileplan', basePrice: 25, image: '' },
  { title: "O2 Refresh iPhone 15 Pro 100GB", category: 'mobileplan', basePrice: 60, image: '' },
  { title: "giffgaff 30GB Goody Bag Monthly", category: 'mobileplan', basePrice: 12, image: '' },
  { title: "giffgaff Unlimited Goody Bag Monthly", category: 'mobileplan', basePrice: 20, image: '' },
  { title: "giffgaff 80GB Goody Bag Monthly", category: 'mobileplan', basePrice: 15, image: '' },
  { title: "Tesco Mobile 30GB SIM Only 12 Month", category: 'mobileplan', basePrice: 10, image: '' },
  { title: "Tesco Mobile Unlimited SIM Only 12 Month", category: 'mobileplan', basePrice: 18, image: '' },
  { title: "Sky Mobile Unlimited Data 12 Month", category: 'mobileplan', basePrice: 22, image: '' },
  { title: "Sky Mobile 25GB Swap Unused Data", category: 'mobileplan', basePrice: 12, image: '' },
  { title: "VOXI Unlimited Data SIM Monthly", category: 'mobileplan', basePrice: 20, image: '' },
  { title: "VOXI 45GB Endless Social Media", category: 'mobileplan', basePrice: 15, image: '' },
  { title: "Smarty 30GB SIM Only Monthly No Contract", category: 'mobileplan', basePrice: 10, image: '' },
  { title: "Smarty Unlimited Data SIM Monthly", category: 'mobileplan', basePrice: 22, image: '' },
  { title: "iD Mobile 100GB SIM Only 12 Month", category: 'mobileplan', basePrice: 9, image: '' },
  { title: "iD Mobile Unlimited Data 24 Month", category: 'mobileplan', basePrice: 18, image: '' },
  { title: "Carphone Warehouse iPhone 16 EE 100GB", category: 'mobileplan', basePrice: 60, image: '' },

  // Toys
  { title: 'LEGO Star Wars Millennium Falcon', category: 'toys', basePrice: 159, image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400' },
  { title: 'LEGO Technic Bugatti Chiron', category: 'toys', basePrice: 329, image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400' },
  { title: 'Barbie Dreamhouse 2024', category: 'toys', basePrice: 199, image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400' },
  { title: 'Hot Wheels 20 Car Pack', category: 'toys', basePrice: 19, image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400' },

  // Sports / Outdoor
  { title: 'Wilson Pro Staff Tennis Racket', category: 'sports', basePrice: 199, image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
  { title: 'Decathlon Kalenji Run Active Shoe', category: 'sports', basePrice: 30, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { title: 'Fitbit Charge 6', category: 'sports', basePrice: 139, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400' },
  { title: 'Garmin Forerunner 265', category: 'sports', basePrice: 429, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
  { title: 'Coleman 4 Person Tent', category: 'outdoor', basePrice: 129, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400' },

  // Pet
  { title: 'Pedigree Adult Dog Food 15kg', category: 'pet', basePrice: 22, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },
  { title: 'Whiskas Adult Cat Pouches 40 pack', category: 'pet', basePrice: 16, image: 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?w=400' },
  { title: 'PetSafe Drinkwell Fountain', category: 'pet', basePrice: 49, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400' },

  // Cameras
  { title: 'Canon EOS R50 Mirrorless Kit', category: 'cameras', basePrice: 749, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400' },
  { title: 'Sony Alpha A7 IV Body', category: 'cameras', basePrice: 2199, image: 'https://images.unsplash.com/photo-1606986601547-99ca7b89bef7?w=400' },
  { title: 'GoPro HERO12 Black', category: 'cameras', basePrice: 399, image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400' },
  { title: 'DJI Osmo Pocket 3', category: 'cameras', basePrice: 489, image: 'https://images.unsplash.com/photo-1606983340075-3a5cf7d3d57c?w=400' },
];

const SEEDS: Seed[] = SEEDS_RAW as Seed[];

// Which retailers stock which categories (broadly true for UK market)
const RETAILER_CATEGORIES: Record<Retailer, Category[]> = {
  amazon:     ['electronics','fashion','beauty','home','gaming','sports','toys','outdoor','pet','cameras','grocery','furniture'],
  ebay:       ['electronics','fashion','gaming','sports','toys','cameras','home','furniture'],
  argos:      ['electronics','home','gaming','toys','sports','furniture','beauty','outdoor'],
  currys:     ['electronics','gaming','home','cameras'],
  johnlewis:  ['electronics','fashion','beauty','home','furniture','toys','cameras','grocery'],
  tesco:      ['grocery','home','beauty','toys','pet'],
  asda:       ['grocery','home','beauty','toys','fashion','pet'],
  sainsburys: ['grocery','home','beauty','pet'],
  morrisons:  ['grocery','home','beauty','pet'],
  waitrose:   ['grocery','home','beauty'],
  aldi:       ['grocery','home','beauty','toys'],
  lidl:       ['grocery','home','beauty','toys'],
  iceland:    ['grocery','home'],
  ocado:      ['grocery','home','beauty','pet'],
  coop:       ['grocery','home','beauty','pet'],
  marksandspencer: ['grocery','home','beauty','fashion','home'],
  temu:       ['fashion','home','toys','beauty','outdoor','pet','sports'],
  shein:      ['fashion','beauty','home'],
  aliexpress: ['electronics','fashion','home','toys','outdoor','sports'],
  wayfair:    ['furniture','home','outdoor'],
  ikea:       ['furniture','home','toys'],
  'b&q':      ['home','outdoor','furniture'],
  walmart:    ['electronics','grocery','home','toys','beauty','fashion'],
  apple:      ['electronics','cameras'],
  facebook:   ['electronics','fashion','home','furniture','toys','sports','outdoor','beauty','gaming','cameras','cars'],
  ubereats:   ['food','grocery'],
  deliveroo:  ['food','grocery'],
  justeat:    ['food'],
  // Cars
  autotrader:  ['cars'],
  motors:      ['cars'],
  gumtree:     ['cars','furniture','electronics'],
  carwow:      ['cars'],
  cinch:       ['cars'],
  heycar:      ['cars'],
  arnoldclark: ['cars'],
  // Insurance comparison
  comparethemarket: ['insurance'],
  moneysupermarket: ['insurance','broadband','mobileplan'],
  gocompare:        ['insurance'],
  confused:         ['insurance'],
  admiral:          ['insurance'],
  aviva:            ['insurance'],
  directline:       ['insurance'],
  churchill:        ['insurance'],
  // Broadband
  sky:         ['broadband','mobileplan'],
  bt:          ['broadband','mobileplan'],
  virginmedia: ['broadband','mobileplan'],
  talktalk:    ['broadband'],
  nowbroadband:['broadband'],
  plusnet:     ['broadband','mobileplan'],
  hyperoptic:  ['broadband'],
  // Mobile
  ee:          ['mobileplan','electronics'],
  vodafone:    ['mobileplan','broadband','electronics'],
  three:       ['mobileplan','electronics'],
  o2:          ['mobileplan','electronics'],
  giffgaff:    ['mobileplan'],
  tescomobile: ['mobileplan'],
  skymobile:   ['mobileplan'],
  voxi:        ['mobileplan'],
  smarty:      ['mobileplan'],
  idmobile:    ['mobileplan'],
  carphonewarehouse: ['mobileplan','electronics'],
  // Discount stores
  bm:          ['home','furniture','toys','beauty','pet','outdoor','grocery','fashion'],
  homebargains:['home','toys','beauty','pet','grocery'],
  poundland:   ['home','beauty','toys','grocery'],
  wilko:       ['home','furniture','toys','outdoor','pet','beauty'],
  // Clothing & shoes
  zara:        ['fashion','beauty'],
  hm:          ['fashion','beauty','home'],
  office:      ['fashion'],
  asos:        ['fashion','beauty'],
  next:        ['fashion','home','beauty','furniture','toys'],
  primark:     ['fashion','beauty','home'],
  jdsports:    ['fashion','sports'],
  schuh:       ['fashion'],
  sportsdirect:['fashion','sports','outdoor'],
  prettylittlething: ['fashion','beauty'],
  boohoo:      ['fashion','beauty'],
  riverisland: ['fashion'],
  newlook:     ['fashion','beauty'],
  clarks:      ['fashion'],
  mango:       ['fashion','beauty'],
  selfridges:  ['fashion','beauty','home','furniture'],
  fatface:     ['fashion'],
  uniqlo:      ['fashion'],
  // Discount fashion / homeware
  tkmaxx:      ['fashion','beauty','home','toys','sports'],
  homesense:   ['home','furniture','beauty'],
  // Watch retailers
  watchshop:           ['fashion','electronics'],
  watchesofswitzerland:['fashion','electronics'],
  goldsmiths:          ['fashion','electronics'],
  beaverbrooks:        ['fashion','electronics'],
  ernestjones:         ['fashion','electronics'],
  hsamuel:             ['fashion','electronics'],
  fossil:              ['fashion','electronics'],
  tagheuer:            ['fashion','electronics'],
  casioshop:           ['electronics','fashion'],
  // Premium / outdoor branded clothing
  tommyhilfiger: ['fashion'],
  hugoboss:      ['fashion','beauty'],
  ralphlauren:   ['fashion'],
  calvinklein:   ['fashion','beauty'],
  boden:         ['fashion'],
  joules:        ['fashion'],
  whitestuff:    ['fashion','home'],
  mountainwarehouse: ['fashion','outdoor','sports'],
  cotswoldoutdoor:   ['fashion','outdoor','sports'],
  footasylum:        ['fashion','sports'],
  size:              ['fashion','sports'],
  flannels:          ['fashion','beauty'],
};

// Stable hash so the same retailer+title always produces the same price/rating
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// ─── Delivery / fulfilment info per retailer ────────────────────────────────
// Returns realistic UK delivery fees, free-over thresholds, and click & collect.
function deliveryInfo(retailer: Retailer, category: Category): {
  deliveryFee?: number;
  freeDeliveryOver?: number;
  clickCollect?: boolean;
  inStoreOnly?: boolean;
  deliveryOnly?: boolean;
} {
  // Food delivery — always per-order fee, no collection
  if (retailer === 'ubereats')  return { deliveryFee: 3.99, deliveryOnly: true };
  if (retailer === 'deliveroo') return { deliveryFee: 2.99, deliveryOnly: true };
  if (retailer === 'justeat')   return { deliveryFee: 2.49, deliveryOnly: true };

  // Online-only grocery
  if (retailer === 'ocado')         return { deliveryFee: 5.99, freeDeliveryOver: 75, deliveryOnly: true };
  if (retailer === 'amazon')        return { deliveryFee: 0, freeDeliveryOver: 25, clickCollect: true };

  // UK supermarkets — both delivery and click & collect (varies)
  if (retailer === 'tesco')         return { deliveryFee: 4.50, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'sainsburys')    return { deliveryFee: 4.50, freeDeliveryOver: 40, clickCollect: true };
  if (retailer === 'asda')          return { deliveryFee: 4.50, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'morrisons')     return { deliveryFee: 4.50, freeDeliveryOver: 40, clickCollect: true };
  if (retailer === 'waitrose')      return { deliveryFee: 5.00, freeDeliveryOver: 60, clickCollect: true };
  if (retailer === 'iceland')       return { deliveryFee: 0, freeDeliveryOver: 25, clickCollect: false };
  if (retailer === 'coop')          return { deliveryFee: 5.00, freeDeliveryOver: 35, clickCollect: false };
  if (retailer === 'marksandspencer') return { deliveryFee: 4.95, freeDeliveryOver: 50, clickCollect: true };

  // Budget grocers — mostly in-store only for now
  if (retailer === 'aldi')          return { inStoreOnly: true, clickCollect: false };
  if (retailer === 'lidl')          return { inStoreOnly: true, clickCollect: false };

  // Big electronics / home
  if (retailer === 'currys')        return { deliveryFee: 6.99, freeDeliveryOver: 30, clickCollect: true };
  if (retailer === 'argos')         return { deliveryFee: 4.95, freeDeliveryOver: 0, clickCollect: true };
  if (retailer === 'johnlewis')     return { deliveryFee: 3.50, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'apple')         return { deliveryFee: 0, freeDeliveryOver: 0, clickCollect: true };

  // Fashion stores (typically £3.95–4.95 delivery, free over £50)
  if (retailer === 'asos')          return { deliveryFee: 4.50, freeDeliveryOver: 35, clickCollect: false };
  if (retailer === 'zara')          return { deliveryFee: 3.95, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'hm')            return { deliveryFee: 3.99, freeDeliveryOver: 40, clickCollect: true };
  if (retailer === 'next')          return { deliveryFee: 4.99, freeDeliveryOver: 0, clickCollect: true };
  if (retailer === 'primark')       return { deliveryFee: 0, inStoreOnly: true, clickCollect: false };
  if (retailer === 'jdsports')      return { deliveryFee: 3.99, freeDeliveryOver: 70, clickCollect: true };
  if (retailer === 'schuh')         return { deliveryFee: 3.95, freeDeliveryOver: 80, clickCollect: true };
  if (retailer === 'sportsdirect')  return { deliveryFee: 4.99, freeDeliveryOver: 79, clickCollect: true };
  if (retailer === 'prettylittlething') return { deliveryFee: 3.99, freeDeliveryOver: 50 };
  if (retailer === 'boohoo')        return { deliveryFee: 4.99, freeDeliveryOver: 0 };
  if (retailer === 'riverisland')   return { deliveryFee: 4.50, freeDeliveryOver: 65, clickCollect: true };
  if (retailer === 'newlook')       return { deliveryFee: 3.99, freeDeliveryOver: 60, clickCollect: true };
  if (retailer === 'clarks')        return { deliveryFee: 4.95, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'mango')         return { deliveryFee: 4.95, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'office')        return { deliveryFee: 4.99, freeDeliveryOver: 0, clickCollect: false };
  if (retailer === 'selfridges')    return { deliveryFee: 8.95, freeDeliveryOver: 100, clickCollect: true };
  if (retailer === 'fatface')       return { deliveryFee: 4.95, freeDeliveryOver: 60, clickCollect: true };
  if (retailer === 'uniqlo')        return { deliveryFee: 3.95, freeDeliveryOver: 50, clickCollect: true };
  if (retailer === 'tkmaxx')        return { deliveryFee: 4.99, freeDeliveryOver: 40, clickCollect: true };
  if (retailer === 'homesense')     return { deliveryFee: 0, inStoreOnly: true };

  // Discount homewares
  if (retailer === 'bm')            return { deliveryFee: 0, inStoreOnly: true };
  if (retailer === 'homebargains')  return { deliveryFee: 0, inStoreOnly: true };
  if (retailer === 'poundland')     return { deliveryFee: 0, inStoreOnly: true };
  if (retailer === 'wilko')         return { deliveryFee: 4.95, freeDeliveryOver: 30 };

  // Marketplaces
  if (retailer === 'ebay')          return { deliveryFee: 0, freeDeliveryOver: 0 }; // usually free
  if (retailer === 'temu')          return { deliveryFee: 0, freeDeliveryOver: 0 }; // free shipping
  if (retailer === 'shein')         return { deliveryFee: 3.99, freeDeliveryOver: 35 };
  if (retailer === 'aliexpress')    return { deliveryFee: 0, freeDeliveryOver: 0 };
  if (retailer === 'walmart')       return { deliveryFee: 5.99, freeDeliveryOver: 35 };
  if (retailer === 'facebook')      return { inStoreOnly: true, deliveryOnly: false };

  // DIY / furniture
  if (retailer === 'b&q')           return { deliveryFee: 5.00, freeDeliveryOver: 75, clickCollect: true };
  if (retailer === 'ikea')          return { deliveryFee: 25, freeDeliveryOver: 0, clickCollect: true };
  if (retailer === 'wayfair')       return { deliveryFee: 0, freeDeliveryOver: 40 };
  if (retailer === 'gumtree')       return { inStoreOnly: true };

  // Cars / insurance / broadband / mobile — n/a really
  return {};
}

// Marketplace retailers we want to surface heavily — they stock almost everything cheap.
const MUST_INCLUDE: Retailer[] = ['temu','shein','aliexpress'];
// Major UK clothing stores — surfaced on all fashion items.
const FASHION_PLATFORMS: Retailer[] = ['asos','zara','hm','next','primark','newlook','prettylittlething','boohoo','riverisland','uniqlo'];
// Shoe specialists for fashion footwear.
const SHOE_PLATFORMS: Retailer[] = ['office','schuh','jdsports','clarks','sportsdirect'];
// Discount stores boost on home/grocery.
const DISCOUNT_PLATFORMS: Retailer[] = ['bm','homebargains','poundland','wilko','tkmaxx','homesense'];
// Watch specialist retailers — boost on any watch product.
const WATCH_PLATFORMS: Retailer[] = ['watchshop','watchesofswitzerland','goldsmiths','beaverbrooks','ernestjones','hsamuel','fossil'];
// Food delivery platforms — always show all 3 for any food item.
const FOOD_PLATFORMS: Retailer[] = ['ubereats','deliveroo','justeat'];
// Always show these category-specific comparison sites.
const CAR_PLATFORMS: Retailer[] = ['autotrader','motors','carwow','heycar','cinch'];
const INSURANCE_PLATFORMS: Retailer[] = ['comparethemarket','moneysupermarket','gocompare','confused'];
const BROADBAND_PLATFORMS: Retailer[] = ['sky','bt','virginmedia','talktalk','plusnet'];
const MOBILE_PLATFORMS: Retailer[] = ['ee','vodafone','three','o2','giffgaff','smarty'];

// ─── Central image picker ───────────────────────────────────────────────────
// Returns an image URL for a given seed. We use locally-rendered SVG
// placeholders so every product always shows a correct, readable label
// — no more random Flickr photos that don't match the product.
const CATEGORY_COLORS: Record<Category, { bg: string; accent: string }> = {
  electronics: { bg: '#0ea5e9', accent: '#0369a1' },
  fashion:     { bg: '#ec4899', accent: '#9d174d' },
  beauty:      { bg: '#f43f5e', accent: '#9f1239' },
  grocery:     { bg: '#16a34a', accent: '#14532d' },
  home:        { bg: '#f97316', accent: '#9a3412' },
  furniture:   { bg: '#a16207', accent: '#713f12' },
  gaming:      { bg: '#8b5cf6', accent: '#5b21b6' },
  sports:      { bg: '#14b8a6', accent: '#115e59' },
  toys:        { bg: '#f59e0b', accent: '#92400e' },
  outdoor:     { bg: '#65a30d', accent: '#365314' },
  pet:         { bg: '#a855f7', accent: '#6b21a8' },
  cameras:     { bg: '#475569', accent: '#1e293b' },
  food:        { bg: '#dc2626', accent: '#7f1d1d' },
  cars:        { bg: '#1e3a8a', accent: '#172554' },
  insurance:   { bg: '#0f766e', accent: '#134e4a' },
  broadband:   { bg: '#9333ea', accent: '#581c87' },
  mobileplan:  { bg: '#db2777', accent: '#831843' },
};

const CATEGORY_ICON: Record<Category, string> = {
  electronics: '📱',
  fashion:     '👗',
  beauty:      '💄',
  grocery:     '🛒',
  home:        '🏠',
  furniture:   '🛋️',
  gaming:      '🎮',
  sports:      '⚽',
  toys:        '🧸',
  outdoor:     '🏕️',
  pet:         '🐾',
  cameras:     '📷',
  food:        '🍔',
  cars:        '🚗',
  insurance:   '🛡️',
  broadband:   '📡',
  mobileplan:  '📞',
};

// Subcategory icons for specific product types — picks override category icon.
function productIcon(title: string, category: Category): string {
  const t = title.toLowerCase();
  if (/iphone|galaxy|pixel|smartphone|oneplus|xiaomi|nothing\s*phone|motorola|nokia|honor|oppo|redmi/.test(t)) return '📱';
  if (/ipad|tablet|galaxy\s*tab/.test(t)) return '📱';
  if (/macbook|laptop|xps|thinkpad|pavilion|notebook/.test(t)) return '💻';
  if (/\btv\b|television|qled|oled/.test(t)) return '📺';
  if (/airpods|earbuds|in-ear|buds|nothing\s*ear/.test(t)) return '🎧';
  if (/headphone|over-ear|wh-1000|quietcomfort|momentum|gaming\s*headset|kraken|arctis|cloud\s*iii/.test(t)) return '🎧';
  if (/watch|fitbit|garmin|smartwatch|g-shock|casio|amazfit/.test(t)) return '⌚';
  if (/camera|gopro|alpha|mirrorless|canon|nikon/.test(t)) return '📷';
  if (/playstation|ps5|xbox|nintendo|switch|steam\s*deck|quest\s*3/.test(t)) return '🎮';
  if (/echo|alexa|homepod|nest|sonos|jbl|bose\s*soundlink/.test(t)) return '🔊';
  if (/fire\s*tv|chromecast|roku|apple\s*tv/.test(t)) return '📺';
  if (/case|cover|protector|screen\s*protector/.test(t)) return '📱';
  if (/charger|adapter|magsafe|power\s*bank|powercore/.test(t)) return '🔌';
  if (/cable|cord|hdmi|lightning|usb-c|usbc|thunderbolt|ethernet/.test(t)) return '🔗';
  if (/fridge|refrigerator|freezer/.test(t)) return '🧊';
  if (/washing\s*machine|washer|laundry\s*machine|washer\s*dryer/.test(t)) return '🌀';
  if (/dryer|tumble/.test(t)) return '🌀';
  if (/dishwasher/.test(t)) return '🧽';
  if (/microwave/.test(t)) return '🍱';
  if (/oven|cooker|hob|range\s*cooker/.test(t)) return '🍳';
  if (/air\s*fryer|airfryer/.test(t)) return '🍟';
  if (/vacuum/.test(t)) return '🧹';
  if (/coffee|nespresso|espresso/.test(t)) return '☕';
  if (/kettle/.test(t)) return '☕';
  if (/fan|cooling|air\s*conditioner|bladeless|tower\s*fan|pedestal/.test(t)) return '💨';
  if (/milk/.test(t)) return '🥛';
  if (/cheese|cheddar|babybel|mozzarella|halloumi/.test(t)) return '🧀';
  if (/butter|yoghurt|yogurt/.test(t)) return '🥛';
  if (/eggs/.test(t)) return '🥚';
  if (/banana/.test(t)) return '🍌';
  if (/apple|gala|pink\s*lady/.test(t) && /\d+\s*pack|kg/.test(t)) return '🍎';
  if (/strawberr/.test(t)) return '🍓';
  if (/blueberr|raspberr|berries/.test(t)) return '🫐';
  if (/grape/.test(t)) return '🍇';
  if (/lemon|orange|satsuma/.test(t)) return '🍋';
  if (/pineapple/.test(t)) return '🍍';
  if (/watermelon/.test(t)) return '🍉';
  if (/mango/.test(t)) return '🥭';
  if (/avocado/.test(t)) return '🥑';
  if (/carrot/.test(t)) return '🥕';
  if (/potato|sweet\s*potato/.test(t)) return '🥔';
  if (/onion/.test(t)) return '🧅';
  if (/garlic/.test(t)) return '🧄';
  if (/tomato/.test(t)) return '🍅';
  if (/broccoli|cauliflower/.test(t)) return '🥦';
  if (/pepper|aubergine|courgette|cucumber/.test(t)) return '🥒';
  if (/mushroom/.test(t)) return '🍄';
  if (/spinach|lettuce|salad|cabbage/.test(t)) return '🥬';
  if (/ginger|spring\s*onion/.test(t)) return '🌿';
  if (/chicken|beef|pork|lamb|sausage|bacon|steak/.test(t)) return '🥩';
  if (/salmon|cod|prawn|tuna|fish|seafood/.test(t)) return '🐟';
  if (/pizza/.test(t)) return '🍕';
  if (/fish\s*finger/.test(t)) return '🐟';
  if (/ice\s*cream|magnum|cornetto|haagen|ben.*jerry/.test(t)) return '🍦';
  if (/peas|sweetcorn|frozen\s*berries|frozen\s*mixed/.test(t)) return '🧊';
  if (/chips|crisps|pringles|walkers|doritos|hula|quavers|wotsits|monster\s*munch|frazzles|kettle\s*chips/.test(t)) return '🍿';
  if (/chocolate|dairy\s*milk|cadbury|galaxy|kit\s*kat|maltesers/.test(t)) return '🍫';
  if (/biscuit|digestive|jaffa\s*cakes|belvita/.test(t)) return '🍪';
  if (/haribo|gummy|sweets/.test(t)) return '🍬';
  if (/loaf|bread|kingsmill|hovis|warburtons|bagel|brioche|tortilla|burger\s*bun/.test(t)) return '🍞';
  if (/croissant|pain\s*au\s*chocolat|crumpet|english\s*muffin|pancake/.test(t)) return '🥐';
  if (/cereal|weetabix|cornflake|coco\s*pops|frosties|krispies|crunchy\s*nut|cheerios|shreddies|special\s*k|muesli|alpen|dorset|oats|porridge|granola|bran\s*flake/.test(t)) return '🥣';
  if (/honey/.test(t)) return '🍯';
  if (/jam|nutella|spread|maple\s*syrup/.test(t)) return '🍯';
  if (/baked\s*beans|tinned|tomato\s*soup/.test(t)) return '🥫';
  if (/pasta|penne|spaghetti|noodle/.test(t)) return '🍝';
  if (/rice|basmati|long\s*grain|chana|lentil|dal/.test(t)) return '🍚';
  if (/naan|tikka|korma|curry/.test(t)) return '🍛';
  if (/sauce|ketchup|mayonnaise|pickle|chutney|sriracha|soy\s*sauce/.test(t)) return '🍶';
  if (/oil|olive\s*oil|filippo\s*berio/.test(t)) return '🫒';
  if (/sugar|salt/.test(t)) return '🧂';
  if (/tea|yorkshire|pg\s*tips/.test(t)) return '🍵';
  if (/coffee|nescaf|lavazza/.test(t)) return '☕';
  if (/cola|coke|pepsi|fizzy|coca/.test(t)) return '🥤';
  if (/juice|tropicana|innocent|smoothie/.test(t)) return '🧃';
  if (/water|evian|highland\s*spring|bottled/.test(t)) return '💧';
  if (/red\s*bull|lucozade|energy/.test(t)) return '⚡';
  if (/beer|lager|ipa|stella|carling|heineken|corona|peroni|guinness|stout|ale/.test(t)) return '🍺';
  if (/cider|strongbow|kopparberg|magners|rekorderlig/.test(t)) return '🍻';
  if (/wine|chardonnay|merlot|shiraz|rosé|rose|prosecco|cava|sparkling/.test(t)) return '🍷';
  if (/whisky|whiskey|jack\s*daniel|jameson|grouse/.test(t)) return '🥃';
  if (/vodka|gin|rum|spirit|smirnoff|absolut|bombay|gordon|bacardi|captain\s*morgan/.test(t)) return '🍸';
  if (/toilet\s*roll|andrex|plenty|kitchen\s*roll/.test(t)) return '🧻';
  if (/detergent|fairy|persil|comfort|washing.up|cif|cleaner/.test(t)) return '🧴';
  if (/toothpaste|colgate|shampoo|head\s*shoulders/.test(t)) return '🪥';
  if (/nappies|pampers/.test(t)) return '👶';
  if (/dress|skirt|maxi|midi|bodycon|satin\s*slip|cottagecore/.test(t)) return '👗';
  if (/top|crop|tank|tee|t.shirt|bralette|hoodie|sweatshirt|cardigan|polo/.test(t)) return '👕';
  if (/jeans|denim|trouser|chino|cargo\s*pants|jogger|legging|short/.test(t)) return '👖';
  if (/jacket|coat|trench|puffer|blazer|bomber|nuptse/.test(t)) return '🧥';
  if (/bikini|swimsuit|kaftan/.test(t)) return '👙';
  if (/pyjama|onesie|lounge\s*set/.test(t)) return '🩱';
  if (/sock|boxer|brief|underwear/.test(t)) return '🧦';
  if (/sneaker|trainer|air\s*max|air\s*force|stan\s*smith|gazelle|samba|chuck\s*taylor|vans|new\s*balance/.test(t)) return '👟';
  if (/boot|dr\.\s*martens|ugg/.test(t)) return '🥾';
  if (/heel|court\s*shoe|stiletto/.test(t)) return '👠';
  if (/sandal|loafer|flip.flop/.test(t)) return '👡';
  if (/bag|tote|crossbody|backpack|handbag|shoulder\s*bag/.test(t)) return '👜';
  if (/wallet/.test(t)) return '👛';
  if (/sunglasses|wayfarer|aviator/.test(t)) return '🕶️';
  if (/hat|beanie|cap|bucket/.test(t)) return '🧢';
  if (/scarf/.test(t)) return '🧣';
  if (/belt/.test(t)) return '👔';
  if (/ring|earring|necklace|bracelet|jewell?ery|anklet|hoop|pendant|pearl/.test(t)) return '💍';
  if (/perfume|fragrance/.test(t)) return '🌸';
  if (/lipstick|lip\s*balm|lip\s*plumper/.test(t)) return '💄';
  if (/mascara|eyeliner|eyelash|makeup|nail\s*polish|press\s*on\s*nails/.test(t)) return '💅';
  if (/hair\s*dryer|airwrap|supersonic|ghd|hair\s*curling/.test(t)) return '💇';
  if (/cream|moisturiser|serum|skincare|niacinamide|olaplex|magic\s*cream|sheet\s*mask|pimple\s*patch/.test(t)) return '🧴';
  if (/sofa|armchair|chair|table|bed|bookcase|wardrobe/.test(t)) return '🛋️';
  if (/rug|carpet|mat/.test(t)) return '🛋️';
  if (/candle|diffuser|fairy\s*light|string\s*light|led\s*strip|moon\s*lamp|sunset\s*lamp|galaxy\s*projector|star\s*projector/.test(t)) return '💡';
  if (/plant|macrame/.test(t)) return '🪴';
  if (/cushion|pillow/.test(t)) return '🛏️';
  if (/storage|drawer\s*divider|organiser|caddy|lazy\s*susan|wall\s*hook/.test(t)) return '📦';
  if (/lego|barbie|hot\s*wheels|building\s*block|pop\s*it|fidget|slime|kinetic\s*sand|plushie|squishmallow|bubble\s*machine|rc\s|drone|toy/.test(t)) return '🧸';
  if (/yoga|fitness|resistance|foam\s*roller|stepper|gym/.test(t)) return '🧘';
  if (/water\s*bottle|tumbler|stanley|insulated/.test(t)) return '🍶';
  if (/tent|camping|lantern/.test(t)) return '🏕️';
  if (/dog\s*food|cat\s*food|pedigree|whiskas|pet\s*fountain|pet\s*bowl|lint\s*roller|cat\s*brush|cat\s*laser/.test(t)) return '🐾';
  // Restaurant / takeaway / food delivery
  if (/burger|big\s*mac|whopper|five\s*guys|gbk|honest\s*burgers/.test(t)) return '🍔';
  if (/pizza|domino|papa\s*john|pizza\s*hut/.test(t)) return '🍕';
  if (/sushi|wasabi|yo\s*sushi|itsu|maki|sashimi/.test(t)) return '🍣';
  if (/(curry|tikka|masala|biryani|naan\s*set|indian\s*meal|dishoom|wagamama|katsu)/.test(t)) return '🍛';
  if (/chinese|wok|noodle|ramen|chow\s*mein|peri.peri|nando|chicken/.test(t)) return '🍜';
  if (/taco|burrito|nachos|chipotle|mexican/.test(t)) return '🌮';
  if (/kebab|shawarma|donner|wrap/.test(t)) return '🌯';
  if (/fries|chips\s*&\s*gravy/.test(t)) return '🍟';
  if (/sandwich|sub|pret|subway|breakfast\s*sandwich/.test(t)) return '🥪';
  if (/salad|caesar|leon|bowl/.test(t)) return '🥗';
  if (/soup|ramen|pho/.test(t)) return '🍲';
  if (/donut|krispy/.test(t)) return '🍩';
  if (/cake|bakery|cheesecake/.test(t)) return '🍰';
  if (/coffee|costa|starbucks|caffe\s*nero|latte|cappuccino|mocha/.test(t)) return '☕';
  if (/wings|kfc|hot\s*wings|bargain\s*bucket/.test(t)) return '🍗';
  if (/sausage\s*roll|greggs|pasty/.test(t)) return '🥐';
  if (/bubble\s*tea|boba|milkshake/.test(t)) return '🧋';
  if (/breakfast.*english|full.*english/.test(t)) return '🍳';
  // Cars
  if (/(suv|qashqai|sportage|range\s*rover|xc40|outlander|tucson|kuga)/.test(t)) return '🚙';
  if (/(electric|tesla|ev|polestar|leaf|ioniq)/.test(t)) return '⚡';
  if (/(van|transit|sprinter|caddy)/.test(t)) return '🚐';
  if (/(motorbike|motorcycle|scooter)/.test(t)) return '🏍️';
  if (/(bmw|audi|mercedes|porsche|jaguar|lexus)/.test(t)) return '🏎️';
  if (/(car|fiesta|golf|corsa|polo|civic|focus|astra|mini\s*cooper|yaris|swift|clio|i30|leon|octavia|kia|hyundai|peugeot|citroen|renault|nissan|toyota|honda|ford|vauxhall|mazda|skoda|seat|suzuki|mitsubishi|volvo)/.test(t)) return '🚗';
  // Insurance
  if (/(car\s*insurance|motor\s*insurance|van\s*insurance|motorbike\s*insurance)/.test(t)) return '🚗';
  if (/(home\s*insurance|buildings\s*insurance|contents\s*insurance)/.test(t)) return '🏠';
  if (/(pet\s*insurance|dog\s*insurance|cat\s*insurance)/.test(t)) return '🐾';
  if (/(travel\s*insurance|holiday\s*insurance)/.test(t)) return '✈️';
  if (/(life\s*insurance|whole\s*of\s*life|term\s*life)/.test(t)) return '💼';
  if (/(health\s*insurance|medical\s*insurance|dental\s*insurance|private\s*health)/.test(t)) return '🏥';
  if (/(critical\s*illness|income\s*protection|mortgage\s*protection)/.test(t)) return '🛡️';
  if (/(gadget\s*insurance|phone\s*insurance)/.test(t)) return '📱';
  if (/(wedding\s*insurance|caravan\s*insurance)/.test(t)) return '🛡️';
  if (/insurance/.test(t)) return '🛡️';
  // Broadband
  if (/(full\s*fibre|fibre|fiber|gigafast|hyperoptic|broadband|mb\b|gb\b\s*broadband|gig\s*broadband)/.test(t)) return '📡';
  // Mobile plans
  if (/(sim\s*only|sim\s*card|goody\s*bag|mobile\s*plan|mobile\s*contract|unlimited\s*data|gb\s*sim|gb\s*plan)/.test(t)) return '📞';
  return CATEGORY_ICON[category];
}

// SVG generator — returns a data: URL with a beautifully styled product card.
function svgPlaceholder(seed: Seed): string {
  const colors = CATEGORY_COLORS[seed.category] ?? { bg: '#64748b', accent: '#334155' };
  const icon = productIcon(seed.title, seed.category);
  // Wrap long titles onto 3 lines
  const title = seed.title.length > 60 ? seed.title.slice(0, 57) + '…' : seed.title;
  const words = title.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 22) { if (cur) lines.push(cur); cur = w; }
    else cur = (cur ? cur + ' ' : '') + w;
    if (lines.length === 3) break;
  }
  if (cur && lines.length < 3) lines.push(cur);
  // Build text tspans (centered)
  const startY = 290 - (lines.length - 1) * 14;
  const tspans = lines
    .map((line, i) => {
      const safe = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      return `<tspan x="200" y="${startY + i * 28}">${safe}</tspan>`;
    })
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${colors.bg}"/><stop offset="1" stop-color="${colors.accent}"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><text x="200" y="170" font-size="120" text-anchor="middle" dominant-baseline="central">${icon}</text><text x="200" y="280" font-family="system-ui,-apple-system,sans-serif" font-size="20" font-weight="600" fill="white" text-anchor="middle">${tspans}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function smartImage(seed: Seed): string {
  return svgPlaceholder(seed);
}

// (Old loremflickr rules removed — kept only for reference in git history.)
function _legacyLoremflickrPicker(seed: Seed): string {
  const t = seed.title.toLowerCase();
  const lf = (kw: string) => `https://loremflickr.com/400/400/${kw}`;

  // ─ Phones ────────────────────────────────────
  if (/iphone\s*16\s*pro/.test(t))   return lf('smartphone,pro,modern');
  if (/iphone\s*16/.test(t))         return lf('smartphone,modern,phone');
  if (/iphone\s*15\s*pro/.test(t))   return lf('smartphone,pro,titanium');
  if (/iphone\s*15/.test(t))         return lf('smartphone,phone,colorful');
  if (/iphone\s*14/.test(t))         return lf('smartphone,iphone,phone');
  if (/iphone\s*13/.test(t))         return lf('smartphone,phone,blue');
  if (/iphone\s*12/.test(t))         return lf('smartphone,phone,purple');
  if (/iphone\s*11|iphone\s*se/.test(t)) return lf('smartphone,phone,older');
  if (/galaxy\s*s2[345]|galaxy\s*z/.test(t)) return lf('smartphone,android,phone');
  if (/galaxy\s*a/.test(t))          return lf('smartphone,android,budget');
  if (/pixel/.test(t))               return lf('smartphone,android,modern');
  if (/(motorola|moto\s|nokia|honor|oppo|nothing\s*phone|redmi|xiaomi\s*\d+t|oneplus\s*\d+)/.test(t)) return lf('smartphone,android,mobile');
  if (/doro/.test(t))                return lf('smartphone,simple,phone');

  // ─ Laptops / tablets ─────────────────────────
  if (/macbook\s*air/.test(t))       return lf('laptop,silver,thin');
  if (/macbook\s*pro/.test(t))       return lf('laptop,professional,modern');
  if (/xps|thinkpad|pavilion/.test(t)) return lf('laptop,computer,modern');
  if (/ipad\s*pro/.test(t))          return lf('tablet,pro,large');
  if (/ipad\s*air/.test(t))          return lf('tablet,thin,modern');
  if (/ipad/.test(t))                return lf('tablet,touchscreen');
  if (/galaxy\s*tab/.test(t))        return lf('tablet,android');

  // ─ TVs ───────────────────────────────────────
  if (/85"|85 inch/.test(t))         return lf('television,large,screen');
  if (/(75"|75 inch|77")/.test(t))   return lf('television,big,screen');
  if (/65"|65 inch/.test(t))         return lf('television,large,modern');
  if (/oled/.test(t))                return lf('television,oled,thin');
  if (/qled|crystal|neo qled/.test(t)) return lf('television,modern,4k');
  if (/fire tv\s*stick|chromecast|roku|apple tv/.test(t)) return lf('streaming,stick,device');
  if (/\btv\b|television/.test(t))   return lf('television,screen,living');

  // ─ Headphones / audio ────────────────────────
  if (/airpods\s*pro/.test(t))       return lf('earbuds,wireless,white');
  if (/airpods\s*max/.test(t))       return lf('headphones,over-ear,premium');
  if (/airpods/.test(t))             return lf('earbuds,wireless,case');
  if (/(buds|earbud|in-ear)/.test(t)) return lf('earbuds,wireless,small');
  if (/(gaming\s*head|arctis|kraken|cloud\s*iii|hyperx|razer|corsair)/.test(t)) return lf('gaming,headset,microphone');
  if (/(headphone|over-ear|on-ear|wh-1000|quietcomfort|qc\s*ultra|momentum|hd\s*\d|px\s*\d)/.test(t)) return lf('headphones,wireless,music');
  if (/(echo|alexa|nest|homepod|sonos|jbl|bose\s*soundlink|soundcore\s*boom)/.test(t)) return lf('speaker,smart,home');

  // ─ Smartwatches ──────────────────────────────
  if (/apple\s*watch/.test(t))       return lf('smartwatch,wrist,modern');
  if (/galaxy\s*watch/.test(t))      return lf('smartwatch,android,round');
  if (/(fitbit|charge|inspire|sense)/.test(t)) return lf('fitness,tracker,wristband');
  if (/(garmin|forerunner|fenix|venu|instinct)/.test(t)) return lf('sports,watch,wrist');
  if (/(g-shock|casio|amazfit|ticwatch|withings|huawei\s*watch|huawei\s*band|xiaomi\s*smart\s*band|xiaomi\s*watch|oneplus\s*watch|pixel\s*watch|timex)/.test(t)) return lf('smartwatch,watch,wrist');
  if (/f-91w|vintage|a158/.test(t))  return lf('digital,watch,retro');

  // ─ Cameras ───────────────────────────────────
  if (/gopro/.test(t))               return lf('action,camera,small');
  if (/dji|osmo/.test(t))            return lf('gimbal,camera,pocket');
  if (/(canon|sony\s*alpha|nikon|mirrorless)/.test(t)) return lf('camera,mirrorless,lens');

  // ─ Gaming consoles & accessories ─────────────
  if (/playstation\s*5|ps5/.test(t)) return lf('console,gaming,white');
  if (/xbox/.test(t))                return lf('console,gaming,black');
  if (/nintendo\s*switch/.test(t))   return lf('console,handheld,switch');
  if (/steam\s*deck/.test(t))        return lf('console,handheld,portable');
  if (/quest\s*3|vr/.test(t))        return lf('vr,headset,virtual');
  if (/(razer\s*deathadder|gaming\s*mouse)/.test(t)) return lf('gaming,mouse,rgb');

  // ─ Phone cases / chargers / cables ───────────
  if (/(case|cover|protector|sleeve|otterbox|spigen)/.test(t)) {
    if (/screen\s*protector|tempered\s*glass|glas\s*tr|whitestone/.test(t)) return lf('screen,protector,glass');
    return lf('phone,case,protection');
  }
  if (/magsafe/.test(t))             return lf('wireless,charger,magnetic');
  if (/(wireless\s*charg|charging\s*pad|charging\s*stand)/.test(t)) return lf('wireless,charger,pad');
  if (/(power\s*bank|powercore|portable\s*charger|powerstation|maggo|portable\s*power\s*station)/.test(t)) return lf('powerbank,portable,charger');
  if (/(charger|power\s*adapter|wall\s*charger|gan\s*charger|charging\s*hub)/.test(t)) return lf('charger,adapter,plug');
  if (/(lightning\s*cable|usb-c\s*cable|usbc\s*cable|charge\s*cable|thunderbolt)/.test(t)) return lf('cable,usb,wire');
  if (/hdmi/.test(t))                return lf('hdmi,cable,wire');
  if (/(ethernet|cat\s*6|cat\s*8)/.test(t)) return lf('ethernet,cable,network');
  if (/(usb-c\s*hub|usbc\s*hub|multiport\s*adapter|digital\s*av\s*multiport)/.test(t)) return lf('usb,hub,adapter');
  if (/(displayport)/.test(t))       return lf('displayport,cable,monitor');
  if (/(aux\s*audio|3\.5mm\s*audio)/.test(t)) return lf('audio,cable,jack');
  if (/(micro\s*usb)/.test(t))       return lf('micro,usb,cable');
  if (/(airtag|smarttag|tile\s*mate)/.test(t)) return lf('bluetooth,tracker,tag');
  if (/(ring\s*doorbell|ring\s*indoor|eufy)/.test(t)) return lf('security,camera,doorbell');
  if (/(philips\s*hue|tp-link\s*tapo|smart\s*plug|smart\s*bulb)/.test(t)) return lf('smart,light,bulb');

  // ─ White goods (fridges / washers / dryers) ──
  if (/(fridge|refrigerator|freezer)/.test(t)) {
    if (/american|side-by-side|side\s*by\s*side|instaview/.test(t)) return lf('refrigerator,american,silver');
    if (/wine\s*cooler|drinks\s*display/.test(t)) return lf('wine,cooler,bottles');
    if (/cosmetic.*pink/.test(t)) return lf('mini,refrigerator,pink');
    if (/(mini|cookology|husky|under\s*counter)/.test(t)) return lf('mini,refrigerator,small');
    if (/retro|smeg/.test(t))     return lf('retro,refrigerator,pastel');
    if (/chest/.test(t))          return lf('chest,freezer,white');
    if (/tall\s*freezer|larder/.test(t)) return lf('freezer,tall,kitchen');
    return lf('refrigerator,kitchen,modern');
  }
  if (/washer\s*dryer/.test(t))      return lf('washer,dryer,combo');
  if (/(washing\s*machine|washer|laundry\s*machine)/.test(t)) return lf('washing,machine,laundry');
  if (/(tumble\s*dryer|heat\s*pump\s*dryer|condenser\s*dryer|vented\s*dryer|\sdryer\s|\sdryer$)/.test(t)) return lf('tumble,dryer,laundry');
  if (/dishwasher/.test(t))          return lf('dishwasher,kitchen,modern');
  if (/(microwave)/.test(t))         return lf('microwave,kitchen,countertop');
  if (/(range\s*cooker|electric\s*cooker|cookcentre|sterling)/.test(t)) return lf('cooker,range,kitchen');
  if (/(built-in\s*oven|single\s*oven|double\s*oven|steam\s*oven)/.test(t)) return lf('oven,built-in,kitchen');
  if (/(induction\s*hob|hob|hot\s*plate)/.test(t)) return lf('hob,cooktop,kitchen');

  // ─ Fans & cooling ────────────────────────────
  if (/(bladeless|dyson\s*cool|dyson\s*hot|dyson\s*pure)/.test(t)) return lf('bladeless,tower,fan');
  if (/tower\s*fan/.test(t))         return lf('tower,fan,tall');
  if (/pedestal\s*fan/.test(t))      return lf('pedestal,fan,standing');
  if (/desk\s*fan|usb\s*fan|mini\s*fan|handheld\s*fan|clip.on\s*fan/.test(t)) return lf('desk,fan,small');
  if (/ceiling\s*fan/.test(t))       return lf('ceiling,fan,room');
  if (/air\s*conditioner|portable\s*ac|chillflex|pinguino|vornado/.test(t)) return lf('air,conditioner,cool');
  if (/(\sfan\s|\sfan$|cooling)/.test(t)) return lf('fan,electric,cooling');

  // ─ Other home appliances ─────────────────────
  if (/(air\s*fryer|airfryer)/.test(t)) return lf('airfryer,kitchen,appliance');
  if (/vacuum/.test(t))              return lf('vacuum,cleaner,cordless');
  if (/(coffee\s*machine|nespresso|espresso|coffee\s*maker)/.test(t)) return lf('coffee,machine,espresso');
  if (/(kettle|toaster)/.test(t))    return lf('kettle,toaster,kitchen');

  // ─ Beauty / personal care ────────────────────
  if (/(airwrap|hair\s*dryer|supersonic|hair\s*styler|hair\s*curling)/.test(t)) return lf('hairdryer,beauty,salon');
  if (/(hair\s*brush|scalp\s*massager|hair\s*wax|hair\s*ribbon)/.test(t)) return lf('hair,brush,care');
  if (/(jade\s*roller|gua\s*sha|ice\s*roller|face\s*brush|cleansing\s*brush)/.test(t)) return lf('beauty,face,skincare');
  if (/(makeup\s*sponge|eyelash|magnetic\s*eyeliner|lip\s*plumper|press\s*on\s*nails|nail\s*polish|vanity\s*mirror)/.test(t)) return lf('makeup,beauty,cosmetics');
  if (/(lip\s*balm|sheet\s*mask|pimple\s*patch|self.tanning|hair\s*removal)/.test(t)) return lf('skincare,beauty,product');
  if (/(magic\s*cream|niacinamide|olaplex|charlotte\s*tilbury)/.test(t)) return lf('skincare,beauty,bottle');

  // ─ Fashion ───────────────────────────────────
  if (/(maxi\s*dress|midi\s*dress|bodycon|satin\s*slip|cottagecore|knit\s*dress)/.test(t)) return lf('dress,fashion,elegant');
  if (/(crop\s*top|tank\s*top|graphic\s*tee|oversized\s*tee|mesh\s*top|bralette)/.test(t)) return lf('top,fashion,style');
  if (/(jeans|denim)/.test(t))       return lf('jeans,denim,fashion');
  if (/(cargo\s*pants|chinos|trousers|joggers)/.test(t)) return lf('pants,trousers,fashion');
  if (/(mini\s*skirt|pleated\s*skirt|skirt|skort)/.test(t)) return lf('skirt,fashion,women');
  if (/(leather\s*jacket|denim\s*jacket|puffer\s*jacket|trench\s*coat|blazer|bomber\s*jacket|nuptse)/.test(t)) return lf('jacket,fashion,outer');
  if (/(cardigan|hoodie|sweatshirt|sweater)/.test(t)) return lf('hoodie,fashion,casual');
  if (/(pyjama|lounge\s*set|onesie|hoodie\s*blanket)/.test(t)) return lf('pyjama,loungewear,sleep');
  if (/(yoga\s*leggings|sports\s*bra|activewear|leggings)/.test(t)) return lf('activewear,fitness,women');
  if (/(bikini|swimsuit|swim\s*shorts|beach\s*cover|kaftan)/.test(t)) return lf('swimwear,beach,summer');
  if (/(polo|polo\s*shirt|flannel|sweatshirt|t.shirt|suit)/.test(t)) return lf('mens,fashion,shirt');
  if (/(boxer|brief|sock)/.test(t))  return lf('underwear,basics,clothing');
  if (/(air\s*max|air\s*force|stan\s*smith|gazelle|samba|chuck\s*taylor|vans|new\s*balance|trainer|sneaker)/.test(t)) return lf('sneakers,trainers,fashion');
  if (/(dr\.\s*martens|ugg|boot)/.test(t)) return lf('boots,fashion,leather');
  if (/(heel|court\s*shoe|strappy|stiletto)/.test(t)) return lf('heels,shoes,women');
  if (/(loafer|sandal|flip.flop|birkenstock)/.test(t)) return lf('sandals,shoes,summer');
  if (/(crossbody|tote\s*bag|shoulder\s*bag|mini\s*bag|fluffy\s*tote|pearl\s*beaded)/.test(t)) return lf('handbag,fashion,women');
  if (/(backpack|eastpak|jansport)/.test(t)) return lf('backpack,bag,school');
  if (/(wallet)/.test(t))            return lf('wallet,leather,money');
  if (/(sunglasses|aviator|wayfarer|cat\s*eye)/.test(t)) return lf('sunglasses,fashion,style');
  if (/(earring|hoop|necklace|pendant|bracelet|ring\s*set|anklet|toe\s*ring|body\s*chain|drop\s*crystal|aesthetic\s*ring|scrunchie|hair\s*clip|butterfly\s*clip|coquette|bow)/.test(t)) return lf('jewellery,fashion,accessory');
  if (/(beanie|baseball\s*cap|bucket\s*hat|wide\s*brim|hat)/.test(t)) return lf('hat,fashion,headwear');
  if (/(belt|scarf|tights|fishnet|leg\s*warmer)/.test(t)) return lf('accessory,fashion,wear');
  if (/(phone\s*strap)/.test(t))     return lf('phone,strap,accessory');
  if (/(maid\s*costume|cosplay)/.test(t)) return lf('costume,cosplay,outfit');

  // ─ Grocery: dairy ────────────────────────────
  if (/(whole\s*milk|semi.skimmed|skimmed\s*milk|cravendale|lactofree)/.test(t)) return lf('milk,bottle,dairy');
  if (/(oat\s*milk|almond\s*milk|alpro|oatly)/.test(t)) return lf('milk,plant,carton');
  if (/(cheddar|babybel|philadelphia|mozzarella|parmesan|parmigiano|feta|halloumi|boursin|cheese)/.test(t)) return lf('cheese,dairy,block');
  if (/(yoghurt|yogurt|fage|muller|activia)/.test(t)) return lf('yoghurt,pot,dairy');
  if (/(butter|lurpak|anchor)/.test(t)) return lf('butter,dairy,block');
  if (/(eggs|free\s*range)/.test(t)) return lf('eggs,carton,fresh');

  // ─ Grocery: fresh produce ────────────────────
  if (/(carrot)/.test(t))            return lf('carrots,orange,vegetable');
  if (/potato|maris\s*piper/.test(t)) return lf('potatoes,brown,vegetable');
  if (/sweet\s*potato/.test(t))      return lf('sweet,potato,orange');
  if (/brown\s*onion/.test(t))       return lf('onion,brown,vegetable');
  if (/red\s*onion/.test(t))         return lf('onion,red,vegetable');
  if (/spring\s*onion/.test(t))      return lf('spring,onion,green');
  if (/garlic/.test(t))              return lf('garlic,bulb,cloves');
  if (/(tomato|cherry\s*tomato)/.test(t)) return lf('tomatoes,red,fresh');
  if (/spinach/.test(t))             return lf('spinach,green,leaves');
  if (/lettuce/.test(t))             return lf('lettuce,iceberg,green');
  if (/cucumber/.test(t))            return lf('cucumber,green,fresh');
  if (/(pepper|bell\s*pepper)/.test(t)) return lf('peppers,colorful,bell');
  if (/broccoli/.test(t))            return lf('broccoli,green,vegetable');
  if (/cauliflower/.test(t))         return lf('cauliflower,white,vegetable');
  if (/mushroom/.test(t))            return lf('mushrooms,brown,fresh');
  if (/aubergine|eggplant/.test(t))  return lf('aubergine,purple,vegetable');
  if (/courgette|zucchini/.test(t))  return lf('courgette,green,vegetable');
  if (/avocado/.test(t))             return lf('avocado,green,fresh');
  if (/ginger/.test(t))              return lf('ginger,root,fresh');

  if (/banana/.test(t))              return lf('bananas,yellow,fruit');
  if (/apple|pink\s*lady|gala/.test(t)) return lf('apples,red,fruit');
  if (/strawberr/.test(t))           return lf('strawberries,red,fruit');
  if (/blueberr/.test(t))            return lf('blueberries,blue,fruit');
  if (/raspberr/.test(t))            return lf('raspberries,red,fruit');
  if (/green\s*seedless\s*grape|green\s*grape/.test(t)) return lf('green,grapes,fruit');
  if (/grape/.test(t))               return lf('grapes,bunch,fruit');
  if (/satsuma|orange/.test(t))      return lf('oranges,citrus,fruit');
  if (/lemon/.test(t))               return lf('lemons,yellow,citrus');
  if (/pineapple/.test(t))           return lf('pineapple,tropical,fruit');
  if (/watermelon/.test(t))          return lf('watermelon,red,sliced');
  if (/mango/.test(t))               return lf('mango,yellow,tropical');

  // ─ Grocery: meat & fish ──────────────────────
  if (/chicken\s*breast|chicken\s*fillet|whole\s*chicken/.test(t)) return lf('chicken,raw,meat');
  if (/chicken\s*thigh/.test(t))     return lf('chicken,thighs,meat');
  if (/beef\s*mince|steak\s*mince/.test(t)) return lf('beef,mince,meat');
  if (/sausage|richmond/.test(t))    return lf('sausages,raw,meat');
  if (/bacon/.test(t))               return lf('bacon,strips,raw');
  if (/pork\s*loin|pork\s*steak/.test(t)) return lf('pork,steak,meat');
  if (/lamb\s*mince/.test(t))        return lf('lamb,mince,meat');
  if (/salmon|cod|prawn|tuna/.test(t)) return lf('fish,seafood,raw');

  // ─ Grocery: frozen ───────────────────────────
  if (/(garden\s*peas|frozen\s*peas)/.test(t)) return lf('peas,frozen,green');
  if (/sweetcorn|corn/.test(t))      return lf('sweetcorn,frozen,kernels');
  if (/(home\s*chips|frozen\s*chips|roast\s*potatoes)/.test(t)) return lf('chips,frozen,potato');
  if (/(fish\s*fingers)/.test(t))    return lf('fish,fingers,frozen');
  if (/(pizza|chicago\s*town|goodfellas|margherita\s*pizza)/.test(t)) return lf('pizza,frozen,box');
  if (/(quorn)/.test(t))             return lf('vegetarian,quorn,frozen');
  if (/(frozen\s*mixed\s*berries)/.test(t)) return lf('berries,frozen,fruit');
  if (/ice\s*cream|magnum|cornetto|haagen|ben.*jerry/.test(t)) return lf('ice,cream,scoop');

  // ─ Grocery: bakery ───────────────────────────
  if (/loaf|toastie\s*thick|kingsmill|hovis|tiger\s*bloomer/.test(t)) return lf('bread,loaf,sliced');
  if (/croissant|pain au chocolat|greggs/.test(t)) return lf('croissant,pastry,bakery');
  if (/bagel/.test(t))               return lf('bagel,bread,bakery');
  if (/tortilla\s*wrap/.test(t))     return lf('tortilla,wraps,flatbread');
  if (/burger\s*buns|brioche/.test(t)) return lf('burger,buns,bakery');
  if (/crumpet/.test(t))             return lf('crumpets,british,breakfast');
  if (/english\s*muffin/.test(t))    return lf('muffin,bread,breakfast');
  if (/pancake|maple\s*syrup/.test(t)) return lf('pancake,breakfast,syrup');

  // ─ Grocery: cereals & breakfast ──────────────
  if (/weetabix/.test(t))            return lf('weetabix,cereal,breakfast');
  if (/cornflake/.test(t))           return lf('cornflakes,cereal,breakfast');
  if (/(coco\s*pops|frosties|krispies|crunchy\s*nut|special\s*k|cheerios|shreddies|shredded\s*wheat|cookie\s*crisp)/.test(t)) return lf('cereal,box,breakfast');
  if (/muesli|alpen|dorset|country\s*crisp|bran\s*flakes/.test(t)) return lf('muesli,oats,breakfast');
  if (/(oats|porridge|oat\s*so\s*simple)/.test(t)) return lf('oats,porridge,bowl');
  if (/belvita|nature\s*valley|cereal\s*bar/.test(t)) return lf('breakfast,biscuit,bar');

  // ─ Grocery: pantry / sauces / staples ────────
  if (/baked\s*beans/.test(t))       return lf('baked,beans,tin');
  if (/tomato\s*soup|heinz\s*tomato/.test(t)) return lf('soup,tin,tomato');
  if (/ketchup/.test(t))             return lf('ketchup,bottle,sauce');
  if (/mayonnaise|mayo|hellmann/.test(t)) return lf('mayonnaise,jar,sauce');
  if (/branston|pickle|chutney|mango\s*chutney/.test(t)) return lf('pickle,jar,relish');
  if (/olive\s*oil|filippo\s*berio/.test(t)) return lf('olive,oil,bottle');
  if (/sugar|granulated/.test(t))    return lf('sugar,bag,sweet');
  if (/salt|saxa/.test(t))           return lf('salt,seasoning,table');
  if (/nutella/.test(t))             return lf('nutella,chocolate,spread');
  if (/jam|jelly|robertson/.test(t)) return lf('jam,jar,fruit');
  if (/yorkshire\s*tea|pg\s*tips|tea\s*bag/.test(t)) return lf('tea,bags,box');
  if (/nescaf|lavazza|instant\s*coffee|ground\s*coffee/.test(t)) return lf('coffee,beans,jar');
  if (/(pasta|penne|spaghetti|napolina)/.test(t)) return lf('pasta,italian,dry');
  if (/bolognese|cooking\s*sauce|dolmio/.test(t)) return lf('pasta,sauce,jar');
  if (/(basmati\s*rice|long\s*grain|tilda|rice)/.test(t)) return lf('rice,grains,bag');
  if (/(chana\s*dal|kala\s*chana|red\s*lentil|lentil|trs)/.test(t)) return lf('lentils,pulses,dry');
  if (/(naan|sharwood)/.test(t))     return lf('naan,indian,bread');
  if (/(patak|tikka|korma|curry\s*paste)/.test(t)) return lf('curry,sauce,jar');
  if (/(soy\s*sauce|kikkoman|sriracha)/.test(t)) return lf('sauce,bottle,asian');
  if (/(fajita|old\s*el\s*paso)/.test(t)) return lf('mexican,food,kit');

  // ─ Grocery: drinks (soft) ────────────────────
  if (/coca.cola|coke|pepsi|fizzy|diet\s*coke|pepsi\s*max/.test(t)) return lf('cola,bottle,fizzy');
  if (/orange\s*juice|tropicana|innocent/.test(t)) return lf('juice,orange,carton');
  if (/squash|robinsons/.test(t))    return lf('squash,cordial,bottle');
  if (/(evian|highland\s*spring|still\s*water|bottled\s*water)/.test(t)) return lf('water,bottle,still');
  if (/red\s*bull|lucozade|energy\s*drink/.test(t)) return lf('energy,drink,can');

  // ─ Grocery: alcohol ──────────────────────────
  if (/(beer|lager|ipa|brewdog|stella|carling|heineken|corona|peroni|budweiser|beck|asahi|madri|cobra|kingfisher|guinness|stout|ale|hobgoblin|old\s*speckled)/.test(t)) return lf('beer,bottle,pub');
  if (/(cider|strongbow|kopparberg|magners|rekorderlig)/.test(t)) return lf('cider,glass,apple');
  if (/(vodka|smirnoff|absolut)/.test(t)) return lf('vodka,bottle,spirit');
  if (/(gin|gordon|bombay)/.test(t)) return lf('gin,bottle,clear');
  if (/(rum|captain\s*morgan|bacardi)/.test(t)) return lf('rum,bottle,spirit');
  if (/(whisky|whiskey|jack\s*daniel|famous\s*grouse|jameson)/.test(t)) return lf('whiskey,bottle,amber');
  if (/(wine|chardonnay|merlot|shiraz|rosé|rose|cabernet|hardys|echo\s*falls|yellow\s*tail|casillero)/.test(t)) return lf('wine,glass,bottle');
  if (/(prosecco|cava|sparkling|champagne|freixenet)/.test(t)) return lf('sparkling,wine,celebration');

  // ─ Grocery: snacks ───────────────────────────
  if (/(crisps|walkers|doritos|pringles|hula\s*hoops|quavers|wotsits|monster\s*munch|mccoy|kettle\s*chips|tyrrell|popchips|frazzles|skips|discos|tortilla\s*chip|bombay\s*mix|pom-bear|twiglet|mini\s*cheddars|snack\s*a\s*jacks)/.test(t)) return lf('crisps,snack,packet');
  if (/(dairy\s*milk|cadbury|galaxy|maltesers|kit\s*kat)/.test(t)) return lf('chocolate,bar,sweet');
  if (/(digestive|chocolate\s*digestive|mcvitie|jaffa\s*cakes|biscuit)/.test(t)) return lf('biscuits,tea,pack');
  if (/(haribo|gummy|sweets)/.test(t)) return lf('gummy,sweets,candy');

  // ─ Household & toiletries ────────────────────
  if (/(toilet\s*roll|andrex|plenty\s*kitchen\s*roll)/.test(t)) return lf('toilet,roll,paper');
  if (/(fairy|washing.up\s*liquid)/.test(t)) return lf('washing,up,liquid');
  if (/(persil|comfort|fabric\s*conditioner|laundry\s*detergent)/.test(t)) return lf('detergent,laundry,bottle');
  if (/(cif|cleaner|household\s*cleaner)/.test(t)) return lf('cleaning,spray,bottle');
  if (/(toothpaste|colgate)/.test(t)) return lf('toothpaste,tube,oral');
  if (/(shampoo|head\s*shoulders)/.test(t)) return lf('shampoo,bottle,hair');
  if (/(nappies|pampers)/.test(t))   return lf('nappies,baby,pack');

  // ─ Furniture ─────────────────────────────────
  if (/(bed\s*frame|malm)/.test(t))  return lf('bedframe,bedroom,modern');
  if (/(armchair|poang)/.test(t))    return lf('armchair,chair,modern');
  if (/(bookcase|billy)/.test(t))    return lf('bookcase,shelving,books');
  if (/(sofa|3\s*seater)/.test(t))   return lf('sofa,living,grey');
  if (/(dining\s*table)/.test(t))    return lf('dining,table,wood');
  if (/(office\s*chair)/.test(t))    return lf('office,chair,desk');

  // ─ Toys / outdoor / pets / sports ────────────
  if (/lego/.test(t))                return lf('lego,bricks,toy');
  if (/(barbie|doll)/.test(t))       return lf('doll,toy,kids');
  if (/(hot\s*wheels|toy\s*car)/.test(t)) return lf('toy,cars,kids');
  if (/(magnetic\s*building\s*block|building\s*block)/.test(t)) return lf('building,blocks,magnetic');
  if (/(pop\s*it|fidget\s*spinner|fidget|stress\s*relief)/.test(t)) return lf('fidget,toy,sensory');
  if (/(kinetic\s*sand|slime|slime\s*kit)/.test(t)) return lf('slime,kids,play');
  if (/(bubble\s*machine)/.test(t))  return lf('bubble,machine,kids');
  if (/(plushie|squishmallow|kawaii|plush)/.test(t)) return lf('plushie,plush,soft');
  if (/(rc\s|drone|remote\s*control)/.test(t)) return lf('drone,quadcopter,sky');
  if (/(tennis\s*racket|wilson)/.test(t)) return lf('tennis,racket,sport');
  if (/(running\s*shoe|kalenji)/.test(t)) return lf('running,shoes,fitness');
  if (/(camping\s*tent|coleman|tent)/.test(t)) return lf('tent,camping,outdoor');
  if (/(dog\s*food|pedigree|cat\s*pouches|whiskas|drinkwell|pet\s*fountain)/.test(t)) return lf('pet,food,bowl');
  if (/(resistance\s*band)/.test(t)) return lf('resistance,band,fitness');
  if (/(yoga\s*mat)/.test(t))        return lf('yoga,mat,fitness');
  if (/(foam\s*roller)/.test(t))     return lf('foam,roller,fitness');
  if (/(water\s*bottle|stanley.*tumbler|tumbler|insulated\s*bottle)/.test(t)) return lf('water,bottle,steel');
  if (/(skipping\s*rope)/.test(t))   return lf('skipping,rope,fitness');
  if (/(camping\s*lantern|led\s*lantern)/.test(t)) return lf('lantern,camping,light');
  if (/(vacuum\s*storage\s*bag)/.test(t)) return lf('storage,bag,travel');
  if (/(inflatable\s*beach|air\s*sofa|inflatable\s*lounger)/.test(t)) return lf('inflatable,beach,lounger');

  // ─ Temu/Shein home gadgets ───────────────────
  if (/(handheld\s*vacuum|mini\s*vacuum|usb\s*vacuum)/.test(t)) return lf('mini,vacuum,handheld');
  if (/(drain\s*plug|hair\s*catcher)/.test(t)) return lf('drain,bathroom,silicone');
  if (/(refrigerator\s*storage|fridge\s*storage|magnetic\s*storage)/.test(t)) return lf('storage,kitchen,rack');
  if (/(garlic\s*press|garlic\s*mincer)/.test(t)) return lf('garlic,press,kitchen');
  if (/(vegetable\s*slicer|chopper)/.test(t)) return lf('vegetable,chopper,kitchen');
  if (/(egg\s*slicer)/.test(t))      return lf('egg,slicer,gadget');
  if (/(silicone\s*lid|stretch\s*lid)/.test(t)) return lf('silicone,lid,kitchen');
  if (/(drawer\s*divider|storage\s*basket|caddy|organiser)/.test(t)) return lf('organiser,storage,home');
  if (/(makeup\s*organiser)/.test(t)) return lf('makeup,organiser,vanity');
  if (/(lazy\s*susan|turntable)/.test(t)) return lf('lazy,susan,kitchen');
  if (/(cordless\s*sweeper|cordless\s*mop|sweeper)/.test(t)) return lf('sweeper,mop,floor');
  if (/(wall\s*hook|adhesive\s*hook)/.test(t)) return lf('wall,hooks,storage');
  if (/(string\s*light|fairy\s*light)/.test(t)) return lf('fairy,lights,string');
  if (/(galaxy\s*projector|star\s*projector|sunset\s*lamp|moon\s*lamp|sunset\s*projector|night\s*light)/.test(t)) return lf('night,light,projector');
  if (/(led\s*light\s*strip|led\s*strip|rgb\s*strip|bluetooth\s*led)/.test(t)) return lf('led,strip,light');
  if (/(diffuser|aromatherapy|essential\s*oil)/.test(t)) return lf('diffuser,aromatherapy,wood');
  if (/(scented\s*candle|soy\s*wax)/.test(t)) return lf('candle,scented,decor');
  if (/(faux\s*plant|fake\s*plant|artificial\s*plant)/.test(t)) return lf('plant,faux,decor');
  if (/(macrame|plant\s*holder)/.test(t)) return lf('macrame,plant,bohemian');
  if (/(boho\s*cushion|tufted\s*cushion|cushion)/.test(t)) return lf('cushion,pillow,decor');
  if (/(bath\s*mat|memory\s*foam\s*mat)/.test(t)) return lf('bath,mat,rug');
  if (/(area\s*rug|tufted\s*rug|rug)/.test(t)) return lf('rug,floor,carpet');
  if (/(lint\s*roller|pet\s*hair)/.test(t)) return lf('lint,roller,pet');
  if (/(cat\s*brush|grooming\s*brush)/.test(t)) return lf('cat,grooming,brush');
  if (/(slow\s*feeder|dog\s*bowl)/.test(t)) return lf('dog,bowl,feeder');
  if (/(cat\s*laser|laser\s*toy)/.test(t)) return lf('cat,toy,laser');

  // ─ Fallback by category ──────────────────────
  switch (seed.category) {
    case 'electronics': return lf('electronics,gadget,device');
    case 'fashion':     return lf('fashion,clothes,style');
    case 'beauty':      return lf('beauty,cosmetic,skincare');
    case 'grocery':     return lf('grocery,food,shop');
    case 'home':        return lf('home,appliance,kitchen');
    case 'furniture':   return lf('furniture,home,room');
    case 'gaming':      return lf('gaming,console,gamepad');
    case 'sports':      return lf('sports,fitness,gym');
    case 'toys':        return lf('toys,kids,fun');
    case 'outdoor':     return lf('outdoor,adventure,nature');
    case 'pet':         return lf('pet,dog,cat');
    case 'cameras':     return lf('camera,photography,lens');
  }
  return seed.image;
}

function buildVariants(seed: Seed): Product[] {
  const eligibleRetailers = (Object.keys(RETAILER_CATEGORIES) as Retailer[])
    .filter(r => RETAILER_CATEGORIES[r].includes(seed.category));

  // Each product appears at 4–8 retailers (deterministic)
  const count = 4 + (hash(seed.title) % 5);
  let chosen = eligibleRetailers
    .slice() // copy
    .sort((a, b) => hash(seed.title + a) - hash(seed.title + b))
    .slice(0, count);

  // Always include Temu, Shein and AliExpress when they're eligible for this category.
  for (const r of MUST_INCLUDE) {
    if (eligibleRetailers.includes(r) && !chosen.includes(r)) {
      chosen.push(r);
    }
  }
  // For food category — always include Uber Eats, Deliveroo, Just Eat.
  if (seed.category === 'food') {
    for (const r of FOOD_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }
  // For cars — always include AutoTrader, Motors, Carwow, Heycar, Cinch.
  if (seed.category === 'cars') {
    for (const r of CAR_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
    // Also Facebook Marketplace and Gumtree are great for cars
    if (!chosen.includes('facebook')) chosen.push('facebook');
    if (!chosen.includes('gumtree')) chosen.push('gumtree');
    if (!chosen.includes('arnoldclark')) chosen.push('arnoldclark');
  }
  // For insurance — always include the big 4 comparison sites.
  if (seed.category === 'insurance') {
    for (const r of INSURANCE_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }
  // For broadband — always include Sky, BT, Virgin Media, TalkTalk, Plusnet.
  if (seed.category === 'broadband') {
    for (const r of BROADBAND_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }
  // For mobile plans — always include all the major UK networks.
  if (seed.category === 'mobileplan') {
    for (const r of MOBILE_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }
  // Fashion → always show major UK clothing retailers; shoes get shoe specialists.
  if (seed.category === 'fashion') {
    const isShoe = /trainer|sneaker|boot|heel|sandal|loafer|shoe|air max|air force|stan smith|gazelle|samba|chuck taylor|vans|new balance|dr\.\s*martens|ugg/i.test(seed.title);
    const list = isShoe
      ? [...SHOE_PLATFORMS, ...FASHION_PLATFORMS, 'tkmaxx' as const]
      : [...FASHION_PLATFORMS, 'tkmaxx' as const, 'flannels' as const];
    for (const r of list) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }
  // Home / grocery → discount stores join the lineup.
  if (seed.category === 'home' || seed.category === 'grocery') {
    for (const r of DISCOUNT_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }
  // Watch products → watch specialists join the lineup.
  const isWatch = /\bwatch\b|fitbit|garmin|smartwatch|g-shock|casio|fossil|tissot|seiko|citizen|tag heuer|daniel wellington|olivia burton|skagen|michael kors|amazfit|huawei watch/i.test(seed.title);
  if (isWatch) {
    for (const r of WATCH_PLATFORMS) {
      if (eligibleRetailers.includes(r) && !chosen.includes(r)) chosen.push(r);
    }
  }

  return chosen.map((retailer): Product => {
    const h = hash(seed.title + retailer);
    // Retailer-specific price modifier: -15% to +12%
    const modifier = ((h % 27) - 15) / 100;
    const price = Math.max(1, Math.round(seed.basePrice * (1 + modifier) * 100) / 100);
    const rating = Math.round((3.5 + (h % 15) / 10) * 10) / 10; // 3.5..4.9
    const reviews = 50 + (h % 5000);
    const key = productKey(seed.title);
    const id = `${retailer}-${hash(seed.title)}`;

    const delivery = deliveryInfo(retailer, seed.category);
    return {
      id,
      productKey: key,
      title: seed.title,
      image: smartImage(seed),
      price,
      currency: 'GBP',
      retailer,
      url: buildAffiliateUrl(retailer, seed.title),
      rating,
      reviews,
      category: seed.category,
      inStock: (h % 17) !== 0, // ~6% out of stock
      source: 'mock',
      ...delivery,
    };
  });
}

function buildAffiliateUrl(retailer: Retailer, title: string): string {
  const q = encodeURIComponent(title);
  // These are search URLs — replace with real affiliate-wrapped product URLs
  // once you have approval from each network.
  switch (retailer) {
    case 'amazon':     return `https://www.amazon.co.uk/s?k=${q}&tag=YOUR_AMAZON_TAG`;
    case 'ebay':       return `https://www.ebay.co.uk/sch/i.html?_nkw=${q}&mkrid=710-53481-19255-0&campid=YOUR_EBAY_CAMPAIGN`;
    case 'argos':      return `https://www.argos.co.uk/search/${q}/`;
    case 'currys':     return `https://www.currys.co.uk/search?q=${q}`;
    case 'johnlewis':  return `https://www.johnlewis.com/search?search-term=${q}`;
    case 'tesco':      return `https://www.tesco.com/groceries/en-GB/search?query=${q}`;
    case 'asda':       return `https://groceries.asda.com/search/${q}`;
    case 'sainsburys': return `https://www.sainsburys.co.uk/gol-ui/SearchResults/${q}`;
    case 'morrisons':  return `https://groceries.morrisons.com/search?entry=${q}`;
    case 'waitrose':   return `https://www.waitrose.com/ecom/shop/search?searchTerm=${q}`;
    case 'aldi':       return `https://www.aldi.co.uk/search?text=${q}`;
    case 'lidl':       return `https://www.lidl.co.uk/q/search?query=${q}`;
    case 'iceland':    return `https://www.iceland.co.uk/search?q=${q}`;
    case 'ocado':      return `https://www.ocado.com/search?entry=${q}`;
    case 'coop':       return `https://www.coop.co.uk/search?q=${q}`;
    case 'marksandspencer': return `https://www.marksandspencer.com/l/food-to-order/search?q=${q}`;
    case 'temu':       return `https://www.temu.com/search_result.html?search_key=${q}`;
    case 'shein':      return `https://uk.shein.com/pdsearch/${q}/`;
    case 'aliexpress': return `https://www.aliexpress.com/wholesale?SearchText=${q}`;
    case 'wayfair':    return `https://www.wayfair.co.uk/keyword.php?keyword=${q}`;
    case 'ikea':       return `https://www.ikea.com/gb/en/search/?q=${q}`;
    case 'b&q':        return `https://www.diy.com/search?term=${q}`;
    case 'walmart':    return `https://www.walmart.com/search?q=${q}`;
    case 'apple':      return `https://www.apple.com/uk/search/${q}`;
    case 'facebook':   return `https://www.facebook.com/marketplace/search/?query=${q}`;
    case 'ubereats':   return `https://www.ubereats.com/gb/search?q=${q}`;
    case 'deliveroo':  return `https://deliveroo.co.uk/search?q=${q}`;
    case 'justeat':    return `https://www.just-eat.co.uk/search?q=${q}`;
    // Cars
    case 'autotrader':  return `https://www.autotrader.co.uk/car-search?keywords=${q}`;
    case 'motors':      return `https://www.motors.co.uk/search/car/?keywords=${q}`;
    case 'gumtree':     return `https://www.gumtree.com/cars/uk?q=${q}`;
    case 'carwow':      return `https://www.carwow.co.uk/used-cars/search?keywords=${q}`;
    case 'cinch':       return `https://www.cinch.co.uk/used-cars?keywords=${q}`;
    case 'heycar':      return `https://heycar.co.uk/results?keywords=${q}`;
    case 'arnoldclark': return `https://www.arnoldclark.com/used-cars?searchQuery=${q}`;
    // Insurance
    case 'comparethemarket': return `https://www.comparethemarket.com/search-results?searchTerm=${q}`;
    case 'moneysupermarket': return `https://www.moneysupermarket.com/search?q=${q}`;
    case 'gocompare':        return `https://www.gocompare.com/search?q=${q}`;
    case 'confused':         return `https://www.confused.com/search?q=${q}`;
    case 'admiral':          return `https://www.admiral.com/search?q=${q}`;
    case 'aviva':            return `https://www.aviva.co.uk/search-results/?searchTerm=${q}`;
    case 'directline':       return `https://www.directline.com/search?q=${q}`;
    case 'churchill':        return `https://www.churchill.com/search?q=${q}`;
    // Broadband
    case 'sky':          return `https://www.sky.com/shop/broadband-talk/`;
    case 'bt':           return `https://www.bt.com/broadband/deals`;
    case 'virginmedia':  return `https://www.virginmedia.com/broadband/deals`;
    case 'talktalk':     return `https://www.talktalk.co.uk/shop/fibre-broadband`;
    case 'nowbroadband': return `https://www.nowtv.com/broadband`;
    case 'plusnet':      return `https://www.plus.net/broadband-deals/`;
    case 'hyperoptic':   return `https://www.hyperoptic.com/broadband`;
    // Mobile networks
    case 'ee':           return `https://shop.ee.co.uk/sim-only-deals`;
    case 'vodafone':     return `https://www.vodafone.co.uk/mobile/sim-only`;
    case 'three':        return `https://www.three.co.uk/store/sim-only`;
    case 'o2':           return `https://www.o2.co.uk/shop/sim-cards`;
    case 'giffgaff':     return `https://www.giffgaff.com/orders/affiliate/goodybags`;
    case 'tescomobile':  return `https://www.tescomobile.com/sim-only`;
    case 'skymobile':    return `https://www.sky.com/shop/mobile`;
    case 'voxi':         return `https://www.voxi.co.uk/plans`;
    case 'smarty':       return `https://smarty.co.uk/plans`;
    case 'idmobile':     return `https://www.idmobile.co.uk/sim-only-deals`;
    case 'carphonewarehouse': return `https://www.carphonewarehouse.com/sim-free.html`;
    // Discount stores
    case 'bm':           return `https://www.bmstores.co.uk/search?q=${q}`;
    case 'homebargains': return `https://www.homebargains.co.uk/search?q=${q}`;
    case 'poundland':    return `https://www.poundland.co.uk/search?q=${q}`;
    case 'wilko':        return `https://www.wilko.com/en-uk/search?q=${q}`;
    // Clothing & shoes
    case 'zara':         return `https://www.zara.com/uk/en/search?searchTerm=${q}`;
    case 'hm':           return `https://www2.hm.com/en_gb/search-results.html?q=${q}`;
    case 'office':       return `https://www.office.co.uk/search?w=${q}`;
    case 'asos':         return `https://www.asos.com/search/?q=${q}`;
    case 'next':         return `https://www.next.co.uk/search?w=${q}`;
    case 'primark':      return `https://www.primark.com/en-gb/search?q=${q}`;
    case 'jdsports':     return `https://www.jdsports.co.uk/search/?text=${q}`;
    case 'schuh':        return `https://www.schuh.co.uk/search?w=${q}`;
    case 'sportsdirect': return `https://www.sportsdirect.com/searchresults?searchText=${q}`;
    case 'prettylittlething': return `https://www.prettylittlething.com/search/?qs=${q}`;
    case 'boohoo':       return `https://www.boohoo.com/search?q=${q}`;
    case 'riverisland':  return `https://www.riverisland.com/c/search?query=${q}`;
    case 'newlook':      return `https://www.newlook.com/uk/search?q=${q}`;
    case 'clarks':       return `https://www.clarks.co.uk/c/search?q=${q}`;
    case 'mango':        return `https://shop.mango.com/gb/search?kw=${q}`;
    case 'selfridges':   return `https://www.selfridges.com/GB/en/search?query=${q}`;
    case 'fatface':      return `https://www.fatface.com/search?q=${q}`;
    case 'uniqlo':       return `https://www.uniqlo.com/uk/en/search/?q=${q}`;
    // Discount fashion / homeware
    case 'tkmaxx':       return `https://www.tkmaxx.com/uk/en/search?text=${q}`;
    case 'homesense':    return `https://www.homesense.com/uk/en/search?text=${q}`;
    // Watch retailers / brands
    case 'watchshop':            return `https://www.watchshop.com/search?q=${q}`;
    case 'watchesofswitzerland': return `https://www.watches-of-switzerland.co.uk/search?q=${q}`;
    case 'goldsmiths':           return `https://www.goldsmiths.co.uk/search?q=${q}`;
    case 'beaverbrooks':         return `https://www.beaverbrooks.co.uk/search?q=${q}`;
    case 'ernestjones':          return `https://www.ernestjones.co.uk/search?q=${q}`;
    case 'hsamuel':              return `https://www.hsamuel.co.uk/search?q=${q}`;
    case 'fossil':               return `https://www.fossil.com/en-gb/search?q=${q}`;
    case 'tagheuer':             return `https://www.tagheuer.com/gb/en/search.html?q=${q}`;
    case 'casioshop':            return `https://www.casio.co.uk/search?q=${q}`;
    // Premium branded clothing
    case 'tommyhilfiger':    return `https://uk.tommy.com/search?q=${q}`;
    case 'hugoboss':         return `https://www.hugoboss.com/uk/search?q=${q}`;
    case 'ralphlauren':      return `https://www.ralphlauren.co.uk/en/search?q=${q}`;
    case 'calvinklein':      return `https://www.calvinklein.co.uk/search?q=${q}`;
    case 'boden':            return `https://www.boden.co.uk/en-gb/search/?q=${q}`;
    case 'joules':           return `https://www.joules.com/search?q=${q}`;
    case 'whitestuff':       return `https://www.whitestuff.com/search?q=${q}`;
    case 'mountainwarehouse':return `https://www.mountainwarehouse.com/search/?q=${q}`;
    case 'cotswoldoutdoor':  return `https://www.cotswoldoutdoor.com/search?q=${q}`;
    case 'footasylum':       return `https://www.footasylum.com/search/?q=${q}`;
    case 'size':             return `https://www.size.co.uk/search/?q=${q}`;
    case 'flannels':         return `https://www.flannels.com/search?searchText=${q}`;
  }
}

let CACHE: Product[] | null = null;
function catalog(): Product[] {
  if (!CACHE) CACHE = SEEDS.flatMap(buildVariants);
  return CACHE;
}

// Synonym map: typing "beer" also matches lager/ale/stout, etc.
const SYNONYMS: Record<string, string[]> = {
  beer:       ['beer','lager','ale','stout','ipa'],
  beers:      ['beer','lager','ale','stout','ipa'],
  alcohol:    ['beer','lager','ale','stout','ipa','cider','wine','vodka','gin','rum','whisky','whiskey','prosecco','cava'],
  drink:      ['drink','cola','pepsi','juice','water','squash','lucozade','beer','lager','ale','cider','wine','vodka','gin','rum','whisky','whiskey'],
  drinks:     ['drink','cola','pepsi','juice','water','squash','lucozade','beer','lager','ale','cider','wine','vodka','gin','rum','whisky','whiskey'],
  crisp:      ['crisps','crisp','doritos','pringles','walkers','hula hoops','quavers','wotsits','monster munch','mccoy','kettle','tyrrells','popchips','frazzles','twiglets','pom-bear','bombay'],
  crisps:     ['crisps','crisp','doritos','pringles','walkers','hula hoops','quavers','wotsits','monster munch','mccoy','kettle','tyrrells','popchips','frazzles','twiglets','pom-bear','bombay'],
  cereal:     ['cereal','cornflakes','weetabix','oats','muesli','granola','porridge','flakes','shreddies','cheerios','krispies','frosties','coco pops','special k','belvita'],
  cereals:    ['cereal','cornflakes','weetabix','oats','muesli','granola','porridge','flakes','shreddies','cheerios','krispies','frosties','coco pops','special k','belvita'],
  breakfast:  ['cereal','oats','muesli','weetabix','cornflakes','porridge','flakes','breakfast','pancake','croissant','crumpet','muffin','shreddies','cheerios','belvita','nature valley','pain au'],
  morning:    ['cereal','oats','muesli','weetabix','cornflakes','porridge','breakfast','pancake','croissant','crumpet','coffee','tea','egg','bacon'],
  snack:      ['crisps','chocolate','biscuit','cookie','sweet','haribo','maltesers','kitkat','digestives','jaffa cakes','pringles','doritos','walkers'],
  snacks:     ['crisps','chocolate','biscuit','cookie','sweet','haribo','maltesers','kitkat','digestives','jaffa cakes','pringles','doritos','walkers'],
  vegetable:  ['carrot','potato','onion','tomato','spinach','lettuce','cucumber','pepper','broccoli','cauliflower','mushroom','aubergine','courgette','avocado','ginger','spring onion','cabbage'],
  vegetables: ['carrot','potato','onion','tomato','spinach','lettuce','cucumber','pepper','broccoli','cauliflower','mushroom','aubergine','courgette','avocado','ginger','spring onion','cabbage'],
  veg:        ['carrot','potato','onion','tomato','spinach','lettuce','cucumber','pepper','broccoli','cauliflower','mushroom'],
  fruit:      ['banana','apple','strawberr','blueberr','raspberr','grape','satsuma','lemon','pineapple','watermelon','mango','orange'],
  fruits:     ['banana','apple','strawberr','blueberr','raspberr','grape','satsuma','lemon','pineapple','watermelon','mango','orange'],
  meat:       ['chicken','beef','pork','lamb','bacon','sausage','steak'],
  fish:       ['salmon','cod','prawn','tuna','seafood','haddock'],
  dairy:      ['milk','cheese','butter','yoghurt','yogurt','cream'],
  cover:      ['case','cover','protector','sleeve'],
  case:       ['case','cover','protector','sleeve','otterbox','spigen'],
  cases:      ['case','cover','protector','sleeve','otterbox','spigen'],
  charger:    ['charger','adapter','power adapter','magsafe','wall charger'],
  chargers:   ['charger','adapter','power adapter','magsafe','wall charger'],
  cable:      ['cable','cord','lightning','usb-c','usbc','hdmi','ethernet','aux','displayport'],
  cables:     ['cable','cord','lightning','usb-c','usbc','hdmi','ethernet','aux','displayport'],
  headphone:  ['headphone','headphones','earbuds','airpods','headset'],
  headphones: ['headphone','headphones','earbuds','airpods','headset'],
  watch:      ['watch','fitbit','garmin','smartwatch','g-shock','casio','apple watch'],
  watches:    ['watch','fitbit','garmin','smartwatch','g-shock','casio'],
  smartwatch: ['watch','fitbit','garmin','smartwatch','g-shock','apple watch'],
  tv:         ['tv','television',' qled',' oled',' uhd','smart tv','crystal uhd'],
  laptop:     ['laptop','macbook','xps','thinkpad','pavilion','notebook'],
  phone:      ['iphone','galaxy','pixel','oneplus','xiaomi','redmi','nothing phone','moto','motorola','oppo','honor','nokia'],
  mobile:     ['iphone','galaxy','pixel','oneplus','xiaomi','redmi','nothing phone','moto','motorola','oppo','honor','nokia','phone'],
  clothes:    ['dress','jeans','top','shirt','tee','hoodie','jacket','coat','trouser','pant','skirt','sweater','cardigan'],
  clothing:   ['dress','jeans','top','shirt','tee','hoodie','jacket','coat','trouser','pant','skirt','sweater','cardigan'],
  shoes:      ['trainer','sneaker','boot','heel','sandal','loafer','shoe'],
  fridge:     ['fridge','refrigerator','freezer','cooler'],
  freezer:    ['freezer','fridge','frozen'],
  washing:    ['washing','washer','washing machine'],
  washer:     ['washer','washing'],
  dryer:      ['dryer','tumble','heat pump','condenser','vented'],
  appliance:  ['fridge','washer','washing','dryer','oven','microwave','dishwasher','cooker','hob','fan','freezer'],
  appliances: ['fridge','washer','washing','dryer','oven','microwave','dishwasher','cooker','hob','fan','freezer'],
  electric:   ['fridge','washer','washing','dryer','oven','microwave','fan','heater','kettle','iron','vacuum','airfryer','air fryer','tesla','model 3','model y','ev','leaf','ioniq','polestar','niro ev'],
  electrical: ['fridge','washer','washing','dryer','oven','microwave','fan','heater','kettle','iron','vacuum','airfryer','air fryer'],
  white:      ['fridge','washer','washing','dryer','dishwasher','freezer','cooker','oven'],
  goods:      ['fridge','washer','washing','dryer','dishwasher','freezer','cooker','oven'],
  fan:        ['fan','cooler','dyson','meaco','tower fan','desk fan','pedestal','ceiling fan'],
  fans:       ['fan','cooler','dyson','meaco','tower fan','desk fan','pedestal','ceiling fan'],
  ac:         ['air conditioner','ac','cooler','portable air'],
  oven:       ['oven','cooker','range cooker'],
  cooker:     ['cooker','oven','range','hob'],
  microwave:  ['microwave','combination microwave'],
  dishwasher: ['dishwasher'],
  kitchen:    ['fridge','washer','dishwasher','oven','microwave','cooker','hob','kettle','toaster','airfryer','air fryer','blender','coffee','knife','chopping board','pan','frying','saucepan','casserole','utensil','mixing bowl','measuring','tea towel','oven gloves','apron','spice rack','bread bin','mug','plate','tumbler','wine glass','cake tin','baking','scales','stand mixer','food processor'],
  // Cars
  car:        ['car','suv','fiesta','golf','focus','corsa','polo','civic','astra','mini cooper','yaris','swift','clio','i30','leon','octavia','tesla','range rover','tucson','sportage','qashqai','juke','sentra','passat','accord','xc40','xc60','x3','m sport','amg','rs line','st-line','sport','hybrid','electric'],
  cars:       ['car','suv','fiesta','golf','focus','corsa','polo','civic','astra','tesla','range rover','tucson','sportage','qashqai','xc40','xc60','x3','hybrid','electric','m sport'],
  used:       ['used','second','pre-owned','2019','2020','2021','2022'],
  ev:         ['ev','electric','tesla','model 3','model y','leaf','ioniq','polestar','niro ev'],
  // Insurance
  insurance:  ['insurance','cover','policy','protection'],
  policy:     ['insurance','cover','policy'],
  // Broadband
  broadband:  ['broadband','fibre','fiber','full fibre','mb','gb','gigafast','gigabit','sky','bt','virgin media','talktalk','plusnet','hyperoptic','vodafone'],
  internet:   ['broadband','fibre','fiber','mb','gb','wifi'],
  fibre:      ['fibre','fiber','broadband','full fibre','gigafast','mb','gb'],
  wifi:       ['broadband','fibre','wifi','router','wireless'],
  // Mobile plans
  sim:        ['sim','sim only','goody bag','100gb','unlimited','smart plan'],
  contract:   ['contract','24 month','12 month','pay monthly','smart plan','refresh','swap'],
  plan:       ['sim','plan','contract','pay monthly','goody bag','smart plan'],
  unlimited:  ['unlimited','no limit','infinite data'],
  '5g':       ['5g','five g'],
  // Baby / kids
  baby:       ['baby','infant','toddler','aptamil','sma','cow & gate','hipp','kendamil','ella','heinz baby','heinz by nature','sudocrem','cussons','johnson','aveeno baby','tommee tippee','mam','avent','waterwipes','calpol','bepanthen','pampers','huggies','nappies','nappy','wipes','formula','rusk','cerelac','petits filous','organix','plum','porridge','step'],
  infant:     ['infant','baby','aptamil','sma','cow & gate','hipp','formula','first milk','follow-on'],
  toddler:    ['toddler','baby','growing up milk','pasta meal'],
  formula:    ['formula','first milk','infant milk','follow-on milk','growing up milk','aptamil','sma','cow & gate','hipp','kendamil'],
  nappies:    ['nappies','nappy','pampers','huggies','pull-ups','mamia'],
  // Kitchen (extra — merged with the kitchen key above in the synonyms map)
  cookware:   ['pan','saucepan','frying','casserole','tefal','le creuset','pyrex','wok'],
  utensil:    ['utensil','spatula','spoon','whisk','tongs'],
  kitchenware:['knife','chopping board','pan','frying','saucepan','casserole','utensil','mixing bowl','measuring','tea towel','oven gloves','apron','spice rack','bread bin','mug','plate','tumbler','wine glass','cake tin','baking','scales','stand mixer','food processor','blender','toaster','coffee machine'],
  // Cleaning
  cleaning:   ['cleaning','cleaner','dettol','cif','mr muscle','method','astonish','pink stuff','flash','domestos','bleach','windolene','furniture polish','bin bags','sponge','microfibre','duster','rubber gloves','viakal','limescale','calgon','lenor','detergent','washing powder','washing liquid','vanish','stain remover','bold','surf','fabric conditioner','dishwasher tablets'],
  cleaner:    ['cleaner','spray','wipes','disinfectant','antibacterial'],
  bleach:     ['bleach','domestos','toilet duck'],
  // Chocolate / candy
  chocolate:  ['chocolate','cadbury','galaxy','kit kat','wispa','twirl','flake','crunchie','curly wurly','heroes','roses','quality street','celebrations','lindt','toblerone','ferrero','rocher','reese','hershey','milkybar'],
  candy:      ['chocolate','sweets','haribo','jelly babies','rolo','aero'],
  sweets:     ['sweets','haribo','candy','rolo','chocolate'],
  // Water / drinks
  water:      ['water','evian','buxton','volvic','san pellegrino','perrier','belu','vita coco','sparkling','still','tonic'],
  fizzy:      ['fizzy','cola','coke','pepsi','fanta','sprite','7up','dr pepper','sparkling'],
  // Vegetables / fruit (extend existing)
  produce:    ['carrot','potato','onion','tomato','spinach','lettuce','cucumber','pepper','broccoli','cauliflower','mushroom','aubergine','courgette','avocado','ginger','banana','apple','strawberr','blueberr','grape','lemon','mango','pineapple','watermelon','satsuma'],
  fresh:      ['fresh','produce','vegetable','fruit','salad'],
};

// Multi-word phrases that map to a set of expansion terms —
// searched as a single unit rather than split into tokens.
const PHRASE_SYNONYMS: Record<string, string[]> = {
  'baby food':      ['baby','ella','heinz by nature','organix','plum','cow & gate','hipp','porridge','stage 1','stage 2','pouch','jar','rusk'],
  'baby wipes':     ['wipes','waterwipes','cussons','pampers'],
  'baby formula':   ['formula','aptamil','sma','cow & gate','hipp','kendamil','first milk','follow-on'],
  'infant formula': ['formula','aptamil','sma','cow & gate','hipp','kendamil','first milk'],
  'baby milk':      ['aptamil','sma','cow & gate','hipp','kendamil','first milk','follow-on','growing up milk'],
  'baby nappies':   ['pampers','huggies','nappies','pull-ups'],
  'in store':       ['tesco','asda','sainsburys','morrisons','waitrose','aldi','lidl','coop'],
  'cleaning products': ['dettol','cif','mr muscle','method','astonish','pink stuff','flash','domestos','bleach'],
  'kitchen products':  ['knife','pan','saucepan','frying','casserole','utensil','mixing bowl','baking','scales','stand mixer'],
  'frozen food':    ['frozen','birds eye','mccain','aunt bessies','chicago town','goodfellas','quorn','ice cream'],
  'frozen items':   ['frozen','birds eye','mccain','aunt bessies','chicago town','goodfellas','quorn','ice cream'],
  'soft drinks':    ['cola','coke','pepsi','fanta','sprite','7up','dr pepper','lucozade','squash'],
  'hot drinks':     ['tea','coffee','nescaf','lavazza','yorkshire','pg tips','costa'],
  'fresh veg':      ['carrot','potato','onion','tomato','spinach','lettuce','cucumber','pepper','broccoli'],
  'fresh fruit':    ['banana','apple','strawberr','blueberr','grape','lemon','mango'],
};

export async function searchMock(params: SearchParams): Promise<Product[]> {
  const q = (params.q || '').toLowerCase().trim();
  let items = catalog();

  if (q) {
    // First try full-phrase match
    const phraseKey = Object.keys(PHRASE_SYNONYMS).find(p => q === p || q.startsWith(p) || p.startsWith(q));
    if (phraseKey) {
      const exps = PHRASE_SYNONYMS[phraseKey];
      items = items.filter(p => {
        const hay = p.title.toLowerCase();
        return exps.some(exp => hay.includes(exp));
      });
    } else {
      // Token-by-token AND matching with synonym expansion
      const tokens = q.split(/\s+/).filter(Boolean);
      items = items.filter(p => {
        const hay = p.title.toLowerCase();
        return tokens.every(token => {
          const expansions = SYNONYMS[token] ?? [token];
          return expansions.some(exp => hay.includes(exp));
        });
      });
    }
  }
  if (params.category)  items = items.filter(p => p.category === params.category);
  if (params.retailer)  items = items.filter(p => p.retailer === params.retailer);
  if (params.minPrice != null) items = items.filter(p => p.price >= params.minPrice!);
  if (params.maxPrice != null) items = items.filter(p => p.price <= params.maxPrice!);
  return items;
}
