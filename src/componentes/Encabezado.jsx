import { useEffect, useState } from 'react';

const enlacesNavegacion = [
  { href: '#catalogo', etiqueta: 'Catalogo' },
  { href: '#mantenimiento', etiqueta: 'Mantenimiento' },
  { href: '#envios', etiqueta: 'Envios' },
  { href: '#preguntas', etiqueta: 'FAQ' },
  { href: '/admin', etiqueta: 'Admin', esRuta: true },
];

export default function Encabezado({
  cantidadCarrito,
  alAbrirCarrito,
  paginaActual,
  alIrInicio,
  alIrAdmin,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const estaEnCheckout = paginaActual === 'checkout';
  const estaEnAdmin = paginaActual === 'admin';
  const esPaginaSecundaria = paginaActual !== 'inicio';

  useEffect(() => {
    if (!menuAbierto || esPaginaSecundaria) {
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
  }, [menuAbierto, esPaginaSecundaria]);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  function manejarNavegacion(enlace, evento) {
    cerrarMenu();

    if (enlace.esRuta) {
      evento.preventDefault();
      alIrAdmin?.();
    }
  }

  const marca = esPaginaSecundaria ? (
    <button
      type="button"
      className="encabezado__marca encabezado__marca--boton"
      onClick={alIrInicio}
      aria-label="Volver al catalogo de oni.pcworkshop"
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
        <span className="encabezado__eslogan">
          {estaEnAdmin ? 'Panel admin' : 'Volver al catalogo'}
        </span>
      </span>
    </button>
  ) : (
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
  );

  return (
    <header className="encabezado">
      <div className="contenedor encabezado__barra">
        {marca}

        <div className="encabezado__controles">
          {!estaEnAdmin ? (
            <button
              type="button"
              className="boton boton--secundario"
              onClick={alAbrirCarrito}
              aria-label={`Abrir carrito con ${cantidadCarrito} productos`}
            >
              Carrito
              <span className="boton__contador">{cantidadCarrito}</span>
            </button>
          ) : null}

          {esPaginaSecundaria ? (
            <button
              type="button"
              className="boton boton--primario"
              onClick={alIrInicio}
            >
              Seguir viendo PCs
            </button>
          ) : (
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
          )}
        </div>
      </div>

      {!esPaginaSecundaria ? (
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
                onClick={(evento) => manejarNavegacion(enlace, evento)}
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
      ) : null}
    </header>
  );
}
