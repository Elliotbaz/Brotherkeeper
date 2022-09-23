import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  AppState,
  Dimensions,
  Image,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FingerprintPopup from '../../component/FingerprintPopup.component';
import logo from '../../Assets/Images/logo.png';
import {styles} from './signUp.styles';

const {width} = Dimensions.get('window');

export const SignUpScreen = ({navigation, route}) => {
  const [getEmail, setEmail] = useState('');
  const [getPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable1, setDisable1] = useState(true);
  var [errorMessage, setErrorMessage] = useState(undefined);
  var [popupShowed, setPopupShowed] = useState(false);
  var [biometric, setBiometric] = useState(undefined);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [checkStatus, setcheckStatus] = useState(false);

  // if all text field data put then login button disabled
  useEffect(() => {
    if (getEmail.length > 1 && getPassword.length > 1) {
      // console.log('disabled');
      setDisable1(false);
    }
  }, [getEmail, getPassword]);

  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }

  // FingerPrint userEmail for set
  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('uName1');
      console.log('SignUpScreen userData', userData);
      setTimeout(() => {
        if (userData) {
          setcheckStatus(true);
        }
      }, 1000);
    })();
  }, []);

  const handleFingerprintShowed = () => {
    console.log('handleFingerprintShowed');
    setPopupShowed(true);
  };
  const handleFingerprintDismissed = () => {
    console.log('handleFingerprintDismissed');
    setPopupShowed(false);
  };
  // AppState.removeEventListener('change', handleAppStateChange);
  useEffect(() => {
    // AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  // detectFingerPrintAvailable
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    // Get initial fingerprint enrolled
    detectFingerprintAvailable();
  }, []);

  // detectFingerPrintAvailable
  const detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable().catch(error => {
      setBiometric(error.biometric);
      setErrorMessage(error.message);
    });
  };
  // handleAppStateChange
  const handleAppStateChange = nextAppState => {
    console.log('nextAppState', nextAppState);
    if (
      appState &&
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      FingerprintScanner.release();
      detectFingerprintAvailable();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // this.setState({ appState: nextAppState });
  };

  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }
  //check textField from firebase and then  show the Location Screen
  const signIn = async () => {
    if (getEmail.trim() != '' && getPassword.trim() != '') {
      let reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (reg.test(getEmail)) {
        auth()
          .signInWithEmailAndPassword(getEmail, getPassword)
          .then(async () => {
            const userDetail = await firestore()
              .collection('users')
              .doc(getEmail)
              .get();
            AsyncStorage.setItem('uName', userDetail._data.email);
            AsyncStorage.setItem('uName1', userDetail._data.email);
            setLoading(false);
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
            else if (error.code == 'auth/user-not-found') {
              toastPrompt('User not Found');
            } else if (error.code == 'auth/wrong-password') {
              toastPrompt('Wrong Password');
            } else if (error.code == 'auth/too-many-requests') {
              toastPrompt('WAIT 1 min! Too Many Tries');
            } else {
              // toastPrompt(error.code)
              toastPrompt('email Password is invalid!');
            }
          });
      } else {
        toastPrompt('Invalid Email');
        console.log('7');
        setLoading(false);
      }
    } else {
      toastPrompt('Email / Password Required');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* this view show the log image  */}
      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(30),
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
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
              placeholderTextColor="grey"
              style={{marginLeft: 10, fontSize: 16, color: 'black',width:'100%'}}
              onChangeText={e => setEmail(e)}
            />
          </View>
        </View>
        {/* password Field show Text Fields Show  */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'white',
            marginTop: 20,
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
              placeholderTextColor="grey"
              style={{marginLeft: 10, fontSize: 16, color: 'black',width:'100%'}}
              onChangeText={e => setPassword(e)}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 10}}>
            <Text style={{color: '#17bba9', fontSize: 12, fontWeight: 'bold'}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'column',
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
                marginTop: 20,
                borderRadius: 10,
                width: widthPercentageToDP(72),
                height: heightPercentageToDP(8),
                backgroundColor: '#17bba9',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 18,
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
                <Text style={{color: '#FFFF', fontSize: 18, paddingRight: 10}}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              // style={{
              //   padding: 20,
              //   marginVertical: 30,
              // }}
              onPress={() => {
                if (checkStatus) {
                  handleFingerprintShowed();
                } else {
                  toastPrompt('First login then you can enable fingerprint');
                }
              }}
              disabled={!!errorMessage}>
              <Image
                source={require('./fingerprint.png')}
                style={{marginTop: 20, marginLeft: 10}}
              />
            </TouchableOpacity>

            {errorMessage && (
              <Text
                style={{
                  color: '#ea3d13',
                  fontSize: 16,
                  textAlign: 'center',
                  marginHorizontal: 10,
                  marginTop: 30,
                }}>
                {errorMessage} {biometric}
              </Text>
            )}
            {popupShowed && (
              <FingerprintPopup
                style={{width: width * 0.8}}
                handlePopupDismissed={() => handleFingerprintDismissed()}
                navigation={navigation}
              />
            )}
          </View>
        </View>
        {/* Login Button show and  */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: heightPercentageToDP(35),
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.txtStyle}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={(styles.txtStyle, {fontWeight: 'bold', color: '#17bba9'})}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};
