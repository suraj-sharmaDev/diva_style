import React from 'react';
import { FlatList } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import ServiceCard from './ServiceCard';

const Container = styled.View`
    padding: 10px;
`;
const Label = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    margin-bottom: 5px;
`;

const ServiceCartBody = props => {
    let content = (
        <Container>
            <Label>Added Services from {props.store.services.name}</Label>
            {
                props.store.services.type === 'package'
                ?
                    <ServiceCard
                        onRemoveService={props.onRemoveService}
                        type={'package'}
                        index={0}
                        item={props.store.services.data}
                    />
                    :
                    <>
                        <Label>Appointment Date {props.store.services.data.date.toDateString()}</Label>
                        <FlatList
                            data={props.store.services.data.symptoms}
                            renderItem={({ item, index }) => (
                                <ServiceCard
                                    onRemoveService={props.onRemoveService}                            
                                    type={'repair'}
                                    index={index}
                                    key={index}
                                    item={item}
                                />
                            )}
                            keyExtractor={(item, index) => index + 'key'}
                            extraData={props.store.services}
                        />
                    </>
            }
        </Container>
    );
    return content;
}

export default ServiceCartBody;
