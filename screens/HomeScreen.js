import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet'

var firebaseConfig = {
  apiKey: 'AIzaSyCkUqpsRdN83jH8o2y5ZfQ6VHYOydEPOSQ',
  authDomain: 'fixxyworker.firebaseapp.com',
  databaseURL: 'https://fixxyworker.firebaseio.com',
  projectId: 'fixxyworker',
  storageBucket: 'fixxyworker.appspot.com',
  messagingSenderId: '492536156918',
  appId: '1:492536156918:web:f8d8feaa2c267b261d92d7',
  measurementId: 'G-78KBVBX2N2',
};

// Initialize Firebase
firebase.initializeApp (firebaseConfig);

export default class HomeScreen extends React.Component {
  state = {
    notification: null,
    latitude: null,
    longitude: null,
  };

  stopJob = async () => {
    //stop receive notification 
    //stop tracking location
    await Location.stop
  }

  startJob = async () => {
    //push id device to sever
    await this.enableNotification ();

    //udpate location to firebase
    await this.updateLocation ();
  };

  enableNotification = async () => {
    registerForPushNotificationsAsync ();
    let token = await AsyncStorage.getItem ('device_id');
    // Push id to BE Sever
    console.log (token);

    this._notificationSubscription = Notifications.addListener (noti => {
      this.setState ({notification: noti});
      this.dropDownAlertRef.alertWithType (
        'warn',
        'Notification',
        noti.data.messenger
      );
    });
  };

  updateLocation = async () => {
    const {status} = await Permissions.askAsync (Permissions.LOCATION);
    let token = await AsyncStorage.getItem ('device_id');

    if (status != 'granted') {
      const response = await Permissions.askAsync (Permissions.LOCATION);
    }

    firebase.database ().ref ('/' + token).set ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });

    await Location.watchPositionAsync (
      {
        timeInterval: 3000,
        distanceInterval: 2,
      },
      location => {
        this.setState ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log (this.state.latitude);
        console.log (this.state.longitude);
        firebase.database ().ref ('/' + token).set ({
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        });
      }
    );
  };

  renderContent = () => {
    if(notification){
      return (
          <View>

          </View>
        )
   }
   }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="#000"
          barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
        />

        <Image
          style={{resizeMode: 'center'}}
          source={require ('../assets/images/ext.jpeg')}
        />
        <View style={styles.groupButton}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.startJob}>
              <View style={styles.buttonView}>
                <Image
                  style={{width: 70, height: 70}}
                  source={require ('../assets/images/car_1.png')}
                />
                <Text style={styles.mainButtonText}>
                  Start Finding Job
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity  onPress={this.startJob}>
              <View style={styles.buttonView}>
                <Image
                  style={{width: 70, height: 70}}
                  source={require ('../assets/images/medical-history.png')}
                />
                <Text style={styles.mainButtonText}>
                  History Jobs
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          snapPoints={[Dimensions.get('screen').height/2,Dimensions.get('screen').height/4, 0]}
          initialSnap={0}
          renderContent={this.renderContent}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },

  groupButton: {
    height: Dimensions.get ('screen').height / 2,
    width: Dimensions.get ('screen').width * 9 / 10,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    fontSize: 30,
    color: 'white',
    marginTop: 10,
  },

  buttonView: {
    padding: 20,
    backgroundColor: 'rgba(80, 203, 203, 1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: Dimensions.get ('screen').width * 8 / 10,
  },
});
