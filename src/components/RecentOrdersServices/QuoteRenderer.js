import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from "react-native-image-viewing";
import { Colors, Fonts } from '../../constants';
import {height, width} from '../../constants/Layout';

const QuoteRenderer = ({
    type, 
    quoteId, 
    deliveryAddress,
    quote, 
    status,
    billImage,
    navigationHandler, 
    ...props
}) => {

    const [showModal, setShowModal] = React.useState(false);

    const onClickBillImage = () => {
        setShowModal(!showModal);
    }

    const renderBillImage = () => {
        if(billImage) {
            return (
                <React.Fragment>
                    <TouchableOpacity onPress={onClickBillImage}>
                        <Image 
                            source={{uri: billImage}}
                            style={styles.smallBillImage}
                        />
                    </TouchableOpacity>
                    <ImageView
                        images={[{uri: billImage}]}
                        imageIndex={0}
                        visible={showModal}
                        onRequestClose={onClickBillImage}
                    />
                </React.Fragment>
            );
        }
        return null;
    }

    const detail = JSON.parse(quote.json);
    let content = null;
    if (type === 'package') {
        content = (
            <View style={styles.quoteView}>
                <View style={styles.row}>
                    <Text style={[styles.quoteLabel, { marginRight: 6 }]}>Address</Text>
                    <Text style={styles.quoteText}>{deliveryAddress.houseDetail} {deliveryAddress.landmark}</Text>
                </View>
                <View style={styles.quoteDetail}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.quoteLabel}>Selected Package for</Text>
                        <Text style={styles.quoteText}>{detail.PackageItemName}</Text>
                    </View>
                    <View>
                        <Text style={styles.quoteText}>Rate Rs {detail.Rate}</Text>
                        <Text style={styles.quoteText}>Offer Rate Rs {detail.OfferRate}</Text>
                    </View>
                </View>
                {renderBillImage()}
                <View>
                    <Text style={styles.infoText}>Current Status {status}</Text>
                </View>
            </View>
        );
    } else if (type === 'repair') {
        content = (
            <View style={styles.quoteView}>
                <View style={styles.row}>
                    <Text style={[styles.quoteLabel, { marginRight: 6 }]}>Address</Text>
                    <Text style={styles.quoteText}>{deliveryAddress.houseDetail} {deliveryAddress.landmark}</Text>
                </View>
                <View style={styles.quoteDetail}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.quoteText}>Selected Repair Service for {quote.productName}</Text>
                    </View>
                    <View>
                        {
                            detail.symptoms.map((d, index) => (
                                <View style={styles.row} key={index}>
                                    <Icons name="circle-medium" size={18} />
                                    <Text style={styles.quoteText}>{d}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                {renderBillImage()}
                <View>
                    <Text style={styles.infoText}>Current Status {status}</Text>
                </View>
            </View>
        );
    } else {
        //break down service or packers and movers
        const dropAddress = JSON.parse(quote.json).destination;
        content = (
            <View style={styles.quoteView}>
                <View style={styles.row}>
                    <Text style={[styles.quoteLabel, { marginRight: 6 }]}>Pickup</Text>
                    <Text style={styles.quoteText}>{deliveryAddress.houseDetail} {deliveryAddress.landmark}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.quoteLabel, { marginRight: 6 }]}>Destination</Text>
                    <Text style={styles.quoteText}>{dropAddress.houseDetail} {dropAddress.landmark}</Text>
                </View>
                {renderBillImage()}
                <View>
                    <Text style={[styles.infoText, { marginTop: 10 }]}>Current Status {status}</Text>
                </View>
            </View>
        );
    }
    return content;
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quoteView: {
        borderTopWidth: 1,
        borderTopColor: Colors.greyColor,
        padding: 10,
    },
    infoText: {
        fontFamily: Fonts.boldFont,
        fontSize: 17,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    quoteDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
        paddingRight: 20
    },
    quoteLabel: {
        fontSize: 14,
        fontFamily: Fonts.boldFont,
    },
    quoteText: {
        fontSize: 14,
        fontFamily: Fonts.normalFont,
        flexShrink: 1,
        textTransform: "capitalize"
    },
    button: {
        width: 140,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        marginVertical: 6,
        backgroundColor: Colors.greenColor,
        borderRadius: 3
    },
    buttonText: {
        fontSize: 14,
        fontFamily: Fonts.normalFont,
        color: 'white'
    },
    billImageContainer: {

    },
    smallBillImage: {
        height: 100,
        width: 100
    },
    largeBillImage: {

    }
});

export default QuoteRenderer;