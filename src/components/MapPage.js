/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, DeviceEventEmitter} from 'react-native';
import {connect} from "react-redux";
import Map from './Map';

//dispatch props for the class
interface StateProps {
  friendChannel: any
}

class MapScreen extends Component<StateProps> {
  constructor() {
    super();

    // set default location
    let region = {
      latitude: -6.135730,
      longitude: 39.362122,
      latitudeDelta: 0,
      longitudeDelta: 0,
    };

    this.state = {
      region,
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('unsubscribe', {
      unsubscribe: true,
    });
  }

  componentDidMount() {
    const channel = this.props.friendChannel;
    console.log("MapPage component did mount: ");
    console.log(channel);

    if (channel) {
        channel.bind('client-location-changed', (data) => {
        console.log("data: \n" + JSON.stringify(data));
        this.setState({
          region: data,
        });
      });
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    const { channel } = this.props.friendChannel;
    if (channel) {
      channel.bind('client-location-changed', (data) => {
        this.setState({
          region: data,
        });
      });
    }
  }

  render() {
    return (
      <View style={styles.map_container}>
        {this.state.region && <Map region={this.state.region} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map_container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
});

//Map the redux store state to the props of the class
//Basically retrieving information back from the redux store
function mapStateToProps(state) {
  return {
    friendChannel: state?.system?.friendChannel
  }
}


export default connect(mapStateToProps, null)(MapScreen);

