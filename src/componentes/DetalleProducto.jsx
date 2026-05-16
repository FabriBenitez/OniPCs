import { useEffect } from 'react';
import MockupEquipo from './MockupEquipo';
import { formatearMoneda, formatearUsd } from '../utilidades/formato';

export default function DetalleProducto({
  producto,
  alCerrar,
  alAgregarAlCarrito,
  enlaceWhatsApp,
}) {
  useEffect(() => {
    if (!producto) {
      return undefined;
    }

    function manejarEscape(evento) {
      if (evento.key === 'Escape') {
        alCerrar();
      }
    }

    window.addEventListener('keydown', manejarEscape);

    return () => window.removeEventListener('keydown', manejarEscape);
  }, [producto, alCerrar]);

  if (!producto) {
    return null;
  }

  const mensaje = `${enlaceWhatsApp}?text=Hola%20oni.pcworkshop,%20quiero%20consultar%20por%20${encodeURIComponent(
    producto.nombre,
  )}.`;

  return (
    <div
      className="detalle-producto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detalle-producto-titulo"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) {
          alCerrar();
        }
      }}
    >
      <article className="detalle-producto__ventana" itemScope itemType="https://schema.org/Product">
        <button
          type="button"
          className="detalle-producto__cerrar"
          onClick={alCerrar}
          aria-label="Cerrar detalle del producto"
        >
          Cerrar
        </button>

        <div className="detalle-producto__principal">
          <div className="detalle-producto__galeria">
            <figure className="detalle-producto__visual-principal">
              {producto.imagen ? (
                <img
                  className="detalle-producto__imagen"
                  src={producto.imagen}
                  alt={producto.imagenAlt}
                  itemProp="image"
                />
              ) : (
                <MockupEquipo
                  titulo={producto.nombre}
                  subtitulo={producto.subtitulo}
                  acento={producto.acento}
                  variante="principal"
                />
              )}
            </figure>

            <div className="detalle-producto__miniaturas">
              <article className="detalle-producto__miniatura">
                <span className="detalle-producto__mini-etiqueta">Vista general</span>
                {producto.imagen ? (
                  <img className="detalle-producto__imagen detalle-producto__imagen--mini" src={producto.imagen} alt="" />
                ) : (
                  <MockupEquipo
                    titulo="Perfil exterior"
                    subtitulo="Líneas de gabinete y flujo"
                    acento={producto.acento}
                    variante="detalle"
                  />
                )}
              </article>
              <article className="detalle-producto__miniatura">
                <span className="detalle-producto__mini-etiqueta">Lectura rápida</span>
                <MockupEquipo
                  titulo="Arquitectura"
                  subtitulo="Capas de rendimiento y expansión"
                  acento={producto.acento}
                  variante="detalle"
                />
              </article>
            </div>
          </div>

          <div className="detalle-producto__contenido">
            <span className={`etiqueta etiqueta--${producto.acento}`}>{producto.etiqueta}</span>
            <h2 className="detalle-producto__titulo" id="detalle-producto-titulo" itemProp="name">
              {producto.nombre}
            </h2>
            <p className="detalle-producto__subtitulo" itemProp="description">
              {producto.subtitulo}
            </p>
            <p className="detalle-producto__descripcion">{producto.descripcion}</p>

            <div className="detalle-producto__resumen-comercial">
              <strong className="detalle-producto__precio">{formatearMoneda(producto.precioArs)}</strong>
              <span className="detalle-producto__precio-nota">
                contado transferencia · ref. {formatearUsd(producto.precioUsd)}
              </span>
              <span className="detalle-producto__disponibilidad">{producto.disponibilidad}</span>
            </div>

            <div className="detalle-producto__columnas">
              <article className="detalle-producto__bloque">
                <h3 className="detalle-producto__bloque-titulo">Especificaciones técnicas</h3>
                <dl className="detalle-producto__specs">
                  {producto.especificaciones.map(([clave, valor]) => (
                    <div className="detalle-producto__spec" key={clave}>
                      <dt>{clave}</dt>
                      <dd>{valor}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <article className="detalle-producto__bloque">
                <h3 className="detalle-producto__bloque-titulo">Ideal para</h3>
                <ul className="detalle-producto__lista">
                  {producto.idealPara.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="detalle-producto__bloque">
              <h3 className="detalle-producto__bloque-titulo">Destacados de rendimiento</h3>
              <ul className="detalle-producto__destacados">
                {producto.destacadosRendimiento.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <aside className="detalle-producto__compra">
              <p className="detalle-producto__compra-texto">
                Métodos disponibles: transferencia, efectivo, USD por transferencia y USDT. Envíos a todo el país o
                retiro coordinado en Parque Chacabuco.
              </p>
              <div className="detalle-producto__acciones">
                <button
                  type="button"
                  className="boton boton--primario"
                  onClick={() => alAgregarAlCarrito(producto)}
                >
                  Comprar / reservar
                </button>
                <a className="boton boton--fantasma" href={mensaje} target="_blank" rel="noreferrer">
                  Consultar por WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}
