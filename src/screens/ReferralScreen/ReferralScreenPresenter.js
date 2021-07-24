import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';

import Color from '../../constants/Colors';
import CartHeader from '../../components/CartScreen/CartHeader';
import CartBody from '../../components/CartScreen/CartBody';
import ProceedCard from '../../components/CartScreen/ProceedCard';

const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  height : 100%;
`;
const ScrollView = styled.ScrollView`
  margin-bottom : 45px;
`;
const CartScreenPresenter = ({navigation, update, store, ...props}) => {
  const [refresh, updateRefresh] = React.useState(false);

  React.useEffect(() => {
    updateRefresh(!refresh);
  }, [update]);
  const onIncrement = productId => {
    props.onIncrement(productId);
    updateRefresh(!refresh);
  };
  const onDecrement = productId => {
    props.onDecrement(productId);
    updateRefresh(!refresh);
  };

  let content = (
    <Theme>
      <CartHeader store={store}/>
      <ScrollView>
        <CartBody
          store={store}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          refresh={refresh}
          distance={props.distance}
          deliveryFee = {props.deliveryFee}
        />
      </ScrollView>
      <ProceedCard />
    </Theme>
  );
  return content;
};

export default CartScreenPresenter;