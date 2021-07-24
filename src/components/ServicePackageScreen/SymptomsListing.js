import React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

import { AlertService } from '../../middleware/AlertService';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { width } from '../../constants/Layout';

import CarModel from './PackagesCommons/CarModel';
import DateSelector from './PackagesCommons/DateSelector';
import TimeSelector from './PackagesCommons/TimeSelector';

const Container = styled.View`
    padding: 15px 5px 10px 5px;
`;
const View = styled.View``;
const Row = styled.View`
    width: 80%;
    padding-horizontal: 10px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 18px;
`;
const Title = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.boldFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
`;
const Subtitle = styled.Text``;
const Button = styled.TouchableOpacity``;
const InfoText = styled.Text`
    font-size: 14px;
    font-family: ${Fonts.boldFont};
    color: ${Colors.greenColor};
    text-transform: capitalize;
`;
const ButtonText = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.boldFont};
    color: white;
    text-transform: capitalize;
`;

const Item = ({ symptom, clickHandler, ...props }) => {
    const [selected, updateSelected] = React.useState(false);
    const checkBoxHandler = () => {
        updateSelected(!selected);
        clickHandler(symptom.symptom);
    }
    return (
        <Row>
            <Button
                onPress={checkBoxHandler}
                style={[styles.radioButton, selected ? styles.active : styles.inactive]}
            >
                {
                    selected && (
                        <View style={styles.roundedView} />
                    )
                }
            </Button>
            <Title style={{ marginLeft: 30 }}>
                {symptom.symptom}
            </Title>
        </Row>
    );
}

const SymptomsListing = ({ 
    symptoms, 
    repairs,
    navigation, 
    actionHandler, 
    initialPaymentAmount,
    minBookDay,
    ...props
}) => {
    //to show the input field only for two wheeler or four wheeler
    const showCarModelInput = props.title == 'Two Wheeler' || props.title == 'Four Wheeler';
    const [formData, updateForm] = React.useState({
        symptoms: [],
        date: null,
        carModelData: null,
        dateData: null,
        timeData: null,
    });

    const addMiscDataForPackage = (label, data) => {
        let newState = { ...formData };
        newState[label] = data;
        updateForm(newState);
        // console.warn(label, data);
    }

    const selectHandler = (value, type = null) => {
        let data = { ...formData };
        if (type == null) {
            let isExist = data.symptoms.indexOf(value);
            if (isExist != -1) {
                data.symptoms.splice(isExist, 1);
            } else {
                data.symptoms.push(value);
            }
        } else {
            data.date = value;
        }
        updateForm(data);
    }

    const submitHandler = () => {
        //user has to take appointment 12 hrs from now
        if (showCarModelInput && formData.carModelData === null) {
            AlertService('Vehicle Information', 'Please enter vehicle information!', () => { });
            return;
        }
        if (formData.dateData === null) {
            AlertService('Select Date', 'Please select preferred date before booking service!', () => { });
            return;
        }
        if (formData.timeData === null) {
            AlertService('Select Time', 'Please select preferred time before booking service!', () => { });
            return;
        }
        if (formData.symptoms.length > 0) {
            actionHandler(formData);
        } else {
            AlertService('Missing Symptoms', 'Please select symptoms before booking service!', () => { });
            console.warn('kok', formData);
        }
    }

    let content = null;
    if (symptoms != null && symptoms) {
        content = (
            <Container>
                {
                    showCarModelInput && (
                        <CarModel
                            addMiscDataForPackage={addMiscDataForPackage}
                        />
                    )
                }
                <View style={styles.shadowView}>
                    <Title style={{ marginBottom: 15, paddingLeft: 10 }}>
                        What are the problems?
                    </Title>
                    {
                        symptoms.map((item, index) => (
                            <Item
                                key={index}
                                symptom={item}
                                clickHandler={selectHandler}
                            />
                        ))
                    }
                </View>
                {
                    repairs != null
                        ?
                        <Button
                            style={{ width: 150 }}
                            onPress={() => navigation.navigate('ServiceRepairPayCard', { repairs: repairs })}
                        >
                            <InfoText>Refer Rate Card*</InfoText>
                        </Button>
                        :
                        null
                }
                <DateSelector
                    addMiscDataForPackage={addMiscDataForPackage}
                    startDateOffset={minBookDay}
                    maxLimit={30}
                />
                <TimeSelector
                    addMiscDataForPackage={addMiscDataForPackage}
                />
                <View style={styles.bookView}>
                    <Button
                        style={styles.bookButton}
                        activeOpacity={0.7}
                        onPress={submitHandler}
                    >
                        <ButtonText>Book Service</ButtonText>
                        <Icons name="book-reader" size={18} color={'white'} />
                    </Button>
                </View>
            </Container>
        );
    }
    return content;
}

const styles = StyleSheet.create({
    shadowView: {
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
        paddingVertical: 12,
        marginTop: 20,
    },
    radioButton: {
        width: 25,
        height: 25,
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
    bookView: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookButton: {
        width: width / 2,
        paddingVertical: 10,
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20
    }
});

export default SymptomsListing;