import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.TouchableOpacity`
    flex-direction : column;
    align-items : center;
    justify-content: center;
    width : 140px;
    height : 60px;
    margin-vertical: 5px;
    margin-horizontal: 5px;
    border-radius: 5px;
    padding: 10px 4px;
    background-color : ${Colors.searchBarColor};
`;
const Label = styled.Text`
    font-size: 14px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
`;

const RepairCard = ({ selected, info, actionHandler, ...props }) => {
    const currentName = info.RepairItems.replace(/\s+/g, '_').toLowerCase();
    let content = (
        <Container
            style={[styles.displayView, selected === currentName ? styles.active : styles.inActive]}
            onPress={() => actionHandler(info)}
        >
            <Label
                style={{ color: selected === currentName ? 'white' : 'black' }}
                numberOfLines={2}
            >
                {info.RepairItems}
            </Label>
        </Container>
    );
    return content;
}

const styles = StyleSheet.create({
    displayView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6.2,
        elevation: 2,
        borderColor: Colors.boxShadowColor,
        borderWidth: 0.4
    },
    active: {
        backgroundColor: Colors.greenColor,
    },
    inActive: {
        backgroundColor: Colors.greyColor,
    }
});

export default RepairCard;