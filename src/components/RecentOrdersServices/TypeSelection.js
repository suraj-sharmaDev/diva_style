import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Colors, Fonts} from '../../constants';

const TypeSelection = ({type, typeSelector, ...props}) => {
    let content = (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>typeSelector('orders')}
                style={[styles.button, type==='orders' ? styles.active : null]}
            >
                <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>typeSelector('services')}            
                style={[styles.button, type==='services' ? styles.active : null]}
            >
                <Text style={styles.buttonText}>Services</Text>
            </TouchableOpacity>            
        </View>
    );
    return content;
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingBottom: 8,
    },
    active: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.greenColor
    },
    buttonText: {
        fontSize: 17,
        fontFamily: Fonts.boldFont
    }
})
export default TypeSelection;