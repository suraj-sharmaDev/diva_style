import React from "react";
import { Dimensions, View, Text } from 'react-native';
import MapView from "react-native-maps";
import styled from "styled-components";

import CustomMap from '../../constants/CustomMap.json';
import MapTools from './MapTools';
import MapCallout from './MapCallout';
import {height} from '../../constants/Layout';

const MapContainer = styled.View` 
  height : 100%;
  z-index : 14;
`;
const MapDisplay = (props) => {
  let userLocation = props.userLocation;
  let origin = null;
  let destination = null;
  const isMultipleMarker = Array.isArray(userLocation);
  if(isMultipleMarker){
    origin = userLocation[0];
    destination = userLocation[1];
  }else{
    origin = userLocation;
  }
  const [show, updateShow] = React.useState(true);
  const screenCheck = (event) => {
    if(event.nativeEvent.layout.height < height*0.4) updateShow(false);
    else updateShow(true);
  }
  const onRegionChangeHandler = (e) => {
    if(!isMultipleMarker){
      props.onRegionChange(e);
    }
  }
  let content = (
    <MapContainer onLayout={event=> screenCheck(event)}>
      <MapView
        style={{ height : '100%'}}
        ref={props._mapRef}
        initialRegion={origin}
        showsUserLocation = {!isMultipleMarker}
        rotateEnabled={!isMultipleMarker}
        scrollEnabled={!isMultipleMarker}
        customMapStyle={CustomMap}
        onRegionChangeComplete={onRegionChangeHandler}
      >
        {
          isMultipleMarker
          ?
          <>
              <MapView.Marker
                coordinate={origin}
              >
                <MapCallout label={'Pickup'}/>
              </MapView.Marker>
              <MapView.Marker
                coordinate={destination}
              >
                <MapCallout label={'Drop'}/>
              </MapView.Marker>
          </>
          :
          null
        }
      </MapView>
      {
        show && !isMultipleMarker
        ?
          <MapTools />
        :
          null
      }
    </MapContainer>  
  );
  return content;
};

export default MapDisplay;
