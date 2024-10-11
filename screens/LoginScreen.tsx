import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import BAIcon from '../components/BAIcon';

export const LoginScreen: React.FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
       await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Map');
      console.log('Login successful');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Login failed. Please check your credentials and try again.'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.loginText}>Login Your Account</Text>
      <Image
        source={require('../assets/Group.jpg')}
        style={{ width: 330, height: 200, resizeMode: 'contain' }}
      />
      <View style={styles.inputContainer}>
      <BAIcon name='email' color='gray' size={18}/>
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
      <BAIcon name='lock' color='gray' size={18}/>
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
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText} onPress={() => navigation.navigate('Signup')}>
        Create an Account? Signup
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  loginText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4D4D4D',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 6,
    borderRadius: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  forgotText: {
    color: '#5DB075',
    textAlign: 'right',
    marginBottom: 18,
  },
  loginButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginLeft:30,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: '#000',
    textAlign: 'center',
  },
});

export default LoginScreen;
