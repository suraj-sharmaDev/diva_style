import React from 'react';
import {Dimensions, PanResponder, Keyboard} from 'react-native';
import {Item, Label, Input, Button as NB_Button, Text as NB_Text} from 'native-base';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
const {width, height} = Dimensions.get('window');
const Container = styled.View`
  flex : 1;
  padding: 10px;
`;
const View = styled.View``;
const Description = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const DescpText = styled.Text`
  font-size: 18px;
  font-family  : ${Font.normalFont};
`;
const Address = styled.Text`
  font-size: 15px;
  font-family  : ${Font.normalFont};
`;
const FormView = styled.View`
  margin-top : 20px;
  flex-direction : column;
  justify-content : flex-start;
`;
const Text = styled.Text`
  font-family  : ${Font.normalFont};
`;
const SaveAs = styled.View`
  flex-direction: column;
  margin-bottom : 20px;
`;
const ButtonGroup = styled.View`
  margin-top : 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MapInput = props => {
  const isEdit = props.isEdit;
  const [disabled, updateDisabled] = React.useState(false);
  const [saveAs, updateSaveAs] = React.useState(props.saveAs);
  const [houseAddr, updateHouseAddr] = React.useState(props.houseAddr);
  const [landmarkAddr, updateLandmarkAddr] = React.useState(props.landmarkAddr);
  const [homeAlreadySaved, updateHomeAlreadySaved] = React.useState(false);
  const [workAlreadySaved, updateWorkAlreadySaved] = React.useState(false);
  React.useEffect(()=>{
    //See if work and home has already been saved
    //if so then disable those buttons
    props.address.savedAddresses.map((s)=>{
      if(s.savedAs==='home') updateHomeAlreadySaved(true);
      else if(s.savedAs==='work') updateWorkAlreadySaved(true);
    });
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', focusHelper);    
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', blurHelper);
    return()=>{
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    }        
  });
  const focusHelper = () => {
    props.inputFocused();
  };
  const blurHelper = () => {
    props.inputBlurred();
  };
  const saveLocation = (name) => {
    updateSaveAs(name);
  }
  const onChangeTextHandler = (text, type) => {
    if(type==='house'){
      updateHouseAddr(text);
    }else{
      updateLandmarkAddr(text);
    }
  }  
  const addressSave = () => {
    updateDisabled(true);
    props.addressSave({
      house : houseAddr,
      landmark : landmarkAddr,
      locationType : saveAs==='' ? 'other' : saveAs
    });
  } 
  if(houseAddr.length == 0){
    warning = 'ENTER HOUSE /FLAT /BLOCK NO';
    disabledSubmit = true;
  }else if(landmarkAddr.length == 0){
    warning = 'ENTER LANDMARK';
    disabledSubmit = true;
  }else {
    warning = 'SAVE AND PROCEED'
    if(!disabled){
      disabledSubmit = false;
    }else{
      disabledSubmit = true;
    }
  }
  return (
    <Container style={{width: width}}>
      <Description>
        <View style={{width: width}}>
          <DescpText>{props.userLocation.reverseAddress.title}</DescpText>
          <Address numberOfLines={1}>
            {props.userLocation.reverseAddress.street}
          </Address>
        </View>
        <View>
          <Button>
          </Button>
        </View>
      </Description>
      <FormView>
        <Item floatingLabel style={{marginBottom : 20}}>
          <Label style={{ fontFamily  : Font.normalFont}}>HOUSE /FLAT /BLOCK NO.</Label>
          <Input
            returnKeyType={'next'}
            value = {houseAddr}
            onChangeText = {(text) => onChangeTextHandler(text, 'house')}
            getRef={(ref) => houseRef=ref}
            onSubmitEditing={()=>landmarkRef._root.focus()}
            blurOnSubmit={false}
          />
        </Item>
        <Item floatingLabel style={{marginBottom : 20}}>
          <Label style={{ fontFamily  : Font.normalFont}}>LANDMARK</Label>
          <Input
            returnKeyType={'next'}
            value={landmarkAddr}
            onChangeText = {(text) => onChangeTextHandler(text, 'landmark')}
            getRef={(ref)=> landmarkRef=ref}
            onSubmitEditing={()=>houseRef._root.focus()}
            blurOnSubmit={false}
          />
        </Item>
        <SaveAs>
          <Label style={{ fontFamily  : Font.normalFont}}>Save As</Label>
          <ButtonGroup>
            <Button onPress={()=>saveLocation('home')} disabled={homeAlreadySaved || isEdit}>
              <Icon 
                name={saveAs==='home' ? "home" : "home-outline"} 
                style={{fontSize : 20, color : homeAlreadySaved || isEdit ? Colors.lightGreyColor : 'black' }}
              />
              <Text style={{fontSize : 16, color : homeAlreadySaved || isEdit ? Colors.lightGreyColor : 'black' }}>Home</Text>
            </Button>

            <Button onPress={()=>saveLocation('work')} disabled={workAlreadySaved || isEdit}>
              <Icon 
                name={saveAs==='work' ? "briefcase" : "briefcase-outline"} 
                style={{fontSize : 20, color : workAlreadySaved || isEdit ? Colors.lightGreyColor : 'black' }} 
              />            
              <Text style={{fontSize : 16, color : workAlreadySaved || isEdit ? Colors.lightGreyColor : 'black' }}>Work</Text>
            </Button>
            <Button onPress={()=>saveLocation('other')} disabled={isEdit}>
              <Icon 
                name={saveAs==='other' ? "map-marker" : "map-marker-outline"} 
                style={{fontSize : 20, color : isEdit ? Colors.lightGreyColor : 'black'}} 
              />            
              <Text style={{fontSize : 16, color : isEdit ? Colors.lightGreyColor : 'black'}}>Other</Text>
            </Button>
          </ButtonGroup>
        </SaveAs>
        <NB_Button block 
          disabled={disabledSubmit}
          onPress = {addressSave}
          style = {{ backgroundColor : (warning==='SAVE AND PROCEED') ? Colors.greenColor : Colors.disabledGreenColor }}
        >
          <NB_Text>
            {
              warning
            }
          </NB_Text>
        </NB_Button>
      </FormView>
    </Container>
  );
};

export default MapInput;