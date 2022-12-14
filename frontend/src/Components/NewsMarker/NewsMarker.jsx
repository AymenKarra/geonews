import React from 'react';
import { Marker } from 'react-leaflet';
import * as L from 'leaflet';
 
import './newsMarker.css';

import image from '../../assets/marker-icon.png';
import shadow from '../../assets/marker-shadow.png';
import { Icon } from 'leaflet'
const myIcon = new Icon({
 iconUrl: image,
 shadowUrl: shadow,
 iconSize: [20, 35],
 iconAnchor: [10, 35],
 
});



const NewsMarker = (props) => {
  return (
    <Marker icon={myIcon} position={props.position} 
    eventHandlers={{
      click: props.onClick,
    }}>
    </Marker>
  );
}

export default NewsMarker;
