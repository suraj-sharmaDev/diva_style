import React from 'react';
import styled from 'styled-components';
import Shimmer from '../../middleware/Shimmer';
import {height, width} from '../../constants/Layout';

const Container = styled.View`
	flex-direction : column;
	height : ${height-80};
`;
const View = styled.View`
	flex-direction : row;
	justify-content : space-between;
`;
const ExploreScreenLoader = () => {
	let content = (
		<Container>
	        <Shimmer 
	        	direction="right" 
	        	opacity={0.5} 
	        	autoRun={true} 
	        	visible={false}
	        	style={{height:120, width: width, marginBottom : 15}}
	        />
	        <Shimmer 
	        	direction="right" 
	        	opacity={0.5} 
	        	autoRun={true} 
	        	visible={false} 
	        	style={{height:50, width: width, marginBottom : 15}}	        	
	        />
	        <View>
		        <Shimmer 
		        	direction="right" 
		        	opacity={0.5} 
		        	autoRun={true} 
		        	visible={false} 
		        	style={{height:120, width: width/2-20, marginBottom : 15}}	        	
		        />
		        <Shimmer 
		        	direction="right" 
		        	opacity={0.5} 
		        	autoRun={true} 
		        	visible={false} 
		        	style={{height:120, width: width/2-20}}	        	
		        />	        	        	        
	        </View>	        
		</Container>
	);
	return content;
}

export default ExploreScreenLoader;