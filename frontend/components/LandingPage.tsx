import { useState } from 'react';
import { 
  ScrollView, 
  View, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { styles } from './LandingPageStyles';

// Placeholder components for an e-commerce site
function CategoryButton({ title }: { title: string }) {
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'cardBackground');
  
  return (
    <TouchableOpacity 
      style={[styles.categoryButton, { borderColor: tintColor, backgroundColor }]} 
      activeOpacity={0.7}
    >
      <ThemedText style={styles.categoryText}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

function ProductCard({ title, price }: { title: string; price: string }) {
  const tintColor = useThemeColor({}, 'primaryButton');
  const cardBackground = useThemeColor({}, 'cardBackground');
  
  return (
    <View style={[styles.productCard, { backgroundColor: cardBackground }]}>
      <View style={styles.productImagePlaceholder} />
      <ThemedText type="defaultSemiBold" style={styles.productTitle}>{title}</ThemedText>
      <ThemedText style={styles.productPrice}>{price}</ThemedText>
      <TouchableOpacity style={[styles.addToCartButton, { backgroundColor: tintColor }]}>
        <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

// Header Component with logo and auth buttons
function Header({ onLoginPress, onRegisterPress }: { onLoginPress: () => void, onRegisterPress: () => void }) {
  const tintColor = useThemeColor({}, 'primaryButton');
  const secondaryColor = useThemeColor({}, 'secondaryButton');
  const backgroundColor = useThemeColor({}, 'background');
  
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.logoContainer}>
        {/* Logo placeholder */}
        <View style={styles.logoPlaceholder}>
          <ThemedText type="defaultSemiBold" style={styles.logoText}>TR</ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={styles.headerTitle}>TeknoRigRealm</ThemedText>
      </View>
      
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push('/products')}
        >
          <MaterialIcons name="search" size={24} color={tintColor} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push('/cart')}
        >
          <MaterialIcons name="shopping-cart" size={24} color={tintColor} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push('/profile')}
        >
          <MaterialIcons name="person" size={24} color={tintColor} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.headerButton, { backgroundColor: secondaryColor }]} 
          onPress={onLoginPress}
        >
          <ThemedText style={styles.headerButtonText}>Login</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.headerButton, { backgroundColor: tintColor }]} 
          onPress={onRegisterPress}
        >
          <ThemedText style={styles.buttonText}>Register</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function LandingPage() {
  const tintColor = useThemeColor({}, 'primaryButton');
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({}, 'cardBackground');
  
  const showLogin = () => {
    router.push('/login');
  };
  
  const showRegister = () => {
    router.push('/register');
  };
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <Header onLoginPress={showLogin} onRegisterPress={showRegister} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Large logo placeholder */}
            <View style={styles.heroLogoContainer}>
              <View style={styles.heroLogo}>
                <ThemedText style={styles.heroLogoText}>TR</ThemedText>
              </View>
            </View>
            <ThemedText type="title" style={styles.title}>
              TeknoRigRealm
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Build Your Tech Empire with Premium Components
            </ThemedText>
            <TouchableOpacity style={[styles.heroButton, { backgroundColor: tintColor }]}>
              <ThemedText style={styles.buttonText}>Explore Products</ThemedText>
            </TouchableOpacity>
          </View>
          
          {/* Categories Section */}
          <View style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Shop by Category</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              <CategoryButton title="Gaming PCs" />
              <CategoryButton title="Laptops" />
              <CategoryButton title="Components" />
              <CategoryButton title="Peripherals" />
              <CategoryButton title="Networking" />
            </ScrollView>
          </View>
          
          {/* Featured Products */}
          <View style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Featured Products</ThemedText>
            <View style={styles.productsGrid}>
              <ProductCard title="High-Performance Gaming PC" price="$1,999.99" />
              <ProductCard title="Mechanical Keyboard" price="$129.99" />
              <ProductCard title="Ultrawide Monitor" price="$599.99" />
              <ProductCard title="Wireless Gaming Mouse" price="$89.99" />
            </View>
          </View>
          
          {/* Special Offers */}
          <View style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Special Offers</ThemedText>
            <View style={[styles.specialOfferCard, { backgroundColor: cardBackground }]}>
              <ThemedText type="defaultSemiBold" style={styles.offerTitle}>Limited Time Offer!</ThemedText>
              <ThemedText style={styles.offerDescription}>
                Get 15% off on all gaming accessories when you purchase any PC or laptop.
              </ThemedText>
              <TouchableOpacity style={[styles.offerButton, { borderColor: tintColor }]}>
                <ThemedText style={{ color: tintColor }}>View Offer</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>© 2023 TeknoRigRealm. All rights reserved.</ThemedText>
            <View style={styles.footerLinks}>
              <TouchableOpacity>
                <ThemedText style={styles.footerLink}>Privacy Policy</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity>
                <ThemedText style={styles.footerLink}>Terms of Service</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity>
                <ThemedText style={styles.footerLink}>Contact Us</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
      
      {/* Bottom Navigation Bar */}
      <ThemedView style={[styles.bottomNavBar, { borderTopColor: useThemeColor({}, 'borderColor') }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
          <MaterialIcons name="home" size={24} color={tintColor} />
          <ThemedText style={styles.navButtonText}>Home</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="notifications" size={24} color={tintColor} />
          <ThemedText style={styles.navButtonText}>Notification</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/profile')}>
          <MaterialIcons name="person" size={24} color={tintColor} />
          <ThemedText style={styles.navButtonText}>Me</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}
