import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Colors } from '../../constants';


const BiddingCard = ({ item, acceptHandler, ...props }) => {
    let content = null;
    const quoteBiddingId = item.id;
    const serviceProviderId = item.serviceProviderId;
    const bidData = JSON.parse(item.json);
    content = (
        <View style={styles.container}>
            <View style={styles.itemView}>
                <View style={{ flex: 0.4, marginBottom: 6 }}>
                    <Text style={styles.headerText}>Item Name</Text>
                </View>
                <View style={[styles.itemRow, { flex: 0.2 }]}>
                    <Text style={styles.headerText}>Price</Text>
                </View>
                <View style={[styles.itemRow, { flex: 0.4 }]}>
                    <Text style={styles.headerText}>Service Charge</Text>
                </View>
            </View>
            {
                bidData.detail.map((b, index) => (
                    <View style={styles.itemView} key={index}>
                        <View style={{ flex: 0.4 }}>
                            <Text style={styles.infoText}>{b.productName}</Text>
                        </View>
                        <View style={[styles.itemRow, { flex: 0.2 }]}>
                            <Text style={styles.infoText}>{b.mrp} Rs</Text>
                        </View>
                        <View style={[styles.itemRow, { flex: 0.4 }]}>
                            <Text style={styles.infoText}>{b.serviceCharge} Rs</Text>
                        </View>
                    </View>
                ))
            }
            <View style={styles.footerSum}>
                <View style={{ flex: 0.4, marginBottom: 6 }}>
                </View>
                <View style={[styles.itemRow, { flex: 0.2 }]}>
                    <Text style={styles.headerText}>{bidData.master.totalAmount} Rs/-</Text>
                </View>
                <View style={[styles.itemRow, { flex: 0.4 }]}>
                    <Text style={styles.headerText}>{bidData.master.serviceCharge} Rs/-</Text>
                </View>
            </View>
            <Text style={styles.headerText}>
                Total Payable {
                    parseInt(bidData.master.serviceCharge) + parseInt(bidData.master.totalAmount)
                } Rs/-
            </Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={()=>acceptHandler(quoteBiddingId, serviceProviderId)}
            >
                <Text style={styles.buttonText}>Accept Bid</Text>
            </TouchableOpacity>
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
        backgroundColor: 'white',
        borderWidth: 0.4,
        borderColor: Colors.lightGreyColor,
        padding: 10,
        marginBottom: 10,
    },
    headerText: {
        fontFamily: Fonts.boldFont,
        fontSize: 14
    },
    infoText: {
        fontFamily: Fonts.normalFont,
        fontSize: 13
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemRow: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerSum: {
        marginVertical: 6,
        borderTopColor: Colors.lightGreyColor,
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        backgroundColor: Colors.greenColor,
        padding: 6,
        borderRadius: 6
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: Fonts.normalFont,
        fontSize: 14,
        color: 'white' 
    }
});

export default BiddingCard;