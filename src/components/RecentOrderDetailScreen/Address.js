import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import styled from "styled-components";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View``;
const View = styled.View``;
const InfoBox = styled.View`
	padding : 10px 0px;
	border-bottom-width : 1px;
	border-bottom-color : ${Colors.lightGreyColor};
	justify-content: center;
`;
const BoldText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const Image = styled.Image`
  height: 60px;
  width: 120px;
  border-radius : 5px;
`;
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 14px;
	text-transform : capitalize;
`;

const Address = ({ shopInfo, ...props }) => {
	let deliveryAddress = props.address.savedAddresses[props.address.currentAddress]
	savedAs = deliveryAddress.savedAs;
	addressDetail = `${deliveryAddress.houseDetail}, ${deliveryAddress.landmark}`;
	let content = (
		<Container>
			<InfoBox>
				<View style={{width: 120, alignItems: 'center'}}>
					<Image source={{ uri : shopInfo.shopImage }}/>
					<BoldText>{shopInfo.shopName}</BoldText>
				</View>
			</InfoBox>
			<InfoBox>
				<BoldText>Reorder to {savedAs}</BoldText>
				<Text>{addressDetail}</Text>
			</InfoBox>
		</Container>
	);
	return content;
}

const mapStateToProps = state => {
    return {
      address: state.address
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
    }
  };

  
export default React.memo(connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Address));
  