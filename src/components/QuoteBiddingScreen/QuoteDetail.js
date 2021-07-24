import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Fonts, Colors} from '../../constants';

const QuoteDetail = ({detail, ...props}) => {
    let content = null;
    const pickupAddress = JSON.parse(detail.master[0].deliveryAddress);
    const quoteDetail = JSON.parse(detail.detail[0].json);
    const dropAddress = quoteDetail.destination;
    content = (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {detail.detail[0].productName}
            </Text>
            <View>
                <Text style={styles.infoText}>
                    Pickup Address
                </Text>
                <Text style={[styles.infoText, {paddingLeft: 20}]}>
                    {pickupAddress.houseDetail} {pickupAddress.landmark} 
                </Text>
            </View>
            <View>
                <Text style={styles.infoText}>
                    Drop Address
                </Text>
                <Text style={[styles.infoText, {paddingLeft: 20}]}>
                    {dropAddress.houseDetail} {dropAddress.landmark} 
                </Text>
            </View>
            <View>
                <Text style={styles.infoText}>
                    Your Note
                </Text>
                <Text style={[styles.infoText, {paddingLeft: 20}]}>
                    {quoteDetail.Description} 
                </Text>
            </View>
        </View>
    );    
    return content;
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
        borderRadius: 5,
        borderWidth: 0.4,
        borderColor: Colors.lightGreyColor,        
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10
    },
    headerText: {
        textAlign: 'center',
        fontFamily: Fonts.boldFont,
        fontSize: 16
    },
    infoText: {
        fontFamily: Fonts.normalFont,
        fontSize: 15        
    }
});
export default QuoteDetail;