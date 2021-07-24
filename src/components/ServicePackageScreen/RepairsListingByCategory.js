import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import styled from 'styled-components';
import {height, width} from '../../constants/Layout';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const Container = styled.View`
    padding: 10px;
`;
const Label = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
    text-align: center;
    margin: 5px 0px;
`;
const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text``;

const Item = ({selected, info, type }) => {
    let name;
    let min_rate;
    let max_rate;
    if(type === 'repairServiceCharge'){
        name = info.RepairItemsPart;
        min_rate = info.OfferRate;
        max_rate = info.Rate;
    }else if(type === 'repairPartsRate'){
        name = info.RepairPartName;
        min_rate = info.Min_Rate;
        max_rate = info.Max_Rate;
    }else{
        name = info.SparePartName;
        min_rate = info[`${selected}_min`];
        max_rate = info[`${selected}_max`];
    }
    return (
        <View style={{...styles.row, ...styles.normalBorder}}>
            <View style={styles.nameColumn}>
                <Label>{name}</Label>                
            </View>
            <View style={styles.priceColumn}>
                <Label>{min_rate!=0 ? min_rate : 'N/A'}</Label>                
            </View>
            <View style={styles.priceColumn}>
                <Label>{max_rate != 0 ? max_rate : 'N/A'}</Label>                
            </View>
        </View>
    );
}

const TableHeader = ({type, ...props}) => {
    return(
            <View style={{...styles.row, ...styles.headerBorder}}>
                <View style={styles.nameColumn}>
                    <Label>
                        {
                            type === 'repairPartsRate'
                            ?
                            'Repair Part'
                            :
                            'Spair Part'                            
                        }
                    </Label>                
                </View>
                <View style={styles.priceColumn}>
                    <Label>Min Rate</Label>                
                </View>
                <View style={styles.priceColumn}>
                    <Label>Max Rate</Label>                
                </View>
            </View>        
    );
}
const ButtonGroup = ({type, serviceStatus, showServiceCharge, ...props}) => {
    return (
            <View style={styles.buttonGroup}>
                <Button 
                    style={[styles.nameColumn, styles.button, serviceStatus ? styles.inActive : styles.active]}
                    onPress={()=>showServiceCharge(false)}
                >
                    <ButtonText style={{ color: serviceStatus ? 'black': 'white'}}>
                        {
                            type === 'repairPartsRate'
                            ?
                            'Repair Parts'
                            :
                            'Spair Parts'
                        }
                    </ButtonText>
                </Button>
                <Button 
                    style={[styles.nameColumn, styles.button, serviceStatus ? styles.active : styles.inActive]}
                    onPress={()=>showServiceCharge(true)}
                >
                    <ButtonText style={{ color: serviceStatus ? 'white': 'black'}}>
                        Service Charges
                    </ButtonText>
                </Button>
            </View>        
    );
}
const RepairsListingByCategory = ({details, selected, type, ...props}) => {
    const [serviceStatus, updateServiceStatus] = React.useState(false);
    const renderListFooter = () => {
        return <View style={{paddingBottom : 100}} />
    };    
    const showServiceCharge = (status) => {
        if(status){
            updateServiceStatus(true);
        }else{
            updateServiceStatus(false); 
        }
    }
    let content = null;
    if(details != null && selected != null){
        content = (
            <>
                <ButtonGroup 
                    type={type} 
                    serviceStatus={serviceStatus} 
                    showServiceCharge={showServiceCharge}
                />
                <TableHeader type={type} serviceStatus={serviceStatus}/>
                <FlatList
                    data={details[serviceStatus ? 'repairServiceCharge' :type]}
                    renderItem={({ item }) => (
                        <Item
                            selected = {selected}
                            info = {item}
                            type = {serviceStatus ? 'repairServiceCharge' :type}
                        />
                    )}
                    ListFooterComponent={renderListFooter}
                    keyExtractor={(item, index) => index + 'key'}
                    extraData={[selected, serviceStatus]}
                />                
            </>
        );
    }
    return (
    <Container onLayout={props.onLayout}>
        {content}
    </Container>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    headerBorder: {
        borderBottomColor: Colors.darkGreyColor,
        borderBottomWidth: 1
    },
    normalBorder: {
        borderBottomColor: Colors.searchBarColor,
        borderBottomWidth: 1        
    },
    nameColumn: {
        width: '50%',
        alignItems: 'center'
    },
    priceColumn: {
        width: '25%'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: 52,
        padding: 8
    },
    button: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginHorizontal: 4
    },
    active: {
        backgroundColor: Colors.greenColor,
    },
    inActive: {
        backgroundColor: Colors.greyColor,
    }
});
export default RepairsListingByCategory;