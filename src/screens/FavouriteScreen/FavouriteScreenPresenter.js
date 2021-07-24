import React from 'react';
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import styled from 'styled-components';

import AbortController from '../../middleware/AbortController';
import {GetAllFavouriteShops} from '../../middleware/API';
import Header from '../../components/FavouriteScreen/Header';
import EmptyFavourite from '../../components/FavouriteScreen/EmptyFavourite';
import LoadingScreen from '../../components/LoadingScreen';
import ShopList from '../../components/HomeScreen/ShopList';
import Color from '../../constants/Colors';


const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  height : 100%;
`;
const Label = styled.Text``;

const FavouriteScreenPresenter = ({navigation, ...props}) => {
  let currentAddress = props.address.savedAddresses[props.address.currentAddress];  
  const [loading, updateLoading] = React.useState(true);

  React.useEffect(()=>{
    abortController = new AbortController();
    if(props.user.userId != null){
      fetch();
    }else{
      updateLoading(false);
    }
    return ()=>{ 
      abortController._abort();
    };
  },[props.favourite]);

  const haversine_distance = (coords1, coords2) => {
		var dLat = toRad(coords2.latitude - coords1.latitude);
		var dLon = toRad(coords2.longitude - coords1.longitude);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(coords1.latitude)) *
				Math.cos(toRad(coords2.latitude)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);

		return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }  
  
  const toRad = (x) => {
    return x * Math.PI / 180;
  }
  
  const fetch = () => {
    updateLoading(true);
    coordinates = currentAddress ? currentAddress.coordinate : props.address.guestAddress;
    GetAllFavouriteShops(props.user.userId)
    .then(res=>{
      if(!abortController._signal()){
        shops = res;
        res.map(r=>{
          let shopCoords = {"latitude": r.latitude, "longitude": r.longitude};
          let distance = haversine_distance(coordinates, shopCoords);
          r.distance = Math.round( distance * 1e2 ) / 1e2;
        })
        updateLoading(false);
      }      
    })
    .catch(err=>console.warn(err))
  }
  let content = null;
  if(loading){
    content = <LoadingScreen />
  }else if(props.user.userId == null){
    <Label>Please Login</Label>
  }else{
    if(shops.length > 0){
      content = (
        <ShopList
          Shops={shops}
          refresh={loading}
          navigation={navigation}
        />      
    );
    }else{
      content = (
       <EmptyFavourite />
      );
    }
  }
  return (
    <Theme>
      <Header/>
      {content}
    </Theme>    
  );
};

const mapStateToProps = state => {
  return {
    favourite: state.favourite,
    address: state.address,
    user: state.user,
  };
};
export default connect(
  mapStateToProps,
  {}
)(FavouriteScreenPresenter);