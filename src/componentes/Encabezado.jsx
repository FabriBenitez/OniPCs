export default function Encabezado({ cantidadCarrito, alAbrirCarrito }) {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado__contenedor">
        <a className="encabezado__marca" href="#inicio" aria-label="Ir al inicio de oni.pcworkshop">
          <span className="encabezado__sello" aria-hidden="true">
            <img
              className="encabezado__logo"
              src="/logo-oni-pcworkshop.jpg"
              alt=""
              width="150"
              height="150"
              loading="eager"
              decoding="async"
            />
          </span>
          <span className="encabezado__identidad">
            <strong className="encabezado__nombre">oni.pcworkshop</strong>
            <span className="encabezado__eslogan">high performance builds</span>
          </span>
        </a>

        <nav className="encabezado__nav" aria-label="Navegación principal">
          <a className="encabezado__link" href="#catalogo">
            Catálogo
          </a>
          <a className="encabezado__link" href="#mantenimiento">
            Mantenimiento
          </a>
          <a className="encabezado__link" href="#envios">
            Envíos
          </a>
          <a className="encabezado__link" href="#checkout">
            Checkout
          </a>
          <a className="encabezado__link" href="#preguntas">
            FAQ
          </a>
        </nav>

        <div className="encabezado__acciones">
          <button
            type="button"
            className="boton boton--secundario"
            onClick={alAbrirCarrito}
            aria-label={`Abrir carrito con ${cantidadCarrito} productos`}
          >
            Carrito
            <span className="boton__contador">{cantidadCarrito}</span>
          </button>
          <a className="boton boton--primario" href="#catalogo">
            Ver PCs
          </a>
        </div>
      </div>
    </header>
  );
}
