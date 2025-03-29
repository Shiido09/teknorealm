import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

// Sample cart items (in a real app, this would be passed or retrieved from a store/context)
const DUMMY_CART = [
  { id: '1', name: 'High-End Gaming PC', price: 1999.99, quantity: 1 },
  { id: '2', name: 'Mechanical Keyboard', price: 129.99, quantity: 1 },
  { id: '4', name: 'Wireless Gaming Mouse', price: 89.99, quantity: 2 },
];

// Courier options
const COURIER_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 12.99, days: '3-5' },
  { id: 'express', name: 'Express Shipping', price: 24.99, days: '1-2' },
  { id: 'overnight', name: 'Overnight Shipping', price: 39.99, days: '1' },
];

// Payment methods
const PAYMENT_METHODS = [
  { id: 'credit_card', name: 'Credit Card', icon: 'credit-card' },
  { id: 'paypal', name: 'PayPal', icon: 'paypal' },
  { id: 'bank', name: 'Bank Transfer', icon: 'account-balance' },
];

// Order summary component
function OrderSummaryItem({ name, price, quantity }: { name: string; price: number; quantity: number }) {
  return (
    <View style={styles.summaryItem}>
      <View style={styles.summaryItemDetails}>
        <ThemedText numberOfLines={1}>{name}</ThemedText>
        <ThemedText style={styles.quantity}>x{quantity}</ThemedText>
      </View>
      <ThemedText type="defaultSemiBold">${(price * quantity).toFixed(2)}</ThemedText>
    </View>
  );
}

// Selectable option component
function SelectableOption({ 
  id, 
  title, 
  description, 
  price, 
  selected, 
  onSelect, 
  icon 
}: { 
  id: string; 
  title: string; 
  description?: string; 
  price?: number; 
  selected: boolean; 
  onSelect: () => void; 
  icon?: string;
}) {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'borderColor');
  const tintColor = useThemeColor({}, 'primaryButton');
  const textColor = useThemeColor({}, 'text');
  
  return (
    <TouchableOpacity 
      style={[
        styles.selectableOption, 
        { 
          backgroundColor, 
          borderColor: selected ? tintColor : borderColor,
          borderWidth: selected ? 2 : 1,
        }
      ]}
      onPress={onSelect}
    >
      <View style={styles.optionContent}>
        {icon && <MaterialIcons name={icon as any} size={24} color={textColor} style={styles.optionIcon} />}
        <View style={styles.optionTextContainer}>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          {description && <ThemedText style={styles.optionDescription}>{description}</ThemedText>}
        </View>
      </View>
      
      <View style={styles.optionRight}>
        {price !== undefined && <ThemedText>${price.toFixed(2)}</ThemedText>}
        <View style={[
          styles.radioButton, 
          { 
            borderColor: selected ? tintColor : borderColor,
            backgroundColor: selected ? tintColor : 'transparent',
          }
        ]}>
          {selected && <MaterialIcons name="check" size={16} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function CheckoutScreen() {
  // State
  const [shippingAddress, setShippingAddress] = useState({
    name: 'John Doe',
    street: '123 Tech Street',
    city: 'Silicon Valley',
    state: 'CA',
    zip: '94000',
    country: 'United States'
  });
  const [selectedCourier, setSelectedCourier] = useState(COURIER_OPTIONS[0].id);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHODS[0].id);
  
  // Theme 
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'borderColor');
  const tintColor = useThemeColor({}, 'primaryButton');
  const textColor = useThemeColor({}, 'text');
  
  // Calculate totals
  const cartItems = DUMMY_CART; // In a real app, fetch from context/store
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedCourierOption = COURIER_OPTIONS.find(option => option.id === selectedCourier)!;
  const shippingCost = selectedCourierOption.price;
  const total = subtotal + shippingCost;
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to a backend
    Alert.alert(
      "Order Placed!",
      `Your order for $${total.toFixed(2)} has been placed successfully. Thank you for shopping with us!`,
      [{ text: "OK", onPress: () => router.replace('/placedorders') }]
    );
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="subtitle">Checkout</ThemedText>
        <View style={{ width: 32 }} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Summary Section */}
        <ThemedView style={[styles.section, { backgroundColor: cardBackground }]}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Order Summary</ThemedText>
          
          {cartItems.map((item) => (
            <OrderSummaryItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
          
          <View style={[styles.divider, { borderColor }]} />
          
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <ThemedText>Subtotal</ThemedText>
              <ThemedText>${subtotal.toFixed(2)}</ThemedText>
            </View>
            <View style={styles.totalRow}>
              <ThemedText>Shipping</ThemedText>
              <ThemedText>${shippingCost.toFixed(2)}</ThemedText>
            </View>
            <View style={[styles.totalRow, styles.finalTotal]}>
              <ThemedText type="defaultSemiBold">Total</ThemedText>
              <ThemedText type="defaultSemiBold">${total.toFixed(2)}</ThemedText>
            </View>
          </View>
        </ThemedView>
        
        {/* Shipping Information Section */}
        <ThemedView style={[styles.section, { backgroundColor: cardBackground }]}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Shipping Information</ThemedText>
          
          <View style={styles.addressForm}>
            <TextInput
              style={[styles.input, { borderColor, color: textColor }]}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={shippingAddress.name}
              onChangeText={(text) => setShippingAddress({...shippingAddress, name: text})}
            />
            <TextInput
              style={[styles.input, { borderColor, color: textColor }]}
              placeholder="Street Address"
              placeholderTextColor="#999"
              value={shippingAddress.street}
              onChangeText={(text) => setShippingAddress({...shippingAddress, street: text})}
            />
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputHalf, { borderColor, color: textColor }]}
                placeholder="City"
                placeholderTextColor="#999"
                value={shippingAddress.city}
                onChangeText={(text) => setShippingAddress({...shippingAddress, city: text})}
              />
              <TextInput
                style={[styles.input, styles.inputHalf, { borderColor, color: textColor }]}
                placeholder="State"
                placeholderTextColor="#999"
                value={shippingAddress.state}
                onChangeText={(text) => setShippingAddress({...shippingAddress, state: text})}
              />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputHalf, { borderColor, color: textColor }]}
                placeholder="ZIP Code"
                placeholderTextColor="#999"
                value={shippingAddress.zip}
                onChangeText={(text) => setShippingAddress({...shippingAddress, zip: text})}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.inputHalf, { borderColor, color: textColor }]}
                placeholder="Country"
                placeholderTextColor="#999"
                value={shippingAddress.country}
                onChangeText={(text) => setShippingAddress({...shippingAddress, country: text})}
              />
            </View>
          </View>
          
          <ThemedText type="defaultSemiBold" style={styles.subsectionTitle}>Delivery Method</ThemedText>
          
          {COURIER_OPTIONS.map((option) => (
            <SelectableOption
              key={option.id}
              id={option.id}
              title={option.name}
              description={`Delivery in ${option.days} business days`}
              price={option.price}
              selected={selectedCourier === option.id}
              onSelect={() => setSelectedCourier(option.id)}
            />
          ))}
        </ThemedView>
        
        {/* Payment Method Section */}
        <ThemedView style={[styles.section, { backgroundColor: cardBackground }]}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>Payment Method</ThemedText>
          
          {PAYMENT_METHODS.map((method) => (
            <SelectableOption
              key={method.id}
              id={method.id}
              title={method.name}
              selected={selectedPaymentMethod === method.id}
              onSelect={() => setSelectedPaymentMethod(method.id)}
              icon={method.icon}
            />
          ))}
          
          {selectedPaymentMethod === 'credit_card' && (
            <View style={styles.paymentForm}>
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                placeholder="Card Number"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, styles.inputHalf, { borderColor, color: textColor }]}
                  placeholder="Expiry (MM/YY)"
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={[styles.input, styles.inputHalf, { borderColor, color: textColor }]}
                  placeholder="CVV"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                placeholder="Cardholder Name"
                placeholderTextColor="#999"
              />
            </View>
          )}
        </ThemedView>
        
        {/* Place Order Button */}
        <TouchableOpacity 
          style={[styles.placeOrderButton, { backgroundColor: tintColor }]}
          onPress={handlePlaceOrder}
        >
          <ThemedText style={styles.buttonText}>Place Order</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
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
  scrollView: {
    flex: 1,
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryItemDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.6,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  totalSection: {
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  finalTotal: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#33333320',
  },
  addressForm: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  selectableOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentForm: {
    marginTop: 16,
  },
  placeOrderButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
