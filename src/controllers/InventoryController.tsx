import { collection, getDocs, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebase/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface InventoryItem {
  itemName: string;
  quantity: number;
  price: number;
  shopOwnerUid: string;
}

export const getInventoryByOwnerUid = async (
  ownerUid: string
): Promise<InventoryItem[]> => {
  try {
    const shopsRef = collection(db, 'shops');
    const q = query(shopsRef, where('ownerUid', '==', ownerUid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn('No shop found for this owner.');
      return [];
    }

    const shopDoc = querySnapshot.docs[0]; // Assuming one shop per owner
    const inventory: InventoryItem[] = shopDoc.data().inventory || [];

    return inventory;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
};
