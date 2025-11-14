import { Timestamp, DocumentReference } from "firebase/firestore";

export interface ImportLog {
  id: string;
  source: string;
  status: 'started' | 'success' | 'partial' | 'failed';
  totalProperties: number;
  importedProperties: number;
  failedProperties: number;
  errors: {
    propertyId: string;
    error: string;
  }[];
  startedAt: Timestamp;
  completedAt: Timestamp;
  executedBy: DocumentReference; // reference to user
}
