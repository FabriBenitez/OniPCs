export default function PropuestaValor({ propuestas }) {
  return (
    <section className="seccion propuesta" aria-labelledby="propuesta-titulo">
      <div className="contenedor">
        <header className="seccion__encabezado" data-revelar>
          <p className="seccion__eyebrow">Arquitectura comercial</p>
          <h2 className="seccion__titulo" id="propuesta-titulo">
            El prototipo mezcla narrativa técnica, catálogo claro y cierre directo.
          </h2>
          <p className="seccion__descripcion">
            La experiencia prioriza intención de compra, legibilidad y una identidad visual fuerte sin abandonar SEO,
            semántica ni estructura mantenible.
          </p>
        </header>

        <div className="propuesta__grilla">
          {propuestas.map((propuesta, indice) => (
            <article className="propuesta__item" key={propuesta.titulo} data-revelar>
              <span className="propuesta__indice" aria-hidden="true">
                {String(indice + 1).padStart(2, '0')}
              </span>
              <h3 className="propuesta__titulo">{propuesta.titulo}</h3>
              <p className="propuesta__texto">{propuesta.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
