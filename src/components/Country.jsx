import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countryTranslations from '../utils/country_translations.json';

const Country = () => {
  const { name } = useParams();
  const spanishName = countryTranslations[name] || name;
  const location = useLocation();
  const countryData = location.state;
  const [animals, setAnimals] = useState([]);
  const countryName = decodeURIComponent(spanishName);
  

  useEffect(() => {
    
    const fetchEndemicAnimals = async () => {
      try {
        const categoryTitle = `Categoría:Fauna_endémica_de_${countryName.replace(/ /g, "_")}`;
        const categoryUrl = `https://es.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(categoryTitle)}&cmtype=page&cmlimit=40&format=json&origin=*`;

        const response = await fetch(categoryUrl);
        const data = await response.json();
        const pages = data.query?.categorymembers || [];

        const animalDetails = await Promise.all(
          pages.map(async (page) => {
            const summaryUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page.title)}`;
            const res = await fetch(summaryUrl);
            const summary = await res.json();
            return {
              title: summary.title,
              extract: summary.extract,
              image: summary.thumbnail?.source || null,
            };
          })
        );

        setAnimals(animalDetails);
      } catch (error) {
        console.error('Error al obtener los animales endémicos:', error);
      }
    };

    fetchEndemicAnimals();
  }, [countryName]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{countryName}</h2>
      <h4>Animales endémicos del país</h4>
      <div className="row">
        <div className="col col-6">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Características</th>
                <th scope="col">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {animals.length > 0 ? (
                animals.map((animal, idx) => (
                  <tr key={idx}>
                    <td>{animal.title}</td>
                    <td>{animal.extract}</td>
                    <td>
                      {animal.image ? (
                        <img src={animal.image} alt={animal.title} width="100" />
                      ) : (
                        'Sin imagen'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Cargando datos o no se encontraron especies...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col col-6">
          <MapContainer
            center={[countryData.lat, countryData.lng]}
            zoom={4}
            style={{ height: '50vh', width: '100%' }}
          >
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