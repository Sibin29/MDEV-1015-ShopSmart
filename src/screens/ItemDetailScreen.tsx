import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addToCart, removeFromCart } from '../controllers/ItemDetailController';
import { InventoryItem } from '../controllers/InventoryController';

type RouteParams = {
  item: InventoryItem;
};

const ItemDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as RouteParams;

  const [quantity, setQuantity] = useState<number>(1);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const handleToggleCart = async () => {
    try {
      if (isInCart) {
        await removeFromCart(item.itemName, quantity, item.shopOwnerUid);
        Alert.alert(`${item.itemName} removed from cart`);
      } else {
        await addToCart(item.itemName, quantity, item.price, item.shopOwnerUid);
        Alert.alert(`${item.itemName} added to cart with quantity ${quantity}`);
      }
      setIsInCart(!isInCart);
    } catch {
      Alert.alert('Error', 'An error occurred while updating the cart');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://placehold.co/200x200/B3D9FF/007BFF/png?text=${item.itemName}`,
        }}
        style={styles.itemImage}
      />

      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={styles.itemCost}>Cost: ${item.price.toFixed(2)}</Text>

      <Text style={styles.label}>Select Quantity:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={quantity}
          onValueChange={(val) => setQuantity(Number(val))}
          style={styles.picker}
        >
          {[...Array(10)].map((_, i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleToggleCart}>
        <Text style={styles.addButtonText}>
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  itemImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  itemName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  itemCost: { fontSize: 18, marginBottom: 16, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 8 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16 },
  picker: { height: 50, width: '100%' },
  addButton: {
    backgroundColor: '#007BFF', padding: 16,
    borderRadius: 8, alignItems: 'center', marginBottom: 16,
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  goToCartButton: {
    backgroundColor: '#28a745', padding: 16,
    borderRadius: 8, alignItems: 'center',
  },
  goToCartButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default ItemDetail;
