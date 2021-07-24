import React from 'react';
import styled from 'styled-components';
import {SectionList} from 'react-native';

import {height} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

import ProductItem from './ProductItem';

const Container = styled.View`
  min-height : 100%;
  elevation : 6;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;  
  background-color : white;
  border-top-width : 1;
  border-top-color : ${Colors.boxShadowColor};
  border-top-left-radius : 20px;
  border-top-right-radius : 20px;  
  padding : 10px 0px;
`;
const View = styled.View`
  padding : 10px;
`;

const HeaderText = styled.Text`
  font-family  : ${Fonts.normalFont};
  font-size : 18px;
  color : ${Colors.blackColor};
`;

const Text = styled.Text`
  font-family  : ${Fonts.normalFont};
  font-size : 16px;
  color : ${Colors.darkGreyColor};
`;

const _renderHeader = ({title}) => {
  let content = (
    <View>
      <HeaderText>{title}</HeaderText>
    </View>
  );
  return content;
}
const ProductsList = props => {
  console.log(props.products)
  let content = null;
  if (props.products !== undefined) {
    content = (
      <Container>
        <SectionList
          ref={_listRef}
          sections={props.products}
          renderItem={({item})=>
                    <ProductItem 
                      item={item} 
                      onlineStatus={props.onlineStatus}                        
                      deliveryAvailability={props.deliveryAvailability}
                      shopId={props.shopId}
                      navigation={props.navigation}
                    />
          }
          renderSectionHeader={({ section: { title } }) => (
            <_renderHeader title={title} />
          )}
          ListFooterComponent={<View style={{height : height * 0.35}} />}
          getItemLayout={(data, index) => (
            {length: 80, offset: 80 * index, index}
          )}        
          keyExtractor={(item, index) => item.productId + 'key'}        
        />
      </Container>    
    );
  }
	return content;
}

export default ProductsList;