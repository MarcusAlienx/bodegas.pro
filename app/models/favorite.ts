import { Timestamp, DocumentReference } from "firebase/firestore";

export interface Favorite {
  id: string;
  userRef: DocumentReference; // reference to user
  propertyRef: DocumentReference; // reference to property
  notes?: string;
  createdAt: Timestamp;
}
