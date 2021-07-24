import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import QuoteDetail from './QuoteDetail';
import BiddingCard from './BiddingCard';
import {Fonts, Colors} from '../../constants';

const Container = styled.ScrollView`
    padding: 20px 10px 10px 10px;
`;
const Text = styled.Text`
    font-family: ${Fonts.boldFont};
    font-size: 17px;
    text-align: center;
    margin-bottom: 10px;
`;

const Body = ({detail, acceptHandler, ...props}) => {
    let content = null;
    content = (
        <Container contentContainerStyle={{paddingBottom: 100}}>
            <QuoteDetail detail={detail} />
            <Text>
                Available Biddings For Your Quotes
            </Text>
			<FlatList
				data={detail.providerBids}
				renderItem={({item}) => (
                    <BiddingCard 
                        acceptHandler={acceptHandler}
						item={item}
					/>
				)}
				keyExtractor={(item, index) => 'key'+item.id}
				extraData={detail.providerBids}
			/>
        </Container>
    );
    return content;
}

export default Body;