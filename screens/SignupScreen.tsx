import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

const SignupScreen: React.FC<any> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await database().ref(`/users/${user.uid}`).set({
        firstName,
        lastName,
        email,
        password, 
      });

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Create Account</Text>
      <Text style={styles.signupText}>Enter your Personal Data</Text>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="words"
          placeholderTextColor="#777"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="words"
          placeholderTextColor="#777"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  welcomeText: {
    color: "#000",
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  icon: {
    marginRight: 10,
  },
  signupText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4D4D4D',
  },
  signupButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#4D4D4D',
    textAlign: 'center',
  },
});

export default SignupScreen;
