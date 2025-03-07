import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getShops } from '../controllers/ManagerHomeController'; 

const ManagerHomeScreen = () => {
  const [shops, setShops] = useState<{ id: string; name: string }[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchedShops = getShops();
    setShops(fetchedShops);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Manager Dashboard!</Text>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Search Inventory..." />
        <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen' as never)}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Items</Text>
      <FlatList
        data={shops}
        renderItem={({ item }) => (
          <View style={styles.shopItemContainer}>
            <View style={styles.shopItem}>
              <Image
                source={{ uri: `https://placehold.co/1000x200/B3D9FF/007BFF/png?text=${item.name}` }} 
                style={styles.shopImage}
              />
            </View>
            <Text style={styles.shopName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  profileIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  shopItemContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  shopItem: {
    width: '90%',
    height: 150,
    backgroundColor: '#B3D9FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shopImage: {
    width: 190,
    height: 230,
    resizeMode: 'contain',
  },
  shopName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ManagerHomeScreen;
