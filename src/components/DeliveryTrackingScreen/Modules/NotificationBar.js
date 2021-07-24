import React from 'react';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import { Fonts, Colors } from '../../../constants';

const Container = styled.View`
    background-color: ${Colors.greenColor};
    position: absolute;
    bottom: 74px;
    height: 40px;
    padding: 10px 10px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Button = styled.TouchableOpacity`
    padding: 20px 15px;
`;
const Text = styled.Text`
    font-size: 13px;
    font-family: ${Fonts.normalFont};
    color: white;
`;

const NotificationBar = ({ navigation, ...props }) => {
    const [close, updateClose] = React.useState(false);
    const closeNotification = () => {
        updateClose(true);
    }
    const actionHandler = () => {
        navigation.navigate('Orders');
    }
    let content = null;
    if (props.order.pendingOrders.length > 0 && !close) {
        content = (
            <Container>
                <Button onPress={closeNotification}>
                    <Icons name="close-circle" size={20} color={'white'} />
                </Button>
                <Button disabled={true}>
                    <Text>You have {props.order.pendingOrders.length} pending orders! Track it</Text>
                </Button>
                <Button onPress={actionHandler}>
                    <Icons name="chevron-right" size={20} color={'white'} />
                </Button>
            </Container>
        );
    }
    return content;
}

const mapStateToProps = state => {
    return {
        order: state.order
    };
};
const mapDispatchToProps = dispatch => {
    return {
    }
};


export default React.memo(connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationBar));
