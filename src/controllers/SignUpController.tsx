import { createUserWithEmailAndPassword } from "firebase/auth";
import {firestore,auth} from "../firebase/firebase";
import {addDoc,collection} from "@firebase/firestore";

export const handleSignUp = async (
  fname: string,
  lname: string,
  phone: string,
  email: string,
  password: string,
  rpassword: string
) => {
    // Validate the passwords match
    if(!(fname) || !(lname) || !(phone)|| !(email) || !(password) || !(rpassword)){
      return { success: false, message: 'Please Fill all the Fields!' };
    }
    else if (password !== rpassword) {
      return { success: false, message: 'Passwords do not match!' };
    }
    else{
      const ref = collection(firestore,"users");
      const userauth = auth;
      let data = {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        type: "user",
      }

      try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // Signed up 
          const user = userCredential.user;
          await addDoc(ref,data);
          return { success: true };

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return { success: false, message: 'SignUp Failed!' };
        });
        return response;
      }
      catch(error){
        console.log(error);
      } 
    }
    return { success: true };
  };
  