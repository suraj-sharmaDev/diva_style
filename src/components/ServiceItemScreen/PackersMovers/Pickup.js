import React from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { Fonts, Colors } from "../../../constants";
import { AlertService } from '../../../middleware/AlertService';
import DateSelector from '../../ServicePackageScreen/PackagesCommons/DateSelector';
import Data from './Data.json';
import { width } from '../../../constants/Layout';

const Pickup = ({
    parentState, 
    setParentState, 
    nextPage, 
    prevPage, 
    allowUserChooseLocationFromMap, 
    minBookDay,
    ...props
}) => {

    const apiData = Data.items;

    const [state, setState] = React.useState({
        validation: false,
        errorLists: ['pickupAddress', 'pickupFlatDetails', 'flatSize', 'date']
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
        const address = parentState.pickupAddress.reverseAddress;
        const isReadyForFinal = address !== undefined;
        return (
            <View style={[styles.row, styles.section, isErrorValidator(address, isReadyForFinal ? 'pickupAddress' : null)]}>
                <Icons name="location-sharp" style={styles.locationIcon} />
                <Text style={[styles.titleText, {marginHorizontal: 10}]}>
                    Location
                </Text>
                <TouchableOpacity onPress={allowUserChooseLocationFromMap}>
                    <Text style={styles.subTitleText} numberOfLines={1}>
                        {
                            address ? `${address.title} ${address.street}` : `Select Pickup Location`
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderFlatDetails = () => {

        const updateFlatDetails = (label, data) => {
            let pickupFlatDetails = {...parentState.pickupFlatDetails};
            const isExist = pickupFlatDetails[label] !== undefined;
            //check if the data has string content
            if(data.length > 0){
                pickupFlatDetails[label] = data;
            }else{
                // if it doesnt and the label exists in object 
                // delete it
                if(isExist) delete pickupFlatDetails[label];   
            }

            setParentState({
                ...parentState,
                pickupFlatDetails
            });

        }

        const localErrorValidator = (data) => {
            const isAllInputsValidated = Object.keys(parentState.pickupFlatDetails).length === 4; 
            const isAlreadyRemoved = state.errorLists.indexOf('pickupFlatDetails') === -1;
            const isReadyForFinal = isAllInputsValidated && !isAlreadyRemoved; 
            const resolvedErrorStyle = isErrorValidator(data, isReadyForFinal ? 'pickupFlatDetails' : null);
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
                    style={[styles.textInput, localErrorValidator(parentState.pickupFlatDetails.flatName)]}
                    value={parentState.pickupFlatDetails.flatName || null}
                    onChangeText={(text)=>updateFlatDetails('flatName', text)}
                />
                <TextInput 
                    placeholder="Enter Flat Number"
                    style={[styles.textInput, localErrorValidator(parentState.pickupFlatDetails.flatNumber)]}
                    value={parentState.pickupFlatDetails.flatNumber || null}                    
                    onChangeText={(text)=>updateFlatDetails('flatNumber', text)}                    
                />
                <TextInput 
                    placeholder="Enter Floor Number"
                    style={[styles.textInput, localErrorValidator(parentState.pickupFlatDetails.flatFloorNumber)]}
                    keyboardType={'numeric'}
                    value={parentState.pickupFlatDetails.flatFloorNumber || null}
                    onChangeText={(text)=>updateFlatDetails('flatFloorNumber', text)}                    
                />
                <TextInput 
                    placeholder="Enter Landmark"
                    style={[styles.textInput, localErrorValidator(parentState.pickupFlatDetails.landmark)]}
                    value={parentState.pickupFlatDetails.landmark || null}                    
                    onChangeText={(text)=>updateFlatDetails('landmark', text)}                    
                />                                                
            </View>
        );
    }

    const renderRoundedButton = (isActive, event, isButton=true) => {
        if(isButton){
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
        }else{
            return (
                <View
                    style={[styles.radioButton, isActive ? styles.active : styles.inactive]}
                >
                    {isActive && (
                        <View style={styles.roundedView} />
                    )}
                </View>            
            );            
        }
    }

    const renderLiftAvailabilty = () => {
        
        const updateLiftAvailability = () => {
            setParentState({...parentState, pickupLiftAvailability: !parentState.pickupLiftAvailability})
        }

        return (
            <View style={[styles.row, styles.section, {justifyContent: 'space-between'}]}>
                <Text style={styles.titleText}>
                    Lift availability
                </Text>
                {renderRoundedButton(parentState.pickupLiftAvailability, updateLiftAvailability)}
            </View>
        );
    }

    const renderItemsForShifting = () => {

        const toggleItemButton = (item, indexOfItem) => {
            /**
             * First check if item is already present 
             * If yes then pop it, else push it
             */
            let chosenItems = {...parentState.chosenItems};
            if(indexOfItem > -1){
                // item already exist, remove it
                delete chosenItems[item];                
            }else {
                // item doesnt exist, add it
                const newItem = {
                    qty: '1',
                    wrap: false
                }
                chosenItems[item] = newItem;
            }

            setParentState({
                ...parentState,
                chosenItems
            });
        }

        const updateItemStat = (item, updateObj) => {
            const chosenItems = {...parentState.chosenItems};
            const key = Object.keys(updateObj)[0];
            if(chosenItems[item] !== undefined) {
                chosenItems[item][key] = updateObj[key];
            }

            setParentState({
                ...parentState,
                chosenItems
            });
            // console.warn(chosenItems);
        }

        return (
            <View style={styles.section}>
                {/**
                 * Table Header
                 */}
                <View style={styles.row}>
                    <View style={{flex: 0.6}}>
                        <Text style={styles.titleText}>
                            Items
                        </Text>
                    </View>
                    <View style={[styles.row, {flex: 0.4}]}>
                        <Text style={[styles.titleText, {flex: 0.5}]}>
                            Qty
                        </Text>
                        <Text style={[styles.titleText, {flex: 0.5}]}>
                            Wrap
                        </Text>
                    </View>
                </View>
                {/**
                 * Table Rows
                 */}         
                {
                    apiData.map((d, index)=>{
                        const key = index+'key';
                        const indexOfItemInChosenItems = Object.keys(parentState.chosenItems).indexOf(d);
                        const itemInChosenItems = parentState.chosenItems[d] || null;
                        const isActive = indexOfItemInChosenItems > -1;
                        return (
                            <View style={[styles.row, {marginVertical: 5}]} key={key}>
                                <TouchableOpacity 
                                    style={[styles.row, {flex: 0.6}]}
                                    onPress={()=>toggleItemButton(d, indexOfItemInChosenItems)}
                                >
                                    {renderRoundedButton(isActive, ()=>{}, false)}
                                    <Text style={[styles.subTitleText, {marginLeft: 10}]}>
                                        {d}
                                    </Text>
                                </TouchableOpacity>
                                <View style={[styles.row, {flex: 0.4}]}>
                                    <View style={{flex: 0.5}}>
                                        <TextInput
                                            editable={isActive}
                                            style={styles.smallBox}
                                            textAlign={'center'}
                                            keyboardType={'numeric'}
                                            placeholder={'1'}
                                            value={itemInChosenItems !== null ? itemInChosenItems.qty : null}
                                            onChangeText={(text)=>updateItemStat(d, {qty: text})}
                                        />
                                    </View>
                                    <View style={{flex: 0.5}}>
                                        <TouchableOpacity 
                                            style={styles.smallBox}
                                            onPress={()=>updateItemStat(d, {wrap: itemInChosenItems !== null && !itemInChosenItems.wrap})}
                                        >
                                            {(itemInChosenItems !== null && itemInChosenItems.wrap) && (
                                                <Icons name="md-checkmark-sharp" size={20} />
                                            )}
                                        </TouchableOpacity>
                                    </View>                                    
                                </View>
                            </View>
                        );
                    })
                }       
            </View>
        );        
    }

    const renderFlatSize = () => {
        const flatArray = ["1 BHK", "2 BHK", "3 BHK"];

        const selectFlatSize = (item) => {
            setParentState({
                ...parentState,
                flatSize: item,
            })
        }

        const isReadyForFinal = parentState.flatSize !== null;
        return (
            <View style={[styles.section, isErrorValidator(parentState.flatSize, isReadyForFinal ? 'flatSize' : null)]}>
                <Text style={styles.titleText}>Choose Size</Text>
                <FlatList 
                    horizontal
                    data={flatArray}
                    renderItem={({ item, index }) => {
                        const isSelected = parentState.flatSize === item;
                        return (
                            <TouchableOpacity 
                                style={[styles.boxedView, isSelected ? styles.active : styles.inactive]}
                                onPress={()=>selectFlatSize(item)}
                            >
                                <Text style={[styles.subTitleText, isSelected ? styles.activeText : styles.inactiveText]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    contentContainerStyle={{ paddingVertical: 15 }}
                    keyExtractor={(item, index) => index + 'key'}
                    extraData={flatArray}                    
                />
            </View>
        );
    }

    const renderDateForShifting = () => {
        const addMiscDataForPackage = (label, data, index) => {
            setParentState({
                ...parentState,
                date: data,
                dateSelectedIndex: index
            })
            // console.warn(label, data);
        }
        const isReadyForFinal = parentState.date !== null;
        return (
            <View style={[styles.section, isErrorValidator(parentState.date, isReadyForFinal ? 'date' : null)]}>
                <DateSelector
                    addMiscDataForPackage={addMiscDataForPackage}
                    startDateOffset={minBookDay}
                    maxLimit={30}
                    dateSelectedIndex={parentState.dateSelectedIndex}
                />
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
            {renderItemsForShifting()}
            {renderFlatSize()}
            {renderDateForShifting()}
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
        // fontSize: 15,
        // fontFamily: Fonts.extraBoldFont,
        // color: Colors.semiDarkGreyColor
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
    smallBox: {
        borderWidth: 1,
        borderColor: Colors.lightGreyColor,
        width: 28,
        height: 22,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxedView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.lightGreyColor,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 6,
        borderWidth: 0.4,
    },
    activeText: {
        fontFamily: Fonts.boldFont,
        color: Colors.darkGreenColor
    },
    inactiveText: {
        color: Colors.darkGreyColor
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
export default Pickup;