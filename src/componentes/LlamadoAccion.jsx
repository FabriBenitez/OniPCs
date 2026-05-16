export default function LlamadoAccion({ enlaceWhatsApp, alIrCatalogo }) {
  return (
    <section className="seccion llamado" aria-labelledby="llamado-titulo">
      <div className="contenedor llamado__contenedor" data-revelar>
        <div className="llamado__contenido">
          <p className="seccion__eyebrow">Custom build</p>
          <h2 className="llamado__titulo" id="llamado-titulo">
            Si no ves tu equipo, abrimos una cotización guiada y directa.
          </h2>
          <p className="llamado__texto">
            El cierre comercial deja dos caminos claros: volver al catálogo o abrir una consulta rápida por WhatsApp
            para definir uso, presupuesto y disponibilidad.
          </p>
        </div>

        <div className="llamado__acciones">
          <button type="button" className="boton boton--primario" onClick={alIrCatalogo}>
            Ver catálogo
          </button>
          <a className="boton boton--fantasma" href={enlaceWhatsApp} target="_blank" rel="noreferrer">
            Consulta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
