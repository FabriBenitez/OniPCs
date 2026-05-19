import { useEffect, useState } from 'react';

const enlacesNavegacion = [
  { href: '#catalogo', etiqueta: 'Catalogo' },
  { href: '#mantenimiento', etiqueta: 'Mantenimiento' },
  { href: '#envios', etiqueta: 'Envios' },
  { href: '#checkout', etiqueta: 'Checkout' },
  { href: '#preguntas', etiqueta: 'FAQ' },
];

export default function Encabezado({ cantidadCarrito, alAbrirCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    if (!menuAbierto) {
      return undefined;
    }

    function cerrarConEscape(evento) {
      if (evento.key === 'Escape') {
        setMenuAbierto(false);
      }
    }

    function cerrarEnDesktop() {
      if (window.innerWidth >= 980) {
        setMenuAbierto(false);
      }
    }

    window.addEventListener('keydown', cerrarConEscape);
    window.addEventListener('resize', cerrarEnDesktop);

    return () => {
      window.removeEventListener('keydown', cerrarConEscape);
      window.removeEventListener('resize', cerrarEnDesktop);
    };
  }, [menuAbierto]);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <header className="encabezado">
      <div className="contenedor encabezado__barra">
        <a
          className="encabezado__marca"
          href="#inicio"
          aria-label="Ir al inicio de oni.pcworkshop"
        >
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
            <span className="encabezado__eslogan">PCs listas para comprar</span>
          </span>
        </a>

        <div className="encabezado__controles">
          <button
            type="button"
            className="boton boton--secundario"
            onClick={alAbrirCarrito}
            aria-label={`Abrir carrito con ${cantidadCarrito} productos`}
          >
            Carrito
            <span className="boton__contador">{cantidadCarrito}</span>
          </button>

          <button
            type="button"
            className={`encabezado__menu-boton ${
              menuAbierto ? 'encabezado__menu-boton--abierto' : ''
            }`}
            aria-expanded={menuAbierto}
            aria-controls="menu-principal"
            onClick={() => setMenuAbierto((estadoAnterior) => !estadoAnterior)}
          >
            <span className="encabezado__menu-linea" aria-hidden="true" />
            <span className="encabezado__menu-linea" aria-hidden="true" />
            <span className="encabezado__menu-linea" aria-hidden="true" />
            <span className="encabezado__menu-texto">Menu</span>
          </button>
        </div>
      </div>

      <div
        className={`contenedor encabezado__panel ${
          menuAbierto ? 'encabezado__panel--abierto' : ''
        }`}
        id="menu-principal"
      >
        <nav className="encabezado__nav" aria-label="Navegacion principal">
          {enlacesNavegacion.map((enlace) => (
            <a
              className="encabezado__link"
              href={enlace.href}
              key={enlace.href}
              onClick={cerrarMenu}
            >
              {enlace.etiqueta}
            </a>
          ))}
        </nav>

        <div className="encabezado__acciones">
          <a
            className="boton boton--primario boton--ancho-mobile"
            href="#catalogo"
            onClick={cerrarMenu}
          >
            Ver PCs
          </a>
        </div>
      </div>
    </header>
  );
}
