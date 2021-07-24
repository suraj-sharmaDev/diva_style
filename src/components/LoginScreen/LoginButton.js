import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {skipLogin} from '../../store/actions/user';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

const View = styled.View``;

const Button = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	padding: 5px;
	border-radius: 10px;
`;
const SkipView = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin-bottom: 20px;
`;
const SkipButton = styled.TouchableOpacity``;
const Text = styled.Text`
	font-family  : ${Font.normalFont};
`;

const LoginButton = (props) => {
	const skipHandler = () => {
		props.onSkipLogin();
	}
	let content = (
		<View style={{marginTop: 'auto'}}>
			{
				// <SkipView>
				// 	<SkipButton onPress={skipHandler}>
				// 		<Text>Skip Now</Text>
				// 	</SkipButton>
				// </SkipView>
			}
			<Button 
				onPress={props.loginHandler} 
				disabled={props.disabled}
				style={{ backgroundColor : props.disabled ? Color.disabledGreenColor : Color.greenColor}}
			>
				<View
					style={{
						flex: 1.25,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<Text style={{color: 'white', fontSize: 20}}>Continue</Text>
				</View>
				<View
					style={{
						flex: 0.75,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<Icon name="arrow-right-drop-circle" size={25} style={{color: 'white'}} />
				</View>
			</Button>
		</View>
	);
	return content;
}

const mapStateToProps = state => {
	return {};
};
  const mapDispatchToProps = dispatch => {
	return {
	  onSkipLogin: () => {
		dispatch(skipLogin());
	  }
	};
  };
  export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(LoginButton);

// export default LoginButton; 