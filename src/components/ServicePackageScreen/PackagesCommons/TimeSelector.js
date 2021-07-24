import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';

const TimeSelector = ({ addMiscDataForPackage, ...props }) => {
    /*
        get first 5 dates from today
    */
    const [state, setState] = React.useState({
        selected: null
    })
    const currentDate = new Date();
    const timeArray = [];
    let startTime = 9; //24 hrs format
    let endTime = 19;
    let interval = 3;

    const selectTime = index => {
        setState({ selected: index });
        addMiscDataForPackage("timeData", timeArray[index]);
    }

    for (let i = startTime; i <= endTime; i = i + interval) {
        let timeString = null;
        if (i > 12) {
            //after AfterNoon > 12PM
            let val1 = i - 12;  //current time
            let val2 = val1 + interval; //time after interval
            timeString = `${val1}:00 PM - ${val2}:00 ${val2 <= 12 ? 'PM' : 'AM'}`;
        } else {
            //before afternoon till 12PM
            let val1 = i;  //current time
            let val2 = val1 + interval; //time after interval
            timeString = `${val1}:00 ${val1 >= 12 ? 'PM' : 'AM'} - ${val2 > 12 ? val2 - 12 : val2}:00 ${val2 >= 12 ? 'PM' : 'AM'}`;
        }
        timeArray.push(timeString);
    }

    return (
        <View style={{ padding: 10, }}>
            <Text style={styles.dateDayText}>Select time</Text>
            <FlatList
                horizontal
                data={timeArray}
                renderItem={({ item, index }) => {
                    const isSelected = index === state.selected;
                    return (
                        <TouchableOpacity
                            style={[styles.dateView, isSelected ? styles.active : styles.inactive]}
                            onPress={() => selectTime(index)}
                        >
                            <Text style={[styles.dateDayText, isSelected ? styles.activeText : styles.inactiveText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={{ paddingVertical: 15 }}
                keyExtractor={(item, index) => index + 'key'}
                extraData={timeArray}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dateView: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 6
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

export default TimeSelector;