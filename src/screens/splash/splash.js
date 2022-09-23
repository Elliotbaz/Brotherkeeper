import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Animated, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Splash = ({navigation}) => {
  React.useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('uName');
      setTimeout(() => {
        if (!userData) {
          navigation.replace('Login');
        } else {
          navigation.replace('MyTabs');
        }
      }, 3000);
    })();
  }, []);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  // setTimeout(() => {
  //   navigation.navigate('Login');
  // }, 5000);
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#17bba9',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View // Special animatable View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              rotate: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}>
        <Image
          resizeMode="stretch"
          style={{height: 312, width: 508}}
          source={require('../../Assets/Images/logo.png')}
        />
      </Animated.View>
    </SafeAreaView>
  );
};
export default Splash;
