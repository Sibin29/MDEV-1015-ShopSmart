import { collection, getDocs, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebase/firebase';
import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const addItemToInventory = async (
  itemName: string,
  quantity: number,
  price: number
) => {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert('Error', 'User not logged in.');
    return;
  }

  const userId = user.uid;

  try {
    // Query the shop document where ownerUid == current user's UID
    const shopsRef = collection(db, 'shops');
    const q = query(shopsRef, where('ownerUid', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert('Error', 'Shop not found.');
      return;
    }

    const shopDoc = querySnapshot.docs[0]; // Assuming one shop per user
    const shopRef = shopDoc.ref;

    // Add the new item to the inventory array
    await updateDoc(shopRef, {
      inventory: arrayUnion({ itemName, quantity, price, shopOwnerUid: userId }),
    });

    Alert.alert('Success', 'Item added to inventory!');
  } catch (error: any) {
    console.error("Error adding item:", error.message);
    Alert.alert('Error', 'Failed to add item to inventory.');
  }
};
