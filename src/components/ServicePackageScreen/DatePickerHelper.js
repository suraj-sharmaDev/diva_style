import React from 'react';
import {StyleSheet} from 'react-native';
import {DatePicker} from 'native-base';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import styled from 'styled-components';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import {width} from '../../constants/Layout';

const Container = styled.View`
    margin-top: 20px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;
const Text = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.boldFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
`;
const DatePickerHelper = props => {
    const currentDate = new Date();
    let minDate = new Date();
    minDate.setDate(currentDate.getDate()+1);
    let maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 5);
    let content = (
        <Container style={styles.container}>
            <Icons name="calendar" size={18} style={{marginRight: 20}}/>
            <DatePicker
                defaultDate={minDate}
                minimumDate={minDate}
                maximumDate={maxDate}
                formatChosenDate={date => {return moment(date).format('DD MMM YYYY');}}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: Colors.blackColor }}
                placeHolderTextStyle={{ color: Colors.darkGreyColor }}
                onDateChange={(date)=>props.selectHandler(date, 'date')}
                disabled={false}
            />
        </Container>
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
        backgroundColor: 'white',
        borderRadius: 8,
    }
});
export default DatePickerHelper;