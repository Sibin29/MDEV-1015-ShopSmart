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
    return { success: true };
  };
  