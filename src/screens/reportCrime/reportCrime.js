import moment from 'moment';
import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
// import UserAvatar1 from './Group55.png';
// import UserAvatar2 from './Group65.png';
// import UserAvatar3 from './Group66.png';
import {styles} from './reportCrime.styles';

export const ReportCrime = props => {
  console.log('navigation ', route?.params);
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}

      <View style={styles.main_container}>
        <View style={styles.heading_container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txt1}>
              {route?.params?.Information[route?.params?.SelectedIndex].type}
            </Text>

            {/* <Text style={styles.txt1}>Armed Robbery</Text> */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                paddingHorizontal: '20%',
                color: 'black',
              }}>
              {' '}
              {/* 2 mins ago {'\n'} */}
              {/* {moment(realDateTime).fromNow()} */}
              {moment(
                route?.params?.Information[route?.params?.SelectedIndex]
                  .realDateTime,
              ).fromNow()}
            </Text>
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              {/* <Image
                // style={styles.userAvatar}
                source={UserAvatar1}
              /> */}
              <Text style={styles.txt2}>
                {route?.params?.Information[route?.params?.SelectedIndex].type}{' '}
              </Text>
              {/* <Text style={styles.txt2}>Downtown Street 11, LA </Text> */}
            </View>
            <View
              style={{
                margin: '2%',
                shadowOpacity: 0.25,
                paddingHorizontal: 10,
                paddingVertical: 15,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}>
              <Text style={{fontSize: 14, color: 'black'}}>
                {
                  route?.params?.Information[route?.params?.SelectedIndex]
                    .details
                }
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View
                // onPress={() => navigation.navigate('Trendings')}
                style={{
                  backgroundColor: '#50FF1D',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 20,
                  width: 50,
                  flexDirection: 'row',
                  marginHorizontal: '1%',
                  paddingHorizontal: '1%',
                }}>
                {/* <Image
                  // style={styles.userAvatar}
                  source={UserAvatar2}
                  style={{ height: 20 }}
                /> */}
                <Text style={styles.txt}>
                  {
                    route?.params?.Information[route?.params?.SelectedIndex]
                      .upVote
                  }
                </Text>
                {/* <Text style={styles.txt}> 50</Text> */}
              </View>
              <View
                // onPress={() => navigation.navigate('Trendings')}
                style={{
                  backgroundColor: '#FF0000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 20,
                  width: 50,
                  flexDirection: 'row',
                  marginHorizontal: '1%',
                  paddingHorizontal: '1%',
                }}>
                {/* <Image
                  // style={styles.userAvatar}
                  source={UserAvatar3}
                  style={{ height: 20 }}
                /> */}
                <Text style={styles.txt}>
                  {
                    route?.params?.Information[route?.params?.SelectedIndex]
                      .downVote
                  }
                </Text>
                {/* <Text style={styles.txt}> 20</Text> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {Avatar, Button, Card} from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import styles from '../level2/styles';
// import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
// import {useDispatch, useSelector} from 'react-redux';
// import {action} from '../Store';
// import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';

// import {
//   RewardedAd,
//   RewardedAdEventType,
//   TestIds,
// } from '@react-native-firebase/admob';

// const adUnitId = _DEV_
//   ? TestIds.REWARDED
//   : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

// function AppB() {

//   // No advert ready to show yet
//   if (!loaded) {
//     return null;
//   }

//   return (
//     <Button
//       title="Show Rewarded Ad"
//       onPress={() => {
//         rewarded.show();
//       }}
//     />
//   );
// }
// const Level2 = props => {
//   const dispatch = useDispatch();
//   const state = useSelector(state => state);
//   const [level, setlevel] = useState(1);
//   const [level1to5, setlevel1to5] = useState(true);
//   const [level6to10, setlevel6to10] = useState(false);
//   const [level11to15, setlevel11to15] = useState(false);
//   const [level16to20, setlevel16to20] = useState(false);
//   const [lifestart, setlifestart] = useState(1);
//   const [number, setnumber] = useState([]);
//   const [showList, setshowList] = useState([{id: 0}, {id: 1}, {id: 2}]);
//   const [life1, setlife1] = useState(false);
//   const [life2, setlife2] = useState(false);
//   const [life3, setlife3] = useState(false);
//   const [rendernuber, setrendernuber] = useState([]);
//   let [count, setCount] = useState(1);
//   let [adcount, setAdCount] = useState(true);

//   const adUnitId = _DEV_
//     ? TestIds.BANNER
//     : 'ca-app-pub-4061452781467813/7000119789';
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     video();
//   }, []);
//   const video = () => {
//     admob()
//       .setRequestConfiguration({
//         // Update all future requests suitable for parental guidance
//         maxAdContentRating: MaxAdContentRating.PG,

//         // Indicates that you want your content treated as child-directed for purposes of COPPA.
//         tagForChildDirectedTreatment: true,

//         // Indicates that you want the ad request to be handled in a
//         // manner suitable for users under the age of consent.
//         tagForUnderAgeOfConsent: true,
//       })
//       .then(() => {
//         // Request config successfully set!
//       });
//     console.log(1111111111111111111111111111);
//     const eventListener = rewarded.onAdEvent((type, error, reward) => {
//       if (type === RewardedAdEventType.LOADED) {
//         setLoaded(true);
//         console.log('User earned reward of ', type);
//       }

//       if (type === RewardedAdEventType.EARNED_REWARD) {
//         console.log('User earned reward of ', reward);
//       }
//     });

//     // Start loading the rewarded ad straight away
//     rewarded.load();

//     // Unsubscribe from events on unmount
//     return () => {
//       eventListener();
//     };
//   };

//   useEffect(async () => {
//     start();
//     setTimeout(() => {
//       start2();
//     }, 1000);
//   }, []);
//   const start2 = () => {
//     if (level <= 4) {
//       const list = [];

//       for (var i = 1; i <= 3; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: false});
//       }
//       setnumber(list);
//     } else if (level <= 9) {
//       const list = [];

//       for (var i = 1; i <= 4; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: false});
//       }
//       setnumber(list);
//     } else if (level <= 14) {
//       const list = [];

//       for (var i = 1; i <= 5; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: false});
//       }
//       setnumber(list);
//     } else if (level <= 19) {
//       const list = [];

//       for (var i = 1; i <= 6; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: false});
//       }
//       setnumber(list);
//     }
//   };
//   const start = () => {
//     if (level <= 4) {
//       const list = [];

//       for (var i = 1; i <= 3; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: true});
//       }
//       setnumber(list);

//       var arr = [];
//       while (arr.length < 3) {
//         var RandomNumber1 = Math.floor(Math.random() * 3) + 0;
//         if (arr.indexOf(RandomNumber1) === -1) arr.push(RandomNumber1);
//       }
//       setrendernuber(arr);
//     } else if (level <= 9) {
//       const list = [];
//       if (level === 5) {
//         showList.push({id: 3});
//         setlevel1to5(false);
//         setlevel6to10(true);
//       }
//       for (var i = 1; i <= 4; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: true});
//       }
//       setnumber(list);

//       var arr = [];
//       while (arr.length < 4) {
//         var RandomNumber1 = Math.floor(Math.random() * 4) + 0;
//         if (arr.indexOf(RandomNumber1) === -1) arr.push(RandomNumber1);
//       }
//       setrendernuber(arr);
//     } else if (level <= 14) {
//       const list = [];
//       if (level === 10) {
//         showList.push({id: 4});
//         setlevel1to5(false);
//         setlevel6to10(false);
//         setlevel11to15(true);
//       }
//       for (var i = 1; i <= 5; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: true});
//       }
//       setnumber(list);

//       var arr = [];
//       while (arr.length < 5) {
//         var RandomNumber1 = Math.floor(Math.random() * 5) + 0;
//         if (arr.indexOf(RandomNumber1) === -1) arr.push(RandomNumber1);
//       }
//       setrendernuber(arr);
//       console.log(2);
//     } else if (level <= 19) {
//       const list = [];
//       if (level === 15) {
//         showList.push({id: 4});
//         setlevel1to5(false);
//         setlevel6to10(false);
//         setlevel11to15(false);
//         setlevel16to20(true);
//       }
//       for (var i = 1; i <= 6; i++) {
//         var RandomNumber = Math.floor(Math.random() * 100) + 1;
//         list.push({RandomNumber, selected: true});
//       }
//       setnumber(list);

//       var arr = [];
//       while (arr.length < 6) {
//         var RandomNumber1 = Math.floor(Math.random() * 6) + 0;
//         if (arr.indexOf(RandomNumber1) === -1) arr.push(RandomNumber1);
//       }
//       setrendernuber(arr);
//       console.log(2);
//     } else {
//       Alert.alert(
//         'Alert',
//         'Game End!',
//         [{text: 'OK', onPress: () => props.navigation.navigate('start')}],
//         {cancelable: false},
//       );
//     }
//   };
//   const show = (index, v) => {
//     setCount(count + 1);

//     let temp = [...number];
//     v.selected = true;
//     temp[index] = v;
//     setnumber(temp);
//     if (level <= 5) {
//       if (count === 3) {
//         setlevel(level + 1);
//         setCount(1);
//         start();
//         setTimeout(() => {
//           start2();
//         }, 1000);
//       }
//     } else if (level <= 10) {
//       console.log(level);

//       if (count === 4) {
//         setlevel(level + 1);
//         setCount(1);

//         start();
//         setTimeout(() => {
//           start2();
//         }, 1000);
//       }
//     } else if (level <= 15) {
//       if (count === 5) {
//         setlevel(level + 1);
//         setCount(1);

//         start();
//         setTimeout(() => {
//           start2();
//         }, 1000);
//       }
//     } else if (level <= 20) {
//       if (count === 6) {
//         setlevel(level + 1);
//         setCount(1);

//         start();
//         setTimeout(() => {
//           start2();
//         }, 1000);
//       }
//     }
//   };
//   const life = () => {
//     setlifestart(lifestart + 1);
//     if (lifestart === 1) {
//       console.log(lifestart);
//       setlife1(true);
//     }
//     if (lifestart === 2) {
//       console.log(lifestart);
//       setlife2(true);
//     }
//     if (lifestart === 3) {
//       video();
//       setlife3(true);

//       if (adcount) {
//         Alert.alert(
//           'Your Lives is Finished!',
//           'If you want to 3 Lives Watch the video',
//           [
//             {text: 'OK', onPress: () => Liveagain()},
//             {text: 'Cancel', onPress: () => props.navigation.navigate('start')},
//           ],
//           {cancelable: false},
//         );
//       } else {
//         props.navigation.navigate('start');
//       }
//     }
//   };
//   const Liveagain = () => {
//     setAdCount(false);
//     if (loaded) {
//       rewarded.show();
//     }
//     setlifestart(1);
//     setlife1(false);
//     setlife2(false);
//     setlife3(false);
//   };
//   return (
//     <SafeAreaView style={styles.flexContainer}>
//       {/* {
//     life3?
// <AppB/>
// :
// null
// } */}

//       <View style={styles.mainView}>
//         {/* <BannerAd unitId={adUnitId}  size={BannerAdSize.SMART_BANNER}
//          /> */}
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             width: '50%',
//             height: '10%',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: '27%',
//               alignItems: 'center',
//             }}>
//             <Text style={{color: 'white', fontSize: 16, opacity: 0.5}}>
//               Level
//             </Text>
//             <Text style={{color: 'white'}}>{level}</Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: '60%',
//               alignItems: 'center',
//             }}>
//             <Text style={{color: 'white', fontSize: 16, opacity: 0.5}}>
//               Lives
//             </Text>
//             {life1 ? (
//               <Ionicons name="heart-dislike" color="white" size={20} />
//             ) : (
//               <AntDesign name="heart" color="white" size={20} />
//             )}
//             {life2 ? (
//               <Ionicons name="heart-dislike" color="white" size={20} />
//             ) : (
//               <AntDesign name="heart" color="white" size={20} />
//             )}
//             {life3 ? (
//               <Ionicons name="heart-dislike" color="white" size={20} />
//             ) : (
//               <AntDesign name="heart" color="white" size={20} />
//             )}
//           </View>
//         </View>
//         {level1to5 ? (
//           <View style={{justifyContent: 'space-between', height: '27%'}}>
//             {showList.map((e, index1) => (
//               <View
//                 key={e.id}
//                 style={{
//                   justifyContent: 'space-between',
//                   flexDirection: 'row',
//                   width: '50%',
//                 }}>
//                 {number.map((v, index) =>
//                   index === rendernuber[index1] ? (
//                     <TouchableOpacity onPress={() => show(index, v)}>
//                       {v?.selected ? (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}>
//                           <Text style={{paddingTop: 15}}>{v.RandomNumber}</Text>
//                         </Card>
//                       ) : (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             backgroundColor: 'blue',
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}></Card>
//                       )}
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity onPress={() => life()}>
//                       <Card
//                         key={v.RandomNumber}
//                         style={{
//                           backgroundColor: 'blue',
//                           height: 50,
//                           width: 50,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}></Card>
//                     </TouchableOpacity>
//                   ),
//                 )}
//               </View>
//             ))}
//           </View>
//         ) : null}
//         {level6to10 ? (
//           <View style={{justifyContent: 'space-between', height: '40%'}}>
//             {showList.map((e, index1) => (
//               <View
//                 key={e.id}
//                 style={{
//                   justifyContent: 'space-between',
//                   flexDirection: 'row',
//                   width: '67%',
//                 }}>
//                 {number.map((v, index) =>
//                   index === rendernuber[index1] ? (
//                     <TouchableOpacity onPress={() => show(index, v)}>
//                       {v?.selected ? (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}>
//                           <Text style={{paddingTop: 15}}>{v.RandomNumber}</Text>
//                         </Card>
//                       ) : (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             backgroundColor: 'blue',
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}></Card>
//                       )}
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity onPress={() => life()}>
//                       <Card
//                         key={v.RandomNumber}
//                         style={{
//                           backgroundColor: 'blue',
//                           height: 50,
//                           width: 50,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}></Card>
//                     </TouchableOpacity>
//                   ),
//                 )}
//               </View>
//             ))}
//           </View>
//         ) : null}
//         {level11to15 ? (
//           <View style={{justifyContent: 'space-between', height: '50%'}}>
//             {showList.map((e, index1) => (
//               <View
//                 key={e.id}
//                 style={{
//                   justifyContent: 'space-between',
//                   flexDirection: 'row',
//                   width: '80%',
//                 }}>
//                 {number.map((v, index) =>
//                   index === rendernuber[index1] ? (
//                     <TouchableOpacity onPress={() => show(index, v)}>
//                       {v?.selected ? (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}>
//                           <Text style={{paddingTop: 15}}>{v.RandomNumber}</Text>
//                         </Card>
//                       ) : (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             backgroundColor: 'blue',
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}></Card>
//                       )}
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity onPress={() => life()}>
//                       <Card
//                         key={v.RandomNumber}
//                         style={{
//                           backgroundColor: 'blue',
//                           height: 50,
//                           width: 50,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}></Card>
//                     </TouchableOpacity>
//                   ),
//                 )}
//               </View>
//             ))}
//           </View>
//         ) : null}
//         {level16to20 ? (
//           <View style={{justifyContent: 'space-between', height: '60%'}}>
//             {showList.map((e, index1) => (
//               <View
//                 key={e.id}
//                 style={{
//                   justifyContent: 'space-between',
//                   flexDirection: 'row',
//                   width: '90%',
//                 }}>
//                 {number.map((v, index) =>
//                   index === rendernuber[index1] ? (
//                     <TouchableOpacity onPress={() => show(index, v)}>
//                       {v?.selected ? (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}>
//                           <Text style={{paddingTop: 15}}>{v.RandomNumber}</Text>
//                         </Card>
//                       ) : (
//                         <Card
//                           key={v.RandomNumber}
//                           style={{
//                             backgroundColor: 'blue',
//                             height: 50,
//                             width: 50,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                           }}></Card>
//                       )}
//                     </TouchableOpacity>
//                   ) : (
//                     <TouchableOpacity onPress={() => life()}>
//                       <Card
//                         key={v.RandomNumber}
//                         style={{
//                           backgroundColor: 'blue',
//                           height: 50,
//                           width: 50,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                         }}></Card>
//                     </TouchableOpacity>
//                   ),
//                 )}
//               </View>
//             ))}
//           </View>
//         ) : null}
//       </View>
//     </SafeAreaView>
//   );
// };
// export default Level2;
