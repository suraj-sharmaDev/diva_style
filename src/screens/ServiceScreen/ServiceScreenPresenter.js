import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { serviceUnavailable } from '../../store/actions/address';
import { GetAllServices } from '../../middleware/ServiceApi';
import { AlertService } from '../../middleware/AlertService';
import HomeScreenLoader from "../../components/HomeScreen/HomeScreenLoader";
import ServiceOutOfRange from "../../components/ServiceOutOfRange";
import Header from "../../components/HomeScreen/Header";
import HomeNavigator from '../../components/NavigationComponents/HomeNavigator';
import ServiceCategoryListing from '../../components/ServiceScreen/ServiceCategoryListing';

const Theme = styled.View`
  background-color: white;
  height : 100%;
`;

const ServiceScreenPresenter = ({ navigation, store, ...props }) => {
  let currentAddress = props.address.savedAddresses[props.address.currentAddress];
  const [state, setState] = React.useState({
    isLoading: true,
    services: null,
    outOfRange: false
  });

  React.useEffect(() => {
    fetchServices();
    return () => { }
  }, [currentAddress]);

  const fetchServices = () => {
    // console.warn('loading')
    setState({
      ...state,
      isLoading: true,
      services: null
    });

    const coordinates = currentAddress ? currentAddress.coordinate : props.address.guestAddress;

    GetAllServices(coordinates)
      .then((result) => {
        if (result.length == 0 || result.error) {
          // if services unavailable
          setState({
            ...state,
            isLoading: false,
            outOfRange: true
          });
        }
        else {
          // if services available
          setState({
            outOfRange: false,
            isLoading: false,
            services: result
          });
        }
      })
      .catch((err) => {
        setState({
          outOfRange: true,
          isLoading: false,
          services: null
        });
        AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => { });
      })
  }

  let content = null;

  if (state.isLoading || state.isLoading === null) {
    content = (<HomeScreenLoader />);
  }
  else {
    //Two cases will arrive if service out of range or not
    if (state.outOfRange) {
      content = (
        <ServiceOutOfRange />
      );
    }
    else {
      content = (
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <HomeNavigator navigation={navigation} />
          <ServiceCategoryListing
            Services={state.services}
            navigation={navigation}
            label={currentAddress ? currentAddress.savedAs : 'Your'}
          />
        </ScrollView>
      );
    }
  }
  return (
    <Theme>
      <Header navigation={navigation} currentAddress={currentAddress} type={'services'} />
      {content}
    </Theme>
  );
};

const mapStateToProps = state => {
  return {
    address: state.address,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onServiceUnavailable: (data) => {
      dispatch(serviceUnavailable(data))
    }
  };
};

export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceScreenPresenter));

// export default ServiceScreenPresenter;