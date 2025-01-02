export interface Servant {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  class: string;
  createdAt: Date;
  lore: string;
  skill: string;
  noblePhantasm: string;
  star: number;
}

export interface CartItem {
  id: number;
  product_id: string;
  quantity: number;
  product: Servant[];
}
