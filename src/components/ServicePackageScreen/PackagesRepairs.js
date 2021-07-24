import React from 'react';
import styled from 'styled-components';

import ServiceSelection from './ServiceSelection';
import Repairs from './Repairs';
import Packages from './Packages';
import { Colors, Fonts } from '../../constants';
import Icon from '../../assets/images/icons';
const Container = styled.View``;
const View = styled.View``;
const UnavailableView = styled.View`
    height: 300px;
    padding: 20px;
    justify-content: center;
    align-items: center;
`;
const Image = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 40px;
`;
const Label = styled.Text`
    font-size: 16px;
    font-family: ${Fonts.normalFont};
    color: ${Colors.blackColor};
`;

const PackageRepairs = ({ 
    ServicePackages, 
    navigation, 
    title, 
    categoryId,
    initialPaymentAmount,
    minBookDay,
    ...props 
}) => {
    let packages = ServicePackages.packages;
    let repairs = ServicePackages.repairItems;
    let symptoms = ServicePackages.symptoms;
    let content = null;
    const [state, setState] = React.useState({
        type: null,
        loading: true
    });

    React.useEffect(() => {
        if (packages != null) {
            setState({ type: 'package', loading: false });
        } else if (repairs != null || symptoms != null) {
            setState({ type: 'repair', loading: false });
        } else {
            setState({ type: null, loading: false });
        }
    }, []);

    const selectHandler = (type) => {
        setState({ type: type });
    }
    
    if (state.type === 'package') {
        content = (<Packages
            packages={packages}
            key={'packages'}
            navigation={navigation}
            title={title}
            categoryId={categoryId}
            initialPaymentAmount={initialPaymentAmount}
            minBookDay={minBookDay}
        />);
    } else if (state.type === 'repair') {
        content = (<Repairs
            repairs={repairs}
            symptoms={symptoms}
            key={'repairs'}
            navigation={navigation}
            title={title}
            categoryId={categoryId}
            initialPaymentAmount={initialPaymentAmount}
            minBookDay={minBookDay}            
        />);
    } else if (state.type === null && !state.loading) {
        //there are no packages or repairs
        let iconName = 'writing_instruments';
        content = (
            <UnavailableView key={0}>
                <Image source={Icon[iconName]} />
                <View>
                    <Label>
                        There are no available packages in your location.
                    </Label>
                    <Label>
                        Sorry for incovenience
                    </Label>
                </View>
            </UnavailableView>
        );

    }
    return (
        <Container>
            {
                !state.loading && packages != null && repairs != null
                    ?
                    <ServiceSelection
                        type={state.type}
                        selectHandler={selectHandler}
                    />
                    :
                    null
            }
            {content}
        </Container>
    );
}

export default PackageRepairs;