import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getInventoryItems } from '../controllers/InventoryController';

type RootStackParamList = {
  CartScreen: undefined;
  UserProfileScreen: undefined;
  ItemDetail: { itemName: string; itemImage: string };
};

const InventoryScreen = () => {
  const [items, setItems] = useState<{ id: string; name: string; image: string; }[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setItems(getInventoryItems());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Search Inventory..." />
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Text style={styles.profileIcon}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Items</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => 
              navigation.navigate('ItemDetail', {
                itemName: item.name,
                itemImage: item.image,
              })
            }
            style={styles.shopItemContainer}
          >
            <View style={styles.shopItem}>
              <Image source={{ uri: item.image }} style={styles.shopImage} />
            </View>
            <Text style={styles.shopName}>{item.name}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
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
    marginBottom: 40,
  },
  shopItem: {
    width: '90%',
    height: 150,
    padding: 16,
    backgroundColor: '#B3D9FF',
    borderRadius: 12,
    margin:16,
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

export default InventoryScreen;