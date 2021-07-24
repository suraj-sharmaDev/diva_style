import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { AlertService } from '../../middleware/AlertService';
import { GetAppConfigDetails } from '../../middleware/API';
import { CreateQuoteForServices } from '../../utils/CreateQuote';
import { removeAllServices, addService } from '../../store/actions/cart';
import { retrieveQuote } from '../../store/actions/order';

import LoadingScreen from '../LoadingScreen';
import SymptomsListing from './SymptomsListing';

import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';

const Container = styled.ScrollView`
    padding: 10px;
`;
const Label = styled.Text`
    font-size: 17px;
    font-family: ${Fonts.boldFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
    text-align: center;
    margin: 5px 0px;
`;

const Repairs = ({
    repairs, 
    symptoms,
    navigation, 
    title,
    categoryId, 
    initialPaymentAmount,
    minBookDay,
    ...props
}) => {
    const [state, setState] = React.useState({
        loading: false
    })
    
    const [initialPayment, setInitialPayment] = React.useState(200);

    React.useEffect(() => {
        fetchInitialPayment();
    }, [])

    const fetchInitialPayment = () => {
        GetAppConfigDetails()
        .then((res)=>{
          if(!res.error){
            setInitialPayment(res.entity[0].serviceInitialPayment);
          }
        })
    }

    //code for repair services
    const actionHandler = (data) => {
        let formData = {
            master: {
                customerId: props.user.userId,
                deliveryAddress: props.address.savedAddresses[props.address.currentAddress],
                type: 'repair',
                categoryId: categoryId
            },
            detail: []
        };
        formData.detail.push({
            productName: title,
            json: {
                symptoms: data.symptoms,
                vehicleInformation: data.carModelData,
                deliveryTime: data.timeData,
                deliveryDate: data.dateData
            }
        });

        //post quote to server
        AlertService(
            'Proceed',
            `You maybe required to pay initial payment. Continue?`,
            () => { 
              setState({ loading: true });                
              CreateQuoteForServices(formData)
              .then((res)=>{
                AlertService(
                  'Success',
                  'Your request for service has been forwarded. Please wait!',
                  () => { }
                );
                navigation.navigate('Orders', { switcherStatus : 'RIGHT' });
              })
              .catch((err)=>{
                AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => { });
              })        
            }
        );
        // CreateQuote(formData)
        //     .then((res) => {
        //         //get all pending quotes from api
        //         Initialize(props.user.userId)
        //             .then((res) => {
        //                 AlertService(
        //                     'Success',
        //                     'Your request for service has been forwarded. Please wait!',
        //                     () => { }
        //                 );
        //                 props.onRetrieveQuote(res.quote);
        //                 navigation.navigate('Orders');
        //             })
        //             .catch((err) => console.warn(err))
        //         //add quote to pending quotes
        //     })
        //     .catch((err) => {
        //         setState({ loading: false });
        //         console.warn(err)
        //     })
    }

    let content = (
        <Container contentContainerStyle={{ paddingBottom: 100 }}>
            {
                state.loading
                    ?
                    <LoadingScreen />
                    :
                    symptoms != null
                        ?
                        <SymptomsListing
                            symptoms={symptoms}
                            repairs={repairs}
                            navigation={navigation}
                            actionHandler={actionHandler}
                            title={title}
                            initialPaymentAmount={initialPaymentAmount}
                            minBookDay={minBookDay}
                        />
                        :
                        <Label>
                            No Item exists for this category **dev notice**
                        </Label>
            }
        </Container>
    );
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
        addServiceItem: data => {
            dispatch(addService(data));
        },
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
)(Repairs);