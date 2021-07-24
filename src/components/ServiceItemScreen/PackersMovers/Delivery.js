import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { Fonts, Colors } from "../../../constants";
import { width } from '../../../constants/Layout';

const Delivery = ({parentState, setParentState, nextPage, prevPage, allowUserChooseLocationFromMap, ...props}) => {
    
    const [state, setState] = React.useState({
        validation: false,
        errorLists: ['deliveryAddress', 'deliveryFlatDetails']
    });

    const isErrorValidator = (data, type=null) => {
        const newErrorLists = [...state.errorLists];
        const index = newErrorLists.indexOf(type);
        if(state.validation && (data===undefined || data === null || data.length === 0)){
            return styles.errorBoundary;
        }else {
            if(type !== null && index > -1){
                newErrorLists.splice(index, 1);
                setState({
                    ...state,
                    errorLists: newErrorLists
                });
            }
            return {};
        }
    }

    const onClickContinue = () => {
        // first validate
        if(state.errorLists.length === 0) {
            nextPage();
        }else if(!state.validation){
            //check if validation is switched on
            setState({
                ...state,
                validation: true
            });
        }
    }

    const renderLocationClicker = () => {
        const address = parentState.deliveryAddress;
        const isReadyForFinal = address !== null;
        return (
            <View style={[styles.row, styles.section, isErrorValidator(address, isReadyForFinal ? 'deliveryAddress' : null)]}>
                <Icons name="location-sharp" style={styles.locationIcon} />
                <Text style={[styles.titleText, {marginHorizontal: 10}]}>
                    Location
                </Text>
                <TouchableOpacity onPress={allowUserChooseLocationFromMap}>
                    <Text style={styles.subTitleText} numberOfLines={1}>
                        {
                            address ? `${address.reverseAddress.title} ${address.reverseAddress.street}` : `Select Drop Location`
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderFlatDetails = () => {

        const updateFlatDetails = (label, data) => {
            let deliveryFlatDetails = {...parentState.deliveryFlatDetails};
            const isExist = deliveryFlatDetails[label] !== undefined;
            //check if the data has string content
            if(data.length > 0){
                deliveryFlatDetails[label] = data;
            }else{
                // if it doesnt and the label exists in object 
                // delete it
                if(isExist) delete deliveryFlatDetails[label];   
            }

            setParentState({
                ...parentState,
                deliveryFlatDetails
            });

        }

        const localErrorValidator = (data) => {
            const isAllInputsValidated = Object.keys(parentState.deliveryFlatDetails).length === 4; 
            const isAlreadyRemoved = state.errorLists.indexOf('deliveryFlatDetails') === -1;
            const isReadyForFinal = isAllInputsValidated && !isAlreadyRemoved; 
            const resolvedErrorStyle = isErrorValidator(data, isReadyForFinal ? 'deliveryFlatDetails' : null);
            if(Object.keys(resolvedErrorStyle).length === 0) {
                global.flatObjectErrorCount --;
            }else{
                global.flatObjectErrorCount ++;                
            }
            return resolvedErrorStyle;
        }
        

        return (
            <View style={styles.section}>
                <Text style={styles.titleText}>
                    Flat Details
                </Text>
                <TextInput 
                    placeholder="Enter Flat Name"
                    style={[styles.textInput, localErrorValidator(parentState.deliveryFlatDetails.flatName)]}
                    value={parentState.deliveryFlatDetails.flatName || null}
                    onChangeText={(text)=>updateFlatDetails('flatName', text)}
                />
                <TextInput 
                    placeholder="Enter Flat Number"
                    style={[styles.textInput, localErrorValidator(parentState.deliveryFlatDetails.flatNumber)]}
                    value={parentState.deliveryFlatDetails.flatNumber || null}                    
                    onChangeText={(text)=>updateFlatDetails('flatNumber', text)}                    
                />
                <TextInput 
                    placeholder="Enter Floor Number"
                    style={[styles.textInput, localErrorValidator(parentState.deliveryFlatDetails.flatFloorNumber)]}
                    keyboardType={'numeric'}
                    value={parentState.deliveryFlatDetails.flatFloorNumber || null}
                    onChangeText={(text)=>updateFlatDetails('flatFloorNumber', text)}                    
                />
                <TextInput 
                    placeholder="Enter Landmark"
                    style={[styles.textInput, localErrorValidator(parentState.deliveryFlatDetails.landmark)]}
                    value={parentState.deliveryFlatDetails.landmark || null}                    
                    onChangeText={(text)=>updateFlatDetails('landmark', text)}                    
                />                                                
            </View>
        );
    }

    const renderRoundedButton = (isActive, event) => {
        return (
            <TouchableOpacity
                style={[styles.radioButton, isActive ? styles.active : styles.inactive]}
                onPress={event}
            >
                {isActive && (
                    <View style={styles.roundedView} />
                )}
            </TouchableOpacity>            
        );
    }

    const renderLiftAvailabilty = () => {
        
        const updateLiftAvailability = () => {
            setParentState({...parentState, deliveryLiftAvailability: !parentState.deliveryLiftAvailability})
        }

        return (
            <View style={[styles.row, styles.section, {justifyContent: 'space-between'}]}>
                <Text style={styles.titleText}>
                    Lift availability
                </Text>
                {renderRoundedButton(parentState.deliveryLiftAvailability, updateLiftAvailability)}
            </View>
        );
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
            {renderLocationClicker()}
            {renderFlatDetails()}
            {renderLiftAvailabilty()}
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
    locationIcon: {
        fontSize: 16,
        color: Colors.blackColor,
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
    textInput: {
        marginTop: 10,
        borderColor: Colors.greyColor,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        color: Colors.darkGreyColor,
    },
    radioButton: {
        width: 22,
        height: 22,
        borderWidth: 0.5,
        borderColor: Colors.lightGreyColor,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        borderWidth: 1.5,
        borderColor: Colors.darkGreenColor,
    },
    inactive: {
        borderColor: Colors.lightGreyColor,
    },
    roundedView: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: Colors.darkGreenColor
    },
    buttonView: {
        marginVertical: 100,
        flexDirection: 'row',
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
    buttonText: {
        color: Colors.homeBackgroundColor,
        fontSize: 16,
        fontFamily: Fonts.normalFont,
    },
    errorBoundary: {
        padding: 4,
        borderWidth: 1,
        borderColor: Colors.redColor,
        borderRadius: 8
    }    
});
export default Delivery;