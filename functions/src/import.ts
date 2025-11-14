import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Timestamp, DocumentReference } from "firebase/firestore"; // This should be the only import for Timestamp
import { Property } from "../../app/models/property";
import { ImportLog } from "../../app/models/importLog";

export const importFromBuscabodegas = functions.https.onCall(async (data, context) => {
  // Check for admin privileges
  if (context.auth?.token.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Must be an administrative user to initiate an import.");
  }

  const properties = data.properties;
  const source = "buscabodegas.com";
  const executedBy = context.auth.uid;

  const adminTimestamp = admin.firestore.Timestamp.now();
  const clientTimestamp = new Timestamp(adminTimestamp.seconds, adminTimestamp.nanoseconds);

  const executedByRef = admin.firestore().collection('users').doc(executedBy);

  const importLog: Partial<ImportLog> = {
    source,
    status: "started",
    totalProperties: properties.length,
    importedProperties: 0,
    failedProperties: 0,
    errors: [],
    startedAt: clientTimestamp,
    executedBy: executedByRef as unknown as DocumentReference,
  };

  const logRef = await admin.firestore().collection("importLogs").add(importLog);

  for (const prop of properties) {
    try {
      const propertyData: Partial<Property> = {
        title: prop.title,
        description: prop.description,
        location: {
          address: prop.location.address,
          city: prop.location.city,
          state: prop.location.state,
          zipCode: prop.location.zipCode,
          neighborhood: prop.location.neighborhood,
          coordinates: {
            lat: prop.location.coordinates.lat,
            lng: prop.location.coordinates.lng,
          },
          approximateLocation: {
            city: prop.location.city,
            state: prop.location.state,
            zone: prop.location.zone,
            approximateCoordinates: {
              lat: Math.round(prop.location.coordinates.lat * 100) / 100,
              lng: Math.round(prop.location.coordinates.lng * 100) / 100,
            },
          },
        },
        specs: {
          totalAreaM2: prop.area || 0,
          constructionAreaM2: prop.constructionAreaM2 || 0,
          officeAreaM2: prop.officeAreaM2 || 0,
          clearHeightM: prop.height || 0,
          loadingDocks: prop.docks || 0,
          parkingSpaces: prop.parkingSpaces || 0,
          powerCapacityKVA: prop.powerCapacityKVA || 0,
          yearBuilt: prop.yearBuilt || 0,
          floors: prop.floors || 0,
          buildingClass: prop.buildingClass || 'A',
          constructionType: prop.constructionType || '',
          floorType: prop.floorType || '',
          ceilingType: prop.ceilingType || '',
          securityFeatures: prop.securityFeatures || [],
          certifications: prop.certifications || [],
        },
        price: {
          amount: prop.price || 0,
          currency: prop.currency || 'MXN',
          period: prop.period || 'monthly',
          maintenanceFee: prop.maintenanceFee || 0,
          pricePerM2: prop.pricePerM2 || 0,
        },
        media: {
          mainImage: prop.mainImage || '',
          images: prop.images || [],
          videos: prop.videos || [],
          virtualTour: prop.virtualTour,
          floorPlans: prop.floorPlans || [],
        },
        ownerInfo: prop.owner_info,
        status: prop.status,
        customFields: {
          bb_id: prop.id || '',
          bb_ref: prop.reference || '',
          sl_id: prop.sl_id || '',
          sl_ref: prop.sl_ref || '',
        },
        importSource: {
          platform: source,
          externalId: prop.id,
          lastSynced: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
        },
      };

      const existingProp = await admin.firestore().collection("properties").where("customFields.bb_id", "==", prop.id).limit(1).get();

      if (!existingProp.empty) {
        const docId = existingProp.docs[0].id;
        await admin.firestore().collection("properties").doc(docId).update(propertyData);
      } else {
        await admin.firestore().collection("properties").add(propertyData);
      }

      importLog.importedProperties = (importLog.importedProperties || 0) + 1;
    } catch (error: unknown) {
      importLog.failedProperties = (importLog.failedProperties || 0) + 1;
      importLog.errors!.push({
        propertyId: prop.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  importLog.status = (importLog.failedProperties || 0) > 0 ? "partial" : "success";
  importLog.completedAt = new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds);

  await logRef.update(importLog);

  return { message: "Import completed successfully." };
});