import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { updateInventoryItem, deleteInventoryItem } from '../controllers/ManagerItemDetailController';

const ManagerItemDetailScreen = () => {
  const navigation = useNavigation();
  type ManagerItemDetailParams = {
    params: {
      item: {
        itemName: string;
        price: number;
        quantity: number;
      };
    };
  };
  
  const route = useRoute<RouteProp<ManagerItemDetailParams, 'params'>>();
  const { item } = route.params;

  const [itemName, setItemName] = useState(item.itemName);
  const [price, setPrice] = useState(item.price.toString());
  const [quantity, setQuantity] = useState(item.quantity.toString());

  const handleUpdate = async () => {
    try {
      await updateInventoryItem(item.itemName, itemName, parseFloat(price), parseInt(quantity));
      Alert.alert('Success', 'Item updated');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInventoryItem(item.itemName);
      Alert.alert('Success', 'Item deleted');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Item</Text>

      <TextInput
        value={itemName}
        onChangeText={setItemName}
        style={styles.input}
        placeholder="Item Name"
      />

      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
      />

      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545' }]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default ManagerItemDetailScreen;
