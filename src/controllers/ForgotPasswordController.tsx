import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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
        // ..
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // ..
      });
  } catch (error) {
    console.error("Error fetching shops: ", error);
    return [];
  }
};
