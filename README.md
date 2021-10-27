# Ping
### Adeel Bhaloo and Trilok Patel
### CPSC 571, Fall 2020

### Overview
This is an app that allows a user to share their location with other app users who are their Facebook friends.

We use the Facebook API to authenicate user login and access their Facebook friends.
Upon toggling the option to share their location, we use the Pusher API to broadcast a user's location along a Channel. 
Users subscribe to a friend's Channel upon clicking on their name provided when they log in. Once subscribed, they see
their friend's real-time location on a map. 

### System Setup

### Prerequisites
-> Basic understanding of React and React-Native.  
-> __(Important)__ React-Native development environment. Follow React-Native CLI quick start at https://reactnative.dev/docs/environment-setup   
-> Android device with running version 5 and above or an emulator with the same  
      _Note: Make sure adb exists to be able to run the emulator or on physical android device_  
-> Facebook Developers Account. You can set one up here : https://developers.facebook.com/  
      Note: You will need to generate a 28 character key-hash to be added as a tester to the project on Facebook Developer Console.  
-> node package manager (npm) from https://www.npmjs.com/get-npm in order to install all the dependencies required to run the project.  

### Running the system
1. Request permission from the developers to be added as a tester so your logins can be authenticated from the project on Facebook. Provide your key-hash to be added.
2. Clone the repo 
3. Run 'npm install' in the project directory
4. Connect an android device to the computer or launch an emulator
    When running an android device, make sure to enable developer settings and run in debugging mode in order to access apps that are in development.
5. Run 'npx react-native run-android' in the project directory
6. Follow the manual for instructions on how to use the app

### References
https://reactnative.dev/docs/ To refer to environment set up and troubleshooting guides.  
https://pusher.com/docs/channels Understanding the mechanism of Pusher Channels and sending information using them.  
https://pusher.com/tutorials/geolocation-sharing-react-native#creating-the-pusher-app Learning code for React-Native.  
https://www.digitalocean.com/community/tutorials/react-react-native-redux Building a global store in app for transferring objects around components.  
https://reactnavigation.org/docs/getting-started To build the stack navigation of switching between screens with "Back" functionality.  
