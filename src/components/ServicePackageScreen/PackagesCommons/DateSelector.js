import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';

const DateSelector = ({ 
    addMiscDataForPackage, 
    startDateOffset = 1,
    maxLimit, 
    dateSelectedIndex=null, 
    ...props 
}) => {
    /*
        get first 5 dates from today
    */
    const [state, setState] = React.useState({
        selected: dateSelectedIndex
    })
    const currentDate = new Date();
    const dateArray = [];

    const selectDate = index => {
        setState({ selected: index });
        addMiscDataForPackage("dateData", dateArray[index], index);
    }

    for (let i = startDateOffset; i <= maxLimit; i++) {
        let newDate = new Date();
        newDate.setDate(currentDate.getDate() + i)
        dateArray.push(newDate);
    }

    return (
        <View>
            <Text style={styles.dateDayText}>Select date</Text>
            <FlatList
                horizontal
                data={dateArray}
                renderItem={({ item, index }) => {
                    const isSelected = index === state.selected;
                    return (
                        <TouchableOpacity
                            style={[styles.dateView, isSelected ? styles.active : styles.inactive]}
                            onPress={() => selectDate(index)}
                        >
                            <Text style={[styles.dateDayText, isSelected ? styles.activeText : styles.inactiveText]}>
                                {moment(item).format('DD')}
                            </Text>
                            <Text style={[styles.dateMonthText, isSelected ? styles.activeText : styles.inactiveText]}>
                                {moment(item).format('MMM')}
                            </Text>
                        </TouchableOpacity>
                    );
                }
                }
                contentContainerStyle={{ paddingVertical: 15 }}
                keyExtractor={(item, index) => index + 'key'}
                extraData={dateArray}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dateView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.lightGreyColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 6,
        borderWidth: 0.4,
    },

    dateDayText: {
        fontSize: 16,
        fontFamily: Fonts.normalFont,
    },

    dateMonthText: {
        fontSize: 15,
        fontFamily: Fonts.lightFont,
    },

    active: {
        borderWidth: 1.4,
        borderColor: Colors.darkGreenColor
    },

    inactive: {
        borderColor: Colors.darkGreenColor
    },

    activeText: {
        fontFamily: Fonts.boldFont,
        color: Colors.darkGreenColor
    },

    inactiveText: {
        color: Colors.darkGreyColor
    }
})

export default DateSelector;