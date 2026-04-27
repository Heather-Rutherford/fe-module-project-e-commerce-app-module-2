import type { Timestamp } from "firebase/firestore";

export interface CartType {
  id: string;
  userId: string;
  createdAt: Timestamp | string; // Use Firebase Timestamp type if available
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
  total: number;
  status: string;
  paymentInfo: {
    method: string;
    transactionId: string;
  };
  // Add any other fields as needed
}
