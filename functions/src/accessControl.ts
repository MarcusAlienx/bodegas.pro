import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Property } from "../../app/models/property";

export const getPropertyById = functions.https.onCall(async (data, context) => {
  const propertyId = data.propertyId;
  const uid = context.auth?.uid;

  const propertyDoc = await admin.firestore().collection("properties").doc(propertyId).get();
  if (!propertyDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Property not found.");
  }

  const property = propertyDoc.data() as Property;
  let userRole = "visitor";

  if (uid) {
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    if (userDoc.exists) {
      userRole = userDoc.data()?.role;
    }
  }

  // Filter data based on role
  const filteredProperty: Partial<Property> = {
    ...property,
  };

  if (userRole === "visitor") {
    delete filteredProperty.ownerInfo;
    delete filteredProperty.contactInfo?.private;
    if (filteredProperty.location) {
      filteredProperty.location.address = "Approximate location";
      filteredProperty.location.coordinates = property.location.approximateLocation.approximateCoordinates;
    }
    if (filteredProperty.contactInfo?.public) {
      filteredProperty.contactInfo.public.email = "info@bodegas.pro";
    }
  }

  if (userRole === "client") {
    delete filteredProperty.ownerInfo;
  }

  if (userRole === "broker" && property.brokerRef.id !== uid) {
    delete filteredProperty.ownerInfo;
  }

  return filteredProperty;
});
