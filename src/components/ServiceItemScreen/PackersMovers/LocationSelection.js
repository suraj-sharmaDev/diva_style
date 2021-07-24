import React from 'react';
import { Animated, Keyboard, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AlertService } from '../../../middleware/AlertService';
import Icons from 'react-native-vector-icons/Feather';
import { PlaceDetails, ReverseLookup, PlacesAutoFetch } from '../../../middleware/API';
import GeolocationService from '../../../middleware/GeolocationService';
import MapDisplay from '../../MapScreen/MapDisplay';
import Predicitions from '../../ServicePackageScreen/BreakdownService/Predictions';
import { height, width } from '../../../constants/Layout';
import { Fonts, Colors } from "../../../constants";

// import PredicitionData from '../../ServicePackageScreen/BreakdownService/predictions.json';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationSelection = ({userLocation, title=null, onSubmitHandler, ...props}) => {
    
    const [state, setState] = React.useState({
        userLocation: userLocation,
        isLoading: true,
        address: null,
        predictions: []
        // predictions: PredicitionData.predictions
    });

    const [timeOut, updateTimeOut] = React.useState(null);

    let mapHeight = new Animated.Value(height * 0.5);
    let formHeight = new Animated.Value(height * 0.5);
    let mapAnimationStyle = { height: mapHeight };    

    React.useEffect(()=>{
        if(state.userLocation) {
            onLocation(state.userLocation);
        }else {
            getCurrentLocation();           
        }
    }, [])

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
        inputFocused();
    }

    const onBlur = () => {
        inputBlurred();
    }

    const onRegionChange = (data) => {
        //first check whats the currentInput type
        try {
            let comparedData = state.userLocation;
            if (comparedData !== null && data) {
                if (data.latitude.toFixed(4) === comparedData.latitude.toFixed(4)
                    && data.longitude.toFixed(4) === comparedData.longitude.toFixed(4)) 
                {
                    // when both coordinates after changing and before changing
                    // are same then dont update
                    return;
                } else {
                    onLocation(data, 'map');
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
                    setState({
                        ...state,
                        userLocation: region,
                        isLoading: false,
                        address: `${region.reverseAddress.title} ${region.reverseAddress.street}`
                    })
                    // console.warn('reverse lookup result =>', result);
                })
                .catch((err) => console.log('reverse lookup error =>', err))
        } else if (source === 'prediction') {
            //find place latitude and longitude
            // inputBlurred();
            PlaceDetails(data.placeId)
                .then((resultData) => {
                    region.latitude = resultData.result.geometry.location.lat;
                    region.longitude = resultData.result.geometry.location.lng;
                    region.latitudeDelta = LATITUDE_DELTA;
                    region.longitudeDelta = LONGITUDE_DELTA;
                    setState({
                        ...state,
                        userLocation: region,
                        address: `${region.reverseAddress.title} ${region.reverseAddress.street}`,
                        predictions: []
                    })                    
                    // console.warn('place details result =>',region);
                    _map.animateToRegion(region, 200);
                })
                .catch((err) => {
                    console.warn('place details err =>', err);
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

    const onChangeHandler = (text) => {
        clearTimeout(timeOut);
        setState({
            ...state,
            address: text
        });
        if (text.length > 1) {
            updateTimeOut(setTimeout(() => {
                // console.warn(text);
                onSearchPlaces(text);
            }, 1000));
        }
    }

    const onSearchPlaces = (text) => {
        // fetch predictions when user is typing
        PlacesAutoFetch(text)
        .then((result) => {
            console.warn(result);
            setState({
                ...state,
                predictions: result.predictions
            })
        })
        .catch((err) => {
            console.warn(err);
        })
    }

    const onClickedPrediction = (data) => {
        // when a prediction is selected store the value
        onBlur();
        const placeId = data.place_id;
        const passData = {
            reverseAddress: {
                title: data.structured_formatting.main_text,
                street: data.description
            },
            placeId: placeId
        }

        // console.warn(passData);
        onLocation(passData, 'prediction');        
    }

    const onLocalSubmitHandler = () => {
        onSubmitHandler(state.userLocation);
    }

    return (
        <View style={styles.container}>
            <Animated.View style={mapAnimationStyle}>
                <MapDisplay
                    _mapRef={_mapRef}
                    userLocation={state.userLocation}
                    onRegionChange={onRegionChange}
                />
            </Animated.View>
            {
                !state.isLoading && (
                    <View style={styles.inputContainer}>

                        <View style={styles.searchBox}>
                            <TextInput 
                                placeholder="Enter Location"
                                value={state.address}
                                style={styles.inputSearch}
                                onChangeText={onChangeHandler}
                            />
                            <Icons
                                name="search"
                                size={18}
                                color={Colors.DarkGreyColor}
                                style={{ flex: 0.1 }}
                            />
                        </View>

                        <Predicitions
                            predicitions={state.predictions}
                            clickHandler={onClickedPrediction}
                        />
                        {
                            state.userLocation !== null && state.predictions.length === 0 && (
                                <View style={styles.submitButtonContainer}>
                                    <TouchableOpacity style={styles.submitButton} onPress={onLocalSubmitHandler}>
                                        <Text style={styles.buttonText}>Confirm {title}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }

                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width
    },
    inputContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    searchBox: {
        borderWidth: 1,
        borderColor: Colors.greyColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    inputSearch: {
        color: Colors.darkGreyColor,
        fontSize: 14,
        fontFamily: Fonts.boldFont,
        flex: 0.9,
    },
    submitButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        backgroundColor: Colors.darkGreenColor,
        padding: 10,
        borderRadius: 6
    },
    buttonText: {
        fontFamily: Fonts.boldFont,
        color: Colors.homeBackgroundColor
    }
})

export default LocationSelection;