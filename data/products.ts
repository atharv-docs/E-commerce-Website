export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  specs?: Record<string, string>;
}

export const categories = [
  { id: 'all', name: 'All Products', icon: 'shopping-bag' },
  { id: 'electronics', name: 'Electronics', icon: 'laptop' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt' },
  { id: 'home', name: 'Home & Living', icon: 'home' },
  { id: 'books', name: 'Books', icon: 'book-open' },
  { id: 'sports', name: 'Sports', icon: 'dumbbell' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Ultra HD Smart TV 55"',
    description: 'Experience stunning 4K resolution with this 55-inch smart TV. Features HDR10+, built-in streaming apps, and premium sound integration.',
    price: 699,
    originalPrice: 899,
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600', 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a5?w=600'],
    rating: 4.7,
    reviews: 234,
    category: 'electronics',
    inStock: true,
    specs: { 'Screen Size': '55 inches', 'Resolution': '3840 x 2160 4K', 'Smart TV': 'Yes', 'HDR': 'HDR10+' }
  },
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear audio quality.',
    price: 149,
    originalPrice: 199,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600'],
    rating: 4.5,
    reviews: 567,
    category: 'electronics',
    inStock: true,
    specs: { 'Battery Life': '30 hours', 'ANC': 'Yes', 'Bluetooth': '5.2', 'Waterproof': 'IPX4' }
  },
  {
    id: '3',
    name: 'Designer Leather Jacket',
    description: 'Premium genuine leather jacket with modern fit. Perfect for any occasion, featuring quality stitching and timeless design.',
    price: 299,
    originalPrice: 399,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600'],
    rating: 4.8,
    reviews: 123,
    category: 'fashion',
    inStock: true,
    specs: { 'Material': 'Genuine Leather', 'Fit': 'Modern Slim', 'Closure': 'Zipper', 'Care': 'Professional Clean' }
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    description: 'Elegant desk lamp with touch controls, adjustable brightness, and wireless charging base.',
    price: 79,
    originalPrice: 99,
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600', 'https://images.unsplash.com/photo-1534105614836-58f2a9236026?w=600'],
    rating: 4.4,
    reviews: 89,
    category: 'home',
    inStock: true,
    specs: { 'Material': 'Aluminum', 'Wattage': '10W', 'Wireless Charging': 'Yes', 'Touch Control': 'Yes' }
  },
  {
    id: '5',
    name: 'Fitness Tracker Band',
    description: 'Advanced fitness band with heart rate monitor, sleep tracking, GPS, and 14-day battery life.',
    price: 89,
    originalPrice: 129,
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600', 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=600'],
    rating: 4.3,
    reviews: 456,
    category: 'sports',
    inStock: true,
    specs: { 'Battery': '14 days', 'Water Resistance': '5ATM', 'GPS': 'Yes', 'Heart Rate': '24/7' }
  },
  {
    id: '6',
    name: 'Bestseller Novel Collection',
    description: 'Collection of 5 bestselling novels from acclaimed authors. Perfect for book lovers.',
    price: 49,
    originalPrice: 69,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'],
    rating: 4.6,
    reviews: 234,
    category: 'books',
    inStock: true,
    specs: { 'Format': 'Paperback', 'Pages': '1500+', 'Genre': 'Fiction/Drama', 'Language': 'English' }
  },
  {
    id: '7',
    name: 'Gaming Laptop 15.6"',
    description: 'Powerful gaming laptop with RTX graphics, 144Hz display, and mechanical keyboard.',
    price: 1299,
    originalPrice: 1599,
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600'],
    rating: 4.9,
    reviews: 178,
    category: 'electronics',
    inStock: true,
    specs: { 'Processor': 'Intel i7', 'Graphics': 'RTX 3060', 'Display': '144Hz', 'RAM': '16GB' }
  },
  {
    id: '8',
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 129,
    originalPrice: 159,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600'],
    rating: 4.6,
    reviews: 345,
    category: 'sports',
    inStock: true,
    specs: { 'Weight': '280g', 'Drop': '8mm', 'Upper': 'Breathable Mesh', 'Sole': 'Rubber' }
  },
  {
    id: '9',
    name: 'Smart Home Speaker',
    description: 'Premium smart speaker with voice assistant, multi-room audio, and premium sound.',
    price: 199,
    originalPrice: 249,
    images: ['https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'],
    rating: 4.7,
    reviews: 567,
    category: 'home',
    inStock: true,
    specs: { 'Audio': '360° Sound', 'Voice Assistant': 'Yes', 'Multi-room': 'Yes', 'Connectivity': 'WiFi, Bluetooth' }
  },
  {
    id: '10',
    name: 'Cotton Blend Sweater',
    description: 'Soft and comfortable cotton blend sweater. Perfect for casual and semi-formal occasions.',
    price: 59,
    originalPrice: 79,
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600'],
    rating: 4.4,
    reviews: 156,
    category: 'fashion',
    inStock: true,
    specs: { 'Material': 'Cotton Blend', 'Fit': 'Regular', 'Care': 'Machine Wash', 'Style': 'Crew Neck' }
  },
  {
    id: '11',
    name: 'Mechanical Keyboard RGB',
    description: 'Professional mechanical keyboard with RGB backlight, hot-swappable switches, and aluminum frame.',
    price: 149,
    originalPrice: 179,
    images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600'],
    rating: 4.8,
    reviews: 289,
    category: 'electronics',
    inStock: true,
    specs: { 'Switches': 'Cherry MX', 'Backlight': 'RGB', 'Layout': 'Full Size', 'Frame': 'Aluminum' }
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with alignment lines and non-slip surface. Eco-friendly materials.',
    price: 45,
    originalPrice: 59,
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', 'https://images.unsplash.com/photo-1599901860904-17e6edffdc00?w=600'],
    rating: 4.5,
    reviews: 234,
    category: 'sports',
    inStock: true,
    specs: { 'Thickness': '6mm', 'Material': 'TPE', 'Size': '72" x 26"', 'Eco-friendly': 'Yes' }
  },
  {
    id: '13',
    name: 'Smart Watch Series X',
    description: 'Feature-rich smartwatch with health monitoring, apps, and customizable watch faces.',
    price: 349,
    originalPrice: 429,
    images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600', 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600'],
    rating: 4.6,
    reviews: 412,
    category: 'electronics',
    inStock: true,
    specs: { 'Display': 'AMOLED', 'Battery': '36 hours', 'Water Resistance': '5ATM', 'Sensors': 'HR, SpO2, GPS' }
  },
  {
    id: '14',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe, built-in grinder, and multiple brew options.',
    price: 129,
    originalPrice: 169,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
    rating: 4.7,
    reviews: 345,
    category: 'home',
    inStock: true,
    specs: { 'Capacity': '12 cups', 'Grinder': 'Yes', 'Programmable': 'Yes', 'Filter': 'Permanent' }
  },
  {
    id: '15',
    name: 'Denim Jeans Classic',
    description: 'Classic fit denim jeans with comfortable stretch. Timeless style that never goes out of trend.',
    price: 69,
    originalPrice: 89,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600', 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600'],
    rating: 4.5,
    reviews: 267,
    category: 'fashion',
    inStock: true,
    specs: { 'Material': '98% Cotton 2% Elastane', 'Fit': 'Classic', 'Rise': 'Mid Rise', 'Closure': 'Button' }
  },
  {
    id: '16',
    name: 'Programming Guide Bundle',
    description: 'Comprehensive programming books covering Python, JavaScript, React, and more.',
    price: 89,
    originalPrice: 119,
    images: ['https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600'],
    rating: 4.9,
    reviews: 189,
    category: 'books',
    inStock: true,
    specs: { 'Format': 'Paperback', 'Pages': '2000+', 'Topics': 'Python, JS, React', 'Level': 'Beginner to Advanced' }
  },
  {
    id: '17',
    name: 'Wireless Mouse Ergonomic',
    description: 'Ergonomic wireless mouse with adjustable DPI, silent clicks, and long battery life.',
    price: 39,
    originalPrice: 49,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600'],
    rating: 4.4,
    reviews: 567,
    category: 'electronics',
    inStock: true,
    specs: { 'DPI': '1600', 'Battery': '12 months', 'Silent Click': 'Yes', 'Wireless': '2.4GHz' }
  },
  {
    id: '18',
    name: 'Exercise Bike Indoor',
    description: 'Premium indoor exercise bike with digital display, resistance levels, and heart rate monitor.',
    price: 499,
    originalPrice: 649,
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600'],
    rating: 4.7,
    reviews: 134,
    category: 'sports',
    inStock: true,
    specs: { 'Resistance': '100 Levels', 'Display': 'LCD', 'Weight Capacity': '300 lbs', 'Power': 'Self-powered' }
  },
  {
    id: '19',
    name: 'Smart LED Bulbs 4-Pack',
    description: 'WiFi enabled smart bulbs with 16 million colors, voice control, and scheduling.',
    price: 49,
    originalPrice: 69,
    images: ['https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600', 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600'],
    rating: 4.5,
    reviews: 456,
    category: 'home',
    inStock: true,
    specs: { 'Colors': '16 Million', 'Voltage': '120V', 'Watts': '9W', 'Compatibility': 'Alexa, Google' }
  },
  {
    id: '20',
    name: 'Casual Sneakers Comfort',
    description: 'Comfortable casual sneakers with memory foam insole and breathable canvas upper.',
    price: 79,
    originalPrice: 99,
    images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600', 'https://images.unsplash.com/photo-1491553895911-0055uj8a24b4?w=600'],
    rating: 4.6,
    reviews: 378,
    category: 'fashion',
    inStock: true,
    specs: { 'Upper': 'Canvas', 'Insole': 'Memory Foam', 'Sole': 'Rubber', 'Closure': 'Lace-up' }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};