export default function PreguntasFrecuentes({ preguntas }) {
  return (
    <section className="seccion faq" id="preguntas" aria-labelledby="preguntas-titulo">
      <div className="contenedor faq__contenedor">
        <header className="seccion__encabezado" data-revelar>
          <p className="seccion__eyebrow">Preguntas frecuentes</p>
          <h2 className="seccion__titulo" id="preguntas-titulo">
            Respuestas cortas para acelerar la decisión.
          </h2>
          <p className="seccion__descripcion">
            El contenido indexable ayuda al SEO y también baja fricción durante la compra.
          </p>
        </header>

        <div className="faq__lista">
          {preguntas.map((pregunta) => (
            <details className="faq__item" key={pregunta.pregunta} data-revelar>
              <summary className="faq__pregunta">{pregunta.pregunta}</summary>
              <p className="faq__respuesta">{pregunta.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
