import React from "react";
import { Platform, Dimensions, Animated, Keyboard, BackHandler } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";
import LoginImage from "../../components/LoginScreen/LoginImage";
import LoginForm from "../../components/LoginScreen/LoginForm";

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const LoginScreenPresenter = ({login, logout, country}) => {
  let imageHeight = new Animated.Value(height*0.60);
  let formHeight = new Animated.Value(height*0.40);
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
        toValue : height*0.35,
        duration : 300
      })      
    ]).start();    
    return true;
  }
  const inputBlurred = () => {
    Animated.parallel([
      Animated.timing(imageHeight,{
        toValue : height*0.60,
        duration : 300
      }),
      Animated.timing(formHeight,{
        toValue : height*0.40,
        duration : 300
      })      
    ]).start();    
    return true;    
  }  
  let content = (
    <Theme>
      <Animated.View style={imageAnimationStyle}>
        <LoginImage />
      </Animated.View>
      <Animated.View style={formAnimationStyle}>
        <LoginForm 
          clickHandler={login}
          country={country}
        />
      </Animated.View>      
    </Theme>
  );
  return content;
};

export default React.memo(LoginScreenPresenter);
