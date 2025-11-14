import { Timestamp, DocumentReference } from "firebase/firestore";

export interface PhoneVerification {
  id: string;
  userRef: DocumentReference; // reference to user
  phoneNumber: string;
  verificationId: string;
  status: 'pending' | 'verified' | 'failed';
  attempts: number;
  lastAttempt: Timestamp;
  verifiedAt?: Timestamp;
  createdAt: Timestamp;
}
