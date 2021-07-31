import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

import ShopQuantityButton from '../ShopScreenCategory/ShopQuantityButton';
import ImageViewer from "../ShopScreenCategory/ImageViewer";
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const Container = styled.View`
    margin-top: 50px;
`;

const View = styled.View``;
const Label = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.darkGreyColor};	
	margin-bottom : 10px;
`;
const Image = styled.Image`
  background-color : ${Colors.searchBarColor};
  width : 160px;
  height : 80px;
  resize-mode: center;
  margin-bottom: 10px;
`;
const Text = styled.Text``;

const Item = ({product, onlineStatus, showImageViewer}) => {
    return (
        <View style={styles.productView}>
            <TouchableOpacity onPress={()=>showImageViewer(product)}>
                <Image source={{ uri : product.image }}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 0.65, justifyContent: 'flex-start'}}>
                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                </View>
                <View style={{flex: 0.35, justifyContent: 'flex-end'}}>
                {
                !product.stock
                ?
                <ShopQuantityButton 
                    item={{
                        shopId : product.shopId,
                        deliveryAvail : false, 
                        productId : product.productId, 
                        name : product.name, 
                        price : product.price,
                        extras : product.extras ? product.extras : null,
                        image: product.image
                    }}
                    onlineStatus={onlineStatus}
                />
                :
                <Text style={{color : Colors.lightGreyColor}}>Unavailable</Text>          
                }
                </View>
            </View>
        </View>
    );
}

const RecommendedProducts = ({products, onlineStatus, ...props}) => {
	const [imageViewerState, setImageViewerState] = React.useState({
		isVisible: false,
		item: null
	});

	const showImageViewer = (item) => {
		setImageViewerState({
			isVisible: true,
			item
		});
	}

	const hideImageViewer = () => {
		setImageViewerState({
			isVisible: false,
			item: null
		});
	}

    let content = null;
    if(products != null){
        content = (
            <Container>
                <Label>Recommended Products</Label>
                <FlatList
                    horizontal={true}
                    data={products}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <Item 
                            product={item}
                            onlineStatus={onlineStatus}
                            showImageViewer={showImageViewer}
                        />
                    )}
                    keyExtractor={(item, index) => 'key'+index}
                    extraData={products}
                />
				<ImageViewer 
					hideImageViewer={hideImageViewer} 
					imageViewerState={imageViewerState}
				/>                         
            </Container>
        );
    }
    return content;
}

const styles = StyleSheet.create({
    productView: {
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        padding: 8,
        borderRadius: 6
    },
    productName: {
        fontSize: 14,
        color: Colors.darkGreyColor,
        fontFamily: Fonts.normalFont
    }
});
export default RecommendedProducts;