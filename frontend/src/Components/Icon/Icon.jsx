import L from 'leaflet';

const Icon = new L.Icon({
    iconUrl: require('https://unpkg.com/browse/leaflet@1.9.3/dist/images/marker-icon.png'),
    iconRetinaUrl: require('https://unpkg.com/browse/leaflet@1.9.3/dist/images/marker-shadow.png'),
    iconAnchor: new L.Point(30, 0),
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { Icon };