import React, { Component } from 'react';
import {
    SafeAreaView,
      StyleSheet,
      ScrollView,
      Text,
      View,
      StatusBar,
      Switch, // for toggling location sharing on and off
      DeviceEventEmitter // for emitting/listening custom events
    } from 'react-native';

// for interacting with Pusher
import Pusher from 'pusher-js/react-native'; 

// for implementing Facebook login
var FBLoginButton = require('./FBLoginButton'); 
var { FBLogin } = require('react-native-facebook-login');





export default class HomeScreen extends Component {
    render () {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>Welcome to Pin Me!</Text>
        <FBLoginButton />
      </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    label: {
      fontSize: 16,
      fontWeight: 'normal',
      marginBottom: 48,
    },
  });

export default HomeScreen;