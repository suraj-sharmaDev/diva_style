import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { GetRecentOrders } from '../../middleware/API';
import {GetRecentQuotes} from '../../middleware/ServiceApi';
import AbortController from '../../middleware/AbortController';
import LoadingScreen from '../../components/LoadingScreen';
import Header from '../../components/ShopScreenCategory/Header';
import OrderListing from '../../components/RecentOrdersServices/OrderListing';
import TypeSelection from '../../components/RecentOrdersServices/TypeSelection';
import Colors from '../../constants/Colors';

import Data from './data.json';

const Theme = styled.View`
  background-color: ${Colors.homeBackgroundColor};
  height : 100%;
`;

const Presenter = ({ navigation, ...props }) => {
    const switcherStatus = navigation?.state?.params?.switcherStatus || 'orders';
    const [isLoading, setLoading] = React.useState(true);
    const [state, setState] = React.useState({
        orders: [],
        services: [],
        type: switcherStatus,
        ordersPageNo: 1,
        servicesPageNo: 1,
        ordersEndReached: false,
        servicesEndReached: false,
    });

    React.useEffect(() => {
        abortController = new AbortController();
        if(state.type === 'orders') fetchOrders(state.ordersPageNo);
        else fetchServices(state.servicesPageNo);
        return () => {
            abortController._abort();
        }
    }, []);

    const fetchOrders = (page, status = null) => {
        if(!isLoading) setLoading(true);
        GetRecentOrders(props.user.userId, page)
        .then((res)=>{
            if (!abortController._signal()) {
                let newState = { ...state};
                newState.type = 'orders';
                if(status === 'scroll'){
                    newState.ordersPageNo += 1;
                    if(res.length > 0){
                        newState.orders = [...newState.orders, ...res];
                    }else{
                        newState.ordersEndReached = true;
                    }
                }else{
                    newState.ordersPageNo = 1;
                    newState.orders = res;
                }
                setLoading(false);
                setState(newState);
            }
        })
        .catch((err)=>{
            if (!abortController._signal()){
                setState({...state, loading: false});
            }
            console.warn(err)
        })
    }
    const fetchServices = (page, status = null) => {
        if(!isLoading) setLoading(true);
        GetRecentQuotes(props.user.userId, page)
        .then((res)=>{
            if (!abortController._signal()) {
                let newState = { ...state};
                newState.type = 'services';
                if(status === 'scroll'){
                    newState.servicesPageNo += 1;
                    if(res.length > 0){
                        newState.services = [...newState.services, ...res];
                    }else{
                        newState.servicesEndReached = true;
                    }
                }else{
                    newState.servicesPageNo = 1;
                    newState.services = res;
                }
                setLoading(false);                
                setState(newState);
            }
        })
        .catch((err)=>{
            if (!abortController._signal()){
                setState({...state, loading: false});
            }
            console.warn(err)
        })
    }

    const typeSelector = type => {
        if(type === state.type) return;
        if(type === 'orders'){
            if(state.orders.length > 0){
                //that means already fetched so change type
                setState({
                    ...state,
                    type: type
                })
            }else{
                //fetch the data for orders
                fetchOrders(state.ordersPageNo);
            }
        }else{
            if(state.services.length > 0){
                //that means already fetched so change type
                setState({
                    ...state,
                    type: type
                })
            }else{
                //fetch the data for services
                fetchServices(state.servicesPageNo);
            }
        }
    }
    let content = (
        <Theme>
            <Header 
                title={`Your Recent ${state.type === 'orders' ? 'Orders' : 'Services'}`} 
                navigation={navigation} 
            />
            {
                isLoading
                ?
                <LoadingScreen />
                :
                <>
                    <TypeSelection 
                        type={state.type}
                        typeSelector={typeSelector}
                    />
                    <OrderListing 
                        orders={state.type === 'orders' ? state.orders : state.services}
                        type={state.type}
                        fetchOrders={fetchOrders}
                        fetchServices={fetchServices}
                        navigation={navigation}
                    />
                </>
            }
        </Theme>
    );
    return content;
}

const mapStateToProps = state => {
    return {
        order: state.order,
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    {}
)(Presenter);
