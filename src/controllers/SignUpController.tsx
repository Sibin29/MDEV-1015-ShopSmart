export const handleSignUp = (email: string, password: string, rpassword: string) => {
    // Validate the passwords match
    if (password !== rpassword) {
      return { success: false, message: 'Passwords do not match!' };
    }
  
    // @Sibin -- Add API call and backend validation here when setting up firebase
    // For now, I am just returning success as true
    return { success: true };
  };
  