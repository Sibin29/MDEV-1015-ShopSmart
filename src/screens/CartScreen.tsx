import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  getCartItems,
  calculateTotalAmount,
  handleCheckout,
  CartItem
} from '../controllers/CartController';
import { removeFromCart } from '../controllers/ItemDetailController';

const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (err) {
        setError('Failed to load cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const totalAmount = calculateTotalAmount(cartItems);

  const handleRemoveItem = (itemName: string, quantity: number, shopOwnerUid: string ) => {
    Alert.alert('Remove Item', `Are you sure you want to remove ${itemName} from the cart?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: () => {
          removeFromCart(itemName, quantity, shopOwnerUid);
          setCartItems(prevItems => prevItems.filter(item => item.itemName !== itemName));
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading cart...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.cartItem}>
          <Image
            source={{ uri: 'https://placehold.co/200x200/B3D9FF/007BFF/png?text=' + item.itemName }}
            style={styles.itemImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.itemName}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
            <Text style={styles.total}>Total: ${(item.quantity * item.price).toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.itemName, item.quantity, item.shopOwnerUid)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          handleCheckout(cartItems, navigation.navigate);
        }}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ffffff' },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 16,
  },
  itemImage: { width: 80, height: 80, borderRadius: 10, marginRight: 16 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  quantity: { fontSize: 16, color: '#555' },
  price: { fontSize: 16, color: '#555' },
  total: { fontSize: 16, color: '#555', fontWeight: 'bold' },
  removeButton: {
    backgroundColor: '#FF4136',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  checkoutButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
