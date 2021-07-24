import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import { Fonts, Colors } from "../../../constants";

const LocationSearch = ({
    onSearchPlaces, placeholder,
    address, type,
    ...props
}) => {

    const [timeOut, updateTimeOut] = React.useState(null);
    const [value, updateValue] = React.useState(null);

    React.useEffect(() => {
        if (address != null) {
            updateValue(`${address.reverseAddress.title} ${address.reverseAddress.street}`);
        } else {
            updateValue(null);
        }
    }, [address])

    const onChangeHandler = (text) => {
        clearTimeout(timeOut);
        updateValue(text);
        if (text.length > 1) {
            updateTimeOut(setTimeout(() => {
                // console.warn(text);
                onSearchPlaces(text, type);
            }, 1000));
        }
    }
    let content = (
        <View style={{ marginVertical: 15 }}>
            <View style={[styles.shadow, styles.formGroup]}>
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    style={styles.searchInput}
                    onChangeText={onChangeHandler}
                />
                <Icons
                    name="search"
                    size={18}
                    color={Colors.DarkGreyColor}
                    style={{ flex: 0.1 }}
                />
            </View>
        </View>
    );
    return content;
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 1,
        paddingLeft: 10,
        borderRadius: 4,
    },
    label: {
        fontSize: 15,
        textTransform: 'capitalize',
        fontFamily: Fonts.boldFont
    },
    formGroup: {
        height: 35,
        alignItems: 'center',
        flexDirection: 'row'
    },
    searchInput: {
        flex: 0.9,
        fontFamily: Fonts.normalFont,
    },
});
export default LocationSearch;