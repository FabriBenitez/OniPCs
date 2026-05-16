export default function MetodosPago({ metodos }) {
  return (
    <section className="seccion pagos" aria-labelledby="pagos-titulo">
      <div className="contenedor">
        <header className="seccion__encabezado" data-revelar>
          <p className="seccion__eyebrow">Métodos de pago</p>
          <h2 className="seccion__titulo" id="pagos-titulo">
            El checkout refleja cómo se cierra la venta en la práctica.
          </h2>
          <p className="seccion__descripcion">
            Sin tarjetas inventadas, sin cuotas simuladas y sin integraciones falsas. El sitio comunica con claridad
            las opciones reales para comprar o reservar.
          </p>
        </header>

        <div className="pagos__grilla">
          {metodos.map((metodo) => (
            <article className="pagos__tarjeta" key={metodo.id} data-revelar>
              <span className="pagos__sigla">{metodo.sigla}</span>
              <h3 className="pagos__titulo">{metodo.titulo}</h3>
              <p className="pagos__texto">{metodo.detalle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
