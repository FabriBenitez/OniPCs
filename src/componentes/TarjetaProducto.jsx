import MockupEquipo from './MockupEquipo';
import { formatearMoneda, formatearUsd } from '../utilidades/formato';

function obtenerDisponibilidadSchema(disponibilidad) {
  return disponibilidad === 'Entrega inmediata'
    ? 'https://schema.org/InStock'
    : 'https://schema.org/PreOrder';
}

export default function TarjetaProducto({ producto, alVerDetalle, alAgregarAlCarrito }) {
  return (
    <article
      className={`tarjeta-producto ${
        producto.visualPrincipal ? 'tarjeta-producto--principal' : ''
      }`}
      data-revelar
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="tarjeta-producto__encabezado">
        <span className={`etiqueta etiqueta--${producto.acento}`}>{producto.etiqueta}</span>
        <span className="tarjeta-producto__disponibilidad">{producto.disponibilidad}</span>
      </div>

      <figure className="tarjeta-producto__visual">
        {producto.imagen ? (
          <img
            className="tarjeta-producto__imagen"
            src={producto.imagen}
            alt={producto.imagenAlt}
            itemProp="image"
          />
        ) : (
          <MockupEquipo
            titulo={producto.nombre}
            subtitulo={producto.uso}
            acento={producto.acento}
            variante={producto.visualPrincipal ? 'principal' : 'detalle'}
          />
        )}
      </figure>

      <div className="tarjeta-producto__cuerpo">
        <meta itemProp="category" content={producto.uso} />
        <p className="tarjeta-producto__uso">Ideal para {producto.uso.toLowerCase()}</p>
        <h3 className="tarjeta-producto__titulo" itemProp="name">
          {producto.nombre}
        </h3>
        <p className="tarjeta-producto__subtitulo" itemProp="description">
          {producto.subtitulo}
        </p>
        <p className="tarjeta-producto__resumen">{producto.resumenTecnico}</p>

        <ul className="tarjeta-producto__specs" aria-label={`Resumen técnico de ${producto.nombre}`}>
          {producto.especificaciones.slice(0, 3).map(([clave, valor]) => (
            <li className="tarjeta-producto__spec" key={clave}>
              <span>{clave}</span>
              <strong>{valor}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="tarjeta-producto__pie">
        <div className="tarjeta-producto__precios" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="ARS" />
          <meta itemProp="price" content={String(producto.precioArs)} />
          <link itemProp="availability" href={obtenerDisponibilidadSchema(producto.disponibilidad)} />
          <strong className="tarjeta-producto__precio">{formatearMoneda(producto.precioArs)}</strong>
          <span className="tarjeta-producto__nota">
            contado transferencia · ref. {formatearUsd(producto.precioUsd)}
          </span>
          <span className="tarjeta-producto__contado">Más barato al contado</span>
        </div>

        <div className="tarjeta-producto__acciones">
          <button
            type="button"
            className="boton boton--fantasma"
            onClick={() => alVerDetalle(producto)}
          >
            Ver detalle
          </button>
          <button
            type="button"
            className="boton boton--primario"
            onClick={() => alAgregarAlCarrito(producto)}
          >
            Comprar / reservar
          </button>
        </div>
      </div>
    </article>
  );
}
