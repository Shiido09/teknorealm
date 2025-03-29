import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { LoginForm } from '@/components/Auth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  
  const handleClose = () => {
    router.back();
  };
  
  const goToRegister = () => {
    router.replace('/register');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.formWrapper}>
        <LoginForm 
          onClose={handleClose} 
          switchToRegister={goToRegister} 
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
