import React, {Component} from 'react';
import ShopScreenCategoryPresenter from './ShopScreenCategoryPresenter';
import LoadingScreen from '../../components/LoadingScreen';

class ShopScreenCategoryContainer extends React.PureComponent {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      items : this.props.navigation.state.params.items,
      categoryId : this.props.navigation.state.params.categoryId,
      subCategoryId : this.props.navigation.state.params.subCategoryId!=undefined ? this.props.navigation.state.params.subCategoryId : null,
      subCategoryChildId :  this.props.navigation.state.params.subCategoryChildId!=undefined ? this.props.navigation.state.params.subCategoryChildId : null,
      onlineStatus : this.props.navigation.state.params.onlineStatus,
      deliveryAvailability : this.props.navigation.state.params.deliveryAvailability
    };
    // this.state = {
    //   items : DATA
    // };
  }

  render() {
    return (
      <ShopScreenCategoryPresenter 
        parentProps={this.state}
        navigation={this.props.navigation} 
      />
    );
  }
}

export default ShopScreenCategoryContainer;
