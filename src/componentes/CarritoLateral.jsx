import { formatearMoneda } from '../utilidades/formato';

export default function CarritoLateral({
  abierto,
  items,
  subtotal,
  alCerrar,
  alActualizarCantidad,
  alQuitarProducto,
  alIrCheckout,
}) {
  if (!abierto) {
    return null;
  }

  return (
    <div
      className="carrito"
      role="dialog"
      aria-modal="true"
      aria-labelledby="carrito-titulo"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) {
          alCerrar();
        }
      }}
    >
      <aside className="carrito__panel">
        <button type="button" className="carrito__cerrar" onClick={alCerrar}>
          Cerrar
        </button>

        <div className="carrito__encabezado">
          <p className="carrito__eyebrow">Resumen rápido</p>
          <h2 className="carrito__titulo" id="carrito-titulo">
            Carrito
          </h2>
        </div>

        {items.length ? (
          <>
            <div className="carrito__lista">
              {items.map((item) => (
                <article className="carrito__item" key={item.producto.id}>
                  <div className="carrito__item-contenido">
                    <strong className="carrito__item-titulo">{item.producto.nombre}</strong>
                    <span className="carrito__item-uso">{item.producto.uso}</span>
                    <span className="carrito__item-precio">
                      {formatearMoneda(item.producto.precioArs)}
                    </span>
                  </div>

                  <div className="carrito__controles">
                    <button
                      type="button"
                      className="carrito__control"
                      onClick={() => alActualizarCantidad(item.producto.id, item.cantidad - 1)}
                      aria-label={`Restar una unidad de ${item.producto.nombre}`}
                    >
                      -
                    </button>
                    <span className="carrito__cantidad">{item.cantidad}</span>
                    <button
                      type="button"
                      className="carrito__control"
                      onClick={() => alActualizarCantidad(item.producto.id, item.cantidad + 1)}
                      aria-label={`Sumar una unidad de ${item.producto.nombre}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="carrito__quitar"
                      onClick={() => alQuitarProducto(item.producto.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="carrito__pie">
              <div className="carrito__fila">
                <span>Subtotal</span>
                <strong>{formatearMoneda(subtotal)}</strong>
              </div>
              <p className="carrito__nota">
                El costo de envío se define más abajo según código postal o retiro coordinado.
              </p>
              <button type="button" className="boton boton--primario boton--ancho" onClick={alIrCheckout}>
                Continuar al checkout
              </button>
            </div>
          </>
        ) : (
          <p className="carrito__vacio">
            Todavía no agregaste equipos. Elegí una PC del catálogo para activar el flujo de compra.
          </p>
        )}
      </aside>
    </div>
  );
}
