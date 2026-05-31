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

const SEEDS: Seed[] = [
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

  // Grocery (UK)
  { title: 'Heinz Baked Beans 415g x6', category: 'grocery', basePrice: 6, image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400' },
  { title: 'Cadbury Dairy Milk 360g', category: 'grocery', basePrice: 4, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
  { title: 'Yorkshire Tea 240 Bags', category: 'grocery', basePrice: 7, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400' },
  { title: 'Coca-Cola Original 24x330ml', category: 'grocery', basePrice: 14, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400' },
  { title: 'Quaker Oats 1kg', category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400' },
  { title: 'Lurpak Slightly Salted Butter 500g', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
  { title: 'Walkers Crisps Variety 18x25g', category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },

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

// Which retailers stock which categories (broadly true for UK market)
const RETAILER_CATEGORIES: Record<Retailer, Category[]> = {
  amazon:     ['electronics','fashion','beauty','home','gaming','sports','toys','outdoor','pet','cameras','grocery','furniture'],
  ebay:       ['electronics','fashion','gaming','sports','toys','cameras','home','furniture'],
  argos:      ['electronics','home','gaming','toys','sports','furniture','beauty','outdoor'],
  currys:     ['electronics','gaming','home','cameras'],
  johnlewis:  ['electronics','fashion','beauty','home','furniture','toys','cameras'],
  tesco:      ['grocery','home','beauty','toys'],
  asda:       ['grocery','home','beauty','toys','fashion'],
  sainsburys: ['grocery','home','beauty'],
  temu:       ['fashion','home','toys','beauty','outdoor','pet','sports'],
  shein:      ['fashion','beauty','home'],
  aliexpress: ['electronics','fashion','home','toys','outdoor','sports'],
  wayfair:    ['furniture','home','outdoor'],
  ikea:       ['furniture','home','toys'],
  'b&q':      ['home','outdoor','furniture'],
  walmart:    ['electronics','grocery','home','toys','beauty','fashion'],
};

// Stable hash so the same retailer+title always produces the same price/rating
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildVariants(seed: Seed): Product[] {
  const eligibleRetailers = (Object.keys(RETAILER_CATEGORIES) as Retailer[])
    .filter(r => RETAILER_CATEGORIES[r].includes(seed.category));

  // Each product appears at 4–8 retailers (deterministic)
  const count = 4 + (hash(seed.title) % 5);
  const chosen = eligibleRetailers
    .slice() // copy
    .sort((a, b) => hash(seed.title + a) - hash(seed.title + b))
    .slice(0, count);

  return chosen.map((retailer): Product => {
    const h = hash(seed.title + retailer);
    // Retailer-specific price modifier: -15% to +12%
    const modifier = ((h % 27) - 15) / 100;
    const price = Math.max(1, Math.round(seed.basePrice * (1 + modifier) * 100) / 100);
    const rating = Math.round((3.5 + (h % 15) / 10) * 10) / 10; // 3.5..4.9
    const reviews = 50 + (h % 5000);
    const key = productKey(seed.title);
    const id = `${retailer}-${hash(seed.title)}`;

    return {
      id,
      productKey: key,
      title: seed.title,
      image: seed.image,
      price,
      currency: 'GBP',
      retailer,
      url: buildAffiliateUrl(retailer, seed.title),
      rating,
      reviews,
      category: seed.category,
      inStock: (h % 17) !== 0, // ~6% out of stock
      source: 'mock',
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
    case 'temu':       return `https://www.temu.com/search_result.html?search_key=${q}`;
    case 'shein':      return `https://uk.shein.com/pdsearch/${q}/`;
    case 'aliexpress': return `https://www.aliexpress.com/wholesale?SearchText=${q}`;
    case 'wayfair':    return `https://www.wayfair.co.uk/keyword.php?keyword=${q}`;
    case 'ikea':       return `https://www.ikea.com/gb/en/search/?q=${q}`;
    case 'b&q':        return `https://www.diy.com/search?term=${q}`;
    case 'walmart':    return `https://www.walmart.com/search?q=${q}`;
  }
}

let CACHE: Product[] | null = null;
function catalog(): Product[] {
  if (!CACHE) CACHE = SEEDS.flatMap(buildVariants);
  return CACHE;
}

export async function searchMock(params: SearchParams): Promise<Product[]> {
  const q = (params.q || '').toLowerCase().trim();
  let items = catalog();

  if (q) {
    const tokens = q.split(/\s+/).filter(Boolean);
    items = items.filter(p => {
      const hay = p.title.toLowerCase();
      return tokens.every(t => hay.includes(t));
    });
  }
  if (params.category)  items = items.filter(p => p.category === params.category);
  if (params.retailer)  items = items.filter(p => p.retailer === params.retailer);
  if (params.minPrice != null) items = items.filter(p => p.price >= params.minPrice!);
  if (params.maxPrice != null) items = items.filter(p => p.price <= params.maxPrice!);
  return items;
}
