import {Alert} from 'react-native';

export const AlertService = (title, body, callback, cancel=true) => {
	if(cancel){
		Alert.alert(
			title,
			body,
			[
	          {text: 'Ok', onPress: () => callback()},
				{
					text: 'Cancel',
					style: 'cancel',
				},
			],
			{cancelable: false},
		);		
	}else{
		Alert.alert(
			title,
			body,
			[
	          {text: 'Ok', onPress: () => callback()},
			],
			{cancelable: false},
		);		
	}
}
