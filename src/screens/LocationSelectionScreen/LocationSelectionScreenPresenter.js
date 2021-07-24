import React from 'react';
import { Platform, BackHandler, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { PlacesAutoFetch } from "../../middleware/API";
import { AlertService } from '../../middleware/AlertService';
import { selectAddress } from "../../store/actions/address";

import AddressInput from '../../components/LocationSelectionScreen/AddressInput';
import AddressLists from '../../components/LocationSelectionScreen/AddressLists';
import { call } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const Container = styled.View`
  padding : 10px 0px;
`;

const LocationSelectionScreenPresenter = props => {
  const [searchTerm, updateSearchTerm] = React.useState('');
  const [fetchedPredictions, updateFetchedPredictions] = React.useState(null);
  const currentAddress = props.address.savedAddresses[props.address.currentAddress]
  //we are expecting a callback along with navigation props
  const screen = props.navigation.getParam('screen') || null;
  const callback = props.navigation.getParam('callback') || null;

  React.useEffect(() => {
    //this is just a safety mechanism to force user to atleast have one saved address
    //not used currently 

    // backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   handleBackPress
    // );
    // return () => {
    //   backHandler.remove();
    // };
  }, []);

  const handleBackPress = (logic) => {
    //This is most important Logic for the application
    //We don't want to go back to home page when there is no saved addresses
    //Otherwise home page will basically display Loading forever and ever
    //We can choose one more logic by using withNavigationFocus to call fetchShop everytime
    //component is focused but this will lead to uncecessary renders 
    if (!currentAddress) {
      AlertService('No Saved Addresses', 'Save a address and let us find offers in your location!', () => { });
      return true;
    } else {
      if (logic === undefined) {
        //when hardware backbutton clicked
        return false;
      } else {
        //when ui back button clicked
        props.navigation.goBack();
      }
    }
  };

  const clearSearch = () => {
    updateSearchTerm('');
    updateFetchedPredictions(null);
  }

  const doSearch = (text) => {
    if (text.length > 3) {
      PlacesAutoFetch(text)
        .then((result) => {
          updateFetchedPredictions(result);
        })
        .catch((err) => {
          console.warn(err)
          // AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
        })
    }
  }

  const navigator = () => {
    // this function will navigate to appropriate screen
    // after selecting address go to corresponding screen
    switch (screen) {
      case "ManageAddress":
        props.navigation.navigate('Tabs');
        break;
      case "Service":
        props.navigation.navigate('Service');
        break;
      default:
        props.navigation.navigate('Home');
        break;
    }
  }

  const onCurrentLocationSelect = () => {
    // when user opts to get location using GPS
    props.navigation.navigate('LocationPickerMap', { screen: screen, callback: callback });
    // if (props.navigation.getParam('screen') !== 'ManageAddress') {
    //   // if prevscreen is not ManageAddress then 
    //   props.navigation.navigate('LocationPickerMap', { screen: screen, callback: callback });
    // } else {
    //   // if prevscreen is ManageAddress then       
    //   props.navigation.navigate('LocationPickerMap', { screen: 'ManageAddress', callback: callback });
    // }
  }
  const onSavedLocationSelect = (place_id) => {
    // when user opts set location from saved addresses
    const { latitude, longitude } = props.address.savedAddresses[place_id].coordinate;
    if (callback != null) {
      callback(latitude, longitude)
        .then((res) => {
          if (res) {
            // if result of callback is true then select address
            // and go to specific screen
            props.onSelectAddress(place_id);
            navigator();
          } else {
            props.onSelectAddress(place_id);
            navigator();
          }
        })
        .catch((err) => console.warn(err));
    } else {
      props.onSelectAddress(place_id);
      props.navigation.goBack();
    }
  }

  const onSearchedLocationSelect = (place_id) => {
    // when user opts set location from searched location    
    props.navigation.navigate('LocationPickerMap', {
      screen: screen,
      placeId: place_id,
      callback: callback
    });
  }

  let content = (
    <Container>
      <AddressInput
        handleBackPress={handleBackPress}
        searchTerm={searchTerm}
        updateSearchTerm={(text) => updateSearchTerm(text)}
        doSearch={doSearch}
        clearSearch={clearSearch}
      />
      <AddressLists
        fetchedPredictions={fetchedPredictions}
        onCurrentLocationSelect={onCurrentLocationSelect}
        onSearchedLocationSelect={onSearchedLocationSelect}
        onSavedLocationSelect={onSavedLocationSelect}
        address={props.address}
      />
    </Container>
  );
  return content;
}

const mapStateToProps = state => {
  return {
    address: state.address,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSelectAddress: data => {
      dispatch(selectAddress(data));
    }
  };
};
export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSelectionScreenPresenter));


