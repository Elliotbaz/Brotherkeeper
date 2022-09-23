import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import History from '../pages/history/history';
import BottomTab from './BottomTab'
import PastVisit from '../pages/PastVisit/PastVisit'
import Notes from '../pages/Notes/Notes'
import AfterVisitSummary from '../pages/AfterVisitSummary/AfterVisitSummary'


const Stack = createStackNavigator();
const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} mode='modal'>
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="PastVisit" component={PastVisit} />
                <Stack.Screen name="Notes" component={Notes} />
                <Stack.Screen name="AfterVisitSummary" component={AfterVisitSummary} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default StackNavigation
