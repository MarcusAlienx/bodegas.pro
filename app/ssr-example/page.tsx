import admin from "../../lib/firebase-admin";
import { Property } from "../models/property";

async function getProperties(): Promise<Property[]> {
  const snapshot = await admin.firestore().collection("properties").get();
  return snapshot.docs.map((doc) => doc.data() as Property);
}

export default async function SsrExamplePage() {
  const properties = await getProperties();

  return (
    <div>
      <h1>Server-Side Rendered Properties</h1>
      <ul>
        {properties.map((prop) => (
          <li key={prop.id}>{prop.title}</li>
        ))}
      </ul>
    </div>
  );
}
