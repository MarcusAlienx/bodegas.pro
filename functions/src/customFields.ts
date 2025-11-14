import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const normalizeData = functions.https.onCall(async (data, context) => {
  // Check for admin privileges
  if (context.auth?.token.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Must be an administrative user to normalize data.");
  }

  const properties = await admin.firestore().collection("properties").get();

  for (const doc of properties.docs) {
    const property = doc.data();
    const updateData: any = {};

    // Normalize propertyRef
    if (property.customFields?.bb_ref) {
      updateData.propertyRef = `BB-${property.customFields.bb_ref}`;
    } else if (property.customFields?.sl_ref) {
      updateData.propertyRef = `SL-${property.customFields.sl_ref}`;
    }

    // Normalize location
    if (property.location?.city) {
      updateData["location.city"] = property.location.city.trim();
    }
    if (property.location?.state) {
      updateData["location.state"] = property.location.state.trim();
    }

    // Normalize property type
    if (property.propertyType) {
      updateData.propertyType = property.propertyType.toLowerCase().trim();
    }

    if (Object.keys(updateData).length > 0) {
      await doc.ref.update(updateData);
    }
  }

  return { message: "Data normalization completed successfully." };
});
