import React from 'react';
import styled from "styled-components";
import Colors from "../constants/Colors";
import RecentSearchedText from "./RecentSearchedText";
import Font from "../constants/Fonts";

const Container = styled.SafeAreaView`
	flex : 1;
	padding : 20px 10px 20px 10px;
`;
const Header = styled.View`
	flex : 1;
	flex-direction : row;
	justify-content : space-between;
`; 
const HeaderText = styled.Text`
	font-size : 20px;
	color : ${Colors.darkGreyColor};
	font-family : ${Font.boldFont};
`;
const Button = styled.TouchableOpacity`
    align-items : center;
    flex-direction : row;	
`;
const ButtonText = styled.Text`
	font-size : 14px;
	color : ${Colors.lightGreenColor};
	text-transform : uppercase;
	font-family : ${Font.boldFont};
`;
const RecentSearches = props => {
	let content = (
		<Container>
			<Header>
				<HeaderText>
					Recent Searches
				</HeaderText>
				<Button activeOpacity={0.7}>
					<ButtonText>Show More</ButtonText>
				</Button>
			</Header>
			{
				props.data.map((d, index) => (
					<RecentSearchedText
						searchTerm={d.searchTerm}
						key={index}
						onSelectSearch={() => props.onSelectSearch(d.searchTerm)}
					/>
				))
			}
		</Container>
	);
	return content;
}

export default RecentSearches;