import { getAuth } from 'firebase/auth';

export const getUserProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return {
      // create username by splitting the email before the '@' sign and taking the first part
      username: user.email ? user.email.split('@')[0] : 'ShopSmart User',
      email: user.email || 'No Email',
      address: '123 Main St, Barrie',
      profileImage:
        user.photoURL ||
        'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    };
  } else {
    return {
      username: 'Guest',
      email: 'Not logged in',
      address: '',
      profileImage: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    };
  }
};
