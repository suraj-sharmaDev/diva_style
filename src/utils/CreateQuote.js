/******************************************
 *  Author : Suraj Sharma
 *  Created On : Sun Feb 28 2021
 *  File : CreateQuote.js
 *******************************************/

/**
 * This utility function is for services, when creating a quote.
 * Because of too much differences we have included this single function that can
 * handle creation of quote and other related function for services.
 */

import Razorpay from './Razorpay';
import { CreateQuote } from '../middleware/ServiceApi';
import { FinalizePayment } from '../middleware/API';
import { configureStore } from '../store/store';
import {Colors} from '../constants';
/**
 * 
 * @param formData 
 */

export const CreateQuoteForServices = (formData) => {
    /**
     * Steps required for creating a quote :
     * 1. Create quote using formData
     * 2. Use quoteId from 1st step to 
     */
    const { user: { userName, userMobile, userId } } = configureStore.getState();

    return new Promise((resolve, reject)=>{
        CreateQuote(formData)
        .then((result)=>{
            if(!result.error){
                
                const {razorPayOrderId, totalAmount, nxtstoresQuoteId} = result;

                var options = {
                    description: 'Ordered Items from nxtstores customer App',
                    currency: 'INR',
                    amount: totalAmount,
                    order_id: razorPayOrderId,
                    prefill: {
                      contact: userMobile,
                    },
                    theme: {color: Colors.greenColor}
                }
                /**
                 * After all the options has been setup we now need to call razorPay Api
                 * if totalAmount > 0
                 */
                if(totalAmount > 0) {
                    Razorpay.razorPayment(options)
                    .then((result)=>{
                        let paymentData = {...result};
                        paymentData.orderType = 'service';
                        paymentData.orderQuoteId = nxtstoresQuoteId;
                        paymentData.totalAmount = totalAmount;
                        /**
                         * When the payment is successful call FinalizePaymentApi
                        */
                        FinalizePayment(paymentData)
                        .then((res)=>{
                            if(!res.error){
                                resolve(res);
                            }else{
                                reject(res);
                            }
                        })
                        .catch((err)=>{
                            reject(err);
                        })
                    })
                    .catch((err)=>reject(err));
                } else {

                    const paymentData = {
                        "orderType" : 'service',
                        "orderQuoteId": nxtstoresQuoteId,
                        "totalAmount" : totalAmount,
                        "paymentMethod" : 'NIL',
                        "razorpay_payment_id" : 'NIL',
                        "razorpay_order_id" : 'NIL',
                        "razorpay_signature" : 'NIL'
                    };

                    FinalizePayment(paymentData)
                    .then((res)=>{
                        if(!res.error){
                            resolve(res);
                        }else{
                            reject(res);
                        }
                    })
                    .catch((err)=>{
                        reject(err);
                    })                    
                }

            }else{
                reject(result.message);
            }
        })
    })
}