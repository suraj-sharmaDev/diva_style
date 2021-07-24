import React from 'react';
import styled from 'styled-components';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Header = styled.View`
  padding : 0px 10px;
  flex-direction : row;
  justify-content : flex-start;
  align-items : center;
  border-bottom-width : 1px;
  border-bottom-color : ${Color.greenColor};
`;
const View = styled.View``;
const Button = styled.TouchableOpacity`
	padding : 4px;
`;
const Input = styled.TextInput`
  flex:1;
  font-family : ${Font.normalFont};
  font-size : 16px;
`;
const Label = styled.Text`
  position : absolute;
  padding : 0px 5px;
  margin-bottom : 30px;
  font-size : 13px;
  color : ${Color.lightGreenColor};
  font-family : ${Font.normalFont};
`;

const AddressInput = props => {
	const [timeOut, updateTimeOut] = React.useState(null);
	React.useEffect(()=>{},[])
	const changeTextHandler = text => {
		props.updateSearchTerm(text);
		clearTimeout(timeOut);
	    if(text.length>0){
	    	updateTimeOut(setTimeout(()=>{props.doSearch(text)}, 1000));
	    }else{
	    	clearSearchHandler();
	    }
	}
	const clearSearchHandler = () => {
		clearTimeout(timeOut);
		props.clearSearch();
	}
	let content = (
		<Header>
			<Button onPress={()=>props.handleBackPress('button_press')}>
				<Icon name="chevron-left" size={30} color={Color.greenColor} />
			</Button>
			<View style={{flex: 1}}>
				<Label>Set Delivery Location</Label>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Input
						value={props.searchTerm}
						placeholder="Search for area, street name..."
						underlineColorAndroid="transparent"
						autoFocus={true}
						onChangeText={e => changeTextHandler(e)}
					/>
					{props.searchTerm.length > 0 ? (
						<Button onPress={clearSearchHandler}>
							<Icon
								name="close-circle-outline"
								size={24}
								color={Color.darkGreyColor}
							/>
						</Button>
					) : null}
				</View>
			</View>
		</Header>
	);
	return content;
}

export default AddressInput;