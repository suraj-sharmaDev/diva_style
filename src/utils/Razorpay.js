/******************************************
 *  Author : Suraj Sharma
 *  Created On : Sun Feb 28 2021
 *  File : Razorpay.js
 *******************************************/
import RazorpayCheckout from 'react-native-razorpay';
import KEYS from '../constants/Keys';

const razorPayment = (options) => {
    options.key = KEYS.RAZOR_PAY_KEY;
    return new Promise((resolve, reject) => {
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            resolve(data);
        }).catch((error) => {
            // handle failure
            reject(error);
        });
    })
}

export default {
    razorPayment
}