# Location-Sharer
### Adeel Bhaloo and Trilok Patel
### CPSC 571, Fall 2020

### Overview
This is an app that allows a user to share their location other app users who are their facebook friends.

We use the Facebook API to authenicate user login and access their facebook friends.
Upon toggling the option to share their location, we use the Pusher API to broadcast a users location along a Channel. 
Users subscribe to a friend's Channel upon clicking on a friends name provided when they log in. Once subscribed they see
the friends real-time location on a map. 

### To run the app:

Note: This app wasn't developed for public use so there's quite a lot of set up involved. 

Pre-requistes
You require a Facebook Developers Account. You can set one up here : https://developers.facebook.com/
You require npm : https://www.npmjs.com/get-npm


1. Request permission from the developers to be added as a tester so you're logins can be authenicated from the project on Facebook 
2. Clone the repo 
3. Run 'npm install' in the project directory
4. Connect an android device to the computer or launch an emulator
4. Run 'react-native run-android' in the project directory


