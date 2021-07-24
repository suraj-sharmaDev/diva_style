import React from 'react';
import Icons from 'react-native-vector-icons/Feather';
import {StyleSheet, View} from 'react-native';
import styled from 'styled-components';
import { Fonts, Colors } from "../../../constants";

const Container = styled.ScrollView`
    padding: 5px 10px;
`;
const Label = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.normalFont};
`;
const Button = styled.TouchableOpacity``;

const Item = ({predicition, clickHandler}) => {
    return(
        <Button style={styles.predicition} onPress={()=>clickHandler(predicition)}>
            <Label>{predicition.structured_formatting.main_text}</Label>
            <Label>{predicition.description}</Label>
        </Button>
    );
}
const Predicitions = ({predicitions, clickHandler, ...props}) =>{
    let content = (
        <Container>
            {
                predicitions.map((p, index)=>(
                    <Item key={index} predicition={p} clickHandler={clickHandler} />
                ))
            }
        </Container>
    );
    return content;
}

const styles = StyleSheet.create({
    predicition: {
        backgroundColor: Colors.homeBackgroundColor,
        marginTop: 10,
        borderRadius: 6,
        padding: 5
    }
});
export default Predicitions;