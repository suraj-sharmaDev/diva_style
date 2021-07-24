import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import AbortController from '../../middleware/AbortController';
import { AlertService } from '../../middleware/AlertService';
import { GetQuoteDetails, AcceptBidding } from '../../middleware/ServiceApi';
import Header from '../../components/ShopScreenCategory/Header';
import Body from '../../components/QuoteBiddingScreen/Body';
import LoadingScreen from '../../components/LoadingScreen';
import Data from './data.json';

const Container = styled.View`
    height: 100%;
`;

const Presenter = props => {
    const quoteId = props.navigation.state.params.quoteId;
    const [state, setState] = React.useState({
        loading: true,
        detail: null
    });

    React.useEffect(() => {
        abortController = new AbortController();
        fetchQuoteDetail();
        return () => {
            abortController._abort();
        }
    }, [props.order.orderUpdate]);

    const fetchQuoteDetail = () => {
        if (!state.loading) setState({ ...state, loading: true });
        // setState({
        //     loading: false,
        //     detail: Data
        // });
        // return;
        GetQuoteDetails(quoteId)
            .then((res) => {
                if (!abortController._signal()) {
                    if (typeof res.error == 'undefined') {
                        setState({ ...state, detail: res, loading: false });
                    }
                }
            })
            .catch((err) => {
                console.warn(err);
                AlertService('Error', 'An error occurred, sorry of inconvenience!', () => { });
                // setState({...state, loading: false});
                props.navigation.goBack();
            })
    }
    const acceptHandler = (quoteBiddingId, serviceProviderId) => {
        if (!state.loading) setState({ ...state, loading: true });
        AcceptBidding(quoteBiddingId, serviceProviderId)
        .then((res)=>{
            AlertService('Success', 'You have accepted the bid!', () => { });
            props.navigation.goBack();
            props.navigation.state.params.callback();
        })
        .catch(err=>{
            AlertService('Error', 'An error occurred, sorry of inconvenience!', () => { });
            props.navigation.goBack();
        })
    }
    let content = (
        <Container>
            <Header title={'Biddings'} navigation={props.navigation} />
            {
                state.loading
                    ?
                    <LoadingScreen />
                    :
                    <Body detail={state.detail} acceptHandler={acceptHandler} />
            }
        </Container>
    );
    return content;
}

const mapStateToProps = state => {
    return {
        order: state.order,
    };
};

export default connect(
    mapStateToProps,
    {}
)(Presenter);
// export default Presenter;