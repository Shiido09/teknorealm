import React, { useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

// Sample product data
const DUMMY_PRODUCTS = [
  { id: '1', name: 'High-End Gaming PC', price: '$1,999.99', category: 'Computers', image: null },
  { id: '2', name: 'Mechanical Keyboard', price: '$129.99', category: 'Peripherals', image: null },
  { id: '3', name: 'Ultrawide Monitor', price: '$599.99', category: 'Displays', image: null },
  { id: '4', name: 'Wireless Gaming Mouse', price: '$89.99', category: 'Peripherals', image: null },
  { id: '5', name: 'Gaming Headset', price: '$149.99', category: 'Audio', image: null },
  { id: '6', name: 'SSD 1TB', price: '$129.99', category: 'Storage', image: null },
  { id: '7', name: 'RTX 4080 Graphics Card', price: '$899.99', category: 'Components', image: null },
  { id: '8', name: 'Gaming Chair', price: '$249.99', category: 'Furniture', image: null },
];

// Filter component with category buttons
function CategoryFilter({ selectedCategory, onSelectCategory }: { 
  selectedCategory: string | null, 
  onSelectCategory: (category: string | null) => void 
}) {
  const categories = ['All', 'Computers', 'Components', 'Peripherals', 'Displays', 'Storage', 'Audio', 'Furniture'];
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'cardBackground');
  
  return (
    <View style={styles.categoryFilterContainer}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.categoryFilterButton, 
              { 
                backgroundColor: (selectedCategory === item || (item === 'All' && selectedCategory === null)) 
                  ? tintColor 
                  : backgroundColor 
              }
            ]}
            onPress={() => onSelectCategory(item === 'All' ? null : item)}
          >
            <ThemedText 
              style={{ 
                color: (selectedCategory === item || (item === 'All' && selectedCategory === null)) 
                  ? 'white' 
                  : undefined 
              }}
            >
              {item}
            </ThemedText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

// Product card component
function ProductCard({ name, price, onPress }: { 
  name: string, 
  price: string, 
  onPress: () => void 
}) {
  const cardBackground = useThemeColor({}, 'cardBackground');
  const tintColor = useThemeColor({}, 'primaryButton');
  
  return (
    <TouchableOpacity 
      style={[styles.productCard, { backgroundColor: cardBackground }]}
      onPress={onPress}
    >
      <View style={styles.productImageContainer}>
        <View style={styles.productImage} />
      </View>
      <View style={styles.productInfo}>
        <ThemedText type="defaultSemiBold" numberOfLines={2} style={styles.productName}>
          {name}
        </ThemedText>
        <ThemedText style={styles.productPrice}>{price}</ThemedText>
        <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: tintColor }]}>
          <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'borderColor');
  const textColor = useThemeColor({}, 'text');
  
  // Filter products based on search query and selected category
  const filteredProducts = DUMMY_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  const viewProductDetails = (productId: string) => {
    // In a real app, navigate to product detail page
    console.log(`Viewing product: ${productId}`);
    // router.push(`/product/${productId}`);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header with back button and search */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <View style={[styles.searchContainer, { borderColor }]}>
          <MaterialIcons name="search" size={24} color={textColor} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <MaterialIcons name="clear" size={20} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Category filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      {/* Product list */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            onPress={() => viewProductDetails(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={width > 700 ? 3 : 2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyState}>
            <MaterialIcons name="search-off" size={48} color={textColor} />
            <ThemedText style={styles.emptyStateText}>No products found</ThemedText>
          </ThemedView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  categoryFilterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  productList: {
    padding: 12,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 36) / 2,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImageContainer: {
    padding: 12,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#555',
    borderRadius: 6,
  },
  productInfo: {
    padding: 12,
    paddingTop: 0,
  },
  productName: {
    height: 40,
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: '700',
    marginBottom: 8,
  },
  addToCartButton: {
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
  },
});
