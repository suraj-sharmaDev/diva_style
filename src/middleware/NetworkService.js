import NetInfo from "@react-native-community/netinfo";

const NetworkService = (mounted, callback) => {
	// Subscribe
	const unsubscribe = NetInfo.addEventListener(state => {
	  callback(state.isConnected);
	});
	if(!mounted)
	{
		// Unsubscribe
		unsubscribe();	
	}
}

export default NetworkService;