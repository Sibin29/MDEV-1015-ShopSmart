import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore, auth } from "../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";

export const handleSignUp = async (
  fname: string,
  lname: string,
  phone: string,
  storeName: string,
  address: string,
  email: string,
  password: string,
  rpassword: string
) => {
  if (
    !fname ||
    !lname ||
    !phone ||
    !storeName ||
    !address ||
    !email ||
    !password ||
    !rpassword
  ) {
    return { success: false, message: 'Please fill all the fields!' };
  }

  if (password !== rpassword) {
    return { success: false, message: 'Passwords do not match!' };
  }

  try {
    // Create the user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create store document
    const storeData = {
      fname,
      lname,
      phone,
      storeName,
      address,
      email,
      type: "store",
      uid: user.uid,
    };

    const storeRef = collection(firestore, "stores");
    await addDoc(storeRef, storeData);

    // Create shop document
    const shopData = {
      shopName: storeName,
      ownerUid: user.uid,
      createdAt: new Date(),
    };

    const shopRef = collection(firestore, "shops");
    await addDoc(shopRef, shopData);

    return { success: true };

  } catch (error: any) {
    console.error("SignUp Error:", error.message);
    return { success: false, message: 'SignUp Failed!' };
  }
};
