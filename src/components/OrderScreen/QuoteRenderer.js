import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Fonts } from '../../constants';

const QuoteRenderer = ({
    type, quoteId, deliveryAddress,
    quote, status,
    navigationHandler, ...props
}) => {
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
                <View>
                    <Text style={styles.infoText}>Current Status {status}</Text>
                </View>
            </View>
        );
    } else {
        //break down service or packers and movers
        const dropAddress = JSON.parse(quote.json).destination;
        const countBiddings = quote.biddingCount;
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
                <View style={styles.quoteDetail}>
                    <Text style={styles.quoteLabel}>
                        Waiting for {type === 'breakdown' ? 'Breakdown Assistance' : 'Packers and Movers'}
                    </Text>
                </View>
                <View>
                    {
                        countBiddings > 0
                            ?
                            <>
                                {
                                    status === 'pending'
                                        ?
                                        <>
                                            <Text style={styles.quoteText}>
                                                Your quote has been bidded {countBiddings} times
                                    </Text>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => navigationHandler(quoteId)}
                                            >
                                                <Text style={styles.buttonText}>
                                                    See Biddings
                                        </Text>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <Text style={styles.quoteText}>
                                            Please wait for service provider to contact you!
                                    </Text>
                                }
                            </>
                            :
                            <Text style={styles.quoteLabel}>
                                Waiting for agents to bid your quote
                            </Text>
                    }
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
    }
});

export default QuoteRenderer;