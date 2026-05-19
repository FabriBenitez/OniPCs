import { useEffect } from 'react';
import MockupEquipo from './MockupEquipo';
import SpecsClave from './SpecsClave';
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
      <article
        className="detalle-producto__ventana"
        itemScope
        itemType="https://schema.org/Product"
      >
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

            <div className="detalle-producto__resumen-visual">
              <span className="detalle-producto__mini-etiqueta">{producto.disponibilidad}</span>
              <span className="detalle-producto__mini-etiqueta">Retiro o envio nacional</span>
              <span className="detalle-producto__mini-etiqueta">Compra o reserva</span>
            </div>
          </div>

          <div className="detalle-producto__contenido">
            <div className="detalle-producto__cabecera">
              <span className={`etiqueta etiqueta--${producto.acento}`}>{producto.etiqueta}</span>
              <h2
                className="detalle-producto__titulo"
                id="detalle-producto-titulo"
                itemProp="name"
              >
                {producto.nombre}
              </h2>
              <p className="detalle-producto__subtitulo" itemProp="description">
                {producto.subtitulo}
              </p>
              <div className="detalle-producto__resumen-comercial">
                <strong className="detalle-producto__precio">
                  {formatearMoneda(producto.precioArs)}
                </strong>
                <span className="detalle-producto__precio-nota">
                  contado transferencia · ref. {formatearUsd(producto.precioUsd)}
                </span>
              </div>
              <div className="detalle-producto__acciones">
                <button
                  type="button"
                  className="boton boton--primario"
                  onClick={() => alAgregarAlCarrito(producto)}
                >
                  Comprar / reservar
                </button>
                <a
                  className="boton boton--fantasma"
                  href={mensaje}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar
                </a>
              </div>
            </div>

            <p className="detalle-producto__descripcion">{producto.descripcion}</p>

            <SpecsClave especificaciones={producto.especificaciones} limite={4} />

            <div className="detalle-producto__desplegables">
              <details className="detalle-producto__bloque" open>
                <summary className="detalle-producto__bloque-titulo">Specs completas</summary>
                <dl className="detalle-producto__specs">
                  {producto.especificaciones.map(([clave, valor]) => (
                    <div className="detalle-producto__spec" key={clave}>
                      <dt>{clave}</dt>
                      <dd>{valor}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <details className="detalle-producto__bloque">
                <summary className="detalle-producto__bloque-titulo">
                  Para que uso sirve
                </summary>
                <ul className="detalle-producto__lista">
                  {producto.idealPara.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>

              <details className="detalle-producto__bloque">
                <summary className="detalle-producto__bloque-titulo">Pago y entrega</summary>
                <p className="detalle-producto__compra-texto">
                  Transferencia, efectivo, USD por transferencia o USDT. Envio a todo el
                  pais o retiro coordinado en Parque Chacabuco.
                </p>
                <ul className="detalle-producto__destacados">
                  {producto.destacadosRendimiento.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
