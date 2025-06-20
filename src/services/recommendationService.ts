
import { Product, Recommendation } from "../types/productTypes";

// Sample product data - in a real app, this would come from your backend API
const products: Product[] = [
  {
    id: "1",
    name: "Premium Watch",
    category: "Watches",
    rating: 4.8,
    usersPurchased: 1200,
    price: 299.99,
    imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
  },
  {
    id: "2",
    name: "Designer Sunglasses",
    category: "Eyewear",
    rating: 4.5,
    usersPurchased: 850,
    price: 149.99,
    imageSrc: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=300"
  },
  {
    id: "3",
    name: "Leather Wallet",
    category: "Accessories",
    rating: 4.6,
    usersPurchased: 1500,
    price: 79.99,
    imageSrc: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300"
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    category: "Audio",
    rating: 4.7,
    usersPurchased: 2000,
    price: 129.99,
    imageSrc: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300"
  },
  {
    id: "5",
    name: "Smartphone Pro",
    category: "Smartphones",
    rating: 4.9,
    usersPurchased: 3000,
    price: 999.99,
    imageSrc: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
  },
  {
    id: "6",
    name: "Running Shoes",
    category: "Shoes",
    rating: 4.4,
    usersPurchased: 1800,
    price: 119.99,
    imageSrc: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
  },
  {
    id: "7",
    name: "Leather Handbag",
    category: "Bags",
    rating: 4.6,
    usersPurchased: 1200,
    price: 249.99,
    imageSrc: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300"
  },
  {
    id: "8",
    name: "Tablet Ultra",
    category: "Electronics",
    rating: 4.7,
    usersPurchased: 1500,
    price: 699.99,
    imageSrc: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300"
  },
  {
    id: "9",
    name: "Smart Speaker",
    category: "Electronics",
    rating: 4.3,
    usersPurchased: 2200,
    price: 89.99,
    imageSrc: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?w=300"
  },
  {
    id: "10",
    name: "Dress Shoes",
    category: "Shoes",
    rating: 4.5,
    usersPurchased: 900,
    price: 159.99,
    imageSrc: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300"
  },
  {
    id: "11",
    name: "Laptop Pro",
    category: "Electronics",
    rating: 4.8,
    usersPurchased: 1800,
    price: 1299.99,
    imageSrc: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
  },
  {
    id: "12",
    name: "Backpack",
    category: "Bags",
    rating: 4.4,
    usersPurchased: 1600,
    price: 59.99,
    imageSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"
  }
];

// This is a simplified version of the SVD model used in the notebook
// In a real application, this would be a more complex algorithm running on the backend
const calculateSimilarity = (product1: Product, product2: Product): number => {
  // Normalize factors - following the normalization in the notebook
  const normalizeRating = (rating: number) => rating / 5;
  const normalizePurchases = (purchases: number) => Math.min(purchases / 3000, 1);
  const normalizePrice = (price: number) => 1 - Math.min(price / 1500, 1); // Lower price is better
  
  // Calculate weighted factors for both products - same weights used in the notebook
  const p1Score = 
    normalizeRating(product1.rating) * 0.4 + 
    normalizePurchases(product1.usersPurchased) * 0.4 + 
    normalizePrice(product1.price) * 0.2;
  
  const p2Score = 
    normalizeRating(product2.rating) * 0.4 + 
    normalizePurchases(product2.usersPurchased) * 0.4 + 
    normalizePrice(product2.price) * 0.2;
  
  // Similar to the cosine similarity approach in the notebook
  const scoreDiff = Math.abs(p1Score - p2Score);
  return 1 - scoreDiff; // Transform so higher is more similar
};

// Get similar products (same category) - mirrors the recommend_similar_products function
export const getSimilarProducts = (productId: string): Product[] => {
  const selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return [];
  
  const similarProducts = products
    .filter(p => p.id !== productId && p.category === selectedProduct.category)
    .map(p => ({
      ...p,
      similarityScore: calculateSimilarity(selectedProduct, p)
    }))
    .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0))
    .slice(0, 4);
    
  return similarProducts;
};

// Get cross-category recommendations - mirrors the recommend_cross_category_products function
export const getCrossCategoryProducts = (productId: string): Product[] => {
  const selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return [];
  
  // Get products from different categories - similar to the exclusion in the notebook
  const crossCategoryProducts = products
    .filter(p => p.id !== productId && p.category !== selectedProduct.category)
    .map(p => ({
      ...p,
      similarityScore: calculateSimilarity(selectedProduct, p)
    }))
    .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0))
    .slice(0, 4);
    
  return crossCategoryProducts;
};

// Get recommendations for a product - mirrors the recommend_for_product function
export const getRecommendations = (productId: string): Recommendation => {
  const selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) {
    return {
      product: null,
      similarProducts: [],
      crossCategoryProducts: []
    };
  }
  
  return {
    product: selectedProduct,
    similarProducts: getSimilarProducts(productId),
    crossCategoryProducts: getCrossCategoryProducts(productId)
  };
};

// Get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Get all categories
export const getAllCategories = (): string[] => {
  return [...new Set(products.map(p => p.category))];
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};
