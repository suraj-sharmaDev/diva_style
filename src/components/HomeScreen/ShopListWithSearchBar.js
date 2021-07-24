import React from 'react';
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components";

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import FilterList from './FilterList';
import ShopList from "./ShopList";
import FakedSearchBar from "../FakedSearchBar";

const Container = styled.View``;

const FilterContainer = styled.TouchableOpacity`
  elevation : 3;
  shadow-opacity: 0.1;
  shadow-radius: 2.14px;
  shadow-color: #606060;
  shadow-offset: 0px 1px;  
  border-radius : 7px;

  align-items : center;
  justify-content : center;
  margin-top : 20px;
  margin-right : 20px;
  padding : 0px 10px;
  height : 40px;
  background-color : white;
`;
const Label = styled.Text`
  padding-left: 20px;
  font-size: 15px;
  color: ${Colors.darkGreyColor};
  font-family: ${Fonts.normalFont};
`;
const ShopListWithSearchBar = ({Shops, navigation}) => {
  const [active, updateActive] = React.useState(null);
  React.useEffect(()=>{
    initialize();
  },[]);

  const initialize = () => {
    shopsList = Shops;
    refresh = false;
    selectedFilter = "distance";
    updateActive(false);
  }
  const toggleModal = () => {
    updateActive(!active);
  }
  const filterHandler = (type) => {
    if(type==='distance')
    {
      shopsList.sort(function(a, b){
          return a.distance - b.distance;
      });
      refresh = !refresh;
      selectedFilter = "distance";
      updateActive(!active);
    }else if(type==='rating')
    {
      shopsList.sort(function(a, b){
          return b.rating - a.rating;
      });
      refresh = !refresh;
      selectedFilter = "rating";      
      updateActive(!active);
    }
  }
  let content = null
  if(active!==null){
    content = (
      <Container>
        {
      //   <FakedSearchBar navigation={navigation}>
      //   <FilterContainer onPress={toggleModal}>
      //     <Icon name="filter" size={18} color={Colors.lightGreyColor} />
      //   </FilterContainer>   
      // </FakedSearchBar>
      // <FilterList 
      //   active={active}
      //   selected={selectedFilter}
      //   filterHandler={filterHandler} 
      //   toggleModal={toggleModal}
      // />
        }
        <Label>Stores Near You</Label>
        <ShopList 
          Shops={shopsList}
          refresh={refresh} 
          navigation={navigation}
        />
      </Container>          
    );
  }
  return content;
};

export default ShopListWithSearchBar;