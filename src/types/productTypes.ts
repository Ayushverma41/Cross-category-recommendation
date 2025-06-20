
export interface Product {
  id: string;
  name: string;
  category: string;
  rating: number;
  usersPurchased: number;
  price: number;
  imageSrc: string;
  similarityScore?: number;
}

export interface Recommendation {
  product: Product | null;
  similarProducts: Product[];
  crossCategoryProducts: Product[];
}
