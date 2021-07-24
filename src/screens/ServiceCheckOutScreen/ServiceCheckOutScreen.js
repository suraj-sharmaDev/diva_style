import React from 'react';
import styled from 'styled-components';
import CartHeader from '../../components/CartScreen/CartHeader';
import ServiceCartBody from '../../components/CartScreenService/CartBody';
import ServiceProceedCard from '../../components/ServiceScreen/ProceedCard';
import Color from '../../constants/Colors';

const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  height : 100%;
`;
const Label = styled.Text``;

const ServiceCheckOutScreen = ({
    onRemoveService, navigation,
    store, refresh,
    ...props
}) => {
    let content = (
        <Theme>
            <CartHeader store={store} />
            <ServiceCartBody
                onRemoveService={onRemoveService}
                navigation={navigation}
                store={store}
                refresh={refresh}
            />
            <ServiceProceedCard
                style={{ marginBottom: 10 }}
                navigation={navigation}
            />
        </Theme>
    );
    return content;
}

export default ServiceCheckOutScreen;