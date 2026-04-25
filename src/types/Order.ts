import { Timestamp } from "firebase/firestore";

export interface Order {
  orderId?: string; // id is optional, as it will only be available after data is fetched
  userId: string; // user's id
  createdAt: Timestamp; // Use Firebase Timestamp
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  total: number; // Calculate total
  status: string; // e.g., 'pending', 'completed', etc.
  paymentInfo: {
    method: string;
    transactionId: string;
  };
  shipping?: number | 5.0; // Shipping cost (e.g., $5.00 flat rate)
  category?: string; // e.g. "International", "Domestic"
  shippingMethod?: string; // e.g. "Standard", "Express"
  notes?: string; // Any special instructions or notes for the order
}

export interface OrderState {
  order: Order[];
}
