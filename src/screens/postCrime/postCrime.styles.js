import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: { flex: 1 },
    textWrapper: {
      height: hp('70%'), // 70% of height device screen
      width: wp('80%')   // 80% of width device screen
    },
    heading_container:{
      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius:10,
      paddingHorizontal:10,
      paddingVertical:15,
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
    width: 25,
    height: 25,
    borderRadius: 50,
   
  },
  userAvatar1: {
    width: 60,
    height: 60,
    borderRadius: 50,
   
   
  },
  
    main_container:{


      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius:10,
      paddingHorizontal:5,
      // paddingVertical:15,
      //  marginHorizontal:'4%',
      marginLeft: wp('6.4%'),marginRight:wp('4.4%'),

      justifyContent:'center',
      // height:'10%',
       marginTop:wp('6%'),
       
      //  flex:1,
      // height: '10%', width: '98%'
      height:hp('9.75%'), width: wp('90%'),

    },
    main_container3:{


      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius:10,
      paddingHorizontal:5,
      // paddingVertical:15,
      //  marginHorizontal:'4%',
      // marginLeft: wp('5.4%'),marginRight:wp('6.4%'),
      marginLeft: wp('6.4%'),marginRight:wp('4.4%'),

       justifyContent:'center',
      // height:'10%',
       marginTop:wp('1.6%'),
       
      //  flex:1,
      // height: '10%', width: '98%'
      height:hp('9.75%'), width: wp('90%'),

    },
    main_container2:{

      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius:10,
      paddingHorizontal:5,
      // paddingVertical:15,
      //  marginHorizontal:'4%',
      // marginLeft: wp('5.4%'),marginRight:wp('6.4%'),
      marginLeft: wp('6.4%'),marginRight:wp('4.4%'),

        // justifyContent:'center',
      // height:'10%',
      marginVertical:wp('3%'),
       
      //  flex:1,
      // height: '10%', width: '98%'
      height:hp('36%'), width: wp('90%'),
      

   },
   main_container4:{

    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:10,
    paddingHorizontal:5,
    // paddingVertical:15,
    //  marginHorizontal:'4%',
    // marginLeft: wp('5.4%'),marginRight:wp('6.4%'),
    marginLeft: wp('6.4%'),marginRight:wp('4.4%'),

    //  justifyContent:'center',
    // height:'10%',
    marginVertical:wp('3%'),
     
    //  flex:1,
    // height: '10%', width: '98%'
    height:hp('26%'), width: wp('90%'),
    

 },
  
    txt:{
        fontWeight:'bold',
        color :'white'
    },
    txt1:{
      fontSize: 20,
      // fontWeight: 'bold'
      
  },
  txt2:{
    fontSize: 15,
    fontWeight: 'bold'
    
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
  