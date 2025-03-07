import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getItemCost } from '../controllers/ItemDetailController';

const ItemDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemName, itemImage } = route.params as { itemName: string; itemImage: string };

  const [quantity, setQuantity] = useState<number>(1);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const handleToggleCart = () => {
    if (isInCart) {
      alert(`${itemName} removed from cart`);
    } else {
      alert(`${itemName} added to cart with quantity ${quantity}`);
    }
    setIsInCart(!isInCart);
  };

  return (
    <View style={styles.container}>
      {/* Item Image */}
      <Image source={{ uri: itemImage }} style={styles.itemImage} />

      {/* Item Name */}
      <Text style={styles.itemName}>{itemName}</Text>

      {/* Item Cost */}
      <Text style={styles.itemCost}>Cost: ${getItemCost(itemName).toFixed(2)}</Text>

      {/* Quantity Picker */}
      <Text style={styles.label}>Select Quantity:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={quantity}
          onValueChange={(itemValue) => setQuantity(Number(itemValue))}
          style={styles.picker}
        >
          {[...Array(10)].map((_, index) => (
            <Picker.Item key={index + 1} label={`${index + 1}`} value={index + 1} />
          ))}
        </Picker>
      </View>

      {/* Toggle Button (Add to Cart / Remove from Cart) */}
      <TouchableOpacity style={styles.addButton} onPress={handleToggleCart}>
        <Text style={styles.addButtonText}>
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>

      {/* Go to Cart Button (Visible when item is in the cart) */}
      {isInCart && (
        <TouchableOpacity style={styles.goToCartButton} onPress={() => navigation.navigate('CartScreen' as never)}>
          <Text style={styles.goToCartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemCost: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goToCartButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  goToCartButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemDetail;
function alert(arg0: string) {
    throw new Error('Function not implemented.');
}

