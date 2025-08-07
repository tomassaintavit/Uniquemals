import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const WorldMap = ({ onCountryDetected }) => {
    const [geoJson, setGeoJson ] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {   
        fetch('./countries.geo.json')
            .then(res => res.json())
            .then(data => setGeoJson(data));

    }, []);

    const handleClick = (lat, lng) => {
      const point = turf.point([lng,lat]); 
      for (const feature of geoJson.features){
        if(turf.booleanPointInPolygon(point, feature)){
            const countryName = feature.properties.ADMIN || feature.properties.name;
            navigate(`/country/${encodeURIComponent(countryName)}`, {
              state: {
                lat: lat,
                lng: lng
              }
            });
            break;
        }
      }
    };

    const MapClickHandler = () => {
        useMapEvents({
        click(e) {
          const { lat, lng } = e.latlng;
          handleClick(lat, lng);
        },
      });
      return null;
    };


  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      {geoJson && <MapClickHandler/>}
    </MapContainer>
  );
};

export default WorldMap;