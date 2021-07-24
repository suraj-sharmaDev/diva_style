import { createStackNavigator } from "react-navigation-stack";

import ProfileScreen from "../screens/ProfileScreen";
import ManageAddressScreen from "../screens/ManageAddressScreen";
import LoginScreen from "../screens/LoginScreen";
import NotificationScreen from "../screens/NotificationScreen";
import OrderScreen from "../screens/OrderScreen";
import RecentOrderDetailScreen from '../screens/RecentOrderDetailScreen';
import QuoteBiddingScreen from "../screens/QuoteBiddingScreen";
import RecentOrdersServicesScreen from "../screens/RecentOrdersServices";

const ScreensStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    RecentOrderDetail: {
      screen: RecentOrderDetailScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    ManageAddress: {
      screen: ManageAddressScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Wallet: {
      screen: NotificationScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Favourites: {
      screen: NotificationScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Referrals: {
      screen: NotificationScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Notifications: {
      screen: NotificationScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Orders: {
      screen: OrderScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    RecentOrdersServices: {
      screen: RecentOrdersServicesScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    QuoteBidding: {
      screen: QuoteBiddingScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    }
  },
  {
    initialRouteName: "Profile",
    headerMode: "screen"
  }
);

const ProfileTabNavigator = ScreensStack;
export default ProfileTabNavigator;