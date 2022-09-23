import React, { Component } from 'react'
import firestore from '@react-native-firebase/firestore';
import moment from 'moment'

class Firebase {

    isToday = date => moment(0, "HH").diff(date, "days") === 0;

    // isTodayTwo = (date) => {
    //     const someDate = new Date('Thu Feb 05 2021 15:04:47 GMT+0500')
    //     const today = new Date()
    //     return someDate.getDate() == today.getDate() &&
    //         someDate.getMonth() == today.getMonth() &&
    //         someDate.getFullYear() == today.getFullYear()
    // }

    getAppoinments = () => {
        return new Promise((resolve, reject) => {
            firestore()
                .collection('appointment-details')
                .get()
                .then(documentSnapshot => {
                    const data = []
                    documentSnapshot.docs.forEach(e => data.push(e.data()))
                    resolve(data)
                })
                .catch(err => { console.log(err); reject(err) })
        })
    }
}

const firebaseService = new Firebase();
export default firebaseService

