import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  launchCamera as LaunchImageCamera,
  launchImageLibrary as LaunchImageLibrary,
} from 'react-native-image-picker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserAvatar from '../../Assets/Images/DummyImage.jpeg';
import UserAvatar1 from '../../Assets/Images/locationSetting.png';
import {styles} from './setting.styles';

import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : 'ca-app-pub-6608580280604322/4961959123';
const adUnitId = 'ca-app-pub-6608580280604322/4961959123';
export const SettingsScreen = ({navigation}) => {
  const [getUserName, setUserName] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getPhoneNumber, setPhoneNumber] = useState('');
  const [getEng, setEng] = useState('');
  const [getLoc, setLoc] = useState('');
  const [city, setCite] = useState('');
  const [region, setRegion] = useState('');

  const [getImg, setImg] = useState('');
  const [disable1, setDisable1] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uriImage, seturiImage] = useState('');
  const [flag, setflag] = useState(false);
  const [flag1, setflag1] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getdata();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getImageRefFireBase = async () => {
    var user = auth().currentUser;
    const userDocument = await firestore()
      .collection('users')
      .doc(user.email)
      .get();
    if (userDocument._data?.image) {
      setImg(userDocument._data.image);
      seturiImage(userDocument._data.image);
      // setflag(true);
      setflag1(true);
    }
  };

  // after tab navigation get data
  useEffect(() => {
    getdata();
  }, [isFocused]);
  // all data get
  const getdata = async () => {
    var user = auth().currentUser;
    firestore()
      .collection('users')
      .doc(user.email)
      .get()
      .then(resp => {
        console.log('i am here in resp22====>', resp._exists);
        if (resp._exists) {
          let data = resp._data;
          console.log('i am here in resp====>', data);
          setUserName(data.name);
          setPhoneNumber(data.phone);
          setLoc(data.country);
          setCite(data.city);
          setRegion(data.region);
          setEng(data.eng);
          seturiImage(data.image);
          setImg(data.image);
        }
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    var user = auth().currentUser;
    getImageRefFireBase();
    // getUName();

    setEmail(user.email);
  }, []);

  // if all text field data put then Save button disabled
  useEffect(() => {
    console.log(getEmail, getUserName, getPhoneNumber, getEng);
    if (
      getUserName.length > 0 &&
      getPhoneNumber.length > 0 &&
      getEng.length > 0
      // getEng.length > 0 &&
      // uriImage.length > 0 &&
      // getImg.length > 0
    ) {
      console.log('disabled');
      setDisable1(false);
    }
  }, [getEng, getUserName, getPhoneNumber]);

  //save textField data in  firebase  In profile
  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }
  const uploadImage = async updatedImage => {
    const uploadUri = updatedImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      console.log(
        'transfered  is :',
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  var user = auth().currentUser;

  const uploadImageAndAllData = async () => {
    if (getEng.length === 0) {
      toastPrompt('enter some text in English field');
      setDisable1(true);
      setLoading(false);
      return;
    }
    if (getPhoneNumber.length === 0) {
      toastPrompt('enter some text in  phoneNumber field');
      setDisable1(true);
      setLoading(false);
      return;
    }
    if (getUserName.length === 0) {
      toastPrompt('enter some text in Name field');
      setDisable1(true);
      setLoading(false);
      return;
    }
    let image = '';
    var url1 = '';

    if (flag) {
      console.log('1');
      var url1 = await uploadImage(uriImage);
      console.log(url1);
      firestore()
        .collection('users')
        .doc(user.email)
        .update({
          name: getUserName,
          phone: getPhoneNumber,
          eng: getEng,
          loc: getLoc,
          image: url1,
        })
        .then(() => {
          console.log(user.email);
          toastPrompt('Data is Added');
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('sorry');
        });
    } else {
      // image = UserAvatar.substring(UserAvatar.lastIndexOf('/') + 1);
      console.log('2');
      firestore()
        .collection('users')
        .doc(user.email)
        .update({
          name: getUserName,
          phone: getPhoneNumber,
          eng: getEng,
          loc: getLoc,
          image: uriImage,
        })
        .then(() => {
          toastPrompt('Data is Added');
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.log('sorry');
        });
    }
  };

  const avatarOptions = {
    mediaType: 'photo',
    maxHeight: 100,
    maxWidth: 100,
    quality: 1,
  };

  const _handleChangeAvatarUsingCamera = async () => {
    console.log('11111');
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera & storage permission given');
      var options = {
        mediaType: 'photo', //to allow only photo to select ...no video
        saveToPhotos: true, //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
        includeBase64: false,
      };
      LaunchImageCamera(options, response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('response', response);
          const image =
            response.path ||
            response.uri ||
            (response.assets && response.assets[0].uri);
          console.log(image, 'image');

          // updateUserAvatar(image);
          seturiImage(image);
          setImg(image);
          setflag(true);
          setflag1(true);
        }
      });
    }
  };

  const _handleChangeAvatarUsingLibrary = () => {
    LaunchImageLibrary(avatarOptions, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        const image =
          response.path ||
          response.uri ||
          (response.assets && response.assets[0].uri);
        console.log(image);
        // updateUserAvatar(image);
        seturiImage(image);
        setImg(image);
        setflag(true);
        setflag1(true);
      }
    });
  };
  // show options
  const _handleChangeAvatar = () => {
    Alert.alert('Select option', '', [
      {
        text: 'Using Camera',
        onPress: _handleChangeAvatarUsingCamera,
      },
      {
        text: 'From Photos',
        onPress: _handleChangeAvatarUsingLibrary,
      },
      {
        text: 'Cancel',
        onPress: () => console.log('OK Pressed'),
        style: 'cancel',
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}>
        <View
          style={{
            backgroundColor: '#17bba9',
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(6.29),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
            Settings
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          {/* show image plus logo */}
          <View style={styles.avatarContainer}>
            <View>
              <Image
                style={styles.userAvatar}
                source={
                  // getImg?
                  //  {uri: getImg} : UserAvatar
                  flag1 ? {uri: getImg ? getImg : uriImage} : UserAvatar
                }
                resizeMode="cover"

                // source={UserAvatar}
              />
              <TouchableOpacity onPress={_handleChangeAvatar}>
                <View style={styles.avatarEditBtn}>
                  <MaterialCommunityIcons
                    name={'playlist-edit'}
                    size={25}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{alignSelf: 'flex-end', marginBottom: 20}}>
              {/* <Text style={styles.txtStyle1}>Edit Info</Text> */}
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: widthPercentageToDP(100),
              height: heightPercentageToDP(80),
            }}>
            {/* All Input Field in this View */}
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* Name input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'person-outline'}
                      size={18}
                      color="white"
                    />
                  </View>
                  <TextInput
                    placeholder={'Name'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setUserName(e)}
                    value={getUserName}
                  />
                </View>
              </View>
              {/* Email input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name={'mail'} size={18} color="white" />
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {getEmail}
                  </Text>
                </View>
              </View>
              {/* PHone Number input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name={'phone-outline'}
                      size={18}
                      color="white"
                    />
                  </View>
                  <TextInput
                    placeholder={'Phone Number'}
                    keyboardType={'phone-pad'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setPhoneNumber(e)}
                    value={getPhoneNumber}
                  />
                </View>
              </View>
              {/* English input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name={'language-outline'}
                      size={18}
                      color="white"
                    />
                  </View>
                  <TextInput
                    placeholder={'English'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    placeholderTextColor={'grey'}
                    onChangeText={e => setEng(e)}
                    value={getEng}
                  />
                </View>
              </View>
              {/* Location input Field */}
              {/* country */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <MaterialCommunityIcons  name={'map-marker-plus-outline'} size={18} color='white' /> */}
                    <Image style={styles.userAvatar1} source={UserAvatar1} />
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {getLoc ? getLoc : 'Country...'}
                  </Text>
                </View>
              </View>
              {/* Region */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <MaterialCommunityIcons  name={'map-marker-plus-outline'} size={18} color='white' /> */}
                    <Image style={styles.userAvatar1} source={UserAvatar1} />
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {region ? region : 'Region...'}
                  </Text>
                </View>
              </View>
              {/* city */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <MaterialCommunityIcons  name={'map-marker-plus-outline'} size={18} color='white' /> */}
                    <Image style={styles.userAvatar1} source={UserAvatar1} />
                  </View>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {city ? city : 'City...'}
                  </Text>
                </View>
              </View>
            </View>

            {/* save button code */}
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                uploadImageAndAllData();
              }}
              style={{
                marginTop: 10,
                marginLeft: widthPercentageToDP(4.96),
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: 40,
                backgroundColor: '#17bba9',
                padding: 5,
                borderRadius: 10,
              }}
              disabled={disable1}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{color: 'white', fontSize: 18}}>Save</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{marginBottom: heightPercentageToDP(13), alignSelf: 'center'}}>
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
};
