export default function Confianza({ diferenciales }) {
  return (
    <section className="seccion confianza" aria-labelledby="confianza-titulo">
      <div className="contenedor confianza__contenedor">
        <div className="confianza__principal" data-revelar>
          <p className="seccion__eyebrow">Confianza operativa</p>
          <h2 className="seccion__titulo" id="confianza-titulo">
            La experiencia transmite orden, soporte y decisión de compra.
          </h2>
          <p className="seccion__descripcion">
            Todo el sitio empuja una sensación concreta: equipos serios, lectura limpia, atención directa y una marca
            técnica con personalidad propia.
          </p>
        </div>

        <div className="confianza__grilla">
          {diferenciales.map((item, indice) => (
            <article className="confianza__item" key={item} data-revelar>
              <span className="confianza__icono" aria-hidden="true">
                {String(indice + 1).padStart(2, '0')}
              </span>
              <p className="confianza__texto">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
