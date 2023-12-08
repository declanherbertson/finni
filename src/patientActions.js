import { collection, query, where, doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';

export const usePatients = (user) => {
  return useCollection(query(collection(db, "patients"), where("owner", "==", user.uid)), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
}

export const addOrUpdatePatient = async (id, patient) => {
  console.log("addOrUpdatePatient", id, patient);
  patient.owner = auth.currentUser.uid;
  if (!id) {
    const collectionRef = collection(db, "patients");
    return await setDoc(doc(collectionRef), patient);
  } else {
    const collectionRef = collection(db, "patients");
    return await setDoc(doc(collectionRef, id), patient);
  }
}
