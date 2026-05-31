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
  { title: 'Brown Onions 1kg', category: 'grocery', basePrice: 0.95, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2d56?w=400' },
  { title: 'Red Onions 500g', category: 'grocery', basePrice: 0.85, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2d56?w=400' },
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
  { title: 'Spring Onions Bunch', category: 'grocery', basePrice: 0.6, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2d56?w=400' },

  // Fresh fruit
  { title: 'Bananas Loose 1kg', category: 'grocery', basePrice: 0.79, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
  { title: 'Pink Lady Apples 4 pack', category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400' },
  { title: 'Gala Apples 6 pack', category: 'grocery', basePrice: 1.6, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400' },
  { title: 'Strawberries 400g', category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=400' },
  { title: 'Blueberries 300g', category: 'grocery', basePrice: 2.2, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400' },
  { title: 'Raspberries 150g', category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400' },
  { title: 'Green Seedless Grapes 500g', category: 'grocery', basePrice: 2.3, image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=400' },
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
  { title: "Quaker Oats Rolled Oats 1kg", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400' },
  { title: "Kellogg's Corn Flakes 500g", category: 'grocery', basePrice: 3, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400' },
  { title: "Weetabix 24 pack", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400' },
  { title: "Nutella Hazelnut Spread 400g", category: 'grocery', basePrice: 3.5, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Robertson's Strawberry Jam 340g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { title: "Yorkshire Tea 240 Bags", category: 'grocery', basePrice: 7, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400' },
  { title: "PG Tips Pyramid Tea 160 Bags", category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400' },
  { title: "Nescafé Gold Blend Instant Coffee 200g", category: 'grocery', basePrice: 6.5, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400' },
  { title: "Lavazza Qualità Oro Ground Coffee 250g", category: 'grocery', basePrice: 4.5, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400' },

  // Drinks
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
  { title: "Walkers Crisps Variety 18x25g", category: 'grocery', basePrice: 5, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
  { title: "Doritos Chilli Heatwave 150g", category: 'grocery', basePrice: 2, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
  { title: "Pringles Original 200g", category: 'grocery', basePrice: 2.5, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
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
