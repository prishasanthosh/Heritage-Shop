export type Address = {
  _id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  addresses: Address[];
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};

export type ProductImage = { url: string; publicId?: string };

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category?: Category | string;
  images: ProductImage[];
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  tags: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  items: CartItem[];
};

export type OrderItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type ShippingAddress = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  _id: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  itemsTotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "cod" | "zoho";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
};
