import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';
import Color from '../../constants/Colors';

const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
`;

const CheckOutScreenPresenter = ({navigation}) => {
  let content = <Theme />;
  return content;
};

export default CheckOutScreenPresenter;