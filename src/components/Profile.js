import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import PropTypes from 'prop-types';

//Rendering information about the user of the app including the name and profile picture.
class Profile extends Component {
  render() {
    return (
      <View style={styles.profile_container}>
        <Image
          resizeMode={'contain'}
          source={{uri: this.props.profile_picture}}
          style={styles.profile_photo}
        />
        <Text style={styles.profile_name}>{this.props.profile_name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile_container: {
    alignItems: 'center',
  },
  profile_photo: {
    height: 100,
    width: 100,
  },
  profile_name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

// specifying the required props for this component.
Profile.propTypes = {
  profile_picture: PropTypes.string.isRequired,
  profile_name: PropTypes.string.isRequired,
};

export default Profile;
