import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/firebase';
import { Alert } from 'react-native';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Add or update item in user's cart and reduce inventory
export const addToCart = async (
  itemName: string,
  quantity: number,
  price: number,
  shopOwnerUid: string
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  console.log('User:', shopOwnerUid);

  const shopsRef = collection(db, 'shops');
  const q = query(shopsRef, where('ownerUid', '==', shopOwnerUid));
  const shopQuerySnapshot = await getDocs(q);


  if (shopQuerySnapshot.empty) {
    console.log('Shop not found for this owner');
  }

  const shopDoc = shopQuerySnapshot.docs[0];
  const shopRef = doc(db, 'shops', shopDoc.id);
  const shopData = shopDoc.data();
  const inventory = shopData.inventory || [];

  const itemIndex = inventory.findIndex(
    (item: any) => item.itemName === itemName
  );
  if (itemIndex === -1) throw new Error('Item not found in inventory');

  const item = inventory[itemIndex];

  if (item.quantity < quantity) {
    Alert.alert('Not enough stock available');
    return Error('Not enough stock available');
  }

  inventory[itemIndex].quantity -= quantity;

  await updateDoc(shopRef, {
    inventory,
  });

  const cartRef = doc(db, 'carts', user.uid);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    await updateDoc(cartRef, {
      items: arrayUnion({ itemName, quantity, price, shopOwnerUid }),
    });
  } else {
    await setDoc(cartRef, {
      userId: user.uid,
      items: [{ itemName, quantity, price, shopOwnerUid }],
    });
  }
};

// Remove item from user's cart and restore inventory
export const removeFromCart = async (
  itemName: string,
  quantity: number,
  shopOwnerUid: string
) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  console.log('Shop Owner from remove item fn:', shopOwnerUid);

  const shopsRef = collection(db, 'shops');
  const q = query(shopsRef, where('ownerUid', '==', shopOwnerUid));
  const shopQuerySnapshot = await getDocs(q);


  if (shopQuerySnapshot.empty) {
    console.log('Shop not found for this owner');
  }

  const shopDoc = shopQuerySnapshot.docs[0];
  const shopRef = doc(db, 'shops', shopDoc.id);
  const shopData = shopDoc.data();
  const inventory = shopData.inventory || [];

  const itemIndex = inventory.findIndex(
    (item: any) => item.itemName === itemName
  );
  if (itemIndex === -1) console.log('Item not found in inventory');

  // Restore inventory quantity
  inventory[itemIndex].quantity += quantity;

  await updateDoc(shopRef, {
    inventory,
  });

  // Now remove the item from user's cart
  const cartRef = doc(db, 'carts', user.uid);
  const snap = await getDoc(cartRef);
  if (!snap.exists()) console.log('Cart not found');
  if (snap.exists()) {
    const cartItemsList = snap.data().items;
    const cartItemIndex = cartItemsList.findIndex(
      (item: any) => item.itemName === itemName
    );
    if (cartItemIndex >= 0 && cartItemIndex < cartItemsList.length) {
      cartItemsList.splice(cartItemIndex, 1); // remove item at index

      await updateDoc(cartRef, {
        items: cartItemsList,
      });
    }
}
};
