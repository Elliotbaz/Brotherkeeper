import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {flex: 1},
  textWrapper: {
    height: hp(70), // 70% of height device screen
    width: wp(80), // 80% of width device screen
  },
  myText: {
    paddingTop: hp(5),
    paddingBottom: hp(5),
    fontSize: hp(5), // End result looks like the provided UI mockup
    color: '#17bba9',
  },
  txtStyle: {
    marginVertical: hp(5),

    fontWeight: 'bold',
    color: '#17bba9',
  },
  avatarContainer: {
    // marginBottom: 10,

    alignItems: 'center',
    justifyContent: 'center',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(18),
    borderBottomWidth: 0.3,
    borderColor: 'grey',
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  userAvatar1: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  avatarEditBtn: {
    bottom: 0,
    right: -8,
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#CECECE',
    backgroundColor: '#17bba9',
    justifyContent: 'center',

    marginRight: 20,
  },
  txtStyle1: {
    // marginVertical: hp('5%'),
    // paddingBottom:"5%",

    // fontWeight: 'bold',
    //  alignItems:'baseline',
    //  textAlign:"left",

    //  justifyContent:'space-between',
    // marginLeft:"auto",
    //  flexDirection:'row-reverse',

    // color:'#17bba9',
    color: 'white',
    marginRight: 15,
  },
});
