import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';

import Colors from '../../constants/Colors';

const OverlayLoader = props => {
	React.useEffect(()=>{
		//Only activate when isloading changes
	},[props.isLoading])
	let content = (
		<Modal
          animationType="fade"
          transparent={true}
          visible={props.isLoading}
        >
          <View 
          	style={{backgroundColor : Colors.transparentColor, height : '100%', alignItems : 'center', justifyContent : 'center'}}
          >
			<ActivityIndicator size="large" color={Colors.greenColor} />
          </View>
        </Modal>
    );
	return content;
}

export default OverlayLoader;