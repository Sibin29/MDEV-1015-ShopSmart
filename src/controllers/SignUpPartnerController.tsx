import { createUserWithEmailAndPassword } from "firebase/auth";
import {firestore,auth} from "../firebase/firebase";
import {addDoc,collection} from "@firebase/firestore";

export const handleSignUp = async (
    fname: string,
    lname: string,
    phone: string,
    storeName: string,
    storeNumber: string,
    address: string,
    email: string,
    password: string,
    rpassword: string
  ) => {

    console.log("in controller");

    // Add validation logic here as needed
    
    if(!(fname) || !(lname) || !(phone) || !(storeName) || !(storeNumber) || !(address) || !(email) || !(password) || !(rpassword)){
      console.log("in controller2");
      return { success: false, message: 'Please Fill all the Fields!' };
    }
    else if (password !== rpassword) {
      return { success: false, message: 'Passwords do not match!' };
    }
    else{
      console.log("finished verification");
      const ref = collection(firestore,"stores");
      const userauth = auth;
      let data = {
        fname: fname,
        lname: lname,
        phone: phone,
        storeName: storeName,
        storeNumber: storeNumber,
        address: address,
        email: email,
        type: "store",
      }

      try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // Signed up 
          const user = userCredential.user;
          await addDoc(ref,data);
          console.log("user created");
          return { success: true };

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("user failed");
          return { success: false, message: 'SignUp Failed!' };
        });

      }
      catch(error){
        console.log(error);
      } 
    }
  };
  