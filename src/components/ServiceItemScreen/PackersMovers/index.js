import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AlertService } from '../../../middleware/AlertService';
import { CreateQuoteForServices } from '../../../utils/CreateQuote';
import { GetAppConfigDetails } from '../../../middleware/API';
import { retrieveQuote } from '../../../store/actions/order';

import Header from '../../ShopScreenCategory/Header';
import LoadingScreen from '../../LoadingScreen';

import Pickup from './Pickup';
import Delivery from './Delivery';
import Final from './Final';
import LocationSelection from './LocationSelection';

import { height, width } from "../../../constants/Layout";

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Container = styled.View`
    height : ${height};
    width : ${width};
`;

const Packers = ({
    initialPaymentAmount,
    minBookDay,
    ...props
}) => {
    // the choices are in order of screen to be displayed as per user inputs
    const choices = ["pickupAddress", "deliveryAddress", "done"];
    const currentAddress = props.address.savedAddresses[props.address.currentAddress];
    // console.warn('Packers.js || currentAddress =>', currentAddress);
    const [state, setState] = React.useState({
        pickupAddress: {
            ...currentAddress.coordinate,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        deliveryAddress: null,
        currentInput: "pickupAddress",   //to keep track of current input
        isLocationSelection: false,
        loading: true,
        pickupFlatDetails: {},
        deliveryFlatDetails: {},                
        pickupLiftAvailability: false,
        deliveryLiftAvailability: false,
        chosenItems: {},
        flatSize: null,
        dateSelectedIndex: null,
        date: null,
    });

    const [isLoading, setLoading] = React.useState(false);
    const [initialPayment, setInitialPayment] = React.useState(200);
    
    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                prevPage();
                return true;
            }
        );
        
        fetchInitialPayment();
        
        return () => {
            backHandler.remove();
        }
    }, [state.currentInput, state.isLocationSelection]);

    const fetchInitialPayment = () => {
        GetAppConfigDetails()
        .then((res)=>{
          if(!res.error){
            setInitialPayment(res.entity[0].serviceInitialPayment);
          }
        })
    }

    const nextPage = () => {
        const currentInputIndex = choices.indexOf(state.currentInput);
        if(currentInputIndex === (choices.length - 1)) {
            // that means we have reached last point
            return;
        }
        setState({
            ...state,
            currentInput: choices[currentInputIndex + 1]
        });
    }

    const prevPage = () => {
        const currentInputIndex = choices.indexOf(state.currentInput);
        /**
         * Check if user has already started entering values
         * if yes then we need to confirm from user
         * else go back
         */
        if(state.isLocationSelection){
            setState({
                ...state,
                isLocationSelection: false
            })
        }
        else if(currentInputIndex === 0) {
            //check if location browsing was turned on
            AlertService(
                'Exit',
                'Do you wish to exit from packers and movers page?',
                () => {
                    props.navigation.goBack();
                }
            );
        } else {
            setState({
                ...state,
                currentInput: choices[currentInputIndex - 1]
            });
        }
        return;
    }

    const allowUserChooseLocationFromMap = () => {
        setState({
            ...state,
            isLocationSelection: true
        })
    }

    const updateLocationInfo = (data) => {
        let newState = {...state};
        newState[state.currentInput] = data;
        newState.isLocationSelection = false;
        setState(newState);
    }

    const onSubmitQuoteHandler = (formData) => {
        // when user had finally submitted the form
        //post quote to server
        AlertService(
            'Proceed',
            `You maybe required to pay initial payment. Continue?`,
            () => { 
              setLoading(true);                
              CreateQuoteForServices(formData)
              .then((res)=>{
                setLoading(false); 
                AlertService(
                  'Success',
                  'Your request for service has been forwarded. Please wait!',
                  () => { }
                );
                props.navigation.navigate('Orders', { switcherStatus : 'RIGHT' });
              })
              .catch((err)=>{
                AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => { console.log(err)});
              })        
            }
        );
        // CreateQuote(formData)
        //     .then((res) => {
        //         //get all pending quotes from api
        //         Initialize(props.user.userId)
        //             .then((res) => {
        //                 setLoading(false);
        //                 AlertService(
        //                     'Success',
        //                     'Your request for service has been forwarded. Please wait!',
        //                     () => { }
        //                 );
        //                 props.onRetrieveQuote(res.quote);
        //                 props.navigation.navigate('Orders');
        //             })
        //             .catch((err) => console.log(err))
        //         //add quote to pending quotes
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setLoading(false);
        //     })
    }

    /**
     * The packers and movers is a three step process
     * 1. Get pickup address with Lift availability, flat details, Items, flat size, pickup date
     * 2. Get delivery address with Lift availability, flat details
     * 3. Display both the details
     */
    let content = null;

    if(isLoading) {
        content = (<LoadingScreen />);
    }
    else if(state.isLocationSelection) {
        // from any of the screen locations selection feature should be
        // available.
        content = (
            <LocationSelection 
                userLocation={state[state.currentInput]}
                title={state.currentInput==="pickupAddress" ? "Pickup Location" : "Drop Location"}
                onSubmitHandler={updateLocationInfo}
            />
        );
    } else if(state.currentInput === choices[0]){
        content = (
            <Pickup 
                parentState={{...state}} 
                setParentState={setState}
                nextPage={nextPage}
                prevPage={prevPage}
                allowUserChooseLocationFromMap={allowUserChooseLocationFromMap}
                minBookDay={minBookDay}
            />);
    } else if(state.currentInput === choices[1]){
        content = (
            <Delivery 
                parentState={{...state}} 
                setParentState={setState}
                nextPage={nextPage}
                prevPage={prevPage}
                allowUserChooseLocationFromMap={allowUserChooseLocationFromMap}
            />);
    } else if(state.currentInput === choices[2]){
        content = (
            <Final 
                parentState={{...state}}
                setParentState={setState}
                prevPage={prevPage}
                onSubmitQuoteHandler={onSubmitQuoteHandler}
                {...props}        
            />);
    }

    return (
        <Container>
            <Header 
                title={"Packers and Movers"} 
                navigation={()=>prevPage()} 
                showCart={true}
                type={'modal'}
            />
            {content}
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        address: state.address
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRetrieveQuote: data => {
            dispatch(retrieveQuote(data));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Packers);