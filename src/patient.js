import { collection, query, where } from 'firebase/firestore';
import { db } from './firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';

export const usePatients = (user) => {
  return useCollection(query(collection(db, "patients"), where("owner", "==", user.uid)));
}
