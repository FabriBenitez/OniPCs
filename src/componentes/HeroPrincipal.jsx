const chipsHero = [
  'Gaming, oficina y workstation',
  'Pago directo sin tarjeta',
  'Retiro o envio nacional',
];

const datosHero = [
  {
    titulo: 'Compra directa',
    texto: 'Ves la PC, comparas rapido y reservas.',
  },
  {
    titulo: 'Specs al frente',
    texto: 'CPU, GPU, RAM y SSD visibles desde la tarjeta.',
  },
  {
    titulo: 'Checkout real',
    texto: 'Transferencia, efectivo, USD o USDT.',
  },
];

export default function HeroPrincipal({ alIrCatalogo, alIrCheckout, imagenHero }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo" data-revelar>
      <div className="contenedor hero__contenedor">
        <div className="hero__contenido">
          <p className="hero__kicker">oni.pcworkshop</p>
          <h1 className="hero__titulo" id="hero-titulo">
            PCs armadas listas para
            <span className="hero__titulo-acento"> comprar sin vueltas.</span>
          </h1>
          <p className="hero__descripcion">
            Catalogo claro, lectura tecnica corta y un flujo directo para pasar del
            equipo al checkout en pocos toques.
          </p>

          <ul className="hero__chips" aria-label="Puntos clave del servicio">
            {chipsHero.map((chip) => (
              <li className="hero__chip" key={chip}>
                {chip}
              </li>
            ))}
          </ul>

          <div className="hero__acciones">
            <button type="button" className="boton boton--primario" onClick={alIrCatalogo}>
              Ver PCs armadas
            </button>
            <button type="button" className="boton boton--fantasma" onClick={alIrCheckout}>
              Ir al checkout
            </button>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__panel hero__panel--principal">
            <img className="hero__imagen" src={imagenHero} alt="" />
          </div>

          <div className="hero__resumen">
            {datosHero.map((dato) => (
              <article className="hero__dato" key={dato.titulo}>
                <span className="hero__dato-numero">//</span>
                <div className="hero__dato-cuerpo">
                  <strong className="hero__dato-titulo">{dato.titulo}</strong>
                  <p className="hero__dato-texto">{dato.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
