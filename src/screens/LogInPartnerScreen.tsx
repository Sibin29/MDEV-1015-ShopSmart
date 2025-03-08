import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleLogin } from '../controllers/LogInPartnerController';

const LogInPartnerScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storenum, setStorenum] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const result = await handleLogin(email, password, storenum);
    if (result.success) {
      navigation.navigate('ManagerHomeScreen' as never);
    } else {
      alert(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Login to your ShopSmart Partner Account!</Text>
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
        placeholder="Store Number"
        value={storenum}
        onChangeText={setStorenum}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignupPartnerScreen' as never)}>
        <Text style={styles.linkText}>Sign Up as Partner</Text>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LogInPartnerScreen;
