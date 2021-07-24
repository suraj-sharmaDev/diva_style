import React from "react";
import { Platform, Dimensions, ScrollView } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Header from "../../components/ManageAddressScreen/Header";
import ScreenBody from "../../components/ManageAddressScreen/ScreenBody";
import Footer from "../../components/ManageAddressScreen/Footer";
const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
  height : ${height};
`;

const ManageAddressScreenPresenter = ({navigation, address, cart, deleteAddress}) => {
  let content = (
    <Theme>
      <Header navigation={navigation}/>
      <ScrollView>
	      <ScreenBody 
          store={address.savedAddresses} 
          currentAddress={address.currentAddress}
          trackingOrder={cart.tracking}
          navigation={navigation}
          deleteAddress={deleteAddress}
        />
    	  <Footer navigation={navigation}/>        
	  </ScrollView>
    </Theme>
  );
  return content;
};

export default React.memo(ManageAddressScreenPresenter);
