export default function ServicioMantenimiento({ servicios, enlaceWhatsApp }) {
  return (
    <section className="seccion mantenimiento" id="mantenimiento" aria-labelledby="mantenimiento-titulo">
      <div className="contenedor mantenimiento__contenedor">
        <div className="mantenimiento__intro" data-revelar>
          <p className="seccion__eyebrow">Maintenance protocol</p>
          <h2 className="seccion__titulo" id="mantenimiento-titulo">
            El servicio también se vende con presencia y no como un extra escondido.
          </h2>
          <p className="seccion__descripcion">
            Diagnóstico, limpieza, repaste y optimización aparecen como parte natural del negocio para reforzar marca,
            soporte y postventa desde la misma landing.
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
