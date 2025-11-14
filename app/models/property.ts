import { Timestamp, DocumentReference } from "firebase/firestore";

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  status: 'active' | 'pending' | 'sold' | 'rented' | 'inactive';
  propertyType: string;
  transactionType: 'rent' | 'sale';
  featured: boolean;
  verified: boolean;
  exclusive: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    industrialPark?: string;
    approximateLocation: {
      city: string;
      state: string;
      zone: string;
      approximateCoordinates: {
        lat: number;
        lng: number;
      };
    };
  };
  specs: {
    totalAreaM2: number;
    constructionAreaM2: number;
    officeAreaM2: number;
    clearHeightM: number;
    loadingDocks: number;
    parkingSpaces: number;
    powerCapacityKVA: number;
    yearBuilt: number;
    floors: number;
    buildingClass: 'A' | 'B' | 'C';
    constructionType: string;
    floorType: string;
    ceilingType: string;
    securityFeatures: string[];
    certifications: string[];
  };
  amenities: {
    hasOffices: boolean;
    hasLoadingDocks: boolean;
    has24hSecurity: boolean;
    hasAlarmSystem: boolean;
    hasSprinklers: boolean;
    hasHVAC: boolean;
    hasParking: boolean;
    hasEmployeeAreas: boolean;
  };
  price: {
    amount: number;
    currency: 'MXN' | 'USD';
    period: 'monthly' | 'yearly' | 'total';
    maintenanceFee: number;
    pricePerM2: number;
  };
  media: {
    mainImage: string;
    images: {
      url: string;
      alt: string;
      order: number;
    }[];
    videos: string[];
    virtualTour?: string;
    floorPlans: {
      url: string;
      description: string;
    }[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
  };
  brokerRef: DocumentReference; // reference to user
  contactInfo: {
    public: {
      email: string;
      phone?: string;
      contactForm: boolean;
    };
    private?: {
      brokerName: string;
      brokerEmail: string;
      brokerPhone: string;
      brokerWhatsapp?: string;
    };
  };
  ownerInfo: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  importSource: {
    platform: string;
    externalId: string;
    lastSynced: Timestamp;
  };
  customFields: {
    bb_id: string;
    bb_ref: string;
    sl_id: string;
    sl_ref: string;
  };
  analytics: {
    views: number;
    favorites: number;
    inquiries: number;
    lastViewed: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp;
}
