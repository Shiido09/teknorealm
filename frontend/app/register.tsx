import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { RegisterForm } from '@/components/Auth';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function RegisterScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  
  const handleClose = () => {
    router.back();
  };
  
  const goToLogin = () => {
    router.replace('/login');
  };
  
  const defaultAddress = '123 Main St'; // Example address

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.formWrapper}>
        <RegisterForm 
          onClose={handleClose} 
          switchToLogin={goToLogin} 
          address={defaultAddress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
  }
});
