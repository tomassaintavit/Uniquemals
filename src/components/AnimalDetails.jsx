import { useParams, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const location = useLocation();
  const { name, lat, lng } = location.state || {};

  useEffect(() => {
    fetch(`http://localhost:4000/animal/${id}`)
      .then(res => res.json())
      .then(data => setAnimal(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este animal?")) return;

    try {
      const resp = await fetch(`http://localhost:4000/animal/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Error al eliminar");
      alert("Animal eliminado");
      navigate(-1); // vuelve a la página anterior
    } catch (err) {
      console.error(err);
      alert("Error al borrar");
    }
  };

  if (!animal) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(`/country/${encodeURIComponent(name)}`, {
          state: { lat: lat, lng:lng }
        })}>
        ← Volver
      </button>
      <h2>{animal.name}</h2>
      <p>{animal.description}</p>
      {animal.image_url && (
        <img src={animal.image_url} alt={animal.name} style={{ maxWidth: "300px" }} />
      )}
      <div className="mt-3">
        <button 
          className="btn btn-warning me-2"
          onClick={() => navigate(`/edit-animal/${animal.id}`, {
                          state: { name: name, lat: lat, lng: lng } })}
        >
          Editar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AnimalDetails;