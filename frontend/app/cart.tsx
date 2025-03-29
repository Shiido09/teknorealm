import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

// Sample cart items
const DUMMY_CART = [
  { id: '1', name: 'High-End Gaming PC', price: 1999.99, quantity: 1 },
  { id: '2', name: 'Mechanical Keyboard', price: 129.99, quantity: 1 },
  { id: '4', name: 'Wireless Gaming Mouse', price: 89.99, quantity: 2 },
];

// Cart item component
function CartItem({ 
  id, 
  name, 
  price, 
  quantity, 
  onUpdateQuantity, 
  onRemove 
}: { 
  id: string;
  name: string; 
  price: number; 
  quantity: number; 
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'borderColor');
  const textColor = useThemeColor({}, 'text');
  
  // Prevent rendering issues with invalid quantity
  const safeQuantity = Math.max(1, quantity);
  
  return (
    <ThemedView style={[styles.cartItem, { backgroundColor, borderColor }]}>
      <View style={styles.productImage} />
      <View style={styles.itemDetails}>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>{name}</ThemedText>
        <ThemedText>{'$' + price.toFixed(2)}</ThemedText>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { borderColor }]}
            onPress={() => safeQuantity > 1 && onUpdateQuantity(id, safeQuantity - 1)}
            disabled={safeQuantity <= 1}
          >
            <MaterialIcons 
              name="remove" 
              size={16} 
              color={safeQuantity <= 1 ? '#99999950' : textColor} 
            />
          </TouchableOpacity>
          
          <ThemedText style={styles.quantityText}>{safeQuantity}</ThemedText>
          
          <TouchableOpacity
            style={[styles.quantityButton, { borderColor }]}
            onPress={() => onUpdateQuantity(id, safeQuantity + 1)}
          >
            <MaterialIcons name="add" size={16} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotalContainer}>
        <ThemedText type="defaultSemiBold">{'$' + (price * safeQuantity).toFixed(2)}</ThemedText>
        <TouchableOpacity onPress={() => onRemove(id)} style={styles.removeButton}>
          <MaterialIcons name="delete-outline" size={20} color="#ff4d4d" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(DUMMY_CART);
  
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'primaryButton');
  const textColor = useThemeColor({}, 'text');
  
  // Calculate totals - protect against calculation errors
  const subtotal = cartItems.reduce((sum, item) => {
    const itemQuantity = Math.max(1, item.quantity);
    return sum + item.price * itemQuantity;
  }, 0);
  const shippingCost = subtotal > 0 ? 12.99 : 0;
  const total = subtotal + shippingCost;
  
  const updateQuantity = (itemId: string, newQuantity: number) => {
    // Ensure quantity is always at least 1
    const safeQuantity = Math.max(1, newQuantity);
    
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: safeQuantity } : item
    ));
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  const handleCheckout = () => {
    // Navigate to checkout screen
    router.push('/checkout');
  };
  
  // Use try/catch to help identify rendering errors
  try {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <ThemedText type="subtitle">Shopping Cart</ThemedText>
          <ThemedText style={{ opacity: 0 }}> </ThemedText>
        </View>
        
        {cartItems.length > 0 ? (
          <>
            {/* Cart Items List */}
            <FlatList
              data={cartItems}
              renderItem={({ item }) => (
                <CartItem 
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.cartList}
            />
            
            {/* Order Summary */}
            <ThemedView style={styles.orderSummary}>
              <View style={styles.summaryRow}>
                <ThemedText>Subtotal</ThemedText>
                <ThemedText>{'$' + subtotal.toFixed(2)}</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText>Shipping</ThemedText>
                <ThemedText>{'$' + shippingCost.toFixed(2)}</ThemedText>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <ThemedText type="defaultSemiBold">Total</ThemedText>
                <ThemedText type="defaultSemiBold">{'$' + total.toFixed(2)}</ThemedText>
              </View>
              
              <TouchableOpacity 
                style={[styles.checkoutButton, { backgroundColor: tintColor }]}
                onPress={handleCheckout}
              >
                <ThemedText style={styles.checkoutButtonText}>Proceed to Checkout</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </>
        ) : (
          // Empty Cart State
          <View style={styles.emptyCartContainer}>
            <MaterialIcons name="shopping-cart" size={64} color={textColor} style={styles.emptyCartIcon} />
            <ThemedText type="subtitle" style={styles.emptyCartTitle}>Your cart is empty</ThemedText>
            <ThemedText style={styles.emptyCartText}>Looks like you haven't added any products to your cart yet.</ThemedText>
            <TouchableOpacity 
              style={[styles.continueShoppingButton, { backgroundColor: tintColor }]}
              onPress={() => router.push('/products')}
            >
              <ThemedText style={styles.buttonText}>Continue Shopping</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  } catch (error) {
    // Fallback UI in case of rendering error
    console.error('Rendering error in CartScreen:', error);
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
          <ThemedText type="subtitle">Shopping Cart</ThemedText>
          <View style={{ width: 32 }} />
        </View>
        <View style={styles.emptyCartContainer}>
          <MaterialIcons name="error-outline" size={64} color="#ff4d4d" />
          <ThemedText type="subtitle">Something went wrong</ThemedText>
          <ThemedText style={{ textAlign: 'center', marginVertical: 10 }}>
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </ThemedText>
          <TouchableOpacity 
            style={[styles.continueShoppingButton, { backgroundColor: tintColor, marginTop: 20 }]}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.buttonText}>Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: '#555',
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotalContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  removeButton: {
    padding: 4,
  },
  orderSummary: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#33333320',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#33333320',
  },
  checkoutButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyCartTitle: {
    marginBottom: 8,
  },
  emptyCartText: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  continueShoppingButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
