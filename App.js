import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, View} from 'react-native';

import DashBoard1 from './src/Assets/Svgs/Group148.svg';
import DashBoard from './src/Assets/Svgs/Group48.svg';
import Trending from './src/Assets/Svgs/Path51.svg';
import Trending1 from './src/Assets/Svgs/Path511.svg';
import Post from './src/Assets/Svgs/Path54.svg';
import Post1 from './src/Assets/Svgs/Path544.svg';
import Setting from './src/Assets/Svgs/Path58.svg';
import Setting1 from './src/Assets/Svgs/Path588.svg';
import Privacy1 from './src/Assets/Svgs/Path59.svg';
import Privacy from './src/Assets/Svgs/Path599.svg';

import ForgotPassword from './src/screens/forgetPassword/forgotPassword';
import {info} from './src/screens/info/info';
import LoactionDashboard from './src/screens/loactionDashBoard/loactionDashboard';
import {LoginScreen} from './src/screens/login/login';
import {PostCrime} from './src/screens/postCrime/postCrime';
import {PrivacyPolicy} from './src/screens/privacyPolicy/privacyPolicy';
import {ReportCrime} from './src/screens/reportCrime/reportCrime';
import {SettingsScreen} from './src/screens/settings/setting';
import BiometricPopup from './src/component/FingerprintPopup.component.android';
import {SignUpScreen} from './src/screens/signUp/signUp';
import Splash from './src/screens/splash/splash';
import {Trendings} from './src/screens/trending/trending';

import {info2} from './src/screens/info2/info2';
import {info1} from './src/screens/info1/info';

const Tab = createBottomTabNavigator();
const {Navigator, Screen} = createNativeStackNavigator();
// bottom Tab code
function MyTabs(focused) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',

          elevation: 0,
          height: 85,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#17bba9',
          borderTopColor: '#17bba9',
        },

        // inactiveBackgroundColor:'red',
      }}
      //@ts-ignore
      tabBarOptions={{
        //  inactiveBackgroundColor:'gray',

        // activeTintColor: Colors.black,
        activeTintColor: 'white',
        inactiveTintColor: '#707070',
        keyboardHidesTabBar: true,
        tabBarIcon: {focused: false, color: '#17bba9'},
      }}>
      <Tab.Screen
        name="Loaction"
        component={LoactionDashboard}
        options={{
          tabBarLabel: '',
          tabBarIcon: tintcolor => (
            // show svg and text
            <View
              style={{
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* if focused then codition true and this image show */}
              {tintcolor.focused ? (
                <Privacy fill={tintcolor.color} />
              ) : (
                <Privacy1 fill={tintcolor.color} />
              )}

              <Text
                style={{
                  color: tintcolor.focused ? 'white' : '#707070',
                  fontSize: 10,
                  marginTop: 4,
                }}>
                DashBoard
              </Text>
            </View>
          ),
        }}
        // listeners={({ navigation }) => ({
        //   blur: () => navigation.setParams({ screen: "Trendings"  }),
        // })}
      />

      <Tab.Screen
        name="Trendings"
        component={Trendings}
        options={{
          tabBarLabel: '',
          tabBarIcon: tintcolor => (
            <View
              style={{
                paddingTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {tintcolor.focused ? (
                <Setting1 fill={tintcolor.color} />
              ) : (
                <Setting fill={tintcolor.color} />
              )}

              <Text
                style={{
                  color: tintcolor.focused ? 'white' : '#707070',
                  fontSize: 10,
                  marginTop: 4,
                  paddingTop: 2,
                }}>
                Trendings
              </Text>
            </View>
          ),
        }}
        // listeners={({ navigation }) => ({
        //   blur: () => navigation.setParams({ screen: undefined }),
        // })}
      />

      <Tab.Screen
        name="PostCrime"
        component={PostCrime}
        options={{
          tabBarLabel: '',
          tabBarIcon: tintcolor => (
            <View
              style={{
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {tintcolor.focused ? (
                <DashBoard1 height={18} width={18} fill={tintcolor.color} />
              ) : (
                <DashBoard height={18} width={18} fill={tintcolor.color} />
              )}
              <Text
                style={{
                  color: tintcolor.focused ? 'white' : '#707070',
                  fontSize: 10,
                  marginTop: 4,
                }}>
                Post
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: tintcolor => (
            <View
              style={{
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {tintcolor.focused ? (
                <Trending1 height={18} width={18} fill={tintcolor.color} />
              ) : (
                <Trending height={18} width={18} fill={tintcolor.color} />
              )}

              <Text
                style={{
                  color: tintcolor.focused ? 'white' : '#707070',
                  fontSize: 10,
                  marginTop: 4,
                }}>
                Settings
              </Text>
            </View>
          ),
        }}
        // listeners={({ navigation }) => ({
        //   blur: () => navigation.setParams({ screen: undefined }),
        // })}
      />

      <Tab.Screen
        name="PrivacyPolicy1"
        component={PrivacyPolicy}
        options={{
          tabBarLabel: '',
          tabBarIcon: tintcolor => (
            <View
              style={{
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {tintcolor.focused ? (
                <Post1 height={18} width={18} fill={tintcolor.color} />
              ) : (
                <Post height={18} width={18} fill={tintcolor.color} />
              )}

              <Text
                style={{
                  color: tintcolor.focused ? 'white' : '#707070',
                  fontSize: 10,
                  marginTop: 4,
                }}>
                Privicy
              </Text>
            </View>
          ),
        }}
        // listeners={({ navigation }) => ({
        //   blur: () => navigation.setParams({ screen: undefined }),
        // })}
      />
    </Tab.Navigator>
  );
}
const App = () => {
  // React.useEffect( async() => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }, [])
  // const navigation = useNavigation()

  // useEffect(() => {
  //   return () => {
  //     navigation.setParams({ screen: undefined })
  //   }
  // }, [navigation])

  return (
    // Stack navigation Code
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen
          name="splash"
          component={Splash}
          options={{title: '', headerShown: false}}
        />
        <Screen
          name="Login"
          component={SignUpScreen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="Signup"
          component={LoginScreen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="BiometricPopup"
          component={BiometricPopup}
          options={{
            title: '',
            headerShown: false,
          }}
        />

        <Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="PrivacyPolicy1"
          component={PrivacyPolicy}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="PostCrime"
          component={PostCrime}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="info"
          component={info}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="info1"
          component={info1}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="info2"
          component={info2}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="Trendings"
          component={Trendings}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="ReportCrime"
          component={ReportCrime}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
export default App;
