import React from 'react';
import styled from 'styled-components';

import AbortController from '../../middleware/AbortController';
import { AlertService } from '../../middleware/AlertService';
import { GetServiceItemPackages } from '../../middleware/ServiceApi';
import { GetAppConfigDetails } from '../../middleware/API';
import HomeScreenLoader from "../../components/HomeScreen/HomeScreenLoader";
import Header from '../../components/ShopScreenCategory/Header';
import Data from './data.json';
import PackageRepairs from "../../components/ServicePackageScreen/PackagesRepairs";
import BreakdownService from "../../components/ServicePackageScreen/BreakdownService";
import ProceedCard from '../../components/ServiceScreen/ProceedCard';
import { CreateQuoteForServices } from '../../utils/CreateQuote';

const Theme = styled.View`
  background-color: white;
  height : 100%;
`;
const ServiceScreenPresenter = ({ navigation, ...props }) => {
  const { categoryId, parentId, categoryName, initialPaymentAmount, minBookDay } = navigation.state.params;
  console.warn("ServicePackageScreen=>",categoryId, parentId, categoryName, initialPaymentAmount, minBookDay);
  // const categoryId = 28;
  // const categoryName = 'Home Maintenace';
  // const categoryId = 1;
  // const parentId = 1;
  // const categoryName = 'Breakdown Assistance';
  const [isLoading, updateLoading] = React.useState(true);
  const [initialPayment, setInitialPayment] = React.useState(200);

  React.useEffect(() => {
    abortController = new AbortController();
    fetchServices();
    fetchInitialPayment();
    return () => {
      abortController._abort();
    }
  }, []);

  const fetchInitialPayment = () => {
    GetAppConfigDetails()
    .then((res)=>{
      if(!res.error){
        setInitialPayment(res.entity[0].serviceInitialPayment);
      }
    })
  }

  const fetchServices = () => {
    if (categoryName === 'Breakdown Assistance') {
      updateLoading(false);
      return;
    }
    //only fetch if categoryName is not Breakdown Assistance
    // outOfRange = false;
    // ServicePackages = Data;
    // updateLoading(false);
    // return;    
    if (!isLoading) updateLoading(true);
    GetServiceItemPackages(categoryId)
      .then((result) => {
        if (!abortController._signal()) {
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
            ServicePackages = result;
            updateLoading(false);
          }
        }
      })
      .catch((err) => {
        outOfRange = true;
        if (!abortController._signal()) {
          updateLoading(false);
        }
        AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => { });
      })
  }

  const postQuoteForBreakDown = formData => {
    //post quote to server
    AlertService(
      'Proceed',
      `You maybe required to pay initial payment. Continue?`,
      () => { 
        CreateQuoteForServices(formData)
        .then((res)=>{
          AlertService(
            'Success',
            'Your request for breakdown assistance has been forwarded. Please wait!',
            () => { }
          );
          navigation.navigate('Orders', { switcherStatus : 'RIGHT' });
        })
        .catch((err)=>{
          AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', () => { });
        })        
      }
    );
  }

  let content = null;
  if (isLoading || isLoading === null) {
    content = (<HomeScreenLoader />);
  } else if (categoryName === 'Breakdown Assistance') {
    //only in case of breakdown service
    //we rely on parent categoryId
    content = (
      <BreakdownService
        categoryId={parentId}
        categoryName={categoryName}
        postQuote={postQuoteForBreakDown}
      />
    );
  }
  else {
    content = (
      <>
        <PackageRepairs
          navigation={navigation}
          ServicePackages={ServicePackages}
          title={categoryName}
          categoryId={categoryId}
          initialPaymentAmount={initialPaymentAmount}
          minBookDay={minBookDay}
        />
        <ProceedCard navigation={navigation} />
      </>
    );
  }
  return (
    <Theme>
      <Header title={categoryName} navigation={navigation} showCart={true} />
      {content}
    </Theme>
  );
};

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//   };
// };

// export default React.memo(connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ServiceScreenPresenter));

export default ServiceScreenPresenter;