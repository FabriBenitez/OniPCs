export default function MetodosPago({ metodos }) {
  return (
    <section className="seccion pagos" aria-labelledby="pagos-titulo">
      <div className="contenedor">
        <header className="seccion__encabezado" data-revelar>
          <p className="seccion__eyebrow">Pagos</p>
          <h2 className="seccion__titulo" id="pagos-titulo">
            La forma de pago se entiende sin leer de mas.
          </h2>
          <p className="seccion__descripcion">
            Transferencia, efectivo, USD y USDT. Sin cuotas falsas ni friccion innecesaria.
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
