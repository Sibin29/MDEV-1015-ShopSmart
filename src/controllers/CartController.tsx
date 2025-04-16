import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { Alert } from 'react-native';

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Define CartItem type 
export interface CartItem {
  shopOwnerUid: string;
  itemName: string;
  quantity: number;
  price: number;
  userId: string;
}

// Get current user ID
const getCurrentUserId = (): string | null => {
  const user = auth.currentUser;
  return user?.uid || null;
};

// Fetch the current user's cart items
export const getCartItems = async (): Promise<CartItem[]> => {
  const userId = getCurrentUserId();
  if (!userId) {
    Alert.alert('Error', 'No user is logged in.');
    return [];
  }

  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    console.log('Cart items:', cartSnap.data().items);
    return cartSnap.data().items;
  } else {
    return [];
  }
};


// Calculate total amount for cart
export const calculateTotalAmount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

// Handle checkout
export const handleCheckout = (cartItems: CartItem[], navigate: Function) => {
  if (cartItems.length === 0) {
    Alert.alert('Cart is empty', 'Please add items to your cart before checking out.');
    return;
  } else {
    Alert.alert('Your order has been placed!', 'Thank you for shopping with us!');
    deleteCart();
    navigate('CustomerHomeScreen' as never);
  }
};

// Clear the cart after checkout
const deleteCart = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    Alert.alert('Error', 'No user is logged in.');
    return;
  }

  const cartRef = doc(db, 'carts', userId);

  try {
    await deleteDoc(cartRef);
  } catch (error) {
    Alert.alert('Error', 'Failed to clear the cart. Please try again.');
    console.error('Error deleting cart:', error);
  }
};
