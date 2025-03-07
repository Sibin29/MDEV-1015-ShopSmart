import { useNavigation } from '@react-navigation/native';

// Define the function that handles navigation actions
export const useWelcomeController = () => {
  const navigation = useNavigation();

  const handleLogInPartner = () => {
    navigation.navigate('LogInPartnerScreen' as never); 
  };

  const handleSignupPartner = () => {
    navigation.navigate('SignupPartnerScreen' as never); 
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen' as never); 
  };

  const handleSignup = () => {
    navigation.navigate('SignUpScreen' as never); 
  };

  return {
    handleLogInPartner,
    handleSignupPartner,
    handleLogin,
    handleSignup,
  };
};
