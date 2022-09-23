
import { StyleSheet } from 'react-native'
import { palette } from './colors'
import fontFamily from './fontFamily'
import { HP, WP } from './screen-ratio'

export const ForgotStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:WP(5),
        paddingVertical:HP(3),
        
        // backgroundColor:palette.lighterGrey
    },
    cardView:{
        backgroundColor:palette.white,
        paddingHorizontal:WP(8),
        paddingVertical:HP(6),
        borderTopRightRadius:WP(10),
        borderBottomLeftRadius:WP(10),
    },
    
    proceedTxt:{
        alignSelf:'center',
        // fontFamily:fontFamily.mont_ExtraBold,
        fontSize:18,
        color:palette.lightgreen,
        letterSpacing:4,
    },
    emailInp:{
        borderWidth:1,
        borderColor:palette.grayLight,
        padding:WP(5),
        width:WP(80),
        borderRadius:WP(2.5),
       // fontFamily:fontFamily.mont_Medium,
        marginTop: HP(3),
        color:'black'
    },
    touchLogin:{
        alignSelf:'center',
      //  backgroundColor:palette.lightgreen,
        marginTop:HP(3),
        borderRadius:WP(10)
    },
    loginTxt:{
        color:palette.white,
        paddingHorizontal:WP(22),
        paddingVertical:HP(1),
      //  fontFamily:fontFamily.mont_Bold,
        fontSize:18,
    },
})