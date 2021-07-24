import React from 'react';
import { AlertService } from '../../middleware/AlertService';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import ServiceCard from './ServiceCard';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { width } from '../../constants/Layout';
const Container = styled.SafeAreaView`
  flex : 1;
  padding : 0px 10px 20px 10px;
`;
const Text = styled.Text`
    font-size: 14px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
    text-align: center;
    margin: 0px 0px 10px 0px;
`;
const ServiceCategoryListing = ({ Services, navigation, label, ...props }) => {
    const renderListFooter = () => {
        return <View style={{ paddingBottom: 100 }} />
    };

    const categoryRenderer = ({ item, index }) => {
        return (
            <ServiceCard
                info={item}
                navigation={navigation}
            />
        );
    }

    const locationChangeApproval = () => {
        AlertService('Notice', 'Do you want to change your location?', () => {
            navigation.navigate('LocationSelector', { screen: "Service" })
        });
    }

    let content = (
        <Container>
            <View style={[styles.row, styles.centerAlign]}>
                <Text>Services Available Near your location{" "}</Text>
                <TouchableOpacity onPress={locationChangeApproval}>
                    <Text style={styles.bluedText}>({label})</Text>
                </TouchableOpacity>
            </View>
            {
                // Services
                //     ?
                <FlatList
                    data={Services}
                    contentContainerStyle={styles.flatListContainerStyle}
                    renderItem={categoryRenderer}
                    ListFooterComponent={renderListFooter}
                    keyExtractor={item => item.CategoryId + 'key'}
                    extraData={Services}
                />
                //     :
                //     null
            }
        </Container>
    );
    return content;
}

const styles = StyleSheet.create({
    flatListContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap"
    },

    row: {
        flexDirection: "row"
    },

    centerAlign: {
        alignItems: "center",
        justifyContent: "center"
    },

    bluedText: {
        color: Colors.greenColor
    }
});

export default ServiceCategoryListing;