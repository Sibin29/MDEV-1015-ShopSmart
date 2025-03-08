import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = (email: string, password: string, storenum: string) => {

    let isValidPartner; 
    // Validate email, password, and store number (add more validations if needed)
    if (!email || !password || !storenum) {
      return { success: false, message: 'Please fill in all fields!' };
    }
    else{
      // API call for partner login
      
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Logged in 
          const user = userCredential.user;
          isValidPartner = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    if (isValidPartner) {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email, password, or store number!' };
    }
  };
  