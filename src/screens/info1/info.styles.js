import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: { flex: 1 ,backgroundColor:'white'},
    textWrapper: {
      height: hp('70%'), // 70% of height device screen
      width: wp('80%'),   // 80% of width device screen
      
    },
    myText: {
      paddingTop:hp('5%'),
      paddingBottom:hp('5%'),
      fontSize: hp('10%') ,// End result looks like the provided UI mockup
      color:'#17bba9'
    },
     
    txtStyle: {
      marginVertical: hp('5%'),

      fontWeight: 'bold',
      color:'#17bba9',
      
  },
  avatarContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
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
  