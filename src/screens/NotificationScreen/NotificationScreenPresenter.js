import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';

import {connect} from 'react-redux';
import Color from '../../constants/Colors';

const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  height : 100%;
`;
const Text = styled.Text``;

const NotificationScreenPresenter = ({navigation, ...props}) => {
  React.useEffect(() => {

  }, [props.user]);

  let content = (
    <Theme>
      <Text>Hello</Text>
    </Theme>
  );
  return content;
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
export default connect(
  mapStateToProps,
  {}
)(NotificationScreenPresenter);
