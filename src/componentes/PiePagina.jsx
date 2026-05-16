export default function PiePagina({ enlaceWhatsApp }) {
  return (
    <footer className="pie-pagina">
      <div className="contenedor pie-pagina__contenedor">
        <div className="pie-pagina__marca">
          <div className="pie-pagina__marca-superior">
            <span className="pie-pagina__sello" aria-hidden="true">
              <img
                className="pie-pagina__logo"
                src="/logo-oni-pcworkshop.jpg"
                alt=""
                width="150"
                height="150"
                loading="lazy"
                decoding="async"
              />
            </span>
            <div className="pie-pagina__marca-texto">
              <strong className="pie-pagina__nombre">oni.pcworkshop</strong>
              <p className="pie-pagina__texto">PCs armadas, workstations y mantenimiento con criterio.</p>
            </div>
          </div>
          <p className="pie-pagina__texto">Parque Chacabuco, Buenos Aires.</p>
        </div>

        <nav className="pie-pagina__columna" aria-label="Enlaces de navegación">
          <h2 className="pie-pagina__titulo">Navegación</h2>
          <a className="pie-pagina__link" href="#catalogo">
            Catálogo
          </a>
          <a className="pie-pagina__link" href="#mantenimiento">
            Mantenimiento
          </a>
          <a className="pie-pagina__link" href="#checkout">
            Checkout
          </a>
          <a className="pie-pagina__link" href="#preguntas">
            Preguntas frecuentes
          </a>
        </nav>

        <div className="pie-pagina__columna">
          <h2 className="pie-pagina__titulo">Compra</h2>
          <p className="pie-pagina__texto">Transferencia bancaria</p>
          <p className="pie-pagina__texto">Efectivo</p>
          <p className="pie-pagina__texto">USD por transferencia</p>
          <p className="pie-pagina__texto">USDT a wallet</p>
        </div>

        <div className="pie-pagina__columna">
          <h2 className="pie-pagina__titulo">Contacto</h2>
          <a className="pie-pagina__link" href={enlaceWhatsApp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="pie-pagina__link" href="#envios">
            Envíos a todo el país
          </a>
          <span className="pie-pagina__texto">Estructura lista para sumar redes y más canales.</span>
        </div>
      </div>
    </footer>
  );
}
