import { collection, query, where, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from './firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';

export const usePatients = (user) => {
  return useCollection(query(collection(db, "patients"), where("owner", "==", user.uid)), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
}

export const addOrUpdatePatient = async (id, patient) => {
  patient.owner = auth.currentUser.uid;
  if (!id || id === 'NEW') {
    const collectionRef = collection(db, "patients");
    const docRef = doc(collectionRef);
    return await setDoc(docRef, { ...patient, id: docRef.id });
  } else {
    const collectionRef = collection(db, "patients");
    return await setDoc(doc(collectionRef, id), patient);
  }
}

export const deletePatient = async (id) => {
  const collectionRef = collection(db, "patients");
  return await deleteDoc(doc(collectionRef, id));
}
