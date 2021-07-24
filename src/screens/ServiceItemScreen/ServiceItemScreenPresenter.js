import React from 'react';
import styled from 'styled-components';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { GetAllServices, GetServiceItem } from '../../middleware/ServiceApi';
import { AlertService } from '../../middleware/AlertService';
import HomeScreenLoader from "../../components/HomeScreen/HomeScreenLoader";
import Header from '../../components/ShopScreenCategory/Header';
import ServiceCategoryListing from "../../components/ServiceItemScreen/ServiceCategoryListing";
import Packers from "../../components/ServiceItemScreen/PackersMovers";
import ProceedCard from '../../components/ServiceScreen/ProceedCard';

import { Colors, Fonts } from '../../constants';

const Theme = styled.View`
  background-color: white;
  height : 100%;
`;
const Text = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    text-transform: capitalize;
`;

const ServiceItemScreenPresenter = ({ navigation, label, store, ...props }) => {
  // const categoryId = 11;
  // const categoryName = "Packers and Movers";
  const {categoryId, categoryName, initialPaymentAmount, minBookDay} = navigation.state.params;
  const isPackersAndMovers = categoryName.trim() === "Packers and Movers";
  // console.warn('ServiceItemScreen=>', categoryId, categoryName);
  // const categoryId = 1;
  // const categoryName = 'Automobile';
  const [isLoading, updateLoading] = React.useState(true);
  React.useEffect(() => {
    fetchServiceItems();
    return () => { }
  }, []);

  const fetchServiceItems = () => {

    if(isPackersAndMovers) {
      updateLoading(false);
      return null;
    }

    updateLoading(true);
    GetServiceItem(categoryId)
      .then((result) => {
        if (result.length == 0 || result.error) {
          if (typeof outOfRange == 'undefined') {
            outOfRange = true;
          }
          else {
            if (!outOfRange) {
              //if outofRange has already been set don't set again
              outOfRange = true;
            }
          }
          updateLoading(false);
        }
        else {
          outOfRange = false;
          Services = result;
          updateLoading(false);
        }
      })
      .catch((err) => {
        outOfRange = true;
        updateLoading(false);
        AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => { });
      })
  }

  const locationChangeApproval = () => {
    AlertService('Notice', 'Do you want to change your location?', () => {
      navigation.navigate('LocationSelector', { screen: "Service", callback: checkCategoryExists })
    });
  }

  const checkCategoryExists = (lat, lng) => {
    return new Promise((resolve, reject) => {
      let exists = false;
      GetAllServices({ latitude: lat, longitude: lng }, categoryId)
        .then((res) => {
          if (res.length == 0 || res.error) {
            // category doesnt exist near user
            AlertService('Notice', `${categoryName} service does not exist in this location. \nContinue?`, () => {
              resolve(true);
            }, false);
          } else {
            //category exists near user
            resolve(true);
          }
        })
        .catch((err) => {
          AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => {
            reject(true);
          });
        })
    })
  }

  let content = null;
  if (isLoading || isLoading === null) {
    content = (
      <>
        <Header title={categoryName} navigation={navigation} showCart={true} />
        <HomeScreenLoader />
      </>
    );
  }
  else {
    /**
     * We have a difference in layout for Category `packers and movers`
     * For `packers and movers` content will be as follows
     */
    if(isPackersAndMovers){
      content = (
        <Packers 
          categoryId={categoryId} 
          categoryName={categoryName}
          initialPaymentAmount={initialPaymentAmount}
          minBookDay={minBookDay}
          navigation={navigation}
        />);
    }else {
      content = (
        <>
          <Header title={categoryName} navigation={navigation} showCart={true} />

          <View style={[styles.row, styles.centerAlign]}>
            <Text>Services for {categoryName} available near {" "}</Text>
            <TouchableOpacity onPress={locationChangeApproval}>
              <Text style={styles.bluedText}>({label})</Text>
            </TouchableOpacity>
          </View>
          <ServiceCategoryListing
            Services={Services}
            navigation={navigation}
            categoryId={categoryId}
            label={categoryName}
            initialPaymentAmount={initialPaymentAmount}
            minBookDay={minBookDay}
          />
        </>
      );
    }
  }
  return (
    <Theme>
      {content}
      <ProceedCard navigation={navigation} />
    </Theme>
  );
};

const styles = StyleSheet.create({
  flatListContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  },

  row: {
    marginTop: 20,
    flexDirection: "row"
  },

  centerAlign: {
    justifyContent: "center",
    flexWrap: "wrap"
  },

  bluedText: {
    color: Colors.greenColor
  }
});

export default ServiceItemScreenPresenter;