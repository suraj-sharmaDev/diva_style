import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import ServiceCard from './ServiceCard';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { width } from '../../constants/Layout';
const Container = styled.SafeAreaView`
  flex : 1;
  padding : 10px 10px 20px 10px;
`;

const ServiceCategoryListing = ({ 
    Services, 
    navigation, 
    categoryId, 
    label, 
    initialPaymentAmount,
    minBookDay,
    ...props 
}) => {
    let numColumns = width > 420 ? 4 : 3;
    const renderListFooter = () => {
        return <View style={{ paddingBottom: 100 }} />
    };
    let content = (
        <Container>
            <FlatList
                numColumns={numColumns}
                data={Services}
                renderItem={({ item }) => (
                    <ServiceCard
                        info={item}
                        categoryId={categoryId}
                        navigation={navigation}
                        initialPaymentAmount={initialPaymentAmount}
                        minBookDay={minBookDay}
                    />
                )}
                ListFooterComponent={renderListFooter}
                keyExtractor={item => item.CategoryItemId + 'key'}
                extraData={Services}
            />
        </Container>
    );
    return content;
}

export default ServiceCategoryListing;