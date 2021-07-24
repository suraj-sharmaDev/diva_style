import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { Fonts, Colors } from "../../../constants";
import { width } from '../../../constants/Layout';
import { AlertService } from '../../../middleware/AlertService';

const Final = ({parentState, setParentState, prevPage, ...props}) => {
    // const parentState = {
    //     pickupAddress: {
    //         reverseAddress: {
    //             title: 'hello',
    //             street: 'world'
    //         }
    //     },
    //     deliveryAddress: {
    //         reverseAddress: {
    //             title: 'hello',
    //             street: 'world'
    //         }
    //     },
    //     pickupFlatDetails: {
    //         flatName: 'Ace Nimbus',
    //         flatNumber: '3C',
    //         flatFloorNumber: '3',
    //     },
    //     deliveryFlatDetails: {
    //         flatName: 'Ace Nimboos',
    //         flatNumber: '6E',
    //         flatFloorNumber: '6',
    //     }
    // };

    const onClickContinue = () => {
        // form submission
        try {
            let formData = {
                "master": {
                    "customerId": props.user.userId,
                    "deliveryAddress": {
                        "coordinate": {
                            "latitude": parentState.pickupAddress.latitude,
                            "longitude": parentState.pickupAddress.longitude
                        },
                        "houseDetail": parentState.pickupAddress.reverseAddress.title,
                        "landmark": parentState.pickupAddress.reverseAddress.street
                    },
                    "type": "movers",
                    "categoryId": props.categoryId
                },
                "detail": [
                    {
                        "productName": props.categoryName,
                        "json": {
                            "PackageItemName": `${props.categoryName}`,
                            "deliveryDate": parentState.date,
                            "destination": {
                                "latitude": parentState.deliveryAddress.latitude,
                                "longitude": parentState.deliveryAddress.longitude,
                                "houseDetail": parentState.deliveryAddress.reverseAddress.title,
                                "landmark": parentState.deliveryAddress.reverseAddress.street,
                            },
                            pickupFlatDetails: {
                                ...parentState.pickupFlatDetails,
                                liftAvailability : parentState.pickupLiftAvailability,
                                itemsToBeShifted: parentState.chosenItems
                            },
                            deliveryFlatDetails: {
                                ...parentState.deliveryFlatDetails,
                                liftAvailability : parentState.deliveryLiftAvailability
                            }
                        }
                    }
                ]
            };

            AlertService(
                'Confirm',
                `Request Packers and Movers service!`,
                () => {
                    // post quote for breakdown service
                    props.onSubmitQuoteHandler(formData);
                }
            );

            // console.warn(formData);
        } catch (error) {
            console.warn(error)
        }
    }

    const onClickEdit = (type) => {
        setParentState({
            ...parentState,
            currentInput: type
        })
    }

    const renderPickupDetails = () => {
        const type = 'pickupAddress';
        return(
            <View style={styles.section}>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={styles.titleText}>Pickup</Text>
                    <TouchableOpacity style={styles.editButton} onPress={()=>onClickEdit(type)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                {renderLocationSpecificDetails(type)}
            </View>
        );
    }

    const renderDeliveryDetails = () => {
        const type = 'deliveryAddress';
        return(
            <View style={styles.section}>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={styles.titleText}>Drop</Text>
                    <TouchableOpacity style={styles.editButton} onPress={()=>onClickEdit(type)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                {renderLocationSpecificDetails(type)}                
            </View>
        );
    }

    const renderLocationSpecificDetails = (type) => {
        const addressDetails = parentState[type];
        const flatDetails = type === 'pickupAddress' ? parentState.pickupFlatDetails : parentState.deliveryFlatDetails;
        return (
            <View style={styles.section}>
                <View style={styles.boxedView}>
                    <Text style={styles.subTitleText} numberOfLines={1}>
                        {
                            `${addressDetails.reverseAddress.title} ${addressDetails.reverseAddress.street}`
                        }
                    </Text>
                </View>
                <View style={styles.boxedView}>
                    <Text style={styles.subTitleText} numberOfLines={1}>
                        {flatDetails.flatName}
                    </Text>
                </View>
                <View style={styles.boxedView}>
                    <Text style={styles.subTitleText} numberOfLines={1}>
                        {flatDetails.flatNumber}
                    </Text>
                </View>
                <View style={styles.boxedView}>
                    <Text style={styles.subTitleText} numberOfLines={1}>
                        {flatDetails.flatFloorNumber}
                    </Text>
                </View>                                
            </View>
        )
    }

    const renderContinueButton = () => {
        return (
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.continueButton} onPress={onClickContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={{paddingBottom: 150}}
        >
            {renderPickupDetails()}
            {renderDeliveryDetails()}
            {renderContinueButton()}
        </ScrollView>        
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        marginTop: 10,
    },
    titleText: {
        fontSize: 16,
        fontFamily: Fonts.normalFont,
    },
    subTitleText: {
        fontSize: 15,
        fontFamily: Fonts.normalFont,
        color: Colors.semiDarkGreyColor        
    },
    editButton: {
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 4
    },
    buttonText: {
        color: Colors.homeBackgroundColor,
        fontSize: 16,
        fontFamily: Fonts.normalFont,
    },
    boxedView: {
        borderWidth: 0.8,
        borderColor: Colors.lightGreyColor,
        padding: 10,
        borderRadius: 7,
        marginTop: 10
    },
    buttonView: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButton: {
        width: width / 1.5,
        paddingVertical: 10,
        backgroundColor: Colors.darkGreenColor,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },    
});

export default Final;