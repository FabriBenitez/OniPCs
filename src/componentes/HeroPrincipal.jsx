export default function HeroPrincipal({ alIrCatalogo, alIrCheckout, imagenHero }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo" data-revelar>
      <div className="contenedor hero__contenedor">
        <div className="hero__contenido">
          <p className="hero__kicker">High performance engineering</p>
          <h1 className="hero__titulo" id="hero-titulo">
            PCs armadas listas para <span className="hero__titulo-acento">rendir de verdad.</span>
          </h1>
          <p className="hero__descripcion">
            Un prototipo comercial con tono técnico, catálogo claro y un checkout realista para vender
            equipos armados, workstations y mantenimiento sin parecer una tienda genérica.
          </p>

          <div className="hero__acciones">
            <button type="button" className="boton boton--primario" onClick={alIrCatalogo}>
              Explorar catálogo
            </button>
            <button type="button" className="boton boton--fantasma" onClick={alIrCheckout}>
              Revisar checkout
            </button>
          </div>

          <ul className="hero__bandas" aria-label="Diferenciales principales">
            <li className="hero__banda">PCs cerradas por uso real, no por piezas sueltas.</li>
            <li className="hero__banda">Pagos directos: transferencia, efectivo, USD y USDT.</li>
            <li className="hero__banda">Retiro en Parque Chacabuco y logística lista para todo el país.</li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__panel hero__panel--principal">
            <img className="hero__imagen" src={imagenHero} alt="" />
          </div>

          <div className="hero__panel hero__panel--datos">
            <article className="hero__dato">
              <span className="hero__dato-numero">06</span>
              <p className="hero__dato-texto">equipos base para gaming, oficina, streaming, diseño y edición.</p>
            </article>
            <article className="hero__dato">
              <span className="hero__dato-numero">04</span>
              <p className="hero__dato-texto">métodos de pago reales, sin pasarelas falsas ni cuotas inventadas.</p>
            </article>
            <article className="hero__dato">
              <span className="hero__dato-numero">AR</span>
              <p className="hero__dato-texto">cobertura nacional con retiro local y estructura SEO en español.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
