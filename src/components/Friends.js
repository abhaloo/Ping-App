import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

import PropTypes from 'prop-types';

//Class component to render the friend list for all the friends on the home screen
class Friends extends Component {
  renderFriends() {
    return this.props.friends.map((friend, index) => {
      let profile_picture = `https://graph.facebook.com/${friend.id}/picture`;
      return (
        <TouchableHighlight
          key={index}
          onPress={this.props.onViewLocation.bind(this, friend)}
          underlayColor={'#CCC'}>
          <View style={styles.friend_row}>
            <Image
              resizeMode={'contain'}
              source={{uri: profile_picture}}
              style={styles.profile_photo}
            />
            <Text style={styles.friend_name}>{friend.name}</Text>
          </View>
        </TouchableHighlight>
      );
    });
  }
  //Rendering the friends list
  render() {
    return (
      <View style={styles.friends_container}>
        <Text style={styles.friends_header_text}>View Friend Location</Text>
        {this.renderFriends.call(this)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friends_container: {
    flex: 2,
  },
  friends_header_text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friend_row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profile_photo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  friend_name: {
    fontSize: 15,
  },
});

// specify the required props that are to be passing to the components where this component is used
Friends.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  onViewLocation: PropTypes.func.isRequired,
};

export default Friends;
