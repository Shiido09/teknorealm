import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

// Order status types
type OrderStatus = 'toShip' | 'toReceive' | 'completed' | 'cancelled';

// Sample order data
const DUMMY_ORDERS = [
  { 
    id: '1001', 
    date: '2023-11-15', 
    status: 'toShip', 
    totalAmount: 2129.98,
    items: [
      { id: '1', name: 'High-End Gaming PC', price: 1999.99, quantity: 1 },
      { id: '2', name: 'Mechanical Keyboard', price: 129.99, quantity: 1 }
    ] 
  },
  { 
    id: '1002', 
    date: '2023-11-10', 
    status: 'toReceive', 
    trackingNumber: 'TRK7890123456',
    totalAmount: 179.98,
    items: [
      { id: '4', name: 'Wireless Gaming Mouse', price: 89.99, quantity: 2 }
    ] 
  },
  { 
    id: '1003', 
    date: '2023-10-28', 
    status: 'completed', 
    totalAmount: 599.99,
    items: [
      { id: '3', name: 'Ultrawide Monitor', price: 599.99, quantity: 1 }
    ] 
  },
  { 
    id: '1004', 
    date: '2023-10-15', 
    status: 'cancelled', 
    totalAmount: 129.99,
    cancellationReason: 'Changed my mind',
    items: [
      { id: '2', name: 'Mechanical Keyboard', price: 129.99, quantity: 1 }
    ] 
  },
  { 
    id: '1005', 
    date: '2023-09-05', 
    status: 'completed', 
    totalAmount: 2089.98,
    items: [
      { id: '1', name: 'High-End Gaming PC', price: 1999.99, quantity: 1 },
      { id: '4', name: 'Wireless Gaming Mouse', price: 89.99, quantity: 1 }
    ] 
  }
];

// Tab button component for order status selection
function OrderStatusTab({ 
  title, 
  isActive, 
  onPress 
}: { 
  title: string; 
  isActive: boolean; 
  onPress: () => void; 
}) {
  const tintColor = useThemeColor({}, 'primaryButton');
  
  return (
    <TouchableOpacity 
      style={[
        styles.tabButton, 
        isActive && { borderBottomColor: tintColor, borderBottomWidth: 2 }
      ]} 
      onPress={onPress}
    >
      <ThemedText 
        style={[
          styles.tabText, 
          isActive && { color: tintColor, fontWeight: '600' }
        ]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

// Order item component
function OrderItem({ item }: { item: any }) {
  const backgroundColor = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'borderColor');
  const tintColor = useThemeColor({}, 'primaryButton');
  
  // Helper function to render the appropriate action button based on order status
  const renderActionButton = () => {
    switch(item.status) {
      case 'toShip':
        return (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: tintColor }]}>
            <ThemedText style={styles.actionButtonText}>Contact Seller</ThemedText>
          </TouchableOpacity>
        );
      case 'toReceive':
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#555555', marginRight: 8 }]}>
              <ThemedText style={styles.actionButtonText}>Track Order</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: tintColor }]}>
              <ThemedText style={styles.actionButtonText}>Confirm Receipt</ThemedText>
            </TouchableOpacity>
          </View>
        );
      case 'completed':
        return (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: tintColor }]}>
            <ThemedText style={styles.actionButtonText}>Buy Again</ThemedText>
          </TouchableOpacity>
        );
      case 'cancelled':
        return (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#555555' }]}>
            <ThemedText style={styles.actionButtonText}>View Details</ThemedText>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };
  
  // Helper function to render status badge
  const renderStatusBadge = () => {
    let badgeColor = '';
    let statusText = '';
    
    switch(item.status) {
      case 'toShip':
        badgeColor = '#E8A317'; // Amber
        statusText = 'To Ship';
        break;
      case 'toReceive':
        badgeColor = '#3B9C9C'; // Teal
        statusText = 'To Receive';
        break;
      case 'completed':
        badgeColor = '#4CAF50'; // Green
        statusText = 'Completed';
        break;
      case 'cancelled':
        badgeColor = '#F44336'; // Red
        statusText = 'Cancelled';
        break;
      default:
        badgeColor = '#9E9E9E'; // Gray
        statusText = 'Processing';
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor: badgeColor }]}>
        <ThemedText style={styles.statusText}>{statusText}</ThemedText>
      </View>
    );
  };
  
  return (
    <ThemedView style={[styles.orderCard, { backgroundColor, borderColor }]}>
      {/* Order header */}
      <View style={styles.orderHeader}>
        <ThemedText type="defaultSemiBold">Order #{item.id}</ThemedText>
        {renderStatusBadge()}
      </View>
      
      <View style={[styles.divider, { backgroundColor: borderColor }]} />
      
      {/* Order items */}
      {item.items.map((product: any, index: number) => (
        <View key={`${item.id}-${product.id}`} style={styles.orderItemRow}>
          <View style={styles.productImage} />
          <View style={styles.productDetails}>
            <ThemedText numberOfLines={2}>{product.name}</ThemedText>
            <View style={styles.productMeta}>
              <ThemedText style={styles.productPrice}>${product.price.toFixed(2)}</ThemedText>
              <ThemedText style={styles.productQuantity}>x{product.quantity}</ThemedText>
            </View>
          </View>
        </View>
      ))}
      
      <View style={[styles.divider, { backgroundColor: borderColor }]} />
      
      {/* Order footer */}
      <View style={styles.orderFooter}>
        <View>
          <ThemedText style={styles.orderDate}>Ordered on {item.date}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.orderTotal}>
            Total: ${item.totalAmount.toFixed(2)}
          </ThemedText>
        </View>
        
        {renderActionButton()}
      </View>
      
      {/* Additional info based on status */}
      {item.status === 'toReceive' && (
        <View style={styles.additionalInfo}>
          <ThemedText style={styles.trackingInfo}>
            Tracking #: {item.trackingNumber}
          </ThemedText>
        </View>
      )}
      
      {item.status === 'cancelled' && item.cancellationReason && (
        <View style={styles.additionalInfo}>
          <ThemedText style={styles.cancellationReason}>
            Reason: {item.cancellationReason}
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

export default function PlacedOrdersScreen() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('toShip');
  
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'borderColor');
  const textColor = useThemeColor({}, 'text');
  
  // Filter orders based on active status
  const filteredOrders = DUMMY_ORDERS.filter(order => order.status === activeStatus);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="subtitle">My Orders</ThemedText>
        <View style={{ width: 32 }} />
      </View>
      
      {/* Tab navigation */}
      <View style={[styles.tabContainer, { borderBottomColor: borderColor }]}>
        <OrderStatusTab 
          title="To Ship" 
          isActive={activeStatus === 'toShip'} 
          onPress={() => setActiveStatus('toShip')} 
        />
        <OrderStatusTab 
          title="To Receive" 
          isActive={activeStatus === 'toReceive'} 
          onPress={() => setActiveStatus('toReceive')} 
        />
        <OrderStatusTab 
          title="Completed" 
          isActive={activeStatus === 'completed'} 
          onPress={() => setActiveStatus('completed')} 
        />
        <OrderStatusTab 
          title="Cancelled" 
          isActive={activeStatus === 'cancelled'} 
          onPress={() => setActiveStatus('cancelled')} 
        />
      </View>
      
      {/* Orders list */}
      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="inbox" size={64} color={textColor} style={{ opacity: 0.5 }} />
            <ThemedText style={styles.emptyStateText}>No orders found</ThemedText>
          </View>
        }
      />
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
  },
  ordersList: {
    padding: 16,
    paddingTop: 0,
  },
  orderCard: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  orderItemRow: {
    flexDirection: 'row',
    padding: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: '#555',
    borderRadius: 4,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  productPrice: {
    fontWeight: '600',
  },
  productQuantity: {
    opacity: 0.7,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  orderDate: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  additionalInfo: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 12,
  },
  trackingInfo: {
    fontSize: 12,
    opacity: 0.8,
  },
  cancellationReason: {
    fontSize: 12,
    opacity: 0.8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    opacity: 0.6,
  },
});
