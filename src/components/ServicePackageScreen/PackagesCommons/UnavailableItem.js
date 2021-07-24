import React from 'react';
import styled from 'styled-components';
import Icon from '../../../assets/images/icons';
import { Colors, Fonts } from '../../../constants';

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

const UnavailableItem = ({ ...props }) => {
    let iconName = 'writing_instruments';
    let content = (
        <UnavailableView>
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
    return content;
}

export default UnavailableItem;