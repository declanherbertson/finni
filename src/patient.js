import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.js'

export const getPatients = () => {
  return getDocs(collection(db, 'patients'));
}