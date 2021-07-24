import React from 'react';
import { Keyboard, TextInput, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import Icons from 'react-native-vector-icons/Entypo';
import { PlacesAutoFetch } from '../../../middleware/API';
import Predicitions from './Predictions';
import LocationSearch from './LocationSearch';
// import Data from './predictions.json';
import { Fonts, Colors } from "../../../constants";

const Container = styled.View`
    padding: 5px 10px 10px 10px;
`;
const Title = styled.Text`
    text-align: center;
    font-size: 20px;
    font-family: ${Fonts.boldFont};
`;
const Label = styled.Text`
    text-align: center;
    font-size: 15px;
    font-family: ${Fonts.normalFont};
`;
const Button = styled.TouchableOpacity``;

const FormBody = props => {
    const [timeOut, updateTimeOut] = React.useState(null);

    const [state, setState] = React.useState({
        type: null,
        predictions: [],
        focused: false,
        userMessage: null
    });

    React.useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onFocus);
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            state.predictions.length === 0 ? onBlur : null
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    });

    const onFocus = () => {
        setState({
            ...state,
            focused: true
        });
        props.inputFocused();
    }

    const onBlur = () => {
        setState({
            ...state,
            focused: false
        });
        props.inputBlurred();
    }

    const clickHandler = (data) => {
        // when a prediction is selected store the value
        onBlur();
        setState({
            ...state,
            predictions: []
        });
        const placeId = data.place_id;
        const passData = {
            reverseAddress: {
                title: data.structured_formatting.main_text,
                street: data.description
            },
            placeId: placeId
        }
        props.clickHandler(passData, 'prediction', state.type);
    }

    const onDescriptionHandler = text => {
        // save usermessage
        setState({
            ...state,
            userMessage: text
        })
    }

    const onSearchPlaces = (text, type) => {
        // fetch predictions when user is typing
        clearTimeout(timeOut);
        if (text.length > 0) {
            updateTimeOut(setTimeout(() => {
                PlacesAutoFetch(text)
                    .then((result) => {
                        setState({
                            type: type,
                            predictions: result.predictions
                        })
                    })
                    .catch((err) => {
                        console.warn(err);
                    })
            }, 1000));
        } else {
            setState({
                ...state,
                predictions: []
            });
        }
    }

    // const submitHandler = () => {
    //     if (props.deliveryAddress === null) {
    //         AlertService(
    //             'Required',
    //             'Drop Address is required field, please fill it!',
    //             () => { }
    //         )
    //     } else {
    //         props.submitHandler(state.userMessage);
    //     }
    // }

    const renderTitle = () => {
        switch (props.currentInput) {
            case "pickupAddress":
                return "Where are you now?";
            case "deliveryAddress":
                return "Select your drop location";
            case "userMessage":
                return "What are your problems?";
            default:
                return "Confirmation";
        }
    }

    const renderBody = () => {
        switch (props.currentInput) {
            case "pickupAddress":
                return (
                    <LocationSearch
                        onSearchPlaces={onSearchPlaces}
                        placeholder={'Search your pickup address'}
                        address={props.pickupAddress}
                        type={'pickup'}
                    />
                );
            case "deliveryAddress":
                return (
                    <LocationSearch
                        onSearchPlaces={onSearchPlaces}
                        placeholder={'Search your drop address'}
                        address={props.deliveryAddress}
                        type={'drop'}
                    />
                );
            case "userMessage":
                return (
                    <View>
                        <View style={[styles.shadow, { height: 100 }]}>
                            <TextInput
                                value={state.userMessage}
                                placeholder={'Enter Your Message For Us'}
                                style={styles.messageInput}
                                onChangeText={onDescriptionHandler}
                                multiline={true}
                                numberOfLines={3}
                            />
                        </View>
                    </View>
                );
            default:
                return (
                    <View>
                        <Button
                            style={[styles.userFeedData]}
                            onPress={() => props.nextPrevHandler('current', null, "pickupAddress")}
                        >
                            <View style={{ width: "80%" }}>
                                <Text style={styles.title}>
                                    Pickup Location :
                                </Text>
                                <Text style={styles.subtitle}>
                                    {`${props.pickupAddress.reverseAddress.title} ${props.pickupAddress.reverseAddress.street}`}
                                </Text>
                            </View>
                            <View style={[styles.editIcon]}>
                                <Icons name="pencil" size={12} color={Colors.greyColor} />
                            </View>
                        </Button>
                        <Button
                            style={[styles.userFeedData]}
                            onPress={() => props.nextPrevHandler('current', null, "deliveryAddress")}
                        >
                            <View style={{ width: "80%" }}>
                                <Text style={styles.title}>
                                    Drop Location :
                                </Text>
                                <Text style={styles.subtitle}>
                                    {`${props.deliveryAddress.reverseAddress.title} ${props.deliveryAddress.reverseAddress.street}`}
                                </Text>
                            </View>
                            <View style={[styles.editIcon]}>
                                <Icons name="pencil" size={12} color={Colors.greyColor} />
                            </View>
                        </Button>
                        <Button
                            style={[styles.userFeedData]}
                            onPress={() => props.nextPrevHandler('current', null, "userMessage")}
                        >
                            <View style={{ width: "80%" }}>
                                <Text style={styles.title}>
                                    Problems :
                                </Text>
                                <Text style={styles.subtitle} numberOfLines={2}>
                                    {props.userMessage}
                                </Text>
                            </View>
                            <View style={[styles.editIcon]}>
                                <Icons name="pencil" size={12} color={Colors.greyColor} />
                            </View>
                        </Button>
                    </View>
                );
        }
    }

    const renderButton = () => {
        switch (props.currentInput) {
            case "done":
                return (
                    <View style={styles.buttonGroup}>
                        <Button
                            onPress={props.submitHandler}
                            style={[styles.shadow, styles.button]}
                            activeOpacity={0.8}
                        >
                            <Label numberOfLines={2} style={{ color: 'white' }}>
                                Submit
                            </Label>
                        </Button>
                    </View>
                );
            default:
                return (
                    <View style={styles.buttonGroup}>
                        <Button
                            onPress={() => props.nextPrevHandler('previous')}
                            style={[styles.shadow, styles.button, { backgroundColor: Colors.greenColor }]}
                            activeOpacity={0.8}
                        >
                            <Label numberOfLines={2} style={{ color: 'white' }}>
                                Previous
                        </Label>
                        </Button>
                        <Button
                            onPress={
                                props.currentInput === "userMessage"
                                    ?
                                    () => props.nextPrevHandler('next', state.userMessage)
                                    :
                                    () => props.nextPrevHandler('next')
                            }
                            style={[styles.shadow, styles.button]}
                            activeOpacity={0.8}
                        >
                            <Label numberOfLines={2} style={{ color: 'white' }}>
                                Next
                            </Label>
                        </Button>
                    </View>
                );
        }
    }

    let content = (
        <Container>
            <Title>{renderTitle()}</Title>
            {renderBody()}
            <Predicitions
                predicitions={state.predictions}
                clickHandler={clickHandler}
            />
            {renderButton()}
        </Container>
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
        marginTop: 10,
    },

    formView: {
        backgroundColor: Colors.homeBackgroundColor,
        justifyContent: 'center',
        height: 35,
    },

    formGroup: {
        height: 35,
        alignItems: 'center',
        flexDirection: 'row'
    },

    label: {
        fontSize: 15,
        textTransform: 'capitalize',
        fontFamily: Fonts.boldFont
    },

    title: {
        fontSize: 14,
        textTransform: 'capitalize',
        fontFamily: Fonts.boldFont,
    },

    subtitle: {
        fontSize: 13,
        textTransform: 'capitalize',
        fontFamily: Fonts.normalFont,
    },

    messageInput: {
        width: '100%',
        flex: 1,
        fontFamily: Fonts.normalFont,
        alignItems: "flex-end",
        justifyContent: "flex-start",
    },

    buttonGroup: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    button: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: Colors.darkGreenColor
    },

    userFeedData: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 2
    },

    editIcon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.greenColor,
        borderRadius: 20
    }
});
export default FormBody;