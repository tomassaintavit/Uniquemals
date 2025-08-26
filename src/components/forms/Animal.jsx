import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AlertMessage from "../../utils/AlertMessage";

const AnimalForm = () => {
  const { name } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { lat, lng } = location.state || {};
  const [alert, setAlert] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const resp = await fetch("http://localhost:4000/add-animal"
      const resp = await fetch(`${API_URL}/add-animal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, country: name })
      });

      if (!resp.ok) throw new Error("Error al guardar en la base");

      setAlert({ type: "success", message: "Animal agregado correctamente ✅" });
      setTimeout(() => {
        navigate(`/country/${encodeURIComponent(name)}`,{
      state: { lat, lng }
      });
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setAlert({ type: "danger", message: "Error al agregar el animal ❌" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agregar animal a {decodeURIComponent(name)}</h2>
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Imagen</label>
          <input type="url" className="form-control" name="image_url" value={form.image_url} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default AnimalForm;