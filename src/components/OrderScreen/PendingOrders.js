import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import styled from 'styled-components';
import { Colors, Fonts } from '../../constants';

const Theme = styled.View`
  background-color: ${Colors.homeBackgroundColor};
  padding: 10px;
`;
const View = styled.View``;
const Text = styled.Text``;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const _renderHeader = section => {
  const date = new Date(section.createdAt);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <Icons name="shop" size={20} color={Colors.darkGreyColor} />
        <Text style={styles.headerText}>{section.name}</Text>
      </View>
      <View style={styles.row}>
        <Icons name="calendar" size={20} color={Colors.darkGreyColor} />
        <Text style={styles.headerText}>{month} {day} {year}</Text>
      </View>
    </View>
  );
};

const _renderContent = section => {
  let total = 0;
  const deliveryAddress = JSON.parse(section.deliveryAddress);
  return (
    <View style={[styles.container]}>
      {_renderHeader(section)}
      <View style={styles.content}>
        <View style={[styles.row, { marginBottom: 10 }]}>
          <Text style={[styles.orderText]}>Delivery Address</Text>
          <Text style={styles.headerText}>{deliveryAddress.houseDetail} {deliveryAddress.landmark}</Text>
        </View>
        {
          section.items.map((item, index) => {
            total += item.qty * item.price;
            return (
              <View style={styles.orderDetail} key={index}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.orderText}>{item.productName} X {item.qty}</Text>
                </View>
                <View>
                  <Text style={styles.orderText}>Rs {item.qty * item.price}</Text>
                </View>
              </View>
            );
          })
        }
        <View style={[styles.row, { marginTop: 15, justifyContent: "space-between" }]}>
          <Text style={styles.totalText}>Total Rs {total}</Text>
          <Text style={styles.totalText}>{section.status}</Text>
        </View>
      </View>
    </View>
  );
};

const PendingOrders = ({ navigation, pendingOrders, ...props }) => {

  const categoryItemRowKeyExtractor = (item, index) => {
    return index + 'key';
  }

  let content = (
    <Theme>
      {
        pendingOrders.length > 0
          ?
          <>
            <FlatList
              data={pendingOrders}
              renderItem={({ item }) => _renderContent(item)}
              keyExtractor={categoryItemRowKeyExtractor}
              extraData={pendingOrders}
            />
          </>
          :
          <View style={styles.header}>
            <Text style={styles.totalText}>No Pending orders</Text>
          </View>
      }
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={props.navigateToRecentOrders}
      >
        <Text style={styles.buttonText}>View Recent Orders</Text>
      </TouchableOpacity>      
    </Theme>
  );
  return content;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.homeBackgroundColor,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: Colors.lightGreyColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: Fonts.boldFont,
    fontSize: 17,
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    padding: 5,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: Fonts.normalFont
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: Colors.greyColor,
    padding: 10,
    borderRadius: 5
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  orderText: {
    fontSize: 14,
    fontFamily: Fonts.boldFont,
  },
  totalText: {
    fontSize: 16,
    fontFamily: Fonts.boldFont,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  footerButton: {
    backgroundColor: Colors.darkGreenColor,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
},
buttonText: {
    color: Colors.homeBackgroundColor,
    fontFamily: Fonts.normalFont,
    fontSize: 16
}  
});

export default PendingOrders;
