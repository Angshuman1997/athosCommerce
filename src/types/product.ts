export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: string;
  msrp?: string;
  thumbnailImageUrl?: string;
  imageUrl?: string;
  url?: string;
  color?: string[];
  size?: string[];
}