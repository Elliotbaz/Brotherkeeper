import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserAvatar4a4 from '../../Assets/Svgs/Info/Group54.svg';
import UserAvatar2a2 from '../../Assets/Svgs/Info/Group55.svg';
import UserAvatar3a3 from '../../Assets/Svgs/Info/Group58.svg';
import UserAvatar1a1 from '../../Assets/Svgs/Info/Group66.svg';
import UserAvatara from '../../Assets/Svgs/Info/GroupA57.svg';
import {styles} from './info.styles';
import logo from '../../Assets/Images/logo.png';
export const info = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingLeft: '3%'}}>
          <AntDesign name="arrowleft" size={30} color="#17bba9" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#17bba9',
            fontSize: 25,
            fontWeight: 'bold',
            paddingLeft: '32%',
            fontSize: 25,
          }}>
          Keys
        </Text>
      </View>

      {/* Simple Text */}
      <View style={{margin: '1%', paddingVertical: 10}}>
        <View style={{margin: '1%', flexDirection: 'row'}}>
          <UserAvatara
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              alignContent: 'center',
              justifyContent: 'center',
              elevation: 5,
              shadowColor: '#707070',
            }}
            height={50}
            width={50}
          />
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              paddingTop: 10,
              paddingLeft: 15,
              fontSize: 16,
              color: 'black',
            }}>
            Confirm the crime report is real
          </Text>
        </View>
        <View style={{margin: '1%', flexDirection: 'row'}}>
          <UserAvatar1a1
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              alignContent: 'center',
              justifyContent: 'center',
              elevation: 5,
              shadowColor: '#707070',
            }}
            height={50}
            width={50}
            fill={'red'}
          />
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              paddingTop: 10,
              paddingLeft: 15,
              fontSize: 16,
              color: 'black',
            }}>
            Confirm the crime report is fake
          </Text>
        </View>
        <View style={{margin: '1%', flexDirection: 'row'}}>
          <UserAvatar2a2
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              alignContent: 'center',
              justifyContent: 'center',
              elevation: 5,
              shadowColor: '#707070',
            }}
            height={50}
            width={50}
            fill={'red'}
          />
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              paddingTop: 10,
              paddingLeft: 15,
              fontSize: 16,
              color: 'black',
            }}>
            location of the crime scene
          </Text>
        </View>
        <View style={{margin: '1%', flexDirection: 'row'}}>
          <UserAvatar3a3
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              alignContent: 'center',
              justifyContent: 'center',
              elevation: 5,
              shadowColor: '#707070',
            }}
            height={50}
            width={50}
            fill={'red'}
          />
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              paddingTop: 5,
              paddingLeft: 15,
              fontSize: 16,
              color: 'black',
            }}>
            How long ago the crime was {'\n'}
            posted
          </Text>
        </View>
        <View style={{margin: '1%', flexDirection: 'row'}}>
          <UserAvatar4a4
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              alignContent: 'center',
              justifyContent: 'center',
              elevation: 5,
              shadowColor: '#707070',
            }}
            height={50}
            width={50}
            // borderRadius={50}
            fill={'red'}
          />
          <Text
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              paddingTop: 10,
              paddingLeft: 15,
              fontSize: 16,
              color: 'black',
            }}>
            Report a Crime
          </Text>
        </View>
      </View>
      {/* logo  */}
      <View style={{marginTop: '8%'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 50,
            }}
            source={logo}
          />
        </View>
        {/* simple Text */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2%',
          }}>
          <Text style={{color: '#17bba9', fontSize: 22, fontWeight: 'bold'}}>
            *Be your Brothers Keeper
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
