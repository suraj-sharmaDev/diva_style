import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { width, height } from '../../constants/Layout';
import Entypo from "react-native-vector-icons/Entypo";

const Container = styled.View``;
const Button = styled.TouchableOpacity``;
const Title = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    margin-bottom: 5px;
`;
const BoldText = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.boldFont};
`;
const Label = styled.Text`
    font-size: 12px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
`;
const BigLabel = styled.Text`
    font-size: 15px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
    margin-left: 10;
`;
const Item = ({ selected, info, infoHandler, selectHandler }) => {
    const isActive = selected ? info.PackageItemsId === selected.PackageItemsId : false;
    const viewStyle = isActive ? styles.active : styles.inactive;
    const fontStyle = isActive ? { color: 'white' } : { color: 'black' };
    return (
        <View style={[styles.packageCard, viewStyle]}>
            <Button style={[styles.infoView]} onPress={() => infoHandler(info)}>
                <Entypo name="info-with-circle" size={13} />
            </Button>
            <Button
                style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
                onPress={() => { selectHandler(info) }}
            >
                <View style={styles.packageDetail}>
                    <View style={{ flexDirection: 'row' }}>
                        <BoldText style={fontStyle}>Rs {info.OfferRate}</BoldText>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Label style={fontStyle}>Rs {info.Rate}/-</Label>
                    </View>
                </View>
                <View style={styles.packageName}>
                    <BoldText style={{ color: "white" }} numberOfLines={1}>
                        {info.PackageItemName}
                    </BoldText>
                </View>
            </Button>
        </View>
    );
}

const DescriptionModal = ({ isVisible, modalBody, modalController }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={modalController}
            onBackdropPress={modalController}
        >
            <View style={[styles.modalBody]}>
                <View style={[styles.modalHeader]}>
                    <BoldText>Details</BoldText>
                    <Button onPress={modalController}>
                        <Entypo name="circle-with-cross" size={22} />
                    </Button>
                </View>
                <View style={{ marginTop: 30 }}>
                    {
                        modalBody !== null && modalBody.map((data, index) => (
                            <View style={[styles.modalContentRow]} key={index}>
                                <Entypo name="dot-single" size={20} />
                                <BigLabel>{data}</BigLabel>
                            </View>
                        ))
                    }
                </View>
            </View>
        </Modal >
    );
}
const PackageDetailModal = ({
    addMiscDataForPackage, categoryId, selected,
    info, isVisible,
    closeModal, ...props
}) => {
    const [state, setState] = React.useState({
        choice: null,
        modalVisible: false,
        modalBody: null
    });
    // const [choice, updateChoice] = React.useState(null);

    // let numColumns = width > 420 ? 3 : 2;
    React.useEffect(() => {
        setState({ ...state, choice: null });
    }, [selected])
    const renderListFooter = () => {
        return <View style={{ paddingBottom: 20 }} />
    };

    const selectHandler = (info) => {
        setState({ ...state, choice: info });
        addMiscDataForPackage("packageData", {
            type: 'package',
            name: selected,
            categoryId: categoryId,
            data: info
        });
    }

    const infoHandler = (info) => {
        try {
            let json = JSON.parse(info.Description);
            setState({ ...state, modalVisible: true, modalBody: json });
        } catch (error) {
            console.warn(error);
        }
    }

    const modalController = () => {
        setState({ ...state, modalVisible: false, modalBody: null });
    }

    let content = null;
    if (info != null) {
        content = (
            <React.Fragment>
                <Title style={{ textAlign: 'center', marginVertical: 20, fontSize: 16 }}>
                    Available Packages for {selected}
                </Title>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={info}
                    renderItem={({ item }) => (
                        <Item
                            selected={state.choice}
                            info={item}
                            infoHandler={infoHandler}
                            selectHandler={selectHandler}
                        />
                    )}
                    ListFooterComponent={renderListFooter}
                    keyExtractor={item => item.PackageItemsId + 'key'}
                    extraData={info}
                />
                <DescriptionModal
                    isVisible={state.modalVisible}
                    modalBody={state.modalBody}
                    modalController={modalController}
                />
            </React.Fragment>
        );
    }
    return (
        <Container>
            {content}
        </Container>
    );
}

const styles = StyleSheet.create({
    packageCard: {
        height: "auto",
        width: 120,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6.2,
        elevation: 2,
        borderColor: Colors.boxShadowColor,
        borderWidth: 0.4,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: 'center',
    },
    packageName: {
        marginTop: 10,
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.darkGreenColor
    },
    infoView: {
        width: "100%",
        paddingRight: 10,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    packageDetail: {
        justifyContent: 'center',
    },
    active: {
        backgroundColor: Colors.greenColor,
    },
    inactive: {
        backgroundColor: Colors.searchBarColor,
    },
    modalBody: {
        backgroundColor: "white",
        height: height * 0.8,
        padding: 10
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    modalContentRow: {
        flexDirection: "row",
        alignItems: "center"
    },
});

export default PackageDetailModal;