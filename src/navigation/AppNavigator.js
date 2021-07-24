import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import MainTabNavigator from "./MainTabNavigator";
import CouponReedemScreen from "../screens/CouponReedemScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import ExploreScreen from "../screens/ExploreScreen";
import MapScreen from "../screens/MapScreen";
import ShopScreen from "../screens/ShopScreen";
import ShopScreenCategory from "../screens/ShopScreenCategory";
import SearchFetchScreen from "../screens/SearchFetchScreen";
import LocationSelectionScreen from "../screens/LocationSelectionScreen";
import ServiceItemScreen from "../screens/ServiceItemScreen";
import ServicePackageScreen from "../screens/ServicePackageScreen";
import ServiceRepairPayCard from "../screens/ServiceRepairPayCard";

const ScreensStack = createStackNavigator(
  {
    Tabs: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    CouponReedem: {
      screen: CouponReedemScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    CheckOut: {
      screen: CheckOutScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    LocationSelector: {
      screen: LocationSelectionScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    LocationPickerMap: {
      screen: MapScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    SearchFetch: {
      screen: SearchFetchScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    Shop: {
      screen: ShopScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    ShopCategory: {
      screen: ShopScreenCategory,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    ServiceItem: {
      screen: ServiceItemScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    ServicePackage: {
      screen: ServicePackageScreen,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    },
    ServiceRepairPayCard: {
      screen: ServiceRepairPayCard,
      navigationOptions: {
        header: null,
        headerTransparent: true
      }
    }
  },
  {
    initialRouteName: "Tabs",
    header: null,
    headerMode: 'none'
  }
);

const AppNavigator = createAppContainer(ScreensStack);
export default AppNavigator;