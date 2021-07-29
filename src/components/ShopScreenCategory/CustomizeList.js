import React from 'react';
import { Dimensions } from 'react-native';
import {CheckBox} from 'native-base';
import Modal from "react-native-modal";
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const {height, width}=Dimensions.get('window');

const Container = styled.View`
	background-color : white;
	min-height : 50px;
	max-height : ${height*0.6};
	width : ${width*0.8};
	padding : 5px 0px;
	border-width : 1px;
	border-color : ${Color.greyColor};
`;
const View = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`;
const Header = styled.View`
	padding : 4px;
	width : ${width*0.8};
	border-bottom-width : 1px;
	border-bottom-color : ${Color.greyColor};
	margin-bottom: 10px;
`;
const HeaderText = styled.Text`
	font-family : ${Font.normalFont};
	font-size : 16px;
	text-align : center;
`;
const ListItem = styled.TouchableOpacity`
	width : 100%;
	padding : 3px 20px;
	flex-direction : row;
	justify-content : space-between;
	align-items : center;
	margin-bottom: 10px;
`;
const Label = styled.Text`
	color : ${Color.darkGreyColor};
	text-transform : uppercase;
	font-size : 14px;
	font-family : ${Font.normalFont};
`;
const SubLabel = styled.Text`
	color : ${Color.darkGreyColor};
	text-transform : capitalize;
	font-size : 12px;
	font-family : ${Font.normalFont};
	margin-left: 10px;
`;
const CustomizeList = ({extras, active, updateActive, onCustomiseHandler}) => {
	const [selected, setSelected] = React.useState(null);

	const onOptionSelect = (data) => {
		setSelected(data.name);
		updateActive();
		onCustomiseHandler(data);
	}

	let content = (
    <Modal
      isVisible={active}
      onBackdropPress={updateActive}
      animationInTiming={100}
      animationOutTiming={300}
      deviceWidth={width}
      deviceHeight={height}
      backdropColor={'white'}
      backdropOpacity={0.6}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25,
      }}>
      <Container>
        <Header key={0}>
          <HeaderText>Customize Selection</HeaderText>
        </Header>
        <ListItem
          key={1}
          activeOpacity={1}
          onPress={() => onOptionSelect({name: 'none', amount: 0})}>
          <Label>Normal</Label>
          <CheckBox
            onPress={() => onOptionSelect({name: 'none', amount: 0})}
            checked={selected === 'none' ? true : false}
          />
        </ListItem>
	  	{
			extras.map((e)=>{
				const name = Object.keys(e)[0];
				const cost = e[name];
				return (
					<ListItem key={name} activeOpacity={1} onPress={()=>onOptionSelect({name:name, amount:cost})}>
						<View>
							<Label>{name}</Label>
							<SubLabel>additional Rs {cost}</SubLabel>
						</View>
						<CheckBox 
							checked={selected===name?true:false}
							onPress={()=>onOptionSelect({name:name, amount:cost})}
						/>
					</ListItem>
				)
			})
		}
      </Container>
    </Modal>
  );
	return content;
}

export default CustomizeList;