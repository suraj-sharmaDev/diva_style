import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Fonts, Colors} from '../../constants';

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const OrderCard = ({order, navigation, ...props}) => {
    let date = new Date(order.createdAt);
    const year = date.getFullYear();
    const month = months[date.getUTCMonth()];
    const day = date.getDate();
    date = `${month} ${day} ${year}`;
    let total = 0;
    const clickHandler = () => {
        navigation.navigate('RecentOrderDetail',{'item':order});
    }
    let content = (
        <View style={[styles.shadowView, styles.container]}>
            <View style={styles.header}>
                <Text style={styles.title}>{order.shopName}</Text>
                <Text style={styles.title}>{date}</Text>
            </View>
            <View>
                {
                    order.items.map((o, index)=>{
                        total += parseInt(o.qty) * parseInt(o.price);
                        return(
                            <View key={index} style={styles.orderRow}>
                                <Text style={[styles.subtitle, { flex: 0.7}]}>
                                    {o.productName}
                                </Text>
                                <Text style={[styles.subtitle, { flex: 0.3, textAlign: 'right'}]}>
                                    {o.qty} x Rs {o.price}
                                </Text>                            
                            </View>
                        )
                    })
                }
            </View>
            <View style={[styles.orderRow, 
                { justifyContent: 'space-between', marginTop: 10}]}
            >
                <Text style={styles.title}>
                    Total : {total}
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={clickHandler}
                >
                    <Text style={[styles.subtitle, {color: 'white'}]}>Reorder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return content;
}

const styles = StyleSheet.create({
    shadowView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    container: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    title: {
        fontFamily: Fonts.boldFont,
        fontSize: 15,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontFamily: Fonts.normalFont,
        fontSize: 14,
    },
    button: {
        backgroundColor: Colors.greenColor,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default OrderCard;