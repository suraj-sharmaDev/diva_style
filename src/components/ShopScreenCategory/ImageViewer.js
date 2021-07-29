/******************************************
 *  Author : Suraj Sharma
 *  Created On : Thu Jul 29 2021
 *  File : ImageViewer.js
 *******************************************/
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icons from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

const {height, width} = Dimensions.get('window');

const ImageViewerComponent = ({imageViewerState, hideImageViewer, ...props}) => {

    const [images, setImages] = React.useState([
        // {
        //     url: 'https://nxtshops.com/assets/images/productPool/party_top_black/bigImage1.jpg'
        // },
        // {
        //     url: 'https://nxtshops.com/assets/images/productPool/party_top_black/400_x_400/image.jpg'
        // }        
    ]);

    React.useEffect(()=>{
        if (imageViewerState.item !== null && imageViewerState.isVisible) {
            const data = [];
            for(var key in imageViewerState.item) {
                if (imageViewerState.item.hasOwnProperty(key)) {
                    if (key.toLowerCase().includes('image')) {
                        const image = imageViewerState.item[key];
                        if (image) {
                            data.push({
                                url: imageViewerState.item[key],
                                freeHeight: true
                            });
                        }
                    }
                }
            }
            setImages(data);
        }
    }, [imageViewerState.item]);
    
    return (
      <Modal
        isVisible={imageViewerState.isVisible}
        onBackButtonPress={hideImageViewer}
        style={{padding: 10, margin: 0}}
        deviceHeight={height}
        deviceWidth={width}>
        <View style={{flex: 1}}>
            <TouchableOpacity style={styles.header} onPress={hideImageViewer}>
                <Icons name="close" size={25} color={'white'}/>
            </TouchableOpacity>
            {
                images.length > 0 && (
                    <ImageViewer imageUrls={images}/>                    
                )
            }
        </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});

export default ImageViewerComponent;