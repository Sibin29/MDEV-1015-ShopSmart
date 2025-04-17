import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from 'react-native';

// Define the Shop interface
export interface Shop {
  ownerUid: string;
  name: string;
}

// Function to get the list of shops for the customer
export const resetpassword = async (email:String) => {
  try {
    const useremail = email;
    const auth = getAuth();
    sendPasswordResetEmail(auth, useremail)
      .then(() => {
        // Password reset email sent!
        Alert.alert('Success', 'Password reset link has been sent to your email.');
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error', 'An error occurred while resetting your password.');
        return false;
        // ..
      });
  } catch (error) {
    console.error("Error fetching shops: ", error);
    return [];
  }
};
