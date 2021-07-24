import React from "react";
import { Platform, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import styled from "styled-components";

import {height, width} from '../../constants/Layout';

import {statusUpdate} from '../../store/actions/order';
import {serviceUnavailable} from '../../store/actions/address';

import {GetAllShops} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';
import NotificationService from '../../middleware/NotificationService';

import HomeScreenLoader from "../../components/HomeScreen/HomeScreenLoader";
import ServiceOutOfRange from "../../components/ServiceOutOfRange";
import Header from "../../components/HomeScreen/Header";
import HomeNavigator from '../../components/NavigationComponents/HomeNavigator';
import OffersPresenter from "../../components/HomeScreen/OffersPresenter";
import ShopListWithSearchBar from "../../components/HomeScreen/ShopListWithSearchBar";
import NotificationBar from "../../components/DeliveryTrackingScreen/Modules/NotificationBar";
import Color from "../../constants/Colors";

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
  height : ${height};
  width : ${width};
`;

const HomeScreenPresenter = ({navigation, ...props}) => {
  let currentAddress = props.address.savedAddresses[props.address.currentAddress]
  const [isLoading, updateLoading] = React.useState(null);
  React.useEffect(()=>{
    if(isLoading===null)
    {
      NotificationService(props.user.userId, onDataNotifs);
    }
    fetchShops();
    return()=>{}
  },[currentAddress])

  const onDataNotifs = (data) => {
    //When data notifications arrive
    //current mechanism allows only order updates
    //deliver them accordingly
    props.onStatusUpdate(data);
  }
  
  const fetchShops = () => {
    if(Object.keys(props.address.savedAddresses).length === -10){
      // this code is not used but useful in some cases
      navigation.navigate('LocationSelector');
    }else{
      updateLoading(true);
      coordinates = currentAddress ? currentAddress.coordinate : props.address.guestAddress;
      // Fetch the shops from server if delivery Location Available
      GetAllShops(coordinates)
      .then((result)=>{
        if(result.shops === null){
          if(typeof outOfRange=='undefined'){
            outOfRange=true;
            props.onServiceUnavailable(true);
          }
          else
          {
            if(!outOfRange){
              //if outofRange has already been set don't set again
              outOfRange=true;
              props.onServiceUnavailable(true);
            }
          }
          updateLoading(false);
        }
        else
        {
          outOfRange=false;
          Offers = result.offers;
          Shops = result.shops;
          props.onServiceUnavailable(false);          
          updateLoading(false);
        }
      })
      .catch((err)=>{
        outOfRange=true;
        props.onServiceUnavailable(true);          
        updateLoading(false);        
        AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', ()=>{});
        console.warn(err);
      })
    }
  }
  let content = null;
  if(isLoading || isLoading===null){
    content = (<HomeScreenLoader />);    
  }
  else
  {
    //Two cases will arrive if service out of range or not
    if(outOfRange){
      content=(
          <ServiceOutOfRange />
      );
    }
    else
    {
      content=(
          <ScrollView>
            <HomeNavigator navigation={navigation} />
            <OffersPresenter OfferData={Offers} navigation={navigation}/>
            <ShopListWithSearchBar Shops={Shops} navigation={navigation}/>
          </ScrollView>
      );
    }
  }
  return (
    <Theme>
      <Header navigation={navigation} currentAddress={currentAddress}/>
      {content}
      <NotificationBar navigation={navigation}/>
    </Theme>
  );
};

const mapStateToProps = state => {
  return {
    address: state.address,
    user : state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onStatusUpdate: data => {
      dispatch(statusUpdate(data));
    },
    onServiceUnavailable: (data)=>{
      dispatch(serviceUnavailable(data))
    }
  };
};

export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenPresenter));
