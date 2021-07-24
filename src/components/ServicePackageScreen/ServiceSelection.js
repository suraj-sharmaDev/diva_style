import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../constants';

const ServiceSelection = ({type, selectHandler, ...props}) => {
    let content = null;
    content = (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, type === 'package' ? styles.active : null ]}
                onPress={()=>selectHandler('package')}
            >
                <Text style={styles.buttonText}>
                    Packages
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, type === 'repair' ? styles.active : null ]}        
                onPress={()=>selectHandler('repair')}
            >
                <Text style={styles.buttonText}>
                    Repairs
                </Text>
            </TouchableOpacity>
        </View>
    );
    return content;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginHorizontal: 20,
        padding: 5
    },
    buttonText: {
        fontFamily: Fonts.boldFont,
        fontSize: 17
    },
    active: {
        borderBottomColor: Colors.greenColor,
        borderBottomWidth: 2,
        paddingBottom: 4,
    }
});

export default ServiceSelection;