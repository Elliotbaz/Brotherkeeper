import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from '../pages/main/main';
import { Icon } from 'native-base';
//@ts-ignore
import MessagesIcon from '../Assets/Svgs/MessagesIcon.svg'
//@ts-ignore
import HomeIcon from '../Assets/Svgs/HomeIcon.svg'
//@ts-ignore
import MedicalRecordIcon from '../Assets/Svgs/MedicalRecordIcon.svg'

import { hp, wp } from '../Global/Styles/Scalling';

const Tab = createBottomTabNavigator();
const Tabs = function () {
    return <Tab.Navigator
        tabBarOptions={{
            iconStyle: { color: "rgb(17,129,176)" },
            activeTintColor: 'rgb(17,129,176)',
        }}
    >
        <Tab.Screen name="Home"
            options={{

                tabBarIcon: ({ color }) => (
                    <HomeIcon style={{ height: hp(50), width: wp(50), color: color }} />
                    // <Icon name="home-outline" style={{ fontSize: 20, color: color }} />
                ),
            }}
            component={MainPage} />
        <Tab.Screen name="Messages"

            options={{
                tabBarIcon: ({ color }) => (
                    <MessagesIcon style={{ height: hp(50), width: wp(50), marginTop: hp(11.4), marginLeft: wp(10), color: color }} />
                    // <Icon name="chatbox-ellipses-outline" style={{ fontSize: 20, color: color }} />
                ),
            }}
            component={MainPage} />
        <Tab.Screen

            options={{
                // tabBarLabel: 'Updates',

                tabBarIcon: ({ color }) => (
                    <MedicalRecordIcon style={{ height: hp(50), width: wp(50), color: color }} />
                    // <Icon name="settings-outline" style={{ fontSize: 20, color: color }} />
                ),
            }}
            name="Medical Records" component={MainPage} />
    </Tab.Navigator>
}


export default Tabs