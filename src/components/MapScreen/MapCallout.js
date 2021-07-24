import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import Marker from '../../assets/images/marker.png';
import {Fonts, Colors} from '../../constants';

const MapCallout = props => {
    let content = (
        <View style={styles.container}>
            <Image source={Marker} style={styles.markerImage}/>
            <Text style={styles.label}>{props.label}</Text>
        </View>
    );
    return content;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 55
    },
    markerImage: {
        borderRadius: 12,
        height: 30,
        width: 30
    },
    label:{
        fontFamily: Fonts.boldFont,
        fontSize: 12,
        padding: 2,
        backgroundColor: Colors.lighterGreenColor,
    }
});
export default MapCallout;