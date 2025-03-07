import {firestore} from "../../firebase";
import {addDoc,collection} from "@firebase/firestore";

export const handleSignUp = (
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
    // Add validation logic here as needed
    // We can add more validation for the fields here (e.g., email format, phone format)
    if (password !== rpassword) {
      return { success: false, message: 'Passwords do not match!' };
    }
  
    // @Sibin -- Add firebase API call and backend validations here (for now, just returning success)

    const ref = collection(firestore,"messages");

    let data = {
      message:'test message',
    }

    try{
      addDoc(ref,data)
    }
    catch(error){
      console.log(error);
    }

    return { success: true };
  };
  