import Geolocation1 from '@react-native-community/geolocation';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {useIsFocused} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RNSettings from 'react-native-settings';
import Textarea from 'react-native-textarea';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import UserAvatar from '../../Assets/Images/InfoIcon.png';
import {styles} from './postCrime.styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';
// import { RewardedAd, TestIds } from '@react-native-firebase/admob';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from '@react-native-firebase/admob';

// const adUnitId = __DEV__
//   ? TestIds.INTERSTITIAL
//   : 'ca-app-pub-6608580280604322/9371789100';
// const adUnitId = 'ca-app-pub-6608580280604322/9371789100';
// const adUnitId = 'ca-app-pub-6608580280604322/8715730281';
const adUnitId = 'ca-app-pub-6608580280604322/5126079841';
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing', 'sports'],
});

// const adUnitId1 = __DEV__
//   ? TestIds.BANNER
//   : 'ca-app-pub-6608580280604322/5126079841';
// const adUnitId1 = 'ca-app-pub-6608580280604322/5126079841';
// 'ca-app-pub-6608580280604322~6423257795';
// : 'ca-app-pub-4061452781467813/7000119789';

export const PostCrime = ({navigation}) => {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', {language: 'en'});
  const [selectedValue, setSelectedValue] = useState('Type of Crime');
  const [details, setDetails] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  var [latitudec, setlatitudec] = useState(0);
  var [longitudec, setlongitudec] = useState(0);
  const [disable1, setDisable1] = useState(true);

  const [currentTime, setTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [realDateTime, setRealDateTime] = useState('');
  var user = auth().currentUser;
  const isFocused = useIsFocused();

  // after tab navigation get data
  useEffect(() => {
    if (
      selectedValue !== 'Type of Crime' &&
      details.length > 1 &&
      latitudec != 0 &&
      longitudec != 0
    ) {
      var realDateandTime = moment().format();
      setRealDateTime(realDateandTime);

      var date = moment().utcOffset('+05:00').format(' hh:mm:ss a');
      setTime(date);

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setCurrentDate(date + '/' + month + '/' + year);
      console.log('disabled');
      setDisable1(false);
    }
  }, [isFocused]);
  const video = () => {
    console.log('video Fun');
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
    console.log(1111111111111111111111111111);
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        // setLoaded(true);
        console.log('User earnedk reward of ', type);
        rewarded.show();
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  };

  // if all text field data put then Post a Crime button disabled and get current time  and date
  useEffect(() => {
    if (
      selectedValue !== 'Type of Crime' &&
      details.length > 1 &&
      latitudec != 0 &&
      longitudec != 0
    ) {
      var realDateandTime = moment().format();
      setRealDateTime(realDateandTime);

      var date = moment().utcOffset('+05:00').format(' hh:mm:ss a');
      setTime(date);

      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      setCurrentDate(date + '/' + month + '/' + year);
      console.log('disabled');
      setDisable1(false);
    }
  }, [selectedValue, details, otherDetails, latitudec, longitudec]);

  const getTimeStamp = () => {
    let date = new Date();
    return date.getTime();
  };

  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }
  const post = () => {
    if (
      selectedValue !== 'Type of Crime' &&
      details !== '' &&
      latitudec !== 0
    ) {
      let other = '';
      if (otherDetails.length > 1) {
        other = otherDetails;
      } else {
        other = selectedValue;
      }
      id = 'crimeid_' + getTimeStamp();

      firestore()
        .collection('crime')
        .doc(id)
        .set({
          editby: user.email,
          userId: ['xyz@gmail.com', 'xyz1@gmail.com'],
          id,
          type: other,
          upVote: 0,
          downVote: 0,
          latitude: latitudec,
          longitude: longitudec,
          details,
          currDate: currentDate,
          currTime: currentTime,
          realDateTime,
          check: true,
          googlePlacesAutocompleteAddreess: address,
        })
        .then(async () => {
          var owner = [];
          var currUserData = [];
          var user = auth().currentUser;
          firestore()
            .collection('users')
            .doc(user.email)
            .get()
            .then(resp => {
              console.log('i am here in resp22====>', resp._exists);
              if (resp._exists) {
                currUserData = resp._data;
                console.log('====================================');
                console.log('data', resp._data);
                console.log('====================================');
                firestore()
                  .collection('users')
                  // .where('editby', '==', user.email)
                  .get()
                  .then(querySnapshot => {
                    if (querySnapshot.empty) {
                      console.log('no documents found cc');
                    } else {
                      let temp = [];
                      querySnapshot.forEach(doc => {
                        let data = doc._data;
                        temp.push(data);
                      });

                      temp.forEach(check => {
                        if (currUserData.city == check.city) {
                          owner.push(check.tokens[check.tokens.length - 1]);
                        }
                      });
                      console.log(owner, ' owner ');
                      let options = {
                        tokens: owner,
                        // tokens: ["devicetoken1","devicetoken2"]
                      };
                      fetch(
                        `https://us-central1-brother-skeepers.cloudfunctions.net/sendPush?dest=${JSON.stringify(
                          options,
                        )}`,
                      );
                    }
                  });
              }
            });
          console.log('User added!');
          toastPrompt('Crime is Added');
          setSelectedValue('Type of Crime');
          setDetails('');
          setOtherDetails('');
          setAddress('');
          setlatitudec(0);
          setlongitudec(0);
          setDisable1(true);
          setTime('');
          setLoading(false);
          setCurrentDate('');
          setTimeout(() => {
            video();
          }, 5000);
        });
    } else {
      setDisable1(true);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          backgroundColor: '#17bba9',
          width: '100%',
          height: '7%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingLeft: '4%'}}>
          <AntDesign name="arrowleft" size={25} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            fontSize: 22,
          }}>
          Report a Crime
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('info2')}
          style={{paddingRight: '4%'}}>
          <Image style={styles.userAvatar} source={UserAvatar} />
        </TouchableOpacity>
      </View>
      {/* DropDownList or picker in this View */}
      <View style={styles.main_container}>
        <Picker
          selectedValue={selectedValue}
          dropdownIconColor={'black'}
          style={{color: 'black'}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
          }}>
          <Picker.Item
            label="Type of Crime"
            value="0"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Vandalism"
            value="Vandalism"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Theft/Larceny"
            value="Theft/Larceny"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Armed Robbery"
            value="Armed Robbery"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Forcible Rape"
            value="Forcible Rape"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />

          <Picker.Item
            label="Murder"
            value="Murder"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Motor Vehicle Theft"
            value="Motor Vehicle Theft"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Burglary"
            value="Burglary"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Abduction"
            value="Abduction"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Cult Violence"
            value="Cult Violence"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Accident/Road Block"
            value="Accident/Road Block"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Other"
            value="Other"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
        </Picker>
      </View>
      {/* if user select other then input Field show */}
      {selectedValue === 'Other' ? (
        <View style={styles.main_container3}>
          <View style={{}}>
            <TextInput
              style={{
                paddingHorizontal: wp('4.8%'),
                fontSize: 16,
                color: 'black',
              }}
              placeholder="Enter Crime"
              placeholderTextColor={'grey'}
              onChangeText={e => setOtherDetails(e)}
            />
          </View>
        </View>
      ) : null}
      {/* Location  input Field  */}
      <View style={styles.main_container3}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: wp('3.25'),
            flexGrow: 1,
          }}>
          <GooglePlacesAutocomplete
            placeholder={'search city here'}
            numberOfLines={3}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('deta', data.description);
              setAddress(data.description);
              Geocoder.from(data.description)
                .then(json => {
                  var location = json.results[0].geometry.location;

                  setlatitudec(location.lat);
                  setlongitudec(location.lng);
                })
                .catch(error => console.warn(error));
            }}
            query={{
              key: 'AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M',
              // key: 'YOUR API KEY',
              language: 'en',
            }}
            textInputProps={{
              onChangeText: text => {
                setAddress(text);
              },
              value: address,
            }}
            getDefaultValue={() => {
              // text input default value
              return address;
            }}
            styles={{
              row: {
                backgroundColor: '#17bba9',
              },

              textInput: {
                color: 'black',
                fontSize: 16,
                backgroundColor: 'white',
                width: wp(60),
                height: 60,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              },

              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />

          <TouchableOpacity
            onPress={() => {
              Geolocation1.getCurrentPosition(
                position => {
                  console.log('get current Location');

                  // getAddress(position)

                  Geocoder.from(
                    position.coords.latitude,
                    position.coords.longitude,
                  )
                    .then(
                      json => {
                        setlatitudec(position.coords.latitude);
                        setlongitudec(position.coords.longitude);
                        var addressComponent =
                          json.results[2].formatted_address;
                        setAddress(addressComponent);
                      },
                      error => {
                        if (
                          error.message === 'No location provider available.'
                        ) {
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
                // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
              );
            }}>
            <Octicons name={'location'} size={22} color="#17bba9" />
          </TouchableOpacity>
        </View>
      </View>
      {/* if user select other  then  Detail View size small otherwise size large*/}
      {selectedValue === 'Other' ? (
        <View style={styles.main_container4}>
          <Textarea
            style={{
              paddingHorizontal: wp('4.8%'),
              fontSize: 16,
              color: 'black',
            }}
            onChangeText={e => setDetails(e)}
            value={details}
            placeholder={'Enter Detail'}
            placeholderTextColor={'#c7c7c7'}
          />
        </View>
      ) : (
        <View style={styles.main_container2}>
          <View style={{}}>
            <Textarea
              style={{
                paddingHorizontal: wp('4.8%'),
                fontSize: 16,
                color: 'black',
              }}
              value={details}
              onChangeText={e => setDetails(e)}
              placeholder={'Enter Detail'}
              placeholderTextColor={'#c7c7c7'}
            />
          </View>
        </View>
      )}
      {/* post a crime button code */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: hp(9),
        }}>
        <TouchableOpacity
          disabled={disable1}
          onPress={() => {
            setLoading(true);
            post();
          }}
          style={{marginHorizontal: wp(4.96)}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#17bba9',
              width: 328,
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              borderRadius: 10,
              // paddingHorizontal:'2%'
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
                Post a Crime
              </Text>
            )}
            {/* {loading1 && <ActivityIndicator size={'small'} color={'white'} />} */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: hp(2),
            backgroundColor: 'transparent',
            alignSelf: 'center',
          }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
