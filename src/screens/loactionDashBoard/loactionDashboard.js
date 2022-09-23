import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import RNSettings from 'react-native-settings';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserAvatar from '../../Assets/Images/DummyImage.jpeg';

import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : 'ca-app-pub-6608580280604322/4961959123';
// const adUnitId = 'ca-app-pub-6608580280604322/4961959123';
const adUnitId = 'ca-app-pub-6608580280604322/4961959123';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
  const userId = auth().currentUser.email;

  // Add the token to the users datastore
  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}
export default function LoactionDashboard({navigation}) {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', {language: 'en'});
  var [latitudec1, setlatitudec1] = useState(0);
  var [longitudec1, setlongitudec1] = useState(0);
  var [currLatitudec1, setCurrLatitudec1] = useState(0);
  var [currLongitudec1, setCurrLongitudec1] = useState(0);
  const [robberyIncre, SetRobberyIncre] = useState(0);
  const [robberyDcre, SetRobberyDcre] = useState(0);
  var [multiple, setMultiple] = useState([]);
  const [getImg, setImg] = useState('');
  const [flag, setflag] = useState(false);

  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [ind, setInd] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  // Get the device token
  useEffect(() => {
    console.log('Token useEffect');
    messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
        return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  // const [locationPermissionGranted,setLocationPermissionGranted]=useState(false);

  var diff_hour = 0;
  var sampleColorIndex = [];

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getImageRefFireBase();

    firestore()
      .collection('crime')
      .get()
      .then(querySnapshot => {
        const temp = [];
        querySnapshot.forEach(documentSnapshot => {
          const obj = documentSnapshot.data();
          temp.push(obj);
        });
        setMultiple(temp);
      });

    Geolocation.getCurrentPosition(
      info => {
        setlatitudec1(info.coords.latitude);
        setlongitudec1(info.coords.longitude);
        setCurrLatitudec1(info.coords.latitude);
        setCurrLongitudec1(info.coords.longitude);
        getAddress(info);
      },
      error => {
        if (error.message === 'No location provider available.') {
          Alert.alert(
            '"Location permission denied So please Accept that"',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  RNSettings.openSetting(
                    RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                  ).then(result => {
                    if (result === RNSettings.ENABLED) {
                      console.log('location is enabled');
                      navigation.navigate('splash');
                    }
                  });
                },
              },
            ],
          );
          console.log('location permission denied');
        }
      },
      {enableHighAccuracy: false, timeout: 50000},
    );

    if (multiple.length !== 0) {
      getImageRefFireBase();

      firestore()
        .collection('crime')
        .get()
        .then(querySnapshot => {
          const temp = [];
          querySnapshot.forEach(documentSnapshot => {
            const obj = documentSnapshot.data();
            temp.push(obj);
          });
          setMultiple(temp);
        });
      Geolocation.getCurrentPosition(
        info => {
          setlatitudec1(info.coords.latitude);
          setlongitudec1(info.coords.longitude);
          setCurrLatitudec1(info.coords.latitude);
          setCurrLongitudec1(info.coords.longitude);
          getAddress(info);
        },
        error => {
          if (error.message === 'No location provider available.') {
            Alert.alert(
              '"Location permission denied So please Accept that"',
              '',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    RNSettings.openSetting(
                      RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                    ).then(result => {
                      if (result === RNSettings.ENABLED) {
                        console.log('location is enabled');
                        navigation.navigate('splash');
                      }
                    });
                  },
                },
              ],
            );
            console.log('location permission denied');
          }
        },
        {enableHighAccuracy: false, timeout: 50000},
      );
    }
    wait(3000).then(() => setRefreshing(false));
  }, []);

  var user1 = auth().currentUser;
  const setUpAndDownValue = async (index, con, val) => {
    const usersCollection = await firestore()
      .collection('crime')
      .doc(index)
      .get();
    var temp = [];
    if (usersCollection.empty) {
      console.log('no documents found cc');
    } else {
      usersCollection._data?.userId?.forEach(doc => {
        let data = doc;
        temp.push(data);
      });
    }
    var temp1 = [];
    if (temp.length == 0) {
      temp1 = user1.email;
    } else {
      temp.push(user1.email);
    }

    if (con === 'A') {
      await firestore()
        .collection('crime')
        .doc(index)
        .update({
          upVote: val,
          check: false,
          userId: temp.length > 0 ? temp : temp1,
        })
        .then(() => {
          console.log(2);
          SetRobberyIncre(val);
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    } else {
      await firestore()
        .collection('crime')
        .doc(index)
        .update({
          downVote: val,
          check: false,
          userId: temp.length > 0 ? temp : temp1,
        })
        .then(() => {
          console.log(3);
          SetRobberyDcre(val);
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    }
  };

  const ChangeColorAccordingToMarkerFun = async index => {
    sampleColorIndex.push(index);
  };
  const getImageRefFireBase = async () => {
    var user = auth().currentUser;
    const userDocument = await firestore()
      .collection('users')
      .doc(user.email)
      .get();
    if (userDocument._data?.image) {
      setImg(userDocument._data.image);
      setflag(true);
    }
  };

  const clearAllAsyncStorage = () => {
    Alert.alert('Do you want to Logout', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          try {
            AsyncStorage.setItem('uName', '');
            setshow(false);
            setshow1(false);
            // await AsyncStorage.clear()
            navigation.navigate('Login');
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);

    console.log('Done.');
  };
  // get Image and all data FROM firebase
  useEffect(() => {
    console.log('1');
    // getData()
    getImageRefFireBase();

    firestore()
      .collection('crime')
      .get()
      .then(querySnapshot => {
        const temp = [];
        querySnapshot.forEach(documentSnapshot => {
          const obj = documentSnapshot.data();
          // console.log('obj: ',obj);
          temp.push(obj);

          // console.log("1111")
        });
        setMultiple(temp);
      });
  }, []);
  // after tab navigation get data
  useEffect(() => {
    console.log('11');
    // getData()
    getImageRefFireBase();

    firestore()
      .collection('crime')
      .get()
      .then(querySnapshot => {
        const temp = [];
        querySnapshot.forEach(documentSnapshot => {
          const obj = documentSnapshot.data();
          // console.log('obj: ',obj);
          temp.push(obj);

          // console.log("1111")
        });
        setMultiple(temp);
      });
  }, [isFocused]);
  // get all data according to votes
  useEffect(() => {
    console.log('2');
    // getData()
    if (multiple.length !== 0) {
      getImageRefFireBase();

      firestore()
        .collection('crime')
        .get()
        .then(querySnapshot => {
          const temp = [];
          querySnapshot.forEach(documentSnapshot => {
            const obj = documentSnapshot.data();
            temp.push(obj);
          });
          setMultiple(temp);
        });
    }
  }, [robberyDcre, robberyIncre]);
  // get live location
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setlatitudec1(position.coords.latitude);
        setlongitudec1(position.coords.longitude);
        setCurrLatitudec1(position.coords.latitude);
        setCurrLongitudec1(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log('error', error);
        if (error.message === 'No location provider available.') {
          //Show alert or something here that GPS need to turned on.
          Alert.alert(
            '"Location permission denied So please Accept that"',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  RNSettings.openSetting(
                    RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                  ).then(result => {
                    if (result === RNSettings.ENABLED) {
                      console.log('location is enabled');
                      navigation.navigate('splash');
                    }
                  });
                },
              },
            ],
          );
          console.log('location permission denied');

          // NativeModules.DevSettings.reload();
        }
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 50000},
    );
  }, []);
  // getCurrent Loc Region and check mobile location services is on or not if not then on it and restart
  const getAddress = info => {
    Geocoder.from(info.coords.latitude, info.coords.longitude)
      .then(
        json => {
          console.log(
            'json from Login_Screen from signIn fun1 ',
            JSON.stringify(json),
          );
          if (
            json &&
            json.results &&
            json.results.length &&
            json.results[0].address_components
          ) {
            var address = {};
            var address_components = json.results[0].address_components;
            for (var i = 0; i < address_components.length; i++) {
              if (address_components[i].types[0] == 'country') {
                address.country = address_components[i].long_name;
              } else if (address_components[i].types[0] == 'locality') {
                address.city = address_components[i].long_name;
              } else if (
                address_components[i].types[0] == 'administrative_area_level_1'
              ) {
                address.region = address_components[i].long_name;
              }
            }
            console.log('i am here ---->', address);

            var user = auth().currentUser;
            firestore()
              .collection('users')
              .doc(user.email)
              .update({
                country: address.country,
                city: address.city,
                region: address.region,
                // firstTime:true,
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              })
              .then(() => {
                console.log('added', auth().currentUser.email);
                AsyncStorage.setItem('firstTime', JSON.stringify(true));
              })
              .catch(error => {
                console.log('sorry');
              });
          }
        },
        error => {
          if (error.message === 'No location provider available.') {
            //Show alert or something here that GPS need to turned on.
            Alert.alert(
              '"Location permission denied So please Accept that"',
              '',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    RNSettings.openSetting(
                      RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                    ).then(result => {
                      if (result === RNSettings.ENABLED) {
                        console.log('location is enabled');
                        navigation.navigate('splash');
                      }
                    });
                  },
                },
              ],
            );
            console.log('location permission denied');
          }
        },
        {enableHighAccuracy: false, timeout: 50000},
      )
      .catch(error => console.warn(error));
  };

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('firstTime');
      const userData1 = JSON.parse(userData);
      setTimeout(() => {
        if (!userData1) {
          Geolocation.getCurrentPosition(
            info => {
              setlatitudec1(info.coords.latitude);
              setlongitudec1(info.coords.longitude);
              setCurrLatitudec1(info.coords.latitude);
              setCurrLongitudec1(info.coords.longitude);
              getAddress(info);
            },
            error => {
              if (error.message === 'No location provider available.') {
                Alert.alert(
                  '"Location permission denied So please Accept that"',
                  '',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        RNSettings.openSetting(
                          RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                        ).then(result => {
                          if (result === RNSettings.ENABLED) {
                            console.log('location is enabled');
                            navigation.navigate('splash');
                          }
                        });
                      },
                    },
                  ],
                );
                console.log('location permission denied');
              }
            },
            {enableHighAccuracy: false, timeout: 50000},
          );
        }
      }, 5000);
    })();
  }, []);
  // make a obj and add latitudeDelta and LongitudeDelta
  const getMapRegion1 = () => ({
    latitude: latitudec1,
    longitude: longitudec1,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const setUserLocation = async coordinate => {
    //alert("User location changed MAP SHOULDNT MOVE")
    setlatitudec1(coordinate.latitude);
    setlongitudec1(coordinate.longitude);
    setCurrLatitudec1(coordinate.latitude);
    setCurrLongitudec1(coordinate.longitude);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 10,
            backgroundColor: '#ecf0f1',
          }}>
          <MapView
            // style={{flex: 1,}}
            onUserLocationChange={locationChangedResult => {
              setUserLocation(locationChangedResult.nativeEvent.coordinate);
            }}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            userLocationPriority={'high'}
            region={getMapRegion1()}
            // key={}
          >
            {/* show multiple marker */}
            {multiple.length !== 0 &&
              multiple.map((e, index) => {
                if (
                  e.upVote > e.downVote ||
                  e.upVote == e.downVote ||
                  e.upVote + 4 >= e.downVote
                ) {
                  var currDateandTime = moment().format();
                  diff_hour = moment(currDateandTime).diff(
                    e.realDateTime,
                    'hours',
                  );
                  if (diff_hour > 1 && diff_hour <= 4) {
                    ChangeColorAccordingToMarkerFun(index);
                  }
                  if (diff_hour > 4) {
                    console.log(
                      'location dashboard crime more than 5 hours====>',
                      e,
                    );
                    firestore().collection('crime').doc(e.id).delete();
                  }
                  return diff_hour <= 4 ? (
                    <Marker
                      pinColor={diff_hour > 1 ? 'yellow' : 'red'}
                      coordinate={{
                        latitude: e.latitude,
                        longitude: e.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                      key={index}
                      onPress={() => {
                        setshow1(!show1);
                        setInd(index);
                        setlatitudec1(e.latitude);
                        setlongitudec1(e.longitude);
                      }}
                    />
                  ) : null;
                } else {
                  firestore().collection('crime').doc(e.id).delete();
                  return null;
                }
              })}
            <Marker
              coordinate={{
                latitude: currLatitudec1,
                longitude: currLongitudec1,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              // title="My Current Location"
              // description="oh this is me"
            >
              <FontAwesome name="male" size={40} color="green" />

              <Callout tooltip={true} alphaHitTest={true}>
                <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#FFFF',
                    borderRadius: 10,
                    width: widthPercentageToDP(40),
                    height: heightPercentageToDP(22),
                    marginTop: 130,
                    marginLeft: 100,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ff0000',
                      borderRadius: 10,
                      width: widthPercentageToDP(40),
                      height: heightPercentageToDP(4),
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                      // marginBottom:10
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        // fontWeight: 'bold',
                        color: 'white',
                      }}>
                      My Current Location
                    </Text>
                  </View>
                  <View style={{padding: 5, paddingTop: 15}}>
                    <Text
                      style={{fontSize: 16, color: 'black'}}
                      numberOfLines={3}>
                      oh this is me
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}></View>
                </View>
              </Callout>
            </Marker>
          </MapView>
          {show1 && (
            <Modal
              isVisible={show1}
              onBackdropPress={() => {
                setshow1(false);
              }}
              visible={show1}
              transparent={true}
              onRequestClose={() => {
                // alert('Modal has been closed.');
                setshow1(false);
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#FFFF',
                  borderRadius: 10,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(22),
                  marginTop: heightPercentageToDP(19),
                  marginLeft: widthPercentageToDP(25),
                }}>
                <View
                  style={{
                    backgroundColor:
                      sampleColorIndex.filter(val => val === ind).length != 0
                        ? 'yellow'
                        : '#ff0000',
                    // backgroundColor: '#ff0000',
                    borderRadius: 10,
                    width: widthPercentageToDP(40),
                    height: heightPercentageToDP(4),
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: 10,
                  }}>
                  {console.log(
                    'multiple[ind].realDateTime',
                    multiple[ind].realDateTime,
                  )}
                  <Text
                    style={{
                      fontSize: 12,
                      // fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {moment(multiple[ind].realDateTime).fromNow()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Trendings')}
                  style={{padding: 5}}>
                  <Text
                    style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}
                    numberOfLines={3}>
                    {/* Robber are typing to loot visitor at National park. */}
                    {multiple[ind].type}
                    {'...'}
                  </Text>
                  <Text
                    style={{fontSize: 15, color: 'black'}}
                    numberOfLines={3}>
                    {/* Robber are typing to loot visitor at National park. */}
                    {multiple[ind].details}
                  </Text>
                </TouchableOpacity>
                {console.log(
                  'multiple[ind].userId.filter(usid=>user.email==usid)',
                  multiple[ind].userId.filter(usid => user1.email == usid)
                    .length == 0,
                )}
                {multiple[ind].userId.filter(usid => user1.email == usid)
                  .length == 0 ? (
                  // {multiple[ind].check ? (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setUpAndDownValue(
                          multiple[ind].id,
                          'B',
                          multiple[ind].downVote + 1,
                        )
                      }
                      style={{
                        width: 60,
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: '#ff0000',
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="arrow-down" size={20} color="white" />
                      <Text style={{color: 'white', fontSize: 17}}>
                        {multiple[ind].downVote}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setUpAndDownValue(
                          multiple[ind].id,
                          'A',
                          multiple[ind].upVote + 1,
                        )
                      }
                      style={{
                        width: 60,
                        height: 30,
                        backgroundColor: '#50ff1d',
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Entypo name="arrow-up" size={20} color="white" />
                      <Text style={{color: 'white', fontSize: 17}}>
                        {multiple[ind].upVote}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: 60,
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: '#ff0000',
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="arrow-down" size={20} color="white" />
                      <Text style={{color: 'white', fontSize: 18}}>
                        {multiple[ind].downVote}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 60,
                        height: 30,
                        backgroundColor: '#50ff1d',
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Entypo name="arrow-up" size={20} color="white" />
                      <Text style={{color: 'white', fontSize: 18}}>
                        {multiple[ind].upVote}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          marginTop: Platform.OS === 'ios' ? 40 : 20,
          flexDirection: 'row',
          padding: 20,
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(20),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('info1')}
          style={{
            width: 50,
            height: 50,
          }}>
          <Image
            source={require('./Group.png')}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            Geocoder.from(data.description)
              .then(json => {
                var location = json.results[0].geometry.location;
                setlatitudec1(location.lat);
                setlongitudec1(location.lng);
              })
              .catch(error => console.warn(error));
          }}
          query={{
            key: 'AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M',
            // key: 'YOUR API KEY',
            language: 'en',
          }}
          styles={{
            row: {
              backgroundColor: '#17bba9',
            },
            textInput: {
              // height: 220,
              // color: '#5d5d5d',
              color: 'black',
              fontSize: 16,
              backgroundColor: 'white',
              width: widthPercentageToDP(60),
              height: 40,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:'red',
              // flex:1
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
        <TouchableOpacity
          onPress={() => setshow(!show)}
          style={{
            backgroundColor: 'white',
            width: 40,
            height: 40,
            marginLeft: 5,
          }}>
          <Image
            source={flag ? {uri: getImg} : UserAvatar}
            // source={require('./Rectangle.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* pop up show when profile picture click and 2 item show setting and logout */}
      {/* when again press then off popup */}
      {show ? (
        <View
          style={{
            position: 'absolute',
            marginTop: Platform.OS === 'ios' ? 80 : 40,

            padding: 80,
            marginLeft: 200,

            width: widthPercentageToDP(50),
            height: heightPercentageToDP(40),
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5,
              shadowColor: '#707070',
              justifyContent: 'space-between',
              width: widthPercentageToDP(25),
              height: heightPercentageToDP(10),
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  paddingTop: 4,
                  color: '#17bba9',
                }}>
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => clearAllAsyncStorage()}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  paddingBottom: 4,
                  color: '#17bba9',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View
        style={{
          // marginBottom: heightPercentageToDP(2),
          alignSelf: 'center',
          position: 'absolute',
          // backgroundColor: 'red',
          bottom: heightPercentageToDP(12),
          zIndex: 1,
        }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
