import React from 'react';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import RecentOrderCard from "./RecentOrderCard";
import ProfileOptions from "./ProfileOptions";
import Logout from './Logout';

const Container = styled.SafeAreaView`
  background-color : white;
  elevation : 26;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;  
  border-top-width : 1;
  border-top-color : ${Colors.boxShadowColor};
  border-top-left-radius : 20px;
  border-top-right-radius : 20px;
  flex : 4;
  flex-direction : column;
  padding : 20px 0px 0px 0px;	  
`;
const PowerView = styled.View`
  margin-top : auto;
	padding : 15px 0px;
`;
const Text = styled.Text`
  text-align : right;
	color : ${Colors.lightGreyColor};
	font-family  : ${Font.normalFont};
`;

const ProfileBody = ({navigation}) => {
  return (
  <Container>
    <ProfileOptions navigation={navigation}/>
    <PowerView>
      <Logout />      
    </PowerView>
  </Container>
  )
};

export default ProfileBody;