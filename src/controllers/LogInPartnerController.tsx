import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = async (email: string, password: string) => {

    // Validate email, password, and store number (add more validations if needed)
    if (!email || !password) {
      return { success: false, message: 'Please fill in all fields!' };
    }
    else{
      // API call for partner login
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Logged in 
          const user = userCredential.user;
          
          return { success: true };
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return { success: false, message: errorMessage};
        });
        return response;
    } 
  };
  