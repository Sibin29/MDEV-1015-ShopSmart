import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const handleLogin = (email: string, password: string) => {
    let isValidUser; 
    // Validate email and password here (add more validations if needed)
    if (!email || !password) {
      return { success: false, message: 'Please fill in both email and password!' };
    }
    else{
          // API call for partner login
          
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Logged in 
              const user = userCredential.user;
              isValidUser = true;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        }
  
    if (isValidUser) {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email or password!' };
    }
  };
  