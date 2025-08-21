import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as turf from '@turf/turf';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../utils/country_translations.json';

const WorldMap = () => {
  const [geoJson, setGeoJson] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {   
    fetch('./countries.geo.json')
      .then(res => res.json())
      .then(data => setGeoJson(data));
  }, []);

  const handleClick = (lat, lng, countryName) => {
    navigate(`/country/${encodeURIComponent(countryName)}`, {
      state: { lat, lng }
    });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        // buscar el país en el geoJson
        const point = turf.point([lng, lat]);
        for (const feature of geoJson.features) {
          if (turf.booleanPointInPolygon(point, feature)) {
            const countryName = feature.properties.ADMIN || feature.properties.name;
            const center = turf.center(feature).geometry.coordinates; // [lng, lat]
            handleClick(center[1], center[0], countryName);
            break;
          }
        }
      },
    });
    return null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!geoJson) return;

    // Buscar en traducciones
    const matchEntry = Object.entries(translations).find(
      ([en, es]) => es.toLowerCase() === search.trim().toLowerCase()
    );

    if (matchEntry) {
      const [englishName, spanishName] = matchEntry;

      // Encontrar el feature correspondiente en el geoJson
      const feature = geoJson.features.find(
        f => (f.properties.ADMIN || f.properties.name) === englishName
      );

      if (feature) {
        const center = turf.center(feature).geometry.coordinates; // [lng, lat]
        handleClick(center[1], center[0], englishName);
      }
    } else {
      alert("País no encontrado");
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Barra de búsqueda */}
      <form 
        onSubmit={handleSearch} 
        style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 1000, 
          width: '300px' 
        }}
      >
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar país..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-search"></i> {/* ícono lupa de Bootstrap */}
          </button>
        </div>
      </form>

      {/* Mapa */}
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> 
        {geoJson && <MapClickHandler/>}
      </MapContainer>
    </div>
  );
};

export default WorldMap;