import React from "react";
import { Platform, Animated, } from 'react-native';
import styled from "styled-components";
import { connect } from 'react-redux';

import { AddAddress, UpdateAddress, PlaceDetails, ReverseLookup } from '../../middleware/API';
import { AlertService } from '../../middleware/AlertService';

import GeolocationService from '../../middleware/GeolocationService';

import { saveAddress, editAddress } from '../../store/actions/address';
import MapDisplay from "../../components/MapScreen/MapDisplay";
import MapInput from "../../components/MapScreen/MapInput";
import Color from "../../constants/Colors";
import { height, width } from "../../constants/Layout";

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const MapScreenPresenter = ({ navigation, ...props }) => {
  const [userLocation, updateUserLocation] = React.useState(null);
  let mapHeight = new Animated.Value(height * 0.5);
  let formHeight = new Animated.Value(height * 0.5);
  let mapAnimationStyle = { height: mapHeight };
  let formAnimationStyle = { height: formHeight };
  //we are expecting a callback along with navigation props
  const screen = navigation.getParam('screen') || null;
  const callback = navigation.getParam('callback') || null;

  React.useEffect(() => {
    getCurrentLocation();
    return () => {
      GeolocationService(false, onPermissionDenial, onLocation);
    }
  }, []);

  const onPermissionDenial = () => {
    navigation.goBack();
  }

  const setStateUserLocation = data => {
    // function to update state for userLocation
    const { latitude, longitude } = data;
    if (userLocation === null || (
      userLocation.latitude.toFixed(4) !== latitude.toFixed(4)
      && userLocation.longitude.toFixed(4) !== longitude.toFixed(4)
    )) {
      // update userLocation only if required
      if (callback != null) {
        const { latitude, longitude } = data;
        callback(latitude, longitude)
          .then((res) => {
            updateUserLocation(data);
          })
          .catch(err => {
            console.warn(err);
          })
      } else {
        updateUserLocation(data);
      }
    }
  }

  const navigator = () => {
    // this function will navigate to appropriate screen
    // after selecting address go to corresponding screen
    switch (screen) {
      case "ManageAddress":
        navigation.navigate('Tabs');
        break;
      case "Service":
        navigation.navigate('Service');
        break;
      default:
        navigation.navigate('Home');
        break;
    }
  }

  const onLocation = (data, source = null) => {
    // find the address from api call and update that too
    ReverseLookup(data)
      .then((result) => {
        data.reverseAddress = result;
        data.latitudeDelta = LATITUDE_DELTA;
        data.longitudeDelta = LONGITUDE_DELTA;
        if (data !== userLocation && userLocation !== null && source === null) {
          _map.animateToRegion(data, 1000);
          setStateUserLocation(data);
        } else {
          setStateUserLocation(data);
        }
      })
      .catch((err) => {
        AlertService('Error', 'An error occurred while reverse geocoding your address!', () => { });
        setStateUserLocation(data);
      })
  }

  getCurrentLocation = () => {
    id = null;
    houseAddr = '';
    landmarkAddr = '';
    saveAs = '';
    isEdit = false;
    if (navigation.getParam('placeId')) {
      PlaceDetails(navigation.getParam('placeId'))
        .then((resultData) => {
          data = {
            latitude: resultData.result.geometry.location.lat,
            longitude: resultData.result.geometry.location.lng
          }
          onLocation(data);
        })
        .catch((err) => {
          AlertService('Error', 'An error occurred, sorry of inconvenience!', () => { });
        })
    }
    else if (navigation.getParam('editAddress')) {
      let address = navigation.getParam('editAddress');
      data = {
        latitude: address.coordinate.latitude,
        longitude: address.coordinate.longitude
      }
      id = address.id;
      houseAddr = address.houseDetail;
      landmarkAddr = address.landmark;
      saveAs = address.savedAs;
      isEdit = true;
      onLocation(data);
    }
    else {
      GeolocationService(true, onPermissionDenial, onLocation);
    }
  }

  const onRegionChange = props => {
    region = {
      latitude: props.latitude,
      longitude: props.longitude,
    };
    onLocation(region, 'map');
  }

  const _mapRef = (ref) => {
    _map = ref;
  }

  const inputFocused = () => {
    Animated.parallel([
      Animated.timing(mapHeight, {
        toValue: 0,
        duration: 350,
      }),
      Animated.timing(formHeight, {
        toValue: height - 10,
        duration: 350
      })
    ]).start();
  }

  const inputBlurred = () => {
    Animated.parallel([
      Animated.timing(mapHeight, {
        toValue: height * 0.5,
        duration: 350
      }),
      Animated.timing(formHeight, {
        toValue: height * 0.5,
        duration: 350
      })
    ]).start();
  }

  const addressSave = (data) => {
    let insertAddress = {
      'savedAs': data.locationType,
      'coordinate': userLocation,
      'houseDetail': data.house,
      'landmark': data.landmark
    };
    let formData = {
      "label": data.locationType,
      "addressName": data.house,
      "landmark": data.landmark,
      "latitude": Math.round(userLocation.latitude * 1e6) / 1e6,
      "longitude": Math.round(userLocation.longitude * 1e6) / 1e6,
      "customerId": props.user.userId
    };
    // Save the address in cloud
    if (navigation.getParam('editAddress')) {
      //if address is getting edited
      UpdateAddress(id, formData)
        .then(res => {
          insertAddress.id = id;
          props.onEditAddress(insertAddress);
          navigator();
        })
        .catch((err) => AlertService('Error', 'An error occurred, sorry of inconvenience!', () => { }));
    } else {
      //if address is getting created
      AddAddress(formData)
        .then((result) => {
          // Then save/edit the address in local storage
          insertAddress.id = result.id;
          props.onSaveAddress(insertAddress);
          navigator();
        })
        .catch((err) => AlertService('Error', 'An error occurred, sorry of inconvenience!', () => { }));
    }
  }

  //Above this line are codes for functions
  //Below this line are codes for rendering content
  let content = null;
  let map = null;
  if (userLocation !== null) {
    map = (
      <Animated.View style={mapAnimationStyle}>
        <MapDisplay
          _mapRef={_mapRef}
          userLocation={userLocation}
          onRegionChange={onRegionChange}
        />
      </Animated.View>
    );
    content = (
      <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        {map}
        <MapInput
          userLocation={userLocation}
          address={props.address}
          saveAs={saveAs}
          houseAddr={houseAddr}
          landmarkAddr={landmarkAddr}
          inputFocused={inputFocused}
          inputBlurred={inputBlurred}
          addressSave={addressSave}
          isEdit={isEdit}
        />
      </Theme>
    );
  }
  return content;
};

const mapStateToProps = state => {
  return {
    user: state.user,
    address: state.address,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveAddress: data => {
      dispatch(saveAddress(data));
    },
    onEditAddress: data => {
      dispatch(editAddress(data));
    }
  };
};
export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreenPresenter));

// export default MapScreenPresenter;
