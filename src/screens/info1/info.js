import React from 'react';
import {Image, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserAvatar2a2 from '../../Assets/Svgs/Info1/Group551a.svg';
import UserAvatar3a3 from '../../Assets/Svgs/Info1/Group581a.svg';
import UserAvatar1a1 from '../../Assets/Svgs/Info1/Group661a.svg';
import UserAvatara from '../../Assets/Svgs/Info1/GroupA57a.svg';
import {styles} from './info.styles';
import logo from '../../Assets/Images/logo.png';

export const info1 = ({navigation}) => {
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
          Red color means activity happens{'\n'}recently or less than 2 hours
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
          Yellow color means crime activity{'\n'}happens 2 hrs. ago or more
        </Text>
      </View>
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
            Allow you to vote that the crime{'\n'}alert can be verified.
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
            Use to vote a crime that never{'\n'}happened
          </Text>
        </View>
      </View>
      {/* logo  */}
      <View style={{marginTop: '20%'}}>
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

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#17bba9', fontSize: 22, fontWeight: 'bold'}}>
            *Be your Brothers Keeper
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
