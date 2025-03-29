import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

// Login/Register Modal components
export function LoginForm({ onClose, switchToRegister }: { onClose: () => void, switchToRegister: () => void }) {
  const tintColor = useThemeColor({}, 'primaryButton');
  const borderColor = useThemeColor({}, 'borderColor');
  const backgroundColor = useThemeColor({}, 'cardBackground');
  
  return (
    <View style={[styles.formContainer, { backgroundColor }]}>
      <View style={styles.formHeader}>
        <ThemedText type="title" style={styles.formTitle}>Login</ThemedText>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#777" />
        </TouchableOpacity>
      </View>
      
      <TextInput 
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]} 
        placeholder="Email"
        placeholderTextColor="#999"
      />
      <TextInput 
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]} 
        placeholder="Password" 
        secureTextEntry 
        placeholderTextColor="#999"
      />
      
      <TouchableOpacity style={[styles.authButton, { backgroundColor: tintColor }]}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={switchToRegister} style={styles.switchAuthMode}>
        <ThemedText>Don't have an account? </ThemedText>
        <ThemedText style={{ color: tintColor }}>Register</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

export function RegisterForm({ onClose, switchToLogin, address }: { onClose: () => void, switchToLogin: () => void, address: string }) {
  const tintColor = useThemeColor({}, 'primaryButton');
  const borderColor = useThemeColor({}, 'borderColor');
  const backgroundColor = useThemeColor({}, 'cardBackground');

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <View style={[styles.formContainer, { backgroundColor }]}>
      <View style={styles.formHeader}>
        <ThemedText type="title" style={styles.formTitle}>Register</ThemedText>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      <TextInput 
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]} 
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholderTextColor="#999"
      />
      <TextInput 
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]} 
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholderTextColor="#999"
      />
      <TextInput 
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]} 
        placeholder="Password" 
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        placeholderTextColor="#999"
      />
      <TextInput 
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]} 
        placeholder="Address"
        value={address} // Use the address prop here
        onChangeText={(value) => handleChange('address', value)}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={[styles.authButton, { backgroundColor: tintColor }]} onPress={handleSubmit}>
        <ThemedText style={styles.buttonText}>Create Account</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={switchToLogin} style={styles.switchAuthMode}>
        <ThemedText>Already have an account? </ThemedText>
        <ThemedText style={{ color: tintColor }}>Login</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  authButton: {
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  switchAuthMode: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
