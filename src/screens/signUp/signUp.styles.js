import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: { flex: 1 },
    textWrapper: {
      height: hp(70), // 70% of height device screen
      width: wp(80)   // 80% of width device screen
    },
    myText: {
      paddingTop:hp(5),
      paddingBottom:hp(5),
      fontSize: hp(10) ,// End result looks like the provided UI mockup
      color:'#17bba9'
    },
    txtStyle: {
      marginVertical: hp(5),

      // fontWeight: 'bold',
      fontSize:16,
      color:'#17bba9',
      
  },
  txtStyle1: {
    // marginVertical: hp('5%'),
    paddingBottom:10,

    // fontWeight: 'bold',
    //  alignItems:'baseline',
    //  textAlign:"left",
   
    //  justifyContent:'space-between',
    // marginLeft:"auto",
    //  flexDirection:'row-reverse',
    paddingRight:10,
    color:'#17bba9',
    
},

  });
  