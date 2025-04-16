import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { getInventoryByOwnerUid, InventoryItem } from '../controllers/InventoryController';

type RootStackParamList = {
  CartScreen: undefined;
  UserProfileScreen: undefined;
  ItemDetailScreen: { item: InventoryItem};   // pass the whole item
  InventoryScreen: { shopId: string };
};

const InventoryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'InventoryScreen'>>();
  const { shopId } = route.params;

  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getInventoryByOwnerUid(shopId);
      setItems(fetchedItems);
    };
    fetchItems();
  }, [shopId]);

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
        numColumns={2}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.shopItemContainer}
            onPress={() =>
              navigation.navigate('ItemDetailScreen', { item })
            }
          >
            <View style={styles.shopItem}>
              <Image
                source={{
                  uri: `https://placehold.co/1000x200/B3D9FF/007BFF/png?text=${item.itemName}`,
                }}
                style={styles.shopImage}
              />
            </View>
            <Text style={styles.shopName}>{item.itemName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  searchBar: {
    flex: 1, height: 40, borderColor: '#ccc', borderWidth: 1,
    borderRadius: 8, paddingHorizontal: 10, marginRight: 10,
  },
  profileIcon: { fontSize: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  shopItemContainer: { flex: 1, alignItems: 'center', marginBottom: 40 },
  shopItem: {
    width: '90%', height: 150, padding: 16,
    backgroundColor: '#B3D9FF', borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4,
  },
  shopImage: { width: 190, height: 230, resizeMode: 'contain' },
  shopName: { marginTop: 8, fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default InventoryScreen;