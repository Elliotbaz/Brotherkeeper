import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import styles from './FingerprintPopup.component.styles';
import ShakingText from './ShakingText.component';
// import LoactionDashboard from '../LoactionDashBoard/LoactionDashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

class BiometricPopup extends Component {
  constructor(props) {
    const user =""
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined
    };

    this.description = null;
  }
  
  componentDidMount() {

    (async () => {
      const userData = await AsyncStorage.getItem('uName1');
      console.log("LoactionDashboard userData",userData)
      setTimeout(() => {
        if (userData) {
         this.user=userData
        }
        else{
          user=auth().currentUser;
        }
      }, 1000);
    })();

    if (this.requiresLegacyAuthentication()) {
      console.log("requiresLegacyAuthentication");
      this.authLegacy();
    } else {
      this.authCurrent();
    }
  }
// ya call nie hota hy
  componentWillUnmount = () => {
    console.log("willunmount1");
    FingerprintScanner.release();
  }
// es ka koi taluq nie hy
  requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }

  authCurrent() {
    console.log("authCurrent");
    FingerprintScanner
      .authenticate({ description: this.props.description || 'Log in with Biometrics' })
      .then(() => {
        // const { navigate } = this.props;

        // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');

        // Alert.alert('Fingerprint Authentication', 'Authenticated successfully',[
        //   {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        //   },
        //   {text: 'Yes', onPress: () =>this.props.navigation.navigate('MyTabs') },
        // ]
        // );

        this.props.handlePopupDismissed();
        AsyncStorage.setItem('uName', this.user)
        this.props.navigation.navigate('MyTabs');
        // this.naviFunction()
      })
      .catch((error) => {
        console.log('Fingerprint Authentication', error.message)
        this.props.handlePopupDismissed();
        // FingerprintScanner.release();
        // this.props.navigation.navigate('Login');    
        // Alert.alert('Fingerprint Authentication', error.message);
      });
  }
// ya call nie hota hy
  authLegacy() {
    console.log("authLegacy");
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttemptedLegacy })
      .then(() => {
        // handleFingerprintDismissed
        this.props.handlePopupDismissedLegacy();
         Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        // Alert.alert('Fingerprint Authentication', 'Authenticated successfully',[
        //   {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        //   },
        //   {text: 'Yes', onPress: () =>this.props.navigation.navigate('MyTabs') },
        // ]
        
        
        // );
        // this.props.navigation.navigate('MyTabs');
        // this.naviFunction()
      })
      .catch((error) => {
        console.log("aaaa")
        this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
        this.description.shake();
      });
  }
// ya call nie hota hy
  handleAuthenticationAttemptedLegacy = (error) => {
    console.log("error",error);
    this.setState({ errorMessageLegacy: error.message });
    this.description.shake();
  };
// ya call nie hota hy
  renderLegacy() {
    const { errorMessageLegacy, biometricLegacy } = this.state;
    const { style, handlePopupDismissedLegacy } = this.props;
  
    console.log("props1", handlePopupDismissedLegacy)


    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>

          <Image
            style={styles.logo}
            source={require('./fingerprint.png')}
          />

          <Text style={styles.heading}>
            Biometric{'\n'}Authentication
          </Text>
          <ShakingText
            ref={(instance) => { this.description = instance; }}
            style={styles.description(!!errorMessageLegacy)}>
            {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissedLegacy}
          >
            <Text style={styles.buttonText}>
              BACK TO MAIN
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }


  render = () => {
   {console.log("render");}
    if (this.requiresLegacyAuthentication()) {
      return this.renderLegacy();
    }

    // current API UI provided by native BiometricPrompt
    return null;
  }
}


BiometricPopup.propTypes = {
  description: PropTypes.string,
  handlePopupDismissedLegacy: PropTypes.func.isRequired,
  // handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
  
};

export default BiometricPopup;



// const BiometricPopup =()=>{

//   var [biometricLegacy, setBiometricLegacy] = useState(undefined)
//   var [errorMessageLegacy, setErrorMessageLegacy] = useState(undefined)
//   // var [description, setdescription] = useState("")
//   var description=null
  

//   useEffect(() => {
//     if (requiresLegacyAuthentication()) {
//       authLegacy();
//     } else {
//       authCurrent();
//     }
    
//   }, [])

//   useEffect(() => {
//     return () => {
//       // Anything in here is fired on component unmount.
//       FingerprintScanner.release();
//   }
    
//   }, [])

//  const requiresLegacyAuthentication=()=> {
//     return Platform.Version < 23;
//   }

//  const authCurrent =()=> {
//     FingerprintScanner
//       .authenticate({ description: description || 'Log in with Biometrics' })
//       .then(() => {
//         // const { navigate } = this.props;
//         Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
//         // Alert.alert('Fingerprint Authentication', 'Authenticated successfully',[
//         //   {
//         //     text: 'Cancel',
//         //     onPress: () => console.log('Cancel Pressed'),
//         //     style: 'cancel',
//         //   },
//         //   {text: 'Yes', onPress: () =>this.props.navigation.navigate('MyTabs') },
//         // ]
//         // );
//         console.log("1111aaaavvv")
        
//         // this.props.navigation.navigate('MyTabs');
//         // this.naviFunction()
//       })
//       .catch((error) => {
//         console.log("aaaavvv")
//         Alert.alert('Fingerprint Authentication', error.message);
//       });
//   }

//   const authLegacy=()=> {
//     FingerprintScanner
//       .authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
//       .then(() => {

//         // handleFingerprintDismissed
        
//         // handlePopupDismissedLegacy();
//          Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
//         // Alert.alert('Fingerprint Authentication', 'Authenticated successfully',[
//         //   {
//         //     text: 'Cancel',
//         //     onPress: () => console.log('Cancel Pressed'),
//         //     style: 'cancel',
//         //   },
//         //   {text: 'Yes', onPress: () =>this.props.navigation.navigate('MyTabs') },
//         // ]
        
        
//         // );
//         // this.props.navigation.navigate('MyTabs');
//         // this.naviFunction()
//       })
//       .catch((error) => {
//         console.log("aaaa")
//         // this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
//         setBiometricLegacy(error.biometric )
//         setErrorMessageLegacy(error.message)
//         // description.shake();
//       });
//   }

//  const naviFunction=()=> {
//     render = () => {

//       return (
//         // <LoactionDashboard/>
//         // this.props.navigation.navigate('MyTabs')
//         <View>
//           <Button
//           title='abc'
//           onPress={ ()=> this.props.navigation.navigate('MyTabs')}
//           />
//         </View>

//       )
//     }

//   }

//  const handleAuthenticationAttemptedLegacy = (error) => {
//     // this.setState({ errorMessageLegacy: error.message });
//     setErrorMessageLegacy(error.message)

//     // this.description.shake();
//   };


//   // console.log("props1", handlePopupDismissedLegacy)


//     return (
//       <View style={styles.container}>
//         <View style={styles.contentContainer}>

//           <Image
//             style={styles.logo}
//             source={require('./fingerprint.png')}
//           />

//           <Text style={styles.heading}>
//             Biometric{'\n'}Authentication
//           </Text>
//           <ShakingText
//             ref={(instance) => { description = instance; }}
//             style={styles.description(!!errorMessageLegacy)}>
//             {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
//           </ShakingText>

//           <TouchableOpacity
//             style={styles.buttonContainer}
//             // onPress={handlePopupDismissedLegacy}
//           >
//             <Text style={styles.buttonText}>
//               BACK TO MAIN
//             </Text>
//           </TouchableOpacity>

//         </View>
//       </View>
//     );



// }

// export default BiometricPopup;