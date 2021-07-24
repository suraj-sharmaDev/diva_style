import React from 'react';
import { Animated, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PlaceDetails, ReverseLookup } from '../../../middleware/API';
import GeolocationService from '../../../middleware/GeolocationService';
import { AlertService } from '../../../middleware/AlertService';
import { splitCamelCase } from '../../../middleware/MiscFunctions';

import MapDisplay from '../../MapScreen/MapDisplay';
import FormBody from './FormBody';
import { height, width } from "../../../constants/Layout";

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Container = styled.View`
    height : ${height};
    width : ${width};
`;

const BreakdownService = props => {
    // the choices are in order of screen to be displayed as per user inputs
    const choices = ["pickupAddress", "deliveryAddress", "userMessage", "done"];
    const typeMapChoices = ["pickupAddress", "deliveryAddress"];
    const currentAddress = props.address.savedAddresses[props.address.currentAddress];
    const [state, setState] = React.useState({
        pickupAddress: {
            ...currentAddress.coordinate,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        deliveryAddress: null,
        userMessage: null,
        currentInput: "pickupAddress",   //to keep track of current input
        loading: true,
        type: null
    });
    let mapHeight = new Animated.Value(height * 0.5);
    let formHeight = new Animated.Value(height * 0.5);
    let mapAnimationStyle = { height: mapHeight };

    React.useEffect(() => {

        if (state.currentInput === "pickupAddress") {
            onLocation(state.pickupAddress);
        }

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                return true;
            }
        );

        return () => {
            backHandler.remove();
            // GeolocationService(false, onPermissionDenial, onLocation);
        }
    }, []);

    const onRegionChange = (data) => {
        //first check whats the currentInput type
        try {
            let comparedData = state[state.currentInput];
            if (comparedData !== null && data) {
                if (data.latitude.toFixed(4) === comparedData.latitude.toFixed(4)
                    && data.longitude.toFixed(4) === comparedData.longitude.toFixed(4)) {
                    return;
                } else {
                    if (state.type === 'pickup') {
                        //else the loop will go as below
                        //1. onLocation will change map position
                        //2. changing map position fires on regionChange
                        //3. which in return fires onLocation
                        //to stop this fire onLocation only when type is pickup
                        onLocation(data, 'map');
                    } else if (state.type === 'delivery') {
                        onLocation(data, 'map');
                    }
                }
            } else {
                onLocation(data, 'map');
            }
        } catch (error) {
            console.warn(error);
        }
    }

    getCurrentLocation = () => {
        GeolocationService(true, onPermissionDenial, onLocation);
    }

    const onPermissionDenial = () => {
        console.warn('permission denied');
    }

    const _mapRef = (ref) => {
        _map = ref;
    }

    const onLocation = (data, source = null, type = null) => {
        let region = { ...data };
        if (source === 'map' || source === null) {
            ReverseLookup(region)
                .then((result) => {
                    // console.warn(region.latitude, region.longitude)
                    region.reverseAddress = result;
                    region.latitudeDelta = LATITUDE_DELTA;
                    region.longitudeDelta = LONGITUDE_DELTA;
                    _map.animateToRegion(region, 200);
                    if (state.currentInput === "pickupAddress") {
                        setState({
                            ...state,
                            pickupAddress: region,
                            loading: false,
                            type: 'pickup'
                        });
                    } else {
                        setState({
                            ...state,
                            deliveryAddress: region,
                            loading: false,
                            type: 'delivery'
                        });
                    }
                })
                .catch((err) => console.warn(err))
        } else if (source === 'prediction') {
            //find place latitude and longitude
            // inputBlurred();
            PlaceDetails(data.placeId)
                .then((resultData) => {
                    region.latitude = resultData.result.geometry.location.lat;
                    region.longitude = resultData.result.geometry.location.lng;
                    region.latitudeDelta = LATITUDE_DELTA;
                    region.longitudeDelta = LONGITUDE_DELTA;
                    if (type === 'pickup') {
                        setState({
                            ...state,
                            type: type,
                            pickupAddress: region
                        });

                        _map.animateToRegion(region, 200);

                    } else {
                        setState({
                            ...state,
                            type: type,
                            deliveryAddress: region
                        });

                        _map.animateToRegion(region, 200);
                    }
                })
                .catch((err) => {
                    console.warn(err);
                })
        }
    }

    const fitMapToCoordinates = (origin, destination) => {
        try {
            if (_map.state.isReady) {
                let edgePadding = { bottom: 100, right: 24, left: 0, top: 100 };
                _map.fitToCoordinates([origin, destination], {
                    edgePadding,
                    animated: true,
                });
            }
        } catch (error) {
            console.warn(error);
        }
    }

    const inputFocused = () => {
        Animated.parallel([
            Animated.timing(mapHeight, {
                toValue: 0,
                duration: 350,
            }),
            Animated.timing(formHeight, {
                toValue: height - 10,
                duration: 350
            })
        ]).start();
    }

    const inputBlurred = () => {
        Animated.parallel([
            Animated.timing(mapHeight, {
                toValue: height * 0.5,
                duration: 10
            }),
            Animated.timing(formHeight, {
                toValue: height * 0.5,
                duration: 10
            })
        ]).start();
    }

    const nextPrevHandler = (action, data = null, screenName = state.currentInput) => {
        // this function takes screen one step forward or backward
        // console.warn(data);
        // if (data) return;
        let currentIndex = choices.findIndex(c => c === screenName);
        if (action === 'next') {
            // code for going to next screen
            let nextChoice = choices[currentIndex + 1];
            // Before going to next screen check if data in current screen is not null
            if (state[state.currentInput] != null || data != null) {
                // data != null condition is for user message part since the data arrives
                // after pressing next button
                if (state.currentInput === "userMessage" && data != null) {
                    // if the data is for userMessage
                    setState({
                        ...state,
                        userMessage: data,
                        currentInput: nextChoice
                    });
                } else {
                    // if data is for map values then it has already been saved when
                    // user drags map or selects value from suggested places
                    // if the choice is of type map do necessary animations
                    const isMap = typeMapChoices.includes(nextChoice);
                    if (_map.state.isReady) {
                        if (isMap && state[nextChoice] !== null) {
                            _map.animateToRegion(state[nextChoice], 1000);
                        }
                        if (nextChoice === "done") {
                            fitMapToCoordinates(state.pickupAddress, state.deliveryAddress);
                        }
                    }
                    // update currentInput
                    setState({
                        ...state,
                        currentInput: nextChoice
                    });
                }
            } else {
                // if current input is null
                // Alert the user
                const fieldName = splitCamelCase(state.currentInput);
                AlertService(
                    'Empty Field',
                    `Please input data for ${fieldName}`,
                    () => { }
                );
            }
            // console.warn(currentIndex, nextChoice);
        }
        else if (action === 'previous') {
            //code for going to previous screen
            let prevChoice = choices[currentIndex - 1];
            if (prevChoice) {
                //if prevChoice is of mapTypes
                const isMap = typeMapChoices.includes(prevChoice);
                if (isMap && state[prevChoice] !== null) {
                    if (_map.state.isReady) _map.animateToRegion(state[prevChoice], 1000);
                    setState({
                        ...state,
                        currentInput: prevChoice
                    });
                }
            }
        }
        else {
            // if we want to go to particular screen
            setState({
                ...state,
                currentInput: screenName
            })
        }
        return true;
    }

    const submitHandler = () => {
        try {
            let formData = {
                "master": {
                    "customerId": props.user.userId,
                    "deliveryAddress": {
                        "coordinate": {
                            "latitude": state.pickupAddress.latitude,
                            "longitude": state.pickupAddress.longitude
                        },
                        "houseDetail": state.pickupAddress.reverseAddress.title,
                        "landmark": state.pickupAddress.reverseAddress.street
                    },
                    "type": "breakdown",
                    "categoryId": props.categoryId
                },
                "detail": [
                    {
                        "productName": props.categoryName,
                        "json": {
                            "PackageItemName": `${props.categoryName}`,
                            "Description": state.userMessage,
                            "destination": {
                                "latitude": state.deliveryAddress.latitude,
                                "longitude": state.deliveryAddress.longitude,
                                "houseDetail": state.deliveryAddress.reverseAddress.title,
                                "landmark": state.deliveryAddress.reverseAddress.street,
                            }
                        }
                    }
                ]
            };

            AlertService(
                'Confirm',
                `Request Breakdown service at ${state.pickupAddress.reverseAddress.title}`,
                () => {
                    // post quote for breakdown service
                    props.postQuote(formData);
                }
            );
        } catch (error) {
            console.warn(error)
        }
    }

    let content = (
        <Container>
            {
                <Animated.View style={mapAnimationStyle}>
                    <MapDisplay
                        _mapRef={_mapRef}
                        userLocation={
                            state.currentInput !== "done"
                                ?
                                state.currentInput !== "userMessage"
                                    ?
                                    state[state.currentInput]
                                    :
                                    state.pickupAddress
                                :
                                [state.pickupAddress, state.deliveryAddress]
                        }
                        onRegionChange={onRegionChange}
                    />
                </Animated.View>
            }
            {
                !state.loading
                    ?
                    <FormBody
                        inputFocused={inputFocused}
                        inputBlurred={inputBlurred}
                        clickHandler={onLocation}
                        nextPrevHandler={nextPrevHandler}
                        submitHandler={submitHandler}
                        pickupAddress={state.pickupAddress}
                        deliveryAddress={state.deliveryAddress}
                        userMessage={state.userMessage}
                        currentInput={state.currentInput}
                    />
                    :
                    null
            }
        </Container>
    );
    return content;
}

const mapStateToProps = state => {
    return {
        user: state.user,
        address: state.address
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addServiceItem: data => {
            dispatch(addService(data));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BreakdownService);