import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { resetpassword } from '../controllers/ForgotPasswordController';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    const success = await resetpassword(email);
    if (success) {
      //Alert.alert('Success', 'Password reset link has been sent to your email.');
      navigation.navigate('LoginScreen' as never);
    } else {
      //Alert.alert('Error', 'An error occurred while resetting your password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email address to reset your password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>Go back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  goBackText: {
    marginTop: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
