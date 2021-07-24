import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {AlertService} from '../../middleware/AlertService';
import { CreateQuote } from '../../middleware/ServiceApi';
import { Initialize } from '../../middleware/API';
import { removeAllServices } from '../../store/actions/cart';
import { retrieveQuote } from '../../store/actions/order';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.TouchableOpacity`
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: ${Colors.greenColor};
    padding: 10px;
    height: 48px;
    width: 100%;
    align-items: center;
    justify-content: center;
`;
const Label = styled.Text`
    color: white;
    font-family  : ${Fonts.normalFont};    
    font-size: 15px;
`;
const Info = styled.Text`
    color: white;
    font-family  : ${Fonts.normalFont};    
    font-size: 12px;
`;

const ProceedCard = props => {

    const actionHandler = () => {
        //create quote for the customer
        let formData = {
            master: {
                customerId: props.user.userId,
                deliveryAddress: props.address.savedAddresses[props.address.currentAddress],
                type: props.cart.services.type,
                categoryId: props.cart.services.categoryId
            },
            detail: []
        }
        if (props.cart.services.type === 'repair') {
            //create repair type quote
            formData.detail.push({
                productName: props.cart.services.name,
                json: {
                    deliveryDate: props.cart.services.data.date,
                    symptoms: props.cart.services.data.symptoms
                }
            })
        } else if (props.cart.services.type === 'package') {
            //create package type quote
            formData.detail.push({
                productName: props.cart.services.name,
                json: props.cart.services.data
            })
        } else {
            //breakdown service quote
        }
        //post quote to server
        CreateQuote(formData)
            .then((res) => {
                //get all pending quotes from api
                Initialize(props.user.userId)
                .then((res)=>{
                    AlertService(
                        'Success',
                        'Your request for service has been forwarded. Please wait!', 
                        ()=>{}
                      );
                    props.navigation.goBack();             
                    props.onRemoveServices();
                    props.onRetrieveQuote(res.quote);
                })
                .catch((err)=>console.warn(err))
                //add quote to pending quotes
            })
            .catch((err) => console.warn(err))
    }
    let content = null;
    if (Object.keys(props.cart.services).length > 0) {
        content = (
            <Container
                activeOpacity={0.8}
                style={props.style}
                onPress={actionHandler}
            >
                <Label>Proceed to Payment</Label>
                <Info>
                    You have added
                    {
                        props.cart.services.type === 'package'
                            ?
                            ` package `
                            :
                            ` service `
                    }
                    {
                        `from ${props.cart.services.name}`
                    }
                </Info>
            </Container>
        );
    }
    return content;
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user,
        address: state.address
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onRemoveServices: () => {
            dispatch(removeAllServices());
        },
        onRetrieveQuote: data => {
            dispatch(retrieveQuote(data));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProceedCard);