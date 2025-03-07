export const handleLogin = (email: string, password: string, storenum: string) => {
    // Validate email, password, and store number (add more validations if needed)
    if (!email || !password || !storenum) {
      return { success: false, message: 'Please fill in all fields!' };
    }
  
    // API call for partner login (replace with login logic from firebase)
    const isValidPartner = email === 'partner@example.com' && password === 'password123' && storenum === '001'; // Replace with real function
  
    if (isValidPartner) {
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email, password, or store number!' };
    }
  };
  