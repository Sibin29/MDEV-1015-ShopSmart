import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile } from '../controllers/UserProfileController';

const UserProfileScreen = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    address: '',
    profileImage: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  const handleLogout = () => {
    navigation.navigate('LoginScreen' as never);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User Name:</Text>
          <View style={styles.textBox}>
            <Text style={styles.textBoxText}>{user.username}</Text>
          </View>

          <Text style={styles.label}>Email:</Text>
          <View style={styles.textBox}>
            <Text style={styles.textBoxText}>{user.email}</Text>
          </View>

          <Text style={styles.label}>Address:</Text>
          <View style={styles.textBox}>
            <Text style={styles.textBoxText}>{user.address}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  textBox: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  textBoxText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    alignSelf: 'stretch',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
