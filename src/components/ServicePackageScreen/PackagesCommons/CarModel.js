import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import { width, height } from '../../../constants/Layout';
import Icons from "react-native-vector-icons/MaterialIcons";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding-horizontal: 10;
    padding-vertical: 3;
    background-color: white;
    border-radius: 7px;
    width: 100%;
`;

const Input = styled.TextInput`
    margin-left: 12px;
    width: 90%;
    font-family: ${Fonts.boldFont};
`;

const CarModel = ({ addMiscDataForPackage, ...props }) => {
    const onBlurSaveData = (text) => {
        if (text.length > 0) {
            addMiscDataForPackage("carModelData", text);
        }
    }

    return (
        <Container style={[styles.boxShadow]}>
            <Icons name="directions-car" size={22} />
            <Input
                placeholder="Enter vehicle model"
                placeholderTextColor={Colors.lightGreyColor}
                blurOnSubmit={true}
                onEndEditing={(event) => (onBlurSaveData(event.nativeEvent.text))}
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})

export default CarModel;