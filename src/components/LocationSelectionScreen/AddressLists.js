import React from 'react';
import styled from 'styled-components';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

import AddressView from './AddressView';
const View = styled.View``;
const Body = styled.View`
  padding : 10px 10px;
`;
const Button = styled.TouchableOpacity``;
const TitleText = styled.Text`
  text-transform : uppercase;
  font-family : ${Font.boldFont};
  color : ${Color.blackColor};
  font-size : 15px;
`;
const SubTitleText = styled.Text`
  font-family : ${Font.lightFont};
  font-size : 15px;
`;
const BoldText = styled.Text`
  font-size : 16px;
  color : ${Color.blackColor};
  font-family : ${Font.boldFont};
  text-align : center;
`;
const AddressLists = props => {

  React.useEffect(()=>{
  },[])

  let PredictionList=null;
  let SavedAddressList = null;
  if(props.address.savedAddresses.length>0){
    SavedAddressList = (
      <View style={{marginTop: 10}}>
        <BoldText>Saved Address</BoldText>
        {props.address.savedAddresses.map((s, index) => (
          <AddressView
            key={index}
            address={s}
            isCurrent={props.address.currentAddress === index}
            place_id={index}
            type={'SavedLocation'}
            onLocationSelect={props.onSavedLocationSelect}
          />
        ))}
      </View>
    );
  }
  if(props.fetchedPredictions!==null){
    PredictionList = (
      props.fetchedPredictions.predictions.map((prediction, index)=>(
        <AddressView 
          key={index} 
          address={prediction}
          place_id={prediction.place_id} 
          type={'AutoComplete'} 
          onLocationSelect={props.onSearchedLocationSelect}
        />
    )));
  }else{
    PredictionList = null;
  }	

  let BodyContent = (
    <Body>
      <Button
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 10,
          borderBottomWidth: 0.6,
        }}
        onPress={props.onCurrentLocationSelect}>
        <View style={{marginRight: 10}}>
          <Icon name="crosshairs-gps" size={22} />
        </View>
        <View style={{flexDirection: 'column'}}>
          <TitleText style={{marginBottom: 5}}>Current Location</TitleText>
          <SubTitleText>Using GPS</SubTitleText>
        </View>
      </Button>
      {
        props.fetchedPredictions===null
        ?
          SavedAddressList
        :
          <View style={{marginTop: 10}}>
            <BoldText>Searched Address</BoldText>
            {PredictionList}
          </View>
      }

    </Body>
  );
  return BodyContent;	
}

export default AddressLists;