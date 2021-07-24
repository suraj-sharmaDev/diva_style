import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Initialize } from '../../middleware/API';
import { retrieveOrder } from '../../store/actions/order';
import Header from '../../components/ShopScreenCategory/Header';
import PendingOrders from '../../components/OrderScreen/PendingOrders';
import PendingQuotes from '../../components/OrderScreen/PendingQuotes';
import { Colors, Fonts } from '../../constants';
// import RecentOrderCard from '../../components/ProfileScreen/RecentOrderCard';

const Theme = styled.View`
  background-color: ${Colors.homeBackgroundColor};
  height : 100%;
`;

const SwitcherView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Button = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  justify-content: center;
`;

const ActiveMarker = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  margin-top: 4px;
`;

const Label = styled.Text`
  font-family: ${Fonts.normalFont};
  font-size: 16px;
`;

const OrderScreenPresenter = ({ navigation, focused, ...props }) => {
  const { switcherStatus = 'LEFT' } = navigation?.state?.params || '';
  const [state, setState] = React.useState({
    fetching: false,
    switcherStatus: switcherStatus
  });

  React.useEffect(() => {
    mounted = true;
    if (props.order.orderUpdate > -1) {
      fetchOrders();
    }
    return () => {
      mounted = false;
    }
  }, [props.user, props.order.orderUpdate, focused]);

  const fetchOrders = () => {
    if (state.fetching) return;
    //fetch only if an api call has been completed
    setState({ ...state, fetching: true });
    Initialize(props.user.userId)
      .then((res) => {
        setState({ ...state, fetching: false });
        props.onRetrieveOrder({
          order: res.order != null ? res.order : [],
          quote: res.quote != null ? res.quote : [],
          recentOrder: res.recentOrder != null ? res.recentOrder : []
        });
      })
      .catch((err) => {
        console.warn(err);
      })
  }

  const changeSwitcher = (direction) => {
    setState({ ...state, switcherStatus: direction });
  }

  const navigateToRecentOrders = () => {
    navigation.navigate('RecentOrdersServices', { switcherStatus : 'orders' });    
  }

  const navigateToRecentServices = () => {
    navigation.navigate('RecentOrdersServices', { switcherStatus : 'services' });    
  }  

  const renderSwitcher = () => {
    return (
      <SwitcherView>
        <Button onPress={() => changeSwitcher('LEFT')}>
          <Label>Grocery</Label>
          <ActiveMarker
            style={{ backgroundColor: state.switcherStatus === 'LEFT' ? Colors.greenColor : Colors.homeBackgroundColor }}
          />
        </Button>
        <Button onPress={() => changeSwitcher('RIGHT')}>
          <Label>Services</Label>
          <ActiveMarker
            style={{ backgroundColor: state.switcherStatus === 'RIGHT' ? Colors.greenColor : Colors.homeBackgroundColor }}
          />
        </Button>
      </SwitcherView>
    );
  }

  const renderOrderServices = () => {
    {/* {
          <PendingOrders /> component lists pending retail orders
          <PendingQuotes /> component lists pending quotes
        } */}
    if (state.switcherStatus === 'LEFT')
      return (
        <PendingOrders 
          pendingOrders={props.order.pendingOrders} 
          navigation={navigation}
          navigateToRecentOrders={navigateToRecentOrders}
        />
      );
    else
      return (
        <PendingQuotes
          pendingQuotes={props.order.pendingQuotes}
          navigation={navigation}
          callback={fetchOrders}
          navigateToRecentServices={navigateToRecentServices}
        />
      );
  }
  let content = (
    <Theme>
      <Header 
        title={ state.switcherStatus === 'LEFT' ? 'Orders' : 'Services'} 
        navigation={navigation} 
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderSwitcher()}
        {renderOrderServices()}
        {/* <RecentOrderCard recentOrders={props.order.recentOrders} navigation={navigation} /> */}
      </ScrollView>
    </Theme>
  );

  return content;

};

const mapStateToProps = state => {
  return {
    order: state.order,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRetrieveOrder: data => dispatch(retrieveOrder(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreenPresenter);
