export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  tag?: string;
  description: string;
  sizes: string[];
  colors?: string[];
  rating?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
