import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InventoryItem, getInventoryItemsForUser } from '../controllers/ManagerHomeController';

const ManagerHomeScreen = () => {
  const navigation = useNavigation();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const items = await getInventoryItemsForUser();
      setInventoryItems(items);
    };
    fetchInventory();
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddItemToInventoryScreen' as never)}
      >
        <Text style={styles.addButtonText}>+ Add New Item</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={inventoryItems}
        renderItem={({ item }) => (
          <View style={styles.shopItemContainer}>
            <View style={styles.shopItem}>
              <Image
                source={{ uri: 'https://placehold.co/200x200/B3D9FF/007BFF/png?text='+item.itemName}} 
                style={styles.shopImage}
              />
            </View>
            <Text style={styles.shopName}>
              {item.itemName} - ${item.price.toFixed(2)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.itemName} // Key should be unique (e.g., itemName)
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  profileIcon: { fontSize: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 16 },
  addButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  shopItemContainer: { flex: 1, alignItems: 'center', marginBottom: 20 },
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
  shopImage: { width: 180, height: 130, resizeMode: 'cover' },
  shopName: { marginTop: 8, fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
});

export default ManagerHomeScreen;
