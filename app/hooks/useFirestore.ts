"use client";

import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';

export function useFirestore() {
  const getCollection = async (collectionName: string) => {
    const col = collection(db, collectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const getDocument = async <T>(collectionName: string, docId: string): Promise<T | null> => {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  };

  const addDocument = async (collectionName: string, data: any) => {
    const col = collection(db, collectionName);
    return await addDoc(col, data);
  };

  const updateDocument = async (collectionName: string, docId: string, data: any) => {
    const docRef = doc(db, collectionName, docId);
    return await updateDoc(docRef, data);
  };

  const deleteDocument = async (collectionName: string, docId: string) => {
    const docRef = doc(db, collectionName, docId);
    return await deleteDoc(docRef);
  };

  const useQuery = (collectionName: string, ...q: any) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const col = collection(db, collectionName);
      const finalQuery = query(col, ...q);

      const unsubscribe = onSnapshot(finalQuery, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });

      return () => unsubscribe();
    }, [collectionName, ...q]);

    return { data, loading };
  };

  return {
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    useQuery,
  };
}