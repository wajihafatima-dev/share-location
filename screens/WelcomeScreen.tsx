import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.subText}>Find the things that you Want!</Text>
      <Image
        source={require('../assets/Group.jpg')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#777',
    marginBottom: 40,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 13,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderColor: '#FF6F61',
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FF6F61',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
