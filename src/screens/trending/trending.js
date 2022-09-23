import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserAvatar1 from '../../Assets/Images/LocationTrending.png';
import UserAvatar2 from '../../Assets/Images/UpTrending.png';
import UserAvatar3 from '../../Assets/Images/DownTrending.png';
import UserAvatar from '../../Assets/Images/InfoIcon.png';
import {styles} from './trending.styles';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : 'ca-app-pub-6608580280604322/8715730281';
const adUnitId = 'ca-app-pub-6608580280604322/8715730281';
// : 'ca-app-pub-4061452781467813/7000119789';

export const Trendings = ({navigation}) => {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', {language: 'en'});
  const [getRobbery, setRobbery] = useState([]);
  const [address1, setAddress1] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [getCheck, setCheck] = useState(true);
  const [crimeIndex, setCrimeIndex] = useState();
  const [reportCrimeInd, setReportCrimeInd] = useState(0);
  const [reportCrimeFlag, setReportCrimeFlag] = useState(false);
  const isFocused = useIsFocused();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    console.log('onRefresh useCallback');
    setRefreshing(true);
    getdata();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  var user = auth().currentUser;
  const setUpAndDownValue = async (index, con, val) => {
    const usersCollection = await firestore()
      .collection('crime')
      .doc(index)
      .get();
    console.log('usersCollection', usersCollection._data?.upVote + 1);
    var temp = [];
    if (usersCollection.empty) {
      console.log('no documents found cc');
    } else {
      usersCollection._data?.userId?.forEach(doc => {
        let data = doc;
        temp.push(data);
        console.log('check', data);
      });
    }
    var temp1 = [];
    console.log('length', temp);
    if (temp.length == 0) {
      temp1 = user.email;
    } else {
      temp.push(user.email);
    }

    if (con === 'A') {
      console.log(21);
      //  firestore()
      await firestore()
        .collection('crime')
        .doc(index)
        .update({
          upVote: usersCollection._data?.upVote + 1,
          check: false,
          userId: temp.length > 0 ? temp : temp1,
          // userId:JSON.stringify(user.email),
        })
        .then(() => {})
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    } else {
      console.log(3);
      await firestore()
        .collection('crime')
        .doc(index)
        .update({
          downVote: usersCollection._data?.downVote + 1,
          check: false,
          userId: temp.length > 0 ? temp : temp1,
        })
        .then(() => {
          getdata();
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
    }
  };
  const getdata = async () => {
    // console.log(user.email);
    await firestore()
      .collection('crime')
      // .where('editby', '==', user.email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          console.log('no documents found cc');
        } else {
          let temp = [];
          querySnapshot.forEach(doc => {
            let data = doc._data;
            temp.push(data);
          });
          temp.reverse();
          setRobbery(temp);
          console.log('getdata ended');
          console.log('reportcrime state ', reportCrimeFlag);
        }
      });
  };
  // useEffect(() => {
  //   console.log("robberyDcre and incre useEffect")
  //   getdata();
  // }, [robberyDcre, robberyIncre]);
  // after tab navigation get data
  useEffect(() => {
    console.log('isfocused useEffect');
    getdata();
  }, [isFocused]);
  // accordingtoindexcrimeDetailsshow
  const crimeDetailsShow = () => {
    return <View></View>;
  };
  const simpleListCrime = () => {};
  return (
    <SafeAreaView style={styles.container}>
      {console.log('return fun')}

      <View
        style={{
          backgroundColor: '#17bba9',
          width: '100%',
          height: '7%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingLeft: '4%'}}>
          <AntDesign name="arrowleft" size={25} color="white" />
        </TouchableOpacity>

        <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
          Trending's
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('info')}
          style={{paddingRight: '4%'}}>
          <Image style={styles.userAvatar} source={UserAvatar} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {getRobbery.map((ele, ind) => {
          // console.log(' i am here and check that ele.upVote+5>=ele.downVote value',ele.upVote+4," ",ele.downVote)

          if (
            ele.upVote > ele.downVote ||
            ele.upVote == ele.downVote ||
            ele.upVote + 4 >= ele.downVote
          ) {
            var currDateandTime = moment().format();
            let checkDiff = [];
            let checkDiff1 = [];
            checkDiff = ele.realDateTime;
            checkDiff1 = currDateandTime;
            // console.log("diff",moment(checkDiff1).diff(checkDiff,'hours'));
            let diff_hour = moment(checkDiff1).diff(checkDiff, 'hours');
            let finalResult = diff_hour;
            // console.log('finalResul in hours', finalResult);

            // console.log("Difference_In_Days ",Difference_In_Days);
            if (finalResult <= 4) {
              return (
                <>
                  <TouchableOpacity
                    key={ind}
                    onPress={() => {
                      setReportCrimeInd(ind);
                      setReportCrimeFlag(!reportCrimeFlag);
                      setAddress1(ele.googlePlacesAutocompleteAddreess);
                      setCrimeIndex(ind);
                    }}
                    style={styles.main_container1}>
                    <View style={styles.heading_container}>
                      <View style={{flexDirection: 'row'}}>
                        {/* <Text style={styles.txt1}>Armed Robbery</Text> */}
                        <View style={{width: wp(47)}}>
                          <Text style={styles.txt1}>{ele.type}</Text>
                        </View>

                        <View
                          style={{width: wp(40), flexDirection: 'row-reverse'}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            {moment(ele.realDateTime).fromNow()}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: wp(60),
                          }}>
                          <Image source={UserAvatar1} />

                          <Text style={styles.txt2} numberOfLines={2}>
                            {/* {address1[ind]}{' '} */}
                            {ele.googlePlacesAutocompleteAddreess}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: wp(20),
                          }}>
                          {ele.userId.filter(usid => user.email == usid)
                            .length == 0 ? (
                            // {ele.userId.filter(usid=>JSON.stringify(user.email)!==usid).length ==0  ? (
                            <>
                              {/* upvote */}
                              <TouchableOpacity
                                onPress={() =>
                                  setUpAndDownValue(ele.id, 'A', ele.upVote + 1)
                                }
                                style={{
                                  backgroundColor: '#50FF1D',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 20,
                                  width: 50,
                                  flexDirection: 'row',
                                  marginLeft: '4%',
                                  paddingHorizontal: '1%',
                                }}>
                                <Image
                                  source={UserAvatar2}
                                  style={{height: 20, width: 10}}
                                />
                                <Text style={styles.txt}>{ele.upVote}</Text>
                                {/* <Text style={styles.txt}> {armedRobberyIncre}</Text> */}
                              </TouchableOpacity>
                              {/* downVote */}
                              <TouchableOpacity
                                onPress={() =>
                                  setUpAndDownValue(
                                    ele.id,
                                    'B',
                                    ele.downVote + 1,
                                  )
                                }
                                style={{
                                  backgroundColor: '#FF0000',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 20,
                                  width: 50,
                                  flexDirection: 'row',
                                  marginHorizontal: '2%',
                                  paddingHorizontal: '1%',
                                }}>
                                <Image
                                  source={UserAvatar3}
                                  style={{height: 20, width: 10}}
                                />
                                {/* <Text style={styles.txt}> {armedRobberyDcre}</Text> */}
                                <Text style={styles.txt}>{ele.downVote}</Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                            <>
                              {/* upvote */}
                              <View
                                style={{
                                  backgroundColor: '#50FF1D',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 20,
                                  width: 50,
                                  flexDirection: 'row',
                                  marginLeft: '4%',
                                  paddingHorizontal: '1%',
                                }}>
                                <Image
                                  source={UserAvatar2}
                                  style={{height: 20, width: 10}}
                                />
                                <Text style={styles.txt}>{ele.upVote}</Text>
                                {/* <Text style={styles.txt}> {armedRobberyIncre}</Text> */}
                              </View>
                              {/* downVote */}
                              <View
                                style={{
                                  backgroundColor: '#FF0000',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: 20,
                                  width: 50,
                                  flexDirection: 'row',
                                  marginHorizontal: '2%',
                                  paddingHorizontal: '1%',
                                }}>
                                <Image
                                  source={UserAvatar3}
                                  style={{height: 20, width: 10}}
                                />
                                {/* <Text style={styles.txt}> {armedRobberyDcre}</Text> */}
                                <Text style={styles.txt}>{ele.downVote}</Text>
                              </View>
                            </>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <>
                    {reportCrimeFlag &&
                    getRobbery[reportCrimeInd].id &&
                    crimeIndex == ind ? (
                      <View style={styles.main_container}>
                        <View style={styles.heading_container}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.txt1}>
                              {getRobbery[reportCrimeInd].type}
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
                                getRobbery[reportCrimeInd].realDateTime,
                              ).fromNow()}
                            </Text>
                          </View>

                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                // style={styles.userAvatar}
                                source={UserAvatar1}
                              />
                              <Text style={styles.txt2}>{address1} </Text>
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
                                {getRobbery[reportCrimeInd].details}
                              </Text>
                            </View>
                            {/* vote up and down   */}
                            {getRobbery[reportCrimeInd].userId.filter(
                              usid => user.email == usid,
                            ).length == 0 ? (
                              // {getRobbery[reportCrimeInd].userId!==JSON.stringify(user.email) ?
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    setUpAndDownValue(
                                      getRobbery[reportCrimeInd].id,
                                      'A',
                                      getRobbery[reportCrimeInd].upVote + 1,
                                    )
                                  }
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
                                  <Image
                                    // style={styles.userAvatar}
                                    source={UserAvatar2}
                                    style={{height: 20}}
                                  />
                                  <Text style={styles.txt}>
                                    {getRobbery[reportCrimeInd].upVote}
                                  </Text>
                                  {/* <Text style={styles.txt}> 50</Text> */}
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    setUpAndDownValue(
                                      getRobbery[reportCrimeInd].id,
                                      'B',
                                      getRobbery[reportCrimeInd].downVote + 1,
                                    )
                                  }
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
                                  <Image
                                    // style={styles.userAvatar}
                                    source={UserAvatar3}
                                    style={{height: 20}}
                                  />
                                  <Text style={styles.txt}>
                                    {getRobbery[reportCrimeInd].downVote}
                                  </Text>
                                  {/* <Text style={styles.txt}> 20</Text> */}
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}>
                                <View
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
                                  <Image
                                    // style={styles.userAvatar}
                                    source={UserAvatar2}
                                    style={{height: 20}}
                                  />
                                  <Text style={styles.txt}>
                                    {getRobbery[reportCrimeInd].upVote}
                                  </Text>
                                  {/* <Text style={styles.txt}> 50</Text> */}
                                </View>
                                <View
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
                                  <Image
                                    // style={styles.userAvatar}
                                    source={UserAvatar3}
                                    style={{height: 20}}
                                  />
                                  <Text style={styles.txt}>
                                    {getRobbery[reportCrimeInd].downVote}
                                  </Text>
                                  {/* <Text style={styles.txt}> 20</Text> */}
                                </View>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </>
                </>
              );
            }
          } else {
            firestore().collection('crime').doc(ele.id).delete();
            delete getRobbery[ind].id;

            return null;
          }
        })}
        {/* console.log(""); */}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: hp(9),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PostCrime')}
          style={{marginHorizontal: wp(4.96)}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#17bba9',
              width: 320,
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              borderRadius: 10,
              // paddingBottom:hp(20),backgroundColor:'red'
              // paddingHorizontal:'2%'
            }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
              Report a Crime
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: hp(2),
            backgroundColor: 'transparent',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
