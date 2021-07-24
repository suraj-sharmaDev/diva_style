import React from "react";
import { Platform, Dimensions, Animated, Keyboard, BackHandler } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";

import CredentialScreenImage from "../../components/CredentialScreen/CredentialScreenImage";
import CredentialScreenForm from "../../components/CredentialScreen/CredentialScreenForm";

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const CredentialScreenPresenter = ({onCredential}) => {
  let imageHeight = new Animated.Value(height*0.75);
  let formHeight = new Animated.Value(height*0.25);
  let imageAnimationStyle = { height : imageHeight};  
  let formAnimationStyle = { height : formHeight}; 

  React.useEffect(()=>{
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', inputFocused);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', inputBlurred);
    return()=>{
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }
  })

  const inputFocused = () => {
    Animated.parallel([
      Animated.timing(imageHeight,{
        toValue : height*0.30,
        duration : 300
      }),
      Animated.timing(formHeight,{
        toValue : height*0.30,
        duration : 300
      })      
    ]).start();    
    return true;
  }
  const inputBlurred = () => {
    Animated.parallel([
      Animated.timing(imageHeight,{
        toValue : height*0.75,
        duration : 300
      }),
      Animated.timing(formHeight,{
        toValue : height*0.25,
        duration : 300
      })      
    ]).start();    
    return true;    
  }  

  let content = (
    <Theme>
      <Animated.View style={imageAnimationStyle}>
        <CredentialScreenImage />
      </Animated.View>
      <Animated.View style={formAnimationStyle}>
        <CredentialScreenForm 
        	clickHandler={onCredential}
        />
      </Animated.View>      
    </Theme>
  );
  return content;
};

export default React.memo(CredentialScreenPresenter);
