import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {flex: 1},
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%'), // 80% of width device screen
  },
  heading_container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  myText: {
    paddingTop: hp('5%'),
    paddingBottom: hp('5%'),
    fontSize: hp('10%'), // End result looks like the provided UI mockup
    color: '#17bba9',
  },
  txtStyle: {
    marginVertical: hp('5%'),

    fontWeight: 'bold',
    color: '#17bba9',
  },
  avatarContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  userAvatar1: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  main_container: {
    marginHorizontal: '3%',
    //  justifyContent:'center',
    // height:'10%',
    marginVertical: '2%',
  },
  main_container1: {
    marginHorizontal: '3%',
    // paddingVertical:wp(3),
    //  justifyContent:'center',
    //  height:'10%',
    marginVertical: '2%',
  },

  txt: {
    fontWeight: 'bold',
  },
  txt1: {
    fontSize: 18,
    // fontWeight: 'bold'
    color: 'black',
  },
  txt2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  avatarEditBtn: {
    bottom: 0,
    right: -8,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#CECECE',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});
