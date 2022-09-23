/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
// import BiometricPopup from './Screen/BiometricPopup_View/BiometricPopup';
// import Application from './Screen/BiometricPopup_View/Application';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';



// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
// exports.sendPushNotification = functions.database
//   .ref("users/{userID}")
//   .onCreate(event => {
//     const data = event._data;
//     payload = {
//       notification: {
//         title: "Welcome",
//         body: "thank for installed our app",
//       },
//     };
//     admin
//       .messaging()
//       .sendToDevice(data.notification_token, payload)
//       .then(function(response) {
//         console.log("Notification sent successfully:", response);
//       })
//       .catch(function(error) {
//         console.log("Notification sent failed:", error);
//       });
//   });


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
        // process the notification
    
        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      requestPermissions: Platform.OS === 'ios'

    });

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => App);

