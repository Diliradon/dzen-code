export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: 'in-stock' | 'out-of-stock' | 'low-stock';
  image: string;
  description: string;
}

export interface ProductsResponse {
  products: Product[];
}
