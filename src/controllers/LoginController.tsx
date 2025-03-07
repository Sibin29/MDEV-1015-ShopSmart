export const handleLogin = (email: string, password: string) => {
    // Validate email and password here (add more validations if needed)
    if (!email || !password) {
      return { success: false, message: 'Please fill in both email and password!' };
    }
  
    // API call for login (@Sibin -- replace with real login logic for firebase)
    const isValidUser = email === 'email' && password === 'password';
  
    if (isValidUser) {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email or password!' };
    }
  };
  