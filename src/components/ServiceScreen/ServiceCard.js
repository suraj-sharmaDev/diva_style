import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import Icon from '../../assets/images/icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content: space-between;
  width : 100px;
  height : 90px;
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

const ServiceCard = ({ info, navigation, ...props }) => {
    let iconName = info.CategoryName ? info.CategoryName.replace(/[^A-Z0-9]+/ig, "_").toLowerCase() : null;
    const action = () => {
        navigation.navigate('ServiceItem', { 
            categoryId: info.CategoryId, 
            categoryName: info.CategoryName,
            initialPaymentAmount: info.InitialPaymentAmount,
            minBookDay: info.MinBookDay
        });
    }
    let content = null;
    if(info){
        content = (
            <CategoryItem style={styles.displayView} onPress={action}>
                <Image source={Icon[iconName]} />
                <CategoryName numberOfLines={2}>{info.CategoryName}</CategoryName>
            </CategoryItem>
        );
    }
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