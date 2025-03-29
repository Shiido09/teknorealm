import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

// Sample user data
const DUMMY_USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, Silicon Valley, CA 94000',
};

export default function ProfileScreen() {
  const [userData, setUserData] = useState(DUMMY_USER);
  const [isEditing, setIsEditing] = useState(false);
  
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({}, 'cardBackground');
  const borderColor = useThemeColor({}, 'borderColor');
  const tintColor = useThemeColor({}, 'primaryButton');
  const textColor = useThemeColor({}, 'text');
  
  const handleSave = () => {
    // Here you would typically call an API to update the user profile
    console.log('Saving user data:', userData);
    setIsEditing(false);
  };
  
  const handleChange = (field: keyof typeof DUMMY_USER, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="subtitle">My Profile</ThemedText>
        <TouchableOpacity 
          onPress={() => isEditing ? handleSave() : setIsEditing(true)} 
          style={styles.editButton}
        >
          <ThemedText style={{ color: tintColor }}>
            {isEditing ? 'Save' : 'Edit'}
          </ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={[styles.profilePictureSection, { backgroundColor: cardBackground }]}>
          <View style={styles.profilePicture}>
            <MaterialIcons name="person" size={60} color="#777" />
          </View>
          {isEditing && (
            <TouchableOpacity style={[styles.changePictureButton, { backgroundColor: tintColor }]}>
              <ThemedText style={styles.buttonText}>Change Picture</ThemedText>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Personal Information */}
        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>
          
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Full Name</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                value={userData.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
              />
            ) : (
              <ThemedText>{userData.name}</ThemedText>
            )}
          </View>
          
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email Address</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                value={userData.email}
                onChangeText={(value) => handleChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            ) : (
              <ThemedText>{userData.email}</ThemedText>
            )}
          </View>
          
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Phone Number</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                value={userData.phone}
                onChangeText={(value) => handleChange('phone', value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            ) : (
              <ThemedText>{userData.phone}</ThemedText>
            )}
          </View>
          
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Shipping Address</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.input, { borderColor, color: textColor }, styles.textArea]}
                value={userData.address}
                onChangeText={(value) => handleChange('address', value)}
                placeholder="Enter your shipping address"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            ) : (
              <ThemedText>{userData.address}</ThemedText>
            )}
          </View>
        </ThemedView>
        
        {/* Account Actions */}
        <ThemedView style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Account
          </ThemedText>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="lock" size={24} color={textColor} style={styles.actionIcon} />
            <ThemedText>Change Password</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={textColor} style={styles.actionArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="history" size={24} color={textColor} style={styles.actionIcon} />
            <ThemedText>Order History</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={textColor} style={styles.actionArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/placedorders')}
          >
            <MaterialIcons name="shopping-bag" size={24} color={textColor} style={styles.actionIcon} />
            <ThemedText>My Orders</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={textColor} style={styles.actionArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="payment" size={24} color={textColor} style={styles.actionIcon} />
            <ThemedText>Payment Methods</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color={textColor} style={styles.actionArrow} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.logoutButton, { borderColor: '#ff4d4d' }]}>
            <MaterialIcons name="logout" size={24} color="#ff4d4d" style={styles.actionIcon} />
            <ThemedText style={{ color: '#ff4d4d' }}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
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
  editButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  changePictureButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 18,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#33333320',
  },
  actionIcon: {
    marginRight: 12,
  },
  actionArrow: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
  },
});
