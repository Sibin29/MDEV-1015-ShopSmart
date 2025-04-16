import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

export interface InventoryItem {
  itemName: string;
  price: number;
  quantity: number;
}

export const getInventoryItemsForUser = async (): Promise<InventoryItem[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  // Get the shop owned by this user
  console.log('Fetching shop for user:', user.uid);
  const shopQuery = query(collection(firestore, 'shops'), where('ownerUid', '==', user.uid));
  const shopSnapshot = await getDocs(shopQuery);
  
  if (shopSnapshot.empty) return [];

  const shopData = shopSnapshot.docs[0].data();

  const inventory = shopData.inventory;

  return inventory;
};
