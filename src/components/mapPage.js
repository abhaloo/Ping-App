/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
    import {
      StyleSheet,
      Text,
      View,
      DeviceEventEmitter
    } from 'react-native';

    import Map from './Map';

    import { regionFrom } from './locationHelper';

    
  class MapScreen extends Component {

        static navigationOptions = ({navigation}) => ({
          title: `${navigation.state.params.name}'s Location`,
        });
  
       // constructor code 
       constructor() {
        super();
  
        // eslint-disable-next-line prettier/prettier
        // set default location
        let region = {
          "latitude": 35.4625901,
          "longitude": 138.65437569999995,
          "latitudeDelta": 0,
          "longitudeDelta": 0
        };
  
        this.state = {
          region
        }
      }

      componentWillUnmount() {
        DeviceEventEmitter.emit('unsubscribe',  {
          unsubscribe: true
        });
      }

      render() {

        return (
          <View style={styles.map_container}>
          {
            this.state.region &&
            <Map region={this.state.region} />
          }
          </View>
        );
  
      }
}

const styles = StyleSheet.create({
    map_container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end'
    }
  });

 export default MapScreen;