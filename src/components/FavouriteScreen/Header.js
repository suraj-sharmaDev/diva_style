import React from 'react';
import styled from 'styled-components';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
    height: 60px;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-bottom-width: 0.23px;
    border-bottom-color: ${Colors.lightGreyColor};    
    elevation: 1;
`;
const Label = styled.Text`
    font-family: ${Fonts.boldFont};
    font-size: 17px;
    color: ${Colors.blackColor};
`;

const Header = props => {
    let content = (
        <Container>
            <Label>Favourites</Label>
        </Container>
    );
    return content;
}

export default Header;