import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { PhoneVerification } from "../../app/models/phoneVerification";

export const onPhoneVerification = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  const uid = context.auth.uid;
  const phoneNumber = data.phoneNumber;
  const verificationId = data.verificationId;

  // Update user profile
  await admin.firestore().collection("users").doc(uid).update({
    phoneNumber,
    phoneVerified: true,
  });

  // Log verification
  const verificationLog: PhoneVerification = {
    id: verificationId,
    userRef: admin.firestore().collection('users').doc(uid) as unknown as DocumentReference,
    phoneNumber,
    verificationId,
    status: "verified",
    attempts: 1, // Assuming this is the first and successful attempt
    lastAttempt: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
    verifiedAt: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
    createdAt: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
  };
  await admin.firestore().collection("phoneVerifications").add(verificationLog);

  return { message: "Phone number verified successfully." };
});
