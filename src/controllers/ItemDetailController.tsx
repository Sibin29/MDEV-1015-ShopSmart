import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/firebase';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch item details by item name
export const fetchItemDetails = async (itemName: string) => {
  try {
    const docRef = doc(db, 'items', itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Item not found');
    }
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

// Add an item to the cart
export const addToCart = async (userId: string, itemName: string, quantity: number) => {
  try {
    const cartRef = doc(db, 'carts', `${userId}`);

    const cartSnap = await getDoc(cartRef);
    const cartData = cartSnap.exists() ? cartSnap.data() : null;

    if (cartData) {
      // If cart exists, update the cart
      await updateDoc(cartRef, {
        items: arrayUnion({ itemName, quantity }),
      });
    } else {
      // If cart doesn't exist, create a new cart
      await setDoc(cartRef, {
        userId,
        items: [{ itemName, quantity }],
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeFromCart = async (userId: string, itemName: string) => {
  try {
    const cartRef = doc(db, 'carts', `${userId}`);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cartData = cartSnap.data();
      const updatedItems = cartData.items.filter((item: any) => item.itemName !== itemName);

      await updateDoc(cartRef, {
        items: updatedItems,
      });
    } else {
      throw new Error('Cart not found');
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};
