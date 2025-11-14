import { Timestamp, DocumentReference } from "firebase/firestore";

export interface SearchHistory {
  id: string;
  userRef?: DocumentReference; // reference to user
  query: string;
  filters: {
    transactionType: string;
    city: string;
    minPrice: number;
    maxPrice: number;
    minSize: number;
    maxSize: number;
    amenities: string[];
  };
  results: number;
  createdAt: Timestamp;
}
