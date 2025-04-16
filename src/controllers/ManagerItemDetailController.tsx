import { auth, firestore } from '../firebase/firebase';
import { collection, getDocs, query, updateDoc, where, doc } from 'firebase/firestore';

export const updateInventoryItem = async (
  originalItemName: string,
  newName: string,
  newPrice: number,
  newQuantity: number
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const shopQuery = query(collection(firestore, 'shops'), where('ownerUid', '==', user.uid));
  const shopSnapshot = await getDocs(shopQuery);
  if (shopSnapshot.empty) throw new Error('Shop not found');

  const shopDoc = shopSnapshot.docs[0];
  const shopRef = doc(firestore, 'shops', shopDoc.id);
  const shopData = shopDoc.data();
  const inventory = shopData.inventory || [];

  const itemIndex = inventory.findIndex((item: any) => item.itemName === originalItemName);
  if (itemIndex === -1) throw new Error('Item not found');

  inventory[itemIndex] = {
    itemName: newName,
    price: newPrice,
    quantity: newQuantity,
  };

  await updateDoc(shopRef, { inventory });
};

export const deleteInventoryItem = async (itemName: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const shopQuery = query(collection(firestore, 'shops'), where('ownerUid', '==', user.uid));
  const shopSnapshot = await getDocs(shopQuery);
  if (shopSnapshot.empty) throw new Error('Shop not found');

  const shopDoc = shopSnapshot.docs[0];
  const shopRef = doc(firestore, 'shops', shopDoc.id);
  const shopData = shopDoc.data();
  const inventory = shopData.inventory || [];

  const newInventory = inventory.filter((item: any) => item.itemName !== itemName);

  await updateDoc(shopRef, { inventory: newInventory });
};
