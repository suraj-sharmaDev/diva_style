import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import { Container, Content } from 'native-base';
import styled from "styled-components";

import Colors from "../../constants/Colors";
import UserCard from "../../components/ProfileScreen/UserCard";
import ProfileBody from "../../components/ProfileScreen/ProfileBody";
const Theme = styled.View`
  height : 100%;
  background-color : ${Colors.homeBackgroundColor};
  flex-direction : column;
  justify-content : space-between;
`;

const ProfileScreenPresenter = (props) => {

  let content = (
	<Theme>
	    <UserCard navigation={props.navigation}/>
	    <ProfileBody navigation={props.navigation}/>
	</Theme>
  );
  return content;
};

export default React.memo(ProfileScreenPresenter);
