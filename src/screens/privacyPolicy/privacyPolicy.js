import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './privacyPolicy.styles';
import {useIsFocused} from '@react-navigation/native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
const adUnitId = 'ca-app-pub-6608580280604322/4961959123';
export const PrivacyPolicy = ({navigation}) => {
  const [getPrivacy, setPrivacy] = React.useState();
  const isFocused = useIsFocused();

  const getInfo = async () => {
    var user = auth().currentUser;
    const userDocument = await firestore()
      .collection('users')
      .doc(user.email)
      .get();
    console.log('userDoc ', userDocument);
    // console.log('userDoc ', userDocument._data?.isPrivacyAccepted);
    if (userDocument._data?.isPrivacyAccepted) {
      console.log('false');
      setPrivacy(userDocument._data.isPrivacyAccepted);
    }
  };
  React.useEffect(() => {
    getInfo();
  }, [isFocused]);

  React.useEffect(() => {
    getInfo();
  }, []);

  const updatepolicy = () => {
    var user = auth().currentUser;

    firestore()
      .collection('users')
      .doc(user.email)
      .update({
        isPrivacyAccepted: false,
      })
      .then(() => {
        console.log(user.email);
        setPrivacy(false);
      })
      .catch(error => {
        console.log('sorry');
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#17bba9',
          height: heightPercentageToDP(7.23),
          width: widthPercentageToDP(100),
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingLeft: 20}}>
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <View style={{width: widthPercentageToDP(64.33)}}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: heightPercentageToDP(2), alignSelf: 'center'}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
        <View style={{margin: '4%', paddingBottom: heightPercentageToDP(6)}}>
          {/* first phragraph */}
          <View style={{margin: '4%'}}>
            <Text style={{color: '#17bba9', fontSize: 20, fontWeight: 'bold'}}>
              Terms of Services
            </Text>
            <Text style={{color: 'black'}}>
              {'\n'}
              {'\n'}
              Last updated: January 08, 2022 {'\n'}
              {'\n'}
              This Privacy Policy describes Ourpolicies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
              {'\n'}
              {'\n'}
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.{'\n'}
              {'\n'}
              Interpretation and Definitions{'\n'}
              {'\n'}
              Interpretation {'\n'}
              {'\n'}
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural. {'\n'}
              {'\n'}
              Definitions {'\n'}
              {'\n'}
              For the purposes of this Privacy Policy:{'\n'}
              {'\n'} * Account means a unique account created for You to access
              our Service or parts of our Service.{'\n'}
              {'\n'} * Affiliate means an entity that controls, is controlled by
              or is under common control with a party, where "control" means
              ownership of 50% or more of the shares, equity interest or other
              securities entitled to vote for election of directors or other
              managing authority.{'\n'}
              {'\n'} * Application means the software program provided by the
              Company downloaded by You on any electronic device, named Brothers
              Keeper{'\n'}
              {'\n'}* Company (referred to as either "the Company", "We", "Us"
              or "Our" in this Agreement) refers to Brothers Keeper.{'\n'}
              {'\n'} * Country refers to: Saskatchewan, Canada{'\n'}
              {'\n'} * Device means any device that can access the Service such
              as a computer, a cellphone or a digital tablet.{'\n'}
              {'\n'} * Personal Data is any information that relates to an
              identified or identifiable individual.{'\n'}
              {'\n'} * Service refers to the Application.{'\n'}
              {'\n'} * Service Provider means any natural or legal person who
              processes the data on behalf of the Company. It refers to
              third-party companies or individuals employed by the Company to
              facilitate the Service, to provide the Service on behalf of the
              Company, to perform services related to the Service or to assist
              the Company in analyzing how the Service is used.{'\n'}
              {'\n'} * Usage Data refers to data collected automatically, either
              generated by the use of the Service or from the Service
              infrastructure itself (for example, the duration of a page visit).
              {'\n'}
              {'\n'} * You means the individual accessing or using the Service,
              or the company, or other legal entity on behalf of which such
              individual is accessing or using the Service, as applicable.{'\n'}
              {'\n'} Collecting and Using Your Personal Data {'\n'}
              {'\n'}Types of Data Collected {'\n'}
              {'\n'}Personal Data{'\n'}
              {'\n'}
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:{'\n'}
              {'\n'} * Email address * First name and last name{'\n'}
              {'\n'} * Phone number{'\n'}
              {'\n'} * Address, State, Province, ZIP/Postal code, City{'\n'}
              {'\n'} * Usage Data {'\n'}
              {'\n'}Usage Data {'\n'}
              {'\n'}Usage Data is collected automatically when using the
              Service.{'\n'}
              {'\n'}Usage Data may include information such as Your Device's
              Internet Protocol address (e.g. IP address), browser type, browser
              version, the pages of our Service that You visit, the time and
              date of Your visit, the time spent on those pages, unique device
              identifiers and other diagnostic data.{'\n'}
              {'\n'}When You access the Service by or through a mobile device,
              We may collect certain information automatically, including, but
              not limited to, the type of mobile device You use, Your mobile
              device unique ID, the IP address of Your mobile device, Your
              mobile operating system, the type of mobile Internet browser You
              use, unique device identifiers and other diagnostic data.{'\n'}
              {'\n'} We may also collect information that Your browser sends
              whenever You visit our Service or when You access the Service by
              or through a mobile device.{'\n'}
              {'\n'} Information Collected while Using the Application{'\n'}
              {'\n'}
              While using Our Application, in order to provide features of Our
              Application, We may collect, with Your prior permission:{'\n'}
              {'\n'} * Information regarding your location{'\n'}
              {'\n'}We use this information to provide features of Our Service,
              to improve and customize Our Service. The information may be
              uploaded to the Company's servers and/or a Service Provider's
              server or it may be simply stored on Your device.{'\n'}
              {'\n'}You can enable or disable access to this information at any
              time, through Your Device settings.{'\n'}
              {'\n'} Use of Your Personal Data{'\n'}
              {'\n'}The Company may use Personal Data for the following
              purposes:{'\n'}
              {'\n'} * To provide and maintain our Service , including to
              monitor the usage of our Service.{'\n'}
              {'\n'} * To manage Your Account: to manage Your registration as a
              user of the Service. The Personal Data You provide can give You
              access to different functionalities of the Service that are
              available to You as a registered user. {'\n'}
              {'\n'}* For the performance of a contract: the development,
              compliance and undertaking of the purchase contract for the
              products, items or services You have purchased or of any other
              contract with Us through the Service.{'\n'}
              {'\n'} * To contact You: To contact You by email, telephone calls,
              SMS, or other equivalent forms of electronic communication, such
              as a mobile application's push notifications regarding updates or
              informative communications related to the functionalities,
              products or contracted services, including the security updates,
              when necessary or reasonable for their implementation.{'\n'}
              {'\n'} * To provide You with news, special offers and general
              information about other goods, services and events which we offer
              that are similar to those that you have already purchased or
              enquired about unless You have opted not to receive such
              information.{'\n'}
              {'\n'} * To manage Your requests: To attend and manage Your
              requests to Us.{'\n'}
              {'\n'} * For business transfers: We may use Your information to
              evaluate or conduct a merger, divestiture, restructuring,
              reorganization, dissolution, or other sale or transfer of some or
              all of Our assets, whether as a going concern or as part of
              bankruptcy, liquidation, or similar proceeding, in which Personal
              Data held by Us about our Service users is among the assets
              transferred.{'\n'}
              {'\n'} * For other purposes : We may use Your information for
              other purposes, such as data analysis, identifying usage trends,
              determining the effectiveness of our promotional campaigns and to
              evaluate and improve our Service, products, services, marketing
              and your experience.{'\n'}
              {'\n'} We may share Your personal information in the following
              situations:{'\n'}
              {'\n'} * With Service Providers: We may share Your personal
              information with Service Providers to monitor and analyze the use
              of our Service, to contact You.{'\n'}
              {'\n'} * For business transfers: We may share or transfer Your
              personal information in connection with, or during negotiations
              of, any merger, sale of Company assets, financing, or acquisition
              of all or a portion of Our business to another company.{'\n'}
              {'\n'} * With Affiliates: We may share Your information with Our
              affiliates, in which case we will require those affiliates to
              honor this Privacy Policy. Affiliates include Our parent company
              and any other subsidiaries, joint venture partners or other
              companies that We control or that are under common control with
              Us.{'\n'}
              {'\n'} * With business partners: We may share Your information
              with Our business partners to offer You certain products, services
              or promotions.{'\n'}
              {'\n'} * With other users: when You share personal information or
              otherwise interact in the public areas with other users, such
              information may be viewed by all users and may be publicly
              distributed outside.{'\n'}
              {'\n'} * With Your consent : We may disclose Your personal
              information for any other purpose with Your consent.{'\n'}
              {'\n'} Retention of Your Personal Data{'\n'}
              {'\n'}The Company will retain Your Personal Data only for as long
              as is necessary for the purposes set out in this Privacy Policy.
              We will retain and use Your Personal Data to the extent necessary
              to comply with our legal obligations (for example, if we are
              required to retain your data to comply with applicable laws),
              resolve disputes, and enforce our legal agreements and policies.
              {'\n'}
              {'\n'}The Company will also retain Usage Data for internal
              analysis purposes. Usage Data is generally retained for a shorter
              period of time, except when this data is used to strengthen the
              security or to improve the functionality of Our Service, or We are
              legally obligated to retain this data for longer time periods.
              {'\n'}
              {'\n'} Transfer of Your Personal Data{'\n'}
              {'\n'} Your information, including Personal Data, is processed at
              the Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.{'\n'}
              {'\n'}
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.{'\n'}
              {'\n'} The Company will take all steps reasonably necessary to
              ensure that Your data is treated securely and in accordance with
              this Privacy Policy and no transfer of Your Personal Data will
              take place to an organization or a country unless there are
              adequate controls in place including the security of Your data and
              other personal information.{'\n'}
              {'\n'} Disclosure of Your Personal Data{'\n'}
              {'\n'}Business Transactions{'\n'}
              {'\n'}If the Company is involved in a merger, acquisition or asset
              sale, Your Personal Data may be transferred. We will provide
              notice before Your Personal Data is transferred and becomes
              subject to a different Privacy Policy.{'\n'}
              {'\n'} Law enforcement{'\n'}
              {'\n'}Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).{'\n'}
              {'\n'} Other legal requirements{'\n'}
              {'\n'}The Company may disclose Your Personal Data in the good
              faith belief that such action is necessary to:{'\n'}
              {'\n'} * Comply with a legal obligation{'\n'}
              {'\n'} * Protect and defend the rights or property of the Company
              {'\n'}
              {'\n'} * Prevent or investigate possible wrongdoing in connection
              with the Service{'\n'}
              {'\n'} * Protect the personal safety of Users of the Service or
              the public{'\n'}
              {'\n'} * Protect against legal liability{'\n'}
              {'\n'} Security of Your Personal Data{'\n'}
              {'\n'}The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.{'\n'}
              {'\n'}
              Children's Privacy{'\n'}
              {'\n'}Our Service does not address anyone under the age of 13. We
              do not knowingly collect personally identifiable information from
              anyone under the age of 13. If You are a parent or guardian and
              You are aware that Your child has provided Us with Personal Data,
              please contact Us. If We become aware that We have collected
              Personal Data from anyone under the age of 13 without verification
              of parental consent, We take steps to remove that information from
              Our servers.{'\n'}
              {'\n'} If We need to rely on consent as a legal basis for
              processing Your information and Your country requires consent from
              a parent, We may require Your parent's consent before We collect
              and use that information.{'\n'}
              {'\n'} Links to Other Websites{'\n'}
              {'\n'} Our Service may contain links to other websites that are
              not operated by Us. If You click on a third party link, You will
              be directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.{'\n'}
              {'\n'} We have no control over and assume no responsibility for
              the content, privacy policies or practices of any third party
              sites or services.{'\n'}
              {'\n'} Changes to this Privacy Policy{'\n'}
              {'\n'}We may update Our Privacy Policy from time to time. We will
              notify You of any changes by posting the new Privacy Policy on
              this page.{'\n'}
              {'\n'} We will let You know via email and/or a prominent notice on
              Our Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy.{'\n'}
              {'\n'} You are advised to review this Privacy Policy periodically
              for any changes. Changes to this Privacy Policy are effective when
              they are posted on this page.{'\n'}
              {'\n'}
              Contact Us{'\n'}
              {'\n'}If you have any questions about this Privacy Policy, You can
              contact us:{'\n'}
              {'\n'} * By email: holla@brotherskeeper.me
            </Text>
          </View>
          {/* button code */}
          {getPrivacy ? (
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                height: heightPercentageToDP(10),
                marginBottom: 50,
              }}>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: '#3366ff',
                    width: widthPercentageToDP(34.66),
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: heightPercentageToDP(4.92),
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#17bba9',
                  }}>
                  <Text style={{textAlign: 'center', color: '#17bba9'}}>
                    Decline
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => updatepolicy()}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#17bba9',
                    width: widthPercentageToDP(34.66),
                    // width: 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: heightPercentageToDP(4.92),
                    // height: 40,
                    borderRadius: 10,
                    // paddingHorizontal:'2%'
                  }}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Accept
                  </Text>
                  {/* {loading1 && <ActivityIndicator size={'small'} color={'white'} />} */}
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
