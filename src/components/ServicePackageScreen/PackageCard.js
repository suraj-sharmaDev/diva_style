import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const Container = styled.TouchableOpacity`
    flex-direction : column;
    align-items : center;
    justify-content: center;
    width : 120px;
    height : 80px;
    margin-vertical: 5px;
    margin-horizontal: 5px;
    border-top-start-radius : 10px;
    border-top-end-radius : 10px;
    border-bottom-start-radius : 10px;
    border-bottom-end-radius : 10px;  
    padding: 10px 2px;
    background-color : ${Colors.searchBarColor};
`;
const Label = styled.Text`
    font-size: 14px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
`;

const PackageCard = ({ info, selected, actionHandler, ...props}) => {
    const isSelected = selected === info.PackageId;
    let content = null;
    if(info != null){
        content = (
            <Container 
                style={[styles.displayView, isSelected ? styles.activeButton : null]} 
                onPress={()=>actionHandler(info)}
            >
                <Label
                    style={isSelected ? styles.activeText : null}
                >
                    {info.PackageName}
                </Label>
                {
                    info.Description
                    ?
                    <Label style={isSelected ? styles.activeText : null}>
                        {info.Description}
                    </Label>
                    :
                    null
                }
            </Container>
        );
    }
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
    activeButton: {
        backgroundColor: Colors.greenColor,
    },
    activeText: {
        color: 'white'
    }
});

export default PackageCard;