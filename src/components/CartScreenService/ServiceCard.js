import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
const Container = styled.View``;
const Title = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.boldFont};
    color: ${Colors.blackColor};
    margin-bottom: 5px;
`;
const Button = styled.TouchableOpacity`
    background-color: ${Colors.greenColor};
    padding: 4px 10px;
    border-radius: 3px;
`;
const Label = styled.Text`
    font-size: 14px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
`;

const ServiceCard = ({item, type, index, ...props}) => {
    let content = null;
    const isPackage = type === 'package';
    if(isPackage){
        content = (
            <Container
                style={[styles.packageCard, styles.shadow]}
            >
                <View>
                    <View style={styles.packageName}>
                        <Title>{item.PackageItemName}</Title>
                    </View>
                    <View style={styles.packageDetail}>
                        <View style={{flexDirection: 'row'}}>
                            <Title>Rate </Title> 
                            <Label>Rs {item.Rate}/-</Label>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Title>Offer Rate </Title> 
                            <Label>Rs {item.OfferRate}/-</Label>
                        </View>
                    </View>
                </View>
                <Button onPress={()=>props.onRemoveService({type: type, index: index})}>
                    <Label style={{color: 'white'}}>Remove</Label>
                </Button>
            </Container>
        );
    }else{
        content = (
            <Container
                style={[styles.repairCard]}
            >
                <Icon name="dot-single" size={34} color={Colors.greenColor}/>
                <Title>{item}</Title>
                {
                    // <Button onPress={() => props.onRemoveService({ type: type, index: index })}>
                    //     <Label style={{ color: 'white' }}>Remove</Label>
                    // </Button>
                }
            </Container>
        );        
    }
    return content;
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6.2,
        elevation: 2,
        borderColor: Colors.boxShadowColor,
        borderWidth: 0.4,
        borderRadius: 8,
    },
    packageCard: {
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
    },
    packageName: {
        justifyContent: 'center',
    },
    packageDetail: {
        justifyContent: 'center',        
    },
    repairCard: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    }
});

export default ServiceCard;