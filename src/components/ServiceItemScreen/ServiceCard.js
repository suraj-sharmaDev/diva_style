import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Icon from '../../assets/images/icons';
const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content: space-between;
  width : 100px;
  height : 100px;
  margin-vertical: 5px;
  margin-horizontal: 4px;
  border-top-start-radius : 10px;
  border-top-end-radius : 10px;
  border-bottom-start-radius : 10px;
  border-bottom-end-radius : 10px;  
  padding: 10px 2px;
  background-color : ${Colors.searchBarColor};
`;

const Image = styled.Image`
  border-radius: 12px;
  height: 50px;
  width: 50px;
`;

const CategoryName = styled.Text`
  font-size : 13px;
  font-family : ${Fonts.normalFont};
  color : ${Colors.darkGreyColor};
  padding : 0px 5px;
`;
const Description = styled.Text`
  margin-top: 5px;
  padding : 0px 5px;
  font-size: 12px;
  font-family: ${Fonts.lightFont};
  color: ${Colors.darkGreyColor};
`;

const ServiceCard = ({ 
  info, 
  navigation, 
  categoryId,
  initialPaymentAmount,
  minBookDay,
  ...props 
}) => {
  let iconName = info.CategoryItemName.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  // let iconName = 'writing_instruments';
  const action = () => {
    navigation.navigate('ServicePackage', {
      parentId: categoryId,
      categoryId: info.CategoryItemId,
      categoryName: info.CategoryItemName,
      initialPaymentAmount: initialPaymentAmount,
      minBookDay: minBookDay
    });
  }
  let content = (
    <CategoryItem style={styles.displayView} onPress={action}>
      <Image source={Icon[iconName]} />
      <CategoryName>{info.CategoryItemName}</CategoryName>
      {
        // info.Description.length > 0
        // ?
        // <Description>{info.Description}</Description>                
        // :
        // <Description>Services related to {info.CategoryItemName}</Description>          
      }
    </CategoryItem>
  );
  return content;
}

const styles = StyleSheet.create({
  displayView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.2,
    elevation: 1,
  },
});

export default ServiceCard;