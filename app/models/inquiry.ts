import { Timestamp, DocumentReference } from "firebase/firestore";

export interface Inquiry {
  id: string;
  propertyRef: DocumentReference; // reference to property
  userRef?: DocumentReference; // reference to user
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'inProgress' | 'responded' | 'closed';
  source: 'website' | 'chat' | 'email' | 'phone' | 'whatsapp';
  brokerNotes: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  respondedAt?: Timestamp;
}
