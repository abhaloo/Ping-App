/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  Switch, // for toggling location sharing on and off
  DeviceEventEmitter, // for emitting/listening custom events
} from 'react-native';

// for interacting with Pusher
import Pusher from 'pusher-js/react-native';
import Profile from './Profile'; // component for displaying the user's profile
import Friends from './Friends'; // component for displaying the user's friends
import { regionFrom } from './locationHelper'; // helper function for constructing the data needed by React Native Maps

// for implementing Facebook login
var FBLoginButton = require('./FBLoginButton');
var {FBLogin} = require('react-native-facebook-login');

class HomeScreen extends Component {
  
  
  // set screen title
  static navigationOptions = {
    title: 'locationSharer',
  };

  constructor() {
    super();

    this.watchId = null; // unique ID for the geolocation watcher
    this.pusher = null; // variable for storing the Pusher instance
    this.user_channel = null; // the Pusher channel for the current user

    // bind the functions to the class
    this.onLogin = this.onLogin.bind(this);
    
    this.onLoginFound = this.onLoginFound.bind(this);
    
    this.onLogout = this.onLogout.bind(this);
    
    this.setUser = this.setUser.bind(this);
     
    this.setFriends = this.setFriends.bind(this);
    
    this.toggleLocationSharing = this.toggleLocationSharing.bind(this);
    
    this.onViewLocation = this.onViewLocation.bind(this);
  

    this.state = {
      is_loggedin: false, // whether the user is currently logged in or not
      is_location_shared: false, // whether the user is currently sharing their location or not
      user: null, // data for the currently logged in user
      friends: null, // data for the user's friends
      subscribed_to: null, // the Facbook user ID of the user's friend whose location is currently being viewed
      subscribed_friends_count: 0, // number of friends currently subscribed to the user
    };
  }

  //when facebook login is successful, this saves user info to state
  onLogin(login_data) {
    this.setUser(login_data);
    this.setFriends(login_data.credentials.token);
  }

  //if an exisiting Facebook session exists, query Facebook using that session
  async onLoginFound(data) {   
    let token = data.credentials.token;

    await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      .then((response) => response.json())
      .then((responseJson) => {
        
          console.log("Existing login found.");
          console.log(data);

          let login_data = {
            profile: {
              id: responseJson.id,
              name: responseJson.name
            },
            credentials: {
              token: token
            }
          };

          this.setUser(login_data);
      })
      .catch((error) => {
        console.log('Error in onLoginFound() ', error);
      });

    this.setFriends(token);

  }

  //unsets user data that was set to state earlier
  //react-native-facebook-login already destroys session data
  onLogout() {
    this.setState({
      is_loggedin: false,
      user: null, 
      friends: null,
      is_subscribed_to: null
    });
  }

  //formats login data returned from Facebook and sets it to the state
  setUser(login_data) {

    let user_id = login_data.profile.id;
    this.setState({
      is_loggedin: true,
      user: {
        id: user_id,
        access_token: login_data.credentials.token,
        name: login_data.profile.name,
        photo: `https://graph.facebook.com/${user_id}/picture?width=100` // the user's profile picture
      }
    });

  }

  async setFriends(token) {
    await fetch(`https://graph.facebook.com/me/friends?access_token=${token}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          friends: responseJson.data
        });
      })
      .catch((error) => {
        console.log('Error in setFriends()', error);
      });
  }

  UNSAFE_componentWillMount() {
    
      //Initialize Pusher instance
      this.pusher = new Pusher('1104307', {
      authEndpoint: 'c063883b80912c971c1d',
      cluster: 'ap2',
      encrypted: true,
      auth: {
        params: {
          app_key: 'Bmce+9aHdOoVtE7fS3B07tfj7Bc=', // Unique key (now secret)
        }
      }
    });

    //used to unsubscribe from a friends channel 
    //triggered once the user leaves the map screen to return to home screen
    DeviceEventEmitter.addListener('unsubscribe', (e) => {
      let friend_id = this.state.subscribed_to;
      this.pusher.unsubscribe(`private-friend-${friend_id}`);
    });
  }

  //function executes if user presses button to share location
  // If user enables location sharing, we subscribe them to their own channel and share their data using pusher
  // If user diables location sharing, unsubscribe them from their channel
  toggleLocationSharing() {

    let is_location_shared = !this.state.is_location_shared;

    this.setState({
      is_location_shared: is_location_shared
    });

    let user_id = this.state.user.id;
    
    // location sharing disabled
    if(!is_location_shared){
      this.pusher.unsubscribe(`private-friend-${user_id}`); // disconnect from their own channel
      if(this.watchId){
        navigator.geolocation.clearWatch(this.watchId); //stop sharing 
      }
    }else{
      //location sharing enabled
      this.user_channel = this.pusher.subscribe(`private-friend-${user_id}`);
      this.user_channel.bind('client-friend-subscribed', (friend_data) => {

        let friends_count = this.state.subscribed_friends_count + 1;
        this.setState({
          subscribed_friends_count: friends_count
        });

        if(friends_count == 1){ // only begin monitoring the location when the first subscriber subscribes
          this.watchId = navigator.geolocation.watchPosition(
            (position) => {
              var region = regionFrom(
                position.coords.latitude,
                position.coords.longitude,
                position.coords.accuracy
              );
              this.user_channel.trigger('client-location-changed', region); // push the data to subscribers
            }
          );
        }
      });  

    }
  }

  //subscribe to a friend’s channel so user get updates whenever their friends location changes
  onViewLocation(friend) {

    this.friend_channel = this.pusher.subscribe(`private-friend-${friend.id}`);
    this.friend_channel.bind('pusher:subscription_succeeded', () => {
      let username = this.state.user.name;
      this.friend_channel.trigger('client-friend-subscribed', {
        name: username
      });
    });

    this.setState({
      subscribed_to: friend.id
    });

    //navigating to the map page
    const { navigate } = this.props.navigation;
    console.log('Friend name:');
    console.log(friend.name + '\n\n');
    console.log('Friend Channel:');
    console.log(this.friend_channel);

    navigate('Map', {
    name: friend.name,
    friend_channel: this.friend_channel // pass the reference to the friend's channel
    });
  }



  render() {

    return (
      <View style={styles.page_container}>
        {
          this.state.is_loggedin &&
          <View style={styles.container}>
          {
            this.state.user &&
            <View style={styles.profile_container}>
              <Profile
                profile_picture={this.state.user.photo}
                profile_name={this.state.user.name}
              />

              <Text>Share Location</Text>
              <Switch
                value={this.state.is_location_shared}
                onValueChange={this.toggleLocationSharing} />
            </View>
          }

          {
            this.state.friends &&
            <Friends
              friends={this.state.friends}
              onViewLocation={this.onViewLocation} />
          }
          </View>
        }

          <FBLogin
            permissions={["email", "user_friends"]}
            onLogin={this.onLogin}
            onLoginFound={this.onLoginFound}
            onLogout={this.onLogout}
            style={styles.button}
          />
        </View>
    );
  }
}



// add the styles
const styles = StyleSheet.create({
  page_container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    padding: 20
  },
  profile_container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50
  },
  button: {
    paddingBottom: 30,
    marginBottom: 40,
    alignSelf: 'center'
  }
});

export default HomeScreen;
