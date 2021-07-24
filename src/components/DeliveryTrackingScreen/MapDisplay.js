import React from "react";
import { PermissionsAndroid, Dimensions } from 'react-native';
import MapView from "react-native-maps";
import styled from "styled-components";
import AntDesign  from "react-native-vector-icons/AntDesign";
import CustomMap from '../../constants/CustomMap.json';

const {height, width} = Dimensions.get('window');
const MapContainer = styled.View` 
  height : 50%;
`;
const MarkerImage = styled.Image`
  width : 24px;
  height : 24px;
`;

const MapDisplay = (props) => {
  const [isMapReady, updateMapReady] = React.useState(false);
  React.useEffect(()=>{
    mapFitOnScreen();
  },[props.markers, isMapReady]);

  const onRegionChange = (coords) => {
    // console.warn(coords);
  }
  const _mapRef = (ref) => {
    _map = ref;
  }  
  const mapFitOnScreen = () => {
    if(isMapReady && props.markers.deliveryMarker.latitude && props.markers.deliveryMarker.longitude){
      let edgePadding = { bottom: 100, right: 24, left: 0, top: 20};    
      _map.fitToCoordinates([props.markers.userMarker, props.markers.deliveryMarker],{edgePadding,animated:true});
    }else if(isMapReady){
      let edgePadding = { bottom: 100, right: 24, left: 0, top: 20};    
      _map.fitToCoordinates([props.markers.userMarker],{edgePadding,animated:true});      
    }
  }
  let content = (
    <MapContainer>
      <MapView
        style={{height: '100%', width : '100%'}}
        minZoomLevel={10}
        ref={_mapRef}
        initialRegion={props.userLocation}
        onRegionChangeComplete={onRegionChange}
        customMapStyle={CustomMap}
        onMapReady={()=>updateMapReady(true)}
      >
            <MapView.Marker 
              coordinate={props.markers.userMarker}
            >
              <AntDesign
                name='enviromento'
                size={22}
                color='red'
              />
            </MapView.Marker>
            {
              props.markers.deliveryMarker.latitude!==0
              ?
              <MapView.Marker 
                coordinate={props.markers.deliveryMarker}
              >
                <MarkerImage source={require('../../assets/images/scooter.png')} />
              </MapView.Marker>
              :
              null
            }            
      </MapView>
    </MapContainer>          
  );
  return content;
};

export default MapDisplay;
