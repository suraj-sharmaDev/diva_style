import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import { Container, Content, View } from 'native-base';
import styled from "styled-components";
import {connect} from 'react-redux';

import Color from "../../constants/Colors";

import {SearchWithSubCategory} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';
import ExploreScreenLoader from '../../components/ExploreScreen/ExploreScreenLoader';
import ExploreScreenHeader from "../../components/ExploreScreenHeader";
import ScrollCategory from "../../components/ScrollCategory";
import ExploreMenu from "../../components/ExploreMenu";

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const Text = styled.Text``;
const ExploreScreenPresenter = ({navigation, ...props}) => {
  const [selectedId, setSelectedId] = useState(null); 

  useEffect(() => {
    initialization();
  },[]);

  const initialization = () => {
    currentCategoryData = navigation.getParam('categoryData');
    currentId = navigation.getParam('selectedId');
    currentIndex = navigation.getParam('index');
    subCategory = currentCategoryData.subCategories[currentIndex];
    subCategoryChildren = subCategory.subCategoryChildren;
    if (subCategoryChildren[0]?.id) {
      fetchProducts(subCategoryChildren[0]?.id);
    } else {
      // if there is not ids passed
      global.products = null;
      setSelectedId(undefined);
    }
  }
  const fetchProducts = (subCategoryChildId) => {
    let coordinates = null;
    if(props.address.savedAddresses.length > 0){
      coordinates = props.address.savedAddresses[props.address.currentAddress].coordinate;
    }else{
      coordinates = props.address.guestAddress;
    }
     SearchWithSubCategory(subCategoryChildId, coordinates)
     .then((result)=>{
      global.products = result;
      setSelectedId(subCategoryChildId);
     })
     .catch((err)=>{
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
     })
  }
  const onSelect = (id, index) => {
    selectedCategory = subCategoryChildren[index];
    if(selectedCategory?.id) {
      fetchProducts(selectedCategory.id);
    }
  };

  let content = <ExploreScreenLoader />;
  if(selectedId!==null){
    content = (
      <Theme>
        <ExploreScreenHeader 
          navigation={navigation} 
          categoryName={subCategory.name}
        />
        <ScrollCategory 
          selected={selectedId} 
          onSelect = {onSelect} 
          data={subCategoryChildren}
        />        
        {
        <ExploreMenu 
          navigation={navigation} 
          products={global.products} 
          selectedId={selectedId}
        />
        }
      </Theme>
    );
  }
  return content;
};
const mapStateToProps = state => {
  return {
    address : state.address
  }
}
export default React.memo(connect(mapStateToProps,{})(ExploreScreenPresenter));
// export default React.memo(ExploreScreenPresenter);
