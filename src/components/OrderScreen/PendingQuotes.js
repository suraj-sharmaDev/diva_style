import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import { Colors, Fonts } from '../../constants';
import QuoteRenderer from './QuoteRenderer';

const Theme = styled.View`
  background-color: ${Colors.homeBackgroundColor};
  padding: 10px;
`;
const View = styled.View``;
const Text = styled.Text``;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const _renderHeader = section => {
    const name = section.quoteDetail[0].productName;
    const type = section.type;
    let date = null;
    if (type === 'repair' || type === 'package') {
        let json = JSON.parse(section.quoteDetail[0].json);
        date = new Date(json.deliveryDate);
        const year = date.getFullYear();
        const month = months[date.getUTCMonth()];
        const day = date.getDate();
        date = `${month} ${day} ${year}`;
    }
    return (
        <View style={styles.header}>
            <View style={styles.row}>
                <Icons name="progress-wrench" size={20} color={Colors.darkGreyColor} />
                <Text style={styles.headerText}>{name}</Text>
            </View>
            {
                type === 'repair'
                    ?
                    <View style={styles.row}>
                        <Icons name="calendar" size={20} color={Colors.darkGreyColor} />
                        <Text style={styles.headerText}>{date}</Text>
                    </View>
                    :
                    <View style={styles.row}>
                        {
                            type === 'package'
                                ?
                                <Icons name="package" size={20} color={Colors.darkGreyColor} />
                                :
                                null
                        }
                        <Text style={styles.headerText}>
                            {
                                type === 'package'
                                    ?
                                    date
                                    :
                                    null
                            }
                        </Text>
                    </View>
            }
        </View>
    );
};

const _renderContent = (section, navigationHandler) => {
    const type = section.type;
    const quoteId = section.id;
    const deliveryAddress = JSON.parse(section.deliveryAddress);
    const status = section.status;
    const quote = section.quoteDetail[0];
    return (
        <View style={styles.container}>
            {_renderHeader(section)}
            <QuoteRenderer
                type={type}
                quoteId={quoteId}
                deliveryAddress={deliveryAddress}
                status={status}
                quote={quote}
                navigationHandler={navigationHandler}
            />
        </View>);
};

const PendingQuotes = ({ pendingQuotes, navigation, callback, ...props }) => {

    const navigationHandler = (quoteId) => {
        navigation.navigate('QuoteBidding', { quoteId: quoteId, callback: callback });
    }

    const categoryItemRowKeyExtractor = (item, index) => {
        return index + 'key';
    }

    let content = (
        <Theme>
            {
                pendingQuotes.length > 0
                    ?
                    <FlatList
                        data={pendingQuotes}
                        renderItem={({ item }) => _renderContent(item, navigationHandler)}
                        keyExtractor={categoryItemRowKeyExtractor}
                        extraData={pendingQuotes}
                    />
                    :
                    <View style={styles.header}>
                        <Text style={styles.totalText}>No Pending Services</Text>
                    </View>
            }
            <TouchableOpacity 
                style={styles.footerButton}
                onPress={props.navigateToRecentServices}
            >
                <Text style={styles.buttonText}>View Recent Services</Text>
            </TouchableOpacity>
        </Theme>
    );
    return content;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.homeBackgroundColor,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: Colors.lightGreyColor,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontFamily: Fonts.boldFont,
        fontSize: 17,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        padding: 5,
    },
    headerText: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: Fonts.normalFont,
        textTransform: 'capitalize'
    },
    totalText: {
        fontSize: 16,
        fontFamily: Fonts.boldFont,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    footerButton: {
        backgroundColor: Colors.darkGreenColor,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: Colors.homeBackgroundColor,
        fontFamily: Fonts.normalFont,
        fontSize: 16
    }
});

export default PendingQuotes;