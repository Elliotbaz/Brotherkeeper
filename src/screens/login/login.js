import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './login.styles';
import logo from '../../Assets/Images/logo.png';

export const LoginScreen = ({navigation}) => {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', {language: 'en'});
  const [getUserName, setUserName] = useState('');
  const [getPassword, setPassword] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getPhoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable1, setDisable1] = useState(true);

  // if all text field data put then SignUp button disabled
  useEffect(() => {
    if (
      getEmail.length > 1 &&
      getPassword.length > 1 &&
      getUserName.length > 1 &&
      getPhoneNumber.length > 1
    ) {
      console.log('disabled');
      setDisable1(false);
    }
  }, [getEmail, getPassword, getUserName, getPhoneNumber]);

  // return current date
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
  };
  // simple toastprompt
  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }

  //save textField data in  firebase in users and then  show the Login Screen
  const signIn = async () => {
    var country = '';
    var city = '';
    var region = '';

    if (getEmail.trim() != '' && getPassword.trim() != '') {
      let reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (reg.test(getEmail)) {
        let email = getEmail.toLowerCase();

        auth()
          .createUserWithEmailAndPassword(email, getPassword)
          .then(() => {
            firestore().collection('users').doc(email).set({
              name: getUserName,
              email: email,
              phone: getPhoneNumber,
              // password: getPassword,
              createdDate: getCurrentDate(),
              eng: '',
              loc: '',
              image: '',
              isPrivacyAccepted: true,
              country,
              region,
              city,
              // firstTime:false,
              latitude: 0,
              longitude: 0,
            });

            setLoading(false);
            AsyncStorage.setItem('uName', email);
            AsyncStorage.setItem('uName1', email);
            AsyncStorage.setItem('firstTime', JSON.stringify(false));

            console.log('User account created & signed in!');

            navigation.navigate('MyTabs');
          })
          .catch(error => {
            setLoading(false);
            if (error.code === 'auth/email-already-in-use') {
              toastPrompt('That email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
              toastPrompt('That email address is invalid!');
            }

            // console.error(error);
            else if (error.code == 'auth/user-not-found')
              toastPrompt('User not Found');
            else if (error.code == 'auth/wrong-password')
              toastPrompt('Wrong Password');
            else if (error.code == 'auth/too-many-requests')
              toastPrompt('WAIT 1 min! Too Many Tries');
            else toastPrompt('email Password is invalid!');
          });
      } else {
        toastPrompt('Invalid Email');
        setLoading(false);
      }
    } else {
      toastPrompt('Email / Password Required');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <KeyboardAvoidingView behavior="position"> */}

      {/* this view show the log image  */}
      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(25),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 50,
          }}
          source={logo}
        />
      </View>
      {/* All other item show in this View */}
      <View
        style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Name Text Fields Show  */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 2,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                borderRadius: 10,
                backgroundColor: 'white',
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(8),
                paddingLeft: 20,
                margin: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#17bba9',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={'person-outline'}
                  size={20}
                  color="white"
                />
              </View>
              <TextInput
                onChangeText={e => setUserName(e)}
                placeholder={'Name'}
                placeholderTextColor={'grey'}
                style={{marginLeft: 20, fontSize: 16, color: 'black'}}
              />
            </View>
          </View>
          {/* Email Text Fields Show  */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 2,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                borderRadius: 10,
                backgroundColor: 'white',
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(8),
                paddingLeft: 20,
                margin: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#17bba9',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons name={'mail'} size={20} color="white" />
              </View>
              <TextInput
                placeholder={'Email'}
                keyboardType={'email-address'}
                style={{marginLeft: 20, fontSize: 16, color: 'black'}}
                onChangeText={e => setEmail(e)}
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
          {/* PhoneNumber Text Fields Show  */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 2,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                borderRadius: 10,
                backgroundColor: 'white',
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(8),
                paddingLeft: 20,
                margin: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#17bba9',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name={'phone-outline'}
                  size={20}
                  color="white"
                />
              </View>
              <TextInput
                placeholder={'Phone Number'}
                keyboardType={'phone-pad'}
                style={{marginLeft: 20, fontSize: 16, color: 'black'}}
                onChangeText={e => setPhoneNumber(e)}
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
          {/* Password Text Fields Show  */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                elevation: 2,
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                borderRadius: 10,
                backgroundColor: 'white',
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(8),
                paddingLeft: 20,
                margin: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#17bba9',
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name={'lock-outline'}
                  size={20}
                  color="white"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                placeholder={'Password'}
                style={{marginLeft: 20, fontSize: 16, color: 'black'}}
                onChangeText={e => setPassword(e)}
                placeholderTextColor={'grey'}
              />
            </View>
            {/* SignUp Button Show  */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: heightPercentageToDP(15),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  signIn();
                }}
                style={{
                  marginTop: 30,
                  borderRadius: 10,
                  width: widthPercentageToDP(90),
                  height: heightPercentageToDP(8),
                  backgroundColor: '#17bba9',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 10,
                  shadowOpacity: 1,
                  shadowOffset: 1,
                  shadowColor: 'black',
                  flexDirection: 'row',
                }}
                disabled={disable1}>
                {loading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  <Text
                    style={{color: '#FFFF', fontSize: 18, paddingRight: 10}}>
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>
              {/* <Image source={require('./fingerprint.png')} style={{ marginTop: 20, marginLeft: 10 }} /> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.txtStyle}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={
                  (styles.txtStyle, {fontWeight: 'bold', color: '#17bba9'})
                }>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};
