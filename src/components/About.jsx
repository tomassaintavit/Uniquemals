const About = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <h1 className="card-title mb-4 text-center">Acerca de Uniquemals</h1>
          <p className="card-text">
            <strong>Uniquemals</strong> es un proyecto <u>público y gratuito </u> 
            desarrollado como parte de mi portfolio. El objetivo es mostrar mis 
            habilidades en tecnologías como <strong>React, Node.js, Express, Supabase y Leaflet</strong>.
          </p>

          <p className="card-text">
            La aplicación permite explorar un <strong>mapa mundial</strong> y seleccionar un país. 
            Una vez seleccionado, se muestran los <strong>animales endémicos</strong> de esa región, 
            es decir, aquellos que sólo habitan allí.
          </p>

          <h3 className="mt-4">Funcionalidades</h3>
          <ul>
            <li>Visualizar animales endémicos por país.</li>
            <li>Agregar nuevos animales a la base de datos.</li>
            <li>Editar la información de animales existentes.</li>
            <li>Eliminar animales de la lista.</li>
          </ul>

          <p className="card-text mt-4">
            Este proyecto tiene fines <strong>educativos y de práctica</strong>. 
            No persigue un uso comercial, sino que funciona como prueba técnica y 
            como parte de mi <strong>portfolio profesional</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;