import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    if (!process.env.SERVICE_ACCOUNT_KEY_BASE64) {
      throw new Error("SERVICE_ACCOUNT_KEY_BASE64 environment variable is not set.");
    }
    const serviceAccount = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString('ascii'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: unknown) {
    console.error("Firebase admin initialization error", error instanceof Error ? error.stack : String(error));
  }
}

export default admin;
