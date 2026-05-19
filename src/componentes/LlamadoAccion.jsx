export default function LlamadoAccion({ enlaceWhatsApp, alIrCatalogo }) {
  return (
    <section className="seccion llamado" aria-labelledby="llamado-titulo">
      <div className="contenedor llamado__contenedor" data-revelar>
        <div className="llamado__contenido">
          <p className="seccion__eyebrow">Ayuda rapida</p>
          <h2 className="llamado__titulo" id="llamado-titulo">
            Si no ves tu equipo, te ayudamos a elegirlo rapido.
          </h2>
          <p className="llamado__texto">
            Catalogo o WhatsApp. Dos caminos claros, sin distracciones.
          </p>
        </div>

        <div className="llamado__acciones">
          <button type="button" className="boton boton--primario" onClick={alIrCatalogo}>
            Ver catalogo
          </button>
          <a className="boton boton--fantasma" href={enlaceWhatsApp} target="_blank" rel="noreferrer">
            Consulta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
