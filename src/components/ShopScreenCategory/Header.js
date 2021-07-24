import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
  elevation:5;
  background-color : white;
  height: 65px
  border-bottom-color : ${Colors.greyColor};
  border-bottom-width : 1.6;
  border-bottom-left-radius : 20px;
  border-bottom-right-radius : 20px;  
  padding : 10px;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
  flex-direction: row;
  align-items: center;
`;

const HeaderButtons = styled.View`
  width : 60px;
  flex-direction : row;
`;

const BackButton = styled.TouchableOpacity`
  width : 40px;
`;

const MenuButton = styled.TouchableOpacity`
  margin-left: 20px;
  background-color : ${Colors.greenColor};
  padding : 8px;
  border-radius : 5px;
  align-items : center;
  flex-direction : row;
`;

const Text = styled.Text`
  width: 65%;
  text-align: center;
  font-size : 18px;
  font-family  : ${Font.normalFont};
  color : ${Colors.darkGreyColor};
`;

const Badge = styled.View`
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 5px;
  background-color: white;
  height: 15px;
  width: 15px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
const Header = props => {
  const action = () => {
    if(props.type != 'modal'){
      props.navigation.goBack();
    }else{
      props.navigation();
    }
  }
  let content = (
    <Container>
      <HeaderButtons>
        <View>
          <BackButton onPress={action}>
            <Entypo name="chevron-left" size={30} color={Colors.greenColor}/>
          </BackButton>              
        </View>
      </HeaderButtons>
      <Text numberOfLines={1}>{props.title}</Text>
      {
        //only for services
        props.showCart
        ?
          <MenuButton onPress={()=>props.navigation.navigate('CartStack')}>
            {
              Object.keys(props.cart.services).length > 0
              ?
                <Badge>
                  <Text style={{ fontSize: 12 }}>
                    {
                      props.cart.services.type === 'package'
                      ?
                      `1`
                      :
                      Object.keys(props.cart.services.data.symptoms).length
                    }
                  </Text>
                </Badge>              
              :
              null
            }
            <SimpleLineIcons name="bag" size={18} color={'white'}/>
          </MenuButton>
        :
        null
      }
    </Container>
  );
  return content;
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};
export default connect(
	mapStateToProps,
	{},
)(Header);