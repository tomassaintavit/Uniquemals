import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countryTranslations from '../utils/country_translations.json';

const Country = () => {
  const { name } = useParams();
  const spanishName = countryTranslations[name] || name;
  const location = useLocation();
  const countryData = location.state;
  const navigate = useNavigate();
  
  const [animales, setAnimales] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/animales/${decodeURIComponent(spanishName)}`)
      .then(res => res.json())
      .then(data => setAnimales(data))
      .catch(err => console.error(err));
  }, [name]);

  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">{decodeURIComponent(spanishName)}</h2>
        <button 
          className="btn btn-lg btn-success" 
          onClick={() => navigate(`/animal-form/${encodeURIComponent(spanishName)}`, {
          state: { lat: countryData.lat, lng: countryData.lng }
        })}
        > Agregar animal 
          <i class="bi bi-plus-circle-fill" style={{ margin: '6px'}}></i>
        </button>
      </div>
      <h4>Animales endémicos del país</h4>
      <div className="row">
        <div className="col col-7">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Nombre</th>
                <th>Características</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {animales.map(a => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.description}</td>
                  <td>
                    {a.image_url && <img src={a.image_url} alt={a.name} width="150" />}
                  </td>
                  <td>
                    <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/animal/${a.id}`, {
                          state: { name: name, lat: countryData.lat, lng: countryData.lng } })}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col col-5">
          <MapContainer center={[countryData.lat, countryData.lng]} zoom={4} style={{ height: '50vh', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Country;