import * as admin from "firebase-admin";

admin.initializeApp();

// Export functions from other files
export * from "./import";
export * from "./slug";
export * from "./user";
export * from "./phoneVerification";
export * from "./customFields";
