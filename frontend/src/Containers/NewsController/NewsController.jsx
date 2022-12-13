import React from 'react';
import './newsController.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { NewsMarker } from '../../Components'

import { MapContainer, TileLayer } from 'react-leaflet'

import * as L from 'leaflet';

const NewsController = (props) => { 

    const [markers,setMarkers] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3000/news')
      .then( ({data}) =>{
        setMarkers(data);
      });
    }, []);

    const MarkerMap = () => {
      return markers.map((res,i) => {
        return <NewsMarker position={[res.lat, res.lon]} onClick={() => props.onClick("http://localhost:3000/news/" + (res.lat) + "/" + (res.lon))} />;
      });
    };

    return (
      <MapContainer center={props.position} zoom={7} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerMap />
      </MapContainer>
    );
}

export default NewsController;