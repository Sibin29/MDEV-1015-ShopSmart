import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = async (email: string, password: string, storenum: string) => {

    // Validate email, password, and store number (add more validations if needed)
    if (!email || !password || !storenum) {
      return { success: false, message: 'Please fill in all fields!' };
    }
    else{
      // API call for partner login
      console.log("insidee login else");
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Logged in 
          const user = userCredential.user;
          
          console.log("user loggd in");
          return { success: true };
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("user loggin error", errorMessage);
          return { success: false, message: errorMessage};
        });
        return response;
    } 
  };
  