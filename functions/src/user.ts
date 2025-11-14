import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Timestamp } from "firebase/firestore";
import { User } from "../../app/models/user";

export const createUserDocument = functions.auth.user().onCreate((user) => {
  const newUser: Partial<User> = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: "client",
    createdAt: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
    updatedAt: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
    lastLogin: new Timestamp(admin.firestore.Timestamp.now().seconds, admin.firestore.Timestamp.now().nanoseconds),
    settings: {
      language: "es",
      theme: "dark",
      notifications: true,
      contactPreference: "email",
    },
    accessLevel: {
      canViewExact: true,
      canViewOwnerInfo: false,
      canViewAnalytics: false,
    },
  };

  return admin.firestore().collection("users").doc(user.uid).set(newUser);
});
