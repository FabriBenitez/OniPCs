export default function ServicioMantenimiento({ servicios, enlaceWhatsApp }) {
  return (
    <section
      className="seccion mantenimiento"
      id="mantenimiento"
      aria-labelledby="mantenimiento-titulo"
    >
      <div className="contenedor mantenimiento__contenedor">
        <div className="mantenimiento__intro" data-revelar>
          <p className="seccion__eyebrow">Mantenimiento</p>
          <h2 className="seccion__titulo" id="mantenimiento-titulo">
            El servicio tambien se entiende en segundos.
          </h2>
          <p className="seccion__descripcion">
            Diagnostico, limpieza y optimizacion visibles dentro del mismo sitio,
            sin mandar al usuario a otra parte.
          </p>

          <a className="boton boton--primario" href={enlaceWhatsApp} target="_blank" rel="noreferrer">
            Coordinar mantenimiento
          </a>
        </div>

        <div className="mantenimiento__grilla">
          {servicios.map((servicio) => (
            <article className="mantenimiento__tarjeta" key={servicio.titulo} data-revelar>
              <span className="mantenimiento__marca" aria-hidden="true">
                {servicio.codigo}
              </span>
              <h3 className="mantenimiento__titulo">{servicio.titulo}</h3>
              <p className="mantenimiento__texto">{servicio.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
