import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

// collection / list
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export async function getCollectionList(id: string): Promise<DocumentData[]> {
  const collRef = collection(db, "muisces", id, "list");
  try {
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(collRef);
    // Extract data from the snapshot
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
}
interface DocumentWithId extends DocumentData {
  id: string;
}

export async function getCollection(): Promise<DocumentWithId[]> {
  const collRef = collection(db, "muisces");
  try {
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(collRef);
    // Extract data from the snapshot and include document ID
    const data: DocumentWithId[] = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
}

export async function CreateUser(name: string, email: string, user_id: string) {
  try {
    await setDoc(doc(db, "users", user_id), {
      name: name,
      email: email,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
}
