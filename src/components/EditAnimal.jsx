import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", image_url: "" });

  useEffect(() => {
    fetch(`http://localhost:4000/animal/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`http://localhost:4000/animal/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!resp.ok) {
      alert("Error al actualizar");
      return;
    }

    alert("Animal actualizado ✅");
    navigate(`/animal/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Editar Animal</h2>
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
        <button type="submit" className="btn btn-primary">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditAnimal;