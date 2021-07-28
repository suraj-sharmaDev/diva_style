import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';
import {UpdateCart, DeleteCart, PlaceOrder, FinalizePayment} from "../../middleware/API";
import {AlertService} from '../../middleware/AlertService';
import Razorpay from '../../utils/Razorpay';

import Colors from '../../constants/Colors';
import ServiceCheckOutScreen from '../ServiceCheckOutScreen';
import EmptyCart from '../../components/CartScreen/EmptyCart';
import CartHeader from '../../components/CartScreen/CartHeader';
import CartBody from '../../components/CartScreen/CartBody';
import ProceedCard from '../../components/CartScreen/ProceedCard';
import LoadingScreen from '../../components/LoadingScreen';

const Theme = styled.View`
  background-color: ${Colors.homeBackgroundColor};
  height : 100%;
`;
const ScrollView = styled.ScrollView`
  margin-bottom : 45px;
`;
const Text = styled.Text``;

const CartScreenPresenter = ({navigation, store, address, ...props}) => {
  let content = null;
  const [refresh, updateRefresh] = React.useState(false);
  const [isLoading, updateLoading] = React.useState(false);
  React.useEffect(() => {
    updateRefresh(!refresh);
  }, [store]);

  const prepareForm = (data, type) => {
    let formData = null;
    if(type === 'cart'){
        index = store.items.findIndex(obj => obj.productId == data.productId); 
        qty = store.items[index].qty + 1;    
        formData = [
          {
            "productId" : data.productId,
            "qty" : qty
          }      
        ];
        return formData;
    }else{
      //if type is order
      formData = {
        "master": {
          "customerId": props.userId,
          "deliveryAddress": address.savedAddresses[address.currentAddress],
          "shopId": store.shopId
          },
          "detail":[]
      }
      store.items.map((item)=>{
        let insertData = {
          "productId": item.productId,
          "productName" : item.name,
          "price": item.price,
          "qty": item.qty
        }

        formData.detail.push(insertData);
      })
      return formData;
    }
  }

  const onIncrement = data => {
    //send cartApi only if user is loggedIn
    if(props.userId != null){
      let formData = prepareForm(data, 'cart');
      UpdateCart(formData, props.userId, store.shopId)
        .then(result => {
          console.warn(result);
          updateRefresh(!refresh);
        })
        .catch(err => {
          AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
        });
    }
      props.onIncrement(data);      
  };

  const onDecrement = productId => {
    //send cartApi only if user is loggedIn
    if(props.userId != null)
    {
      index = store.items.findIndex(obj => obj.productId === productId); 
      sizeOfRedux = Object.keys(store.items).length;
      pdtQty = store.items[index].qty;
      if(pdtQty === 1){
        let data = [productId];
        DeleteCart(data, props.userId, store.shopId)
        .then((res)=>{console.log(res)})
        .catch((err)=>console.warn(err))
      }
    }
    props.onDecrement(productId);
  };
  
  const onPlaceOrder = () => {
    if(props.userId != null){
      let data = prepareForm(store.items, 'order');
      updateLoading(true);
      PlaceOrder(data)
      .then((result)=>{
        // stop loading animation
        updateLoading(false);    

        if(typeof result.error == 'undefined' || !result.error){
          const {razorPayOrderId, totalAmount, nxtstoresOrderId} = result;
          var options = {
            description: 'Ordered Items from nxtstores customer App',
            currency: 'INR',
            amount: totalAmount,
            order_id: razorPayOrderId,
            prefill: {
              contact: props.userMobile,
            },
            theme: {color: Colors.greenColor}
          }
          /**
           * NOTE: This version of app is for Nepal only so razorpay Api is commented for use.
           * Only COD available
           */
           updateLoading(true);
            let paymentData = {};
            paymentData.orderType = 'order';
            paymentData.orderQuoteId = nxtstoresOrderId;
            paymentData.totalAmount = totalAmount;
           FinalizePayment(paymentData)
           .then((res)=>{
             if(!res.error){
               //empty cart before going to orders page
               props.trackStart();
               navigation.navigate('Orders');
             }else{
               AlertService('Oops','Payment was successful, but we faced server issues. Please contact customer care!', ()=>{});
             }
           })
           .catch((err)=>{
             updateLoading(false)
           })

          
          /**
           * After all the options has been setup we now need to call razorPay Api
           */
          // updateLoading(true);          
          // Razorpay.razorPayment(options)
          // .then((result)=>{
          //   let paymentData = {...result};
          //   paymentData.orderType = 'order';
          //   paymentData.orderQuoteId = nxtstoresOrderId;
          //   paymentData.totalAmount = totalAmount;
          //   /**
          //    * When the payment is successful call FinalizePaymentApi
          //    */
          //   FinalizePayment(paymentData)
          //   .then((res)=>{
          //     if(!res.error){
          //       //empty cart before going to orders page
          //       props.trackStart();
          //       navigation.navigate('Orders');
          //     }else{
          //       AlertService('Oops','Payment was successful, but we faced server issues. Please contact customer care!', ()=>{});
          //     }
          //   })
          //   .catch((err)=>{
          //     updateLoading(false)
          //   })
          // })
          // .catch((err)=>{
          //   updateLoading(false)            
          //   AlertService('Oops','Payment was unsuccessful, please try again!', ()=>{});
          //   console.warn(err)
          // });
        }else{
          updateLoading(false)          
          AlertService('Error','Server issue, sorry for inconvenience!', ()=>{});
        }
      })
      .catch((err)=>{
        updateLoading(false)        
        AlertService('Error','An error occurred, sorry for inconvenience!', ()=>{});
      })
    }else{
      console.warn('Create an account or login first');
    }
  }

  //We need to see if there is any items in cart or not
  //For empty cart
  if(store.shopId == 0 && Object.keys(store.services).length === 0){
    content = (
      <Theme>
        <EmptyCart navigation={navigation}/>
      </Theme>
    );
  }
  else if(Object.keys(store.services).length > 0)
  {
    //if services have been added
    content = (
      <ServiceCheckOutScreen
        onRemoveService={props.onRemoveService}
        navigation={navigation}
        store={store}
        refresh={refresh}
      />      
    );
  }
  else if(isLoading){
		content = <LoadingScreen />
  }  
  //When items are added in cart after tracking is disabled or when order is completed or delivered
  else{
    content = (
      <Theme>
        <CartHeader store={store}/>
        <ScrollView>
          <CartBody
            focused={props.focused}
            navigation={navigation}
            store={store}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            distance={props.distance}
            deliveryFee = {props.deliveryFee}
            discountAmount = {store.discountAmount}
            refresh = {refresh}
          />
        </ScrollView>
        <ProceedCard onPlaceOrder={onPlaceOrder} deliveryAvail={false}/>
      </Theme>
    );
  }
  return content;
};

export default CartScreenPresenter;