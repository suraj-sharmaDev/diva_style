import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AbortController from '../../middleware/AbortController';
import { AlertService } from '../../middleware/AlertService';
import { GetPackageRate } from '../../middleware/ServiceApi';
import { GetAppConfigDetails } from '../../middleware/API';
import { CreateQuoteForServices } from '../../utils/CreateQuote';
import { removeAllServices, addService } from '../../store/actions/cart';
import { retrieveQuote } from '../../store/actions/order';

import { Fonts, Colors } from '../../constants';

import PackageCard from './PackageCard';
import PackageDetailModal from './PackageDetailModal';
import LoadingScreen from '../LoadingScreen';
import CarModel from './PackagesCommons/CarModel';
import UnavailableItem from './PackagesCommons/UnavailableItem';
import DateSelector from './PackagesCommons/DateSelector';
import TimeSelector from './PackagesCommons/TimeSelector';

const Container = styled.ScrollView`
    padding: 10px;
`;
const Button = styled.TouchableOpacity``;
const Label = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
    text-align: center;
    margin: 4px 0px;
`;

const Packages = ({ 
    packages, 
    navigation, 
    categoryId,
    initialPaymentAmount,
    minBookDay,    
    ...props 
}) => {
    const scrollRef = React.useRef(null);
    //to show the input field only for two wheeler or four wheeler
    const showCarModelInput = props.title == 'Two Wheeler' || props.title == 'Four Wheeler';

    const [showDetail, setShowDetail] = React.useState({
        loading: true,
        empty: false,
        packageName: null,
        packageId: null,
        packageDetail: null,
        show: false,
        carModelData: null,
        dateData: null,
        timeData: null,
        packageData: null
    });
    
    const [initialPayment, setInitialPayment] = React.useState(200);

    React.useEffect(() => {
        abortController = new AbortController();
        fetchPackageDetail(packages[0]);
        fetchInitialPayment();
        return () => {
            // setShowDetail({...showDetail, show: false});
            abortController._abort();
        }
    }, [])

    const fetchInitialPayment = () => {
        GetAppConfigDetails()
        .then((res)=>{
          if(!res.error){
            setInitialPayment(res.entity[0].serviceInitialPayment);
          }
        })
    }

    const fetchPackageDetail = (info) => {
        if (showDetail.packageDetail == null ||
            typeof showDetail.packageDetail[info.PackageId] == 'undefined') {
            if (!showDetail.loading) setShowDetail({ ...showDetail, loading: true });
            //if the package has not been api called already
            GetPackageRate(info.PackageId)
                .then((result) => {
                    if (!abortController._signal()) {
                        if (result.length == 0 || result.error) {
                            //there's no item
                            setShowDetail({
                                ...showDetail,
                                loading: false,
                                empty: true,
                                packageName: info.PackageName,
                                packageId: info.PackageId,
                            })
                        } else {
                            setShowDetail({
                                ...showDetail,
                                loading: false,
                                empty: false,
                                packageName: info.PackageName,
                                packageId: info.PackageId,
                                packageDetail: {
                                    [info.PackageId]: result
                                },
                                show: true,
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.warn(err);
                })
        } else {
            //else update packageId
            setShowDetail({ ...showDetail, packageId: info.PackageId, show: true });
        }
    }

    const closeModal = () => {
        setShowDetail({ ...showDetail, show: false });
    }

    const addMiscDataForPackage = (label, data) => {
        let newState = { ...showDetail };
        switch (label) {
            case 'packageData':
                newState[label] = data;
                break;
            default:
                newState[label] = data;
                break;
        }
        setShowDetail(newState);
        // console.warn(label, data);
    }

    const addPackage = () => {
        //add package and all related items here
        if (showCarModelInput && showDetail.carModelData === null) {
            AlertService('Vehicle Information', 'Please enter vehicle information', () => { });
            return;
        }
        if (showDetail.dateData === null) {
            AlertService('Select Date', 'Please select preferred date before booking package', () => { });
            return;
        }
        if (showDetail.timeData === null) {
            AlertService('Select Time', 'Please select preferred time before booking package!', () => { });
            return;
        }
        //if all is well then book service
        createQuoteHandler();
        // setShowDetail({ ...showDetail, show: false });
        // props.addServiceItem({
        //     type: 'package',
        //     name: showDetail.packageName,
        //     categoryId: categoryId,
        //     data: info
        // });
    }

    const createQuoteHandler = () => {
        //create quote for the customer
        let newPackageData = { ...showDetail.packageData.data };
        delete newPackageData.Description;
        //description not needed for posting data
        let formData = {
            master: {
                customerId: props.user.userId,
                deliveryAddress: props.address.savedAddresses[props.address.currentAddress],
                type: 'package',
                categoryId: categoryId
            },
            detail: []
        };
        formData.detail.push({
            productName: showDetail.packageName,
            json: {
                ...newPackageData,
                vehicleInformation: showDetail.carModelData,
                deliveryTime: showDetail.timeData,
                deliveryDate: showDetail.dateData
            }
        });
        //post quote to server
        AlertService(
            'Proceed',
            `You maybe required to pay initial payment. Continue?`,
            () => { 
              setShowDetail({ ...showDetail, loading: true });                
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
                setShowDetail({ ...showDetail, loading: false });
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
        //         console.warn(err);
        //         setShowDetail({ ...showDetail, loading: false });
        //     })
    }

    const renderListFooter = () => {
        return <View style={{ paddingBottom: 20 }} />
    };

    let content = (
        <Container ref={scrollRef} contentContainerStyle={{ paddingBottom: 120 }}>
            {
                showCarModelInput && (
                    <CarModel
                        addMiscDataForPackage={addMiscDataForPackage}
                    />
                )
            }
            <FlatList
                horizontal={true}
                data={packages}
                renderItem={({ item }) => (
                    <PackageCard
                        info={item}
                        selected={showDetail.packageId}
                        actionHandler={fetchPackageDetail}
                    />
                )}
                contentContainerStyle={{ paddingVertical: 15 }}
                ListFooterComponent={renderListFooter}
                keyExtractor={item => item.PackageId + 'key'}
                extraData={packages}
            />
            {
                showDetail.loading
                    ?
                    <LoadingScreen />
                    :
                    showDetail.empty
                        ?
                        <UnavailableItem />
                        :
                        <React.Fragment>
                            <PackageDetailModal
                                addMiscDataForPackage={addMiscDataForPackage}
                                categoryId={categoryId}
                                selected={showDetail.packageName}
                                info={showDetail.packageId != null ? showDetail.packageDetail[showDetail.packageId] : null}
                                isVisible={showDetail.show}
                                closeModal={closeModal}
                            />
                            <DateSelector
                                addMiscDataForPackage={addMiscDataForPackage}
                                startDateOffset={minBookDay}
                                maxLimit={30}
                            />
                            <TimeSelector
                                addMiscDataForPackage={addMiscDataForPackage}
                            />
                            <Button
                                style={[styles.footerButton,
                                {
                                    backgroundColor: showDetail.packageData != null ? Colors.greenColor : Colors.disabledGreenColor,
                                    marginVertical: 20
                                }
                                ]}
                                onPress={addPackage}
                            >
                                <Label style={styles.footerButtonText}>
                                    Book Service
                            </Label>
                            </Button>
                        </React.Fragment>
            }
        </Container>
    );
    return content;
}

const styles = StyleSheet.create({
    footerButton: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.disabledGreenColor
    },
    footerButtonText: {
        fontSize: 16,
        color: 'white'
    }
});

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
)(Packages);