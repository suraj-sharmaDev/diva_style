import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../../constants/Colors";

const Location = styled.TouchableOpacity`
  flex-direction : row;
`;

const DeliveryLocationHeader = ({ navigation, currentAddress }) => {
  React.useEffect(()=>{
  },[]) 
  let content = (
    <Location onPress={() => navigation.navigate('LocationSelector')}>
      <Icon
        name="location-on"
        size={26}
        color={'white'}
        style={{paddingTop: 6}}
      />
  </Location>
  );
  return content;
}

export default DeliveryLocationHeader;
