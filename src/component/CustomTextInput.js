import React from 'react';
import { View, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";


import { widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const CustomInputText = ({ setOnChangeText, secureTextEntry, placeholder, iconName }) => {

    return (
        <View style={styles.container}>

            {placeholder === 'Phone Number' || placeholder === 'Password' || placeholder === 'Street 12, Downtown, LA ' ?
                <View style={{ backgroundColor: '#17bba9', borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>

                    <MaterialCommunityIcons name={iconName} size={20} color='white' />
                </View>
                :
                [placeholder === 'Name' ?
                    <View style={{ backgroundColor: '#17bba9', borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>

                        <MaterialIcons name={iconName} size={20} color='white' />
                    </View>
                    :
                    null
                ]

            }
            {placeholder === 'English' ?
                <View style={{ backgroundColor: '#17bba9', borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
                    <Ionicons name={iconName} size={20} color='white' />
                </View>
                :
                [placeholder === 'Email' ?
                <View style={{ backgroundColor: '#17bba9', borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>

                    <AntDesign name={iconName} size={20} color='white' />
                </View>
                :
                null
            ]
            }


            <TextInput onChangeText={(t) => setOnChangeText(t)} secureTextEntry={secureTextEntry} placeholder={placeholder} style={{ width: '100%', color: 'black', fontSize: 14, paddingLeft: wp("5%"), }} />
        </View>
    );
};
export default CustomInputText;
const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        // backgroundColor: '#273751',
        // borderRadius: 20,
       
        // margin:10,
        height: heightPercentageToDP(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 11,
        borderRadius: 10,
        // borderWidth: 1,
      

    }
});