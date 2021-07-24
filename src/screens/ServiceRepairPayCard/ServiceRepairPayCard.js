import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';
import AbortController from '../../middleware/AbortController';
import RepairCard from '../../components/ServicePackageScreen/RepairCard';
import RepairsListingByCategory from '../../components/ServicePackageScreen/RepairsListingByCategory';
import { GetRepairPartsRate } from '../../middleware/ServiceApi';
import Header from '../../components/ShopScreenCategory/Header';
import LoadingScreen from '../../components/LoadingScreen';
import Fonts from "../../constants/Fonts";

// import Data from './ApiData.json';

const Container = styled.ScrollView``;
const Label = styled.Text`
    margin: 10px 0px;
    font-family: ${Fonts.boldFont};
    font-size: 16px;
`;

const ServiceRepairPayCard = ({ navigation, ...props }) => {
    const repairs = navigation.state.params.repairs;
    // const repairs = Data;
    // let numColumns = width > 420 ? 4 : 3;
    const [state, updateState] = React.useState({
        loading: false,
        details: null,
        type: null,
        selected: null
    });

    React.useEffect(() => {
        abortController = new AbortController();
        return () => {
            abortController._abort();
        }
    }, [])

    const renderListFooter = () => {
        return <View style={{ paddingBottom: 20 }} />
    };
    const actionHandler = (repairItem) => {
        let name = repairItem.RepairItems.replace(/\s+/g, '_').toLowerCase();
        if (state.type === 'repairPartsRate' || state.type === null) {
            //the logic of this, if condition is to
            //call spairparts api only once
            updateState({ ...state, loading: true });
            GetRepairPartsRate(repairItem.RepairItemId)
                .then((result) => {
                    if (!abortController._signal()) {
                        if (typeof result.repairPartsRate != 'undefined') {
                            updateState({
                                ...state,
                                details: result,
                                type: 'repairPartsRate',
                                selected: name,
                                loading: false
                            });
                        } else {
                            updateState({
                                ...state,
                                details: result,
                                type: 'spairPartsRate',
                                selected: name,
                                loading: false
                            });
                        }
                    }
                })
                .catch((err) => {
                    // console.warn(err);
                    if (!abortController._signal()) {
                        updateState({ ...state, loading: false });
                    }
                });
        } else {
            updateState({ ...state, selected: name });
        }
    }
    let content = (
        <Container>
            <Header title={'Repair Rate Card'} navigation={navigation} showCart={false} />
            <View style={{ padding: 10 }}>
                <Label>Please select to see it's repair and service charges</Label>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={repairs}
                    renderItem={({ item }) => (
                        <RepairCard
                            selected={state.selected}
                            info={item}
                            actionHandler={actionHandler}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    ListFooterComponent={renderListFooter}
                    keyExtractor={item => item.RepairItemId + 'key'}
                    extraData={repairs}
                />
                {
                    state.loading
                        ?
                        <LoadingScreen />
                        :
                        <RepairsListingByCategory
                            details={state.details}
                            selected={state.selected}
                            type={state.type}
                        />
                }
            </View>
        </Container>
    );
    return content;
}

export default ServiceRepairPayCard;