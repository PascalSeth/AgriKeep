import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const CartScreen = (props: Props) => {
  const navigation = useNavigation();

  // Dummy data for cart items with initial state
  const initialCartItems = [
    { id: '1', title: 'Product One', price: 10, quantity: 2, image: 'https://oklahoma.agclassroom.org/images/resources_facts/legumes.jpg', seller: 'Seller One' },
    { id: '2', title: 'Product Two', price: 20, quantity: 1, image: 'https://oklahoma.agclassroom.org/images/resources_facts/legumes.jpg', seller: 'Seller Two' },
    { id: '3', title: 'Product Three', price: 15, quantity: 3, image: 'https://www.proagrimedia.com/content/uploads/2023/04/vecteezy_cooking-herbs-and-spices_2066791-758x518-1.jpg', seller: 'Seller Three' },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Function to increase quantity
  const increaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  const handleSellerPress = (seller: string) => {
    // navigation.navigate( { seller });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>

              <TouchableOpacity onPress={() => handleSellerPress(item.seller)}>
                <Text style={styles.sellerName}>{item.seller}</Text>
              </TouchableOpacity>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.counterButton}>
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.counterButton}>
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
             
            </View>
                

          </View>
        )}
        keyExtractor={item => item.id}
      />  
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity  style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
          <MaterialIcons name="shopping-cart-checkout" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    display:'flex',
    flexDirection:'row',
    elevation: 3,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:15,
    color: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    marginVertical: 5,
  },
  sellerName: {
    fontSize: 16,
    color: 'green',
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: 'medium',
    color: 'white',
  },
  itemQuantity: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default CartScreen;
