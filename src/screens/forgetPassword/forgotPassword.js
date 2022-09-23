import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {palette} from './colors';
import fontFamily from './fontFamily';
import {ForgotStyles as Styles} from './forgot-style';
import {HP, WP} from './screen-ratio';

const ForgotPassword = props => {
  const [email, setEmail] = useState('');
  const [load, setLoad] = useState(false);
  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }
  const resetPass = () => {
    if (email.trim() != '') {
      let reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (reg.test(email)) {
        auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            console.log('Success');
            toastPrompt(
              'Email Sent!' +
                '\n' +
                'Click on recieved email for further process.',
            );
            props.navigation.navigate('Login');
          })
          .catch(error => {
            setLoad(false);
            if (error.code == 'auth/user-not-found')
              toastPrompt('User not Found');
            // console.error(error);
            // alert(error)
          });
      } else {
        toastPrompt('Invalid Email');
        setLoad(false);
      }
    } else {
      toastPrompt('Email Required');
      setLoad(false);
    }
  };
  return (
    <SafeAreaView style={Styles.container}>
      <Text
        style={{
          alignSelf: 'center',
          // fontFamily: fontFamily.mont_SemiBold,
          color: palette.lightgreen,
          fontSize: 26,
          letterSpacing: 3,
        }}>
        Forgot Screen
      </Text>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{position: 'absolute', left: WP(2), top: HP(5)}}>
        {/* <Ionicons
                name={'arrow-back-circle-outline'}
                size={50}
                color='#17bba9'
              /> */}
        <AntDesign
          name="arrowleft"
          // onPress={() => navigation.navigate('info')}
          size={40}
          color="#17bba9"
        />
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View style={Styles.cardView}>
          <Text style={Styles.proceedTxt}>RESET PASSWORD</Text>
          <Text
            style={{
              //fontFamily: fontFamily.light,
              fontSize: 11,
              textAlign: 'center',
              color: palette.lightgreen,
              paddingHorizontal: WP(8),
            }}>
            Enter Your Email and click reset, then you will recieve email link
            on your entered email address
          </Text>
          <TextInput
            keyboardType={'email-address'}
            onChangeText={e => setEmail(e)}
            placeholder={'Email'}
            style={{...Styles.emailInp, marginTop: HP(4)}}
          />
          <TouchableOpacity
            onPress={() => {
              setLoad(true);
              resetPass();
            }}
            style={Styles.touchLogin}>
            {load ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <Text style={Styles.loginTxt}>Reset</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ForgotPassword;
