import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleSignUp } from '../controllers/SignUpController';

const SignUpScreen = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    const result = handleSignUp(email, password, rpassword); // Calling the controller function

    if (result.success) {
      navigation.navigate('CustomerHomeScreen' as never);
    } else {
      alert(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Create your ShopSmart account!</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Re-Enter Password"
        value={rpassword}
        onChangeText={setRpassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen' as never)}>
        <Text style={styles.buttonText}>Already Have Account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
function alert(message: string | undefined) {
    throw new Error('Function not implemented.');
}

