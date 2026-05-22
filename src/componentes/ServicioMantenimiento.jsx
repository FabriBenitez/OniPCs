const resumenesServicio = {
  PROTOCOL_01: 'Temperatura y estado',
  PROTOCOL_02: 'Polvo y airflow',
  PROTOCOL_03: 'Pasta y contacto',
  PROTOCOL_04: 'Drivers y arranque',
};

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
            Mantenimiento sin vueltas.
          </h2>

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
              <p className="mantenimiento__texto">
                {resumenesServicio[servicio.codigo] ?? servicio.titulo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
