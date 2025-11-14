import { Timestamp, DocumentReference } from "firebase/firestore";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber: string;
  phoneVerified: boolean;
  role: 'visitor' | 'client' | 'broker' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin: Timestamp;
  settings: {
    language: 'es' | 'en';
    theme: 'dark' | 'light';
    notifications: boolean;
    contactPreference: 'email' | 'phone' | 'whatsapp';
  };
  brokerInfo?: {
    company: string;
    license: string;
    phone: string;
    bio: string;
    specialties: string[];
    yearsOfExperience: number;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    verificationDate: Timestamp;
    verifiedBy: DocumentReference; // reference to user
  };
  clientInfo?: {
    phone: string;
    companyName?: string;
    industry?: string;
    preferences: {
      propertyTypes: string[];
      locations: string[];
      priceRange: { min: number; max: number };
      sizeRange: { min: number; max: number };
    };
  };
  accessLevel: {
    canViewExact: boolean;
    canViewOwnerInfo: boolean;
    canViewAnalytics: boolean;
  };
}

