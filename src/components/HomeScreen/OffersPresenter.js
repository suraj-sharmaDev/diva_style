import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, ToastAndroid} from 'react-native';
import styled from "styled-components";

import {width} from '../../constants/Layout';
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 5px 0px 10px 10px;
`; 

const OfferItem = styled.TouchableOpacity`
  background-color : ${Color.preLoadingColor};  
  height: 150px;
  width: ${width * 0.45};
  border-width : 1px;
  border-color : ${Color.greyColor};
  border-radius: 12px;  
  margin-vertical: 5px;
  margin-horizontal: 5px;  
`;

const Image = styled.Image`
  height: 150px;
  width: ${width * 0.43};
  border-radius: 12px;  
`;

function Item({ id, src }) {
  return (
    <OfferItem activeOpacity={0.8} onPress={comingSoon}>
      <Image source = {{ uri : src}}/>
    </OfferItem>
  );
}

function comingSoon(){
  ToastAndroid.showWithGravityAndOffset(
    'Offers coming soon!',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );  
}
export default function OffersPresenter({OfferData, navigation}) {
  return (
    <Container>
      <FlatList
        data={OfferData}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Item
            type={item.offer_type}
            src={item.offer_image}
          />
        )}
        keyExtractor={item => item.id + 'key'}
        extraData={OfferData}
      />
    </Container>
  );
}

