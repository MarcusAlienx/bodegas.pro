import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const generateSlug = functions.firestore.document("properties/{propertyId}")
  .onWrite(async (change, context) => {
    const propertyId = context.params.propertyId;
    const propertyData = change.after.data();

    if (!propertyData) {
      return null;
    }

    const title = propertyData.title;
    const city = propertyData.location?.city;

    if (!title || !city) {
      return null;
    }

    let slug = `${title.toLowerCase().replace(/\s+/g, "-")}-in-${city.toLowerCase().replace(/\s+/g, "-")}`;

    // Check for uniqueness
    const snapshot = await admin.firestore().collection("properties").where("slug", "==", slug).get();
    if (!snapshot.empty && snapshot.docs[0].id !== propertyId) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    return change.after.ref.update({ slug });
  });
