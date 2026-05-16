import { formatearMoneda } from '../utilidades/formato';

const instruccionesPago = {
  transferencia:
    'Al confirmar el pedido se muestran alias y CBU para completar la transferencia. La reserva queda sujeta a acreditación.',
  efectivo:
    'Se coordina por WhatsApp el retiro o la entrega pactada. Ideal para operaciones directas en Parque Chacabuco.',
  usd_transferencia:
    'La confirmación se realiza acordando tipo de cambio y cuenta para transferencia en USD.',
  usdt:
    'Se comparte una wallet placeholder para el prototipo y luego puede reemplazarse por la wallet operativa del negocio.',
};

const opcionesEntrega = [
  {
    valor: 'retiro',
    titulo: 'Retiro en local',
    descripcion: 'Parque Chacabuco, CABA',
  },
  {
    valor: 'envio',
    titulo: 'Andreani',
    descripcion: 'Envío a domicilio',
  },
];

const opcionesPago = [
  {
    valor: 'efectivo',
    titulo: 'Efectivo en local',
    descripcion: 'Ideal para retiro coordinado',
  },
  {
    valor: 'transferencia',
    titulo: 'Transferencia bancaria',
    descripcion: 'Alias y CBU al confirmar',
  },
  {
    valor: 'usd_transferencia',
    titulo: 'Dólares por transferencia',
    descripcion: 'Tipo de cambio acordado',
  },
  {
    valor: 'usdt',
    titulo: 'USDT (wallet)',
    descripcion: 'Operación directa en crypto',
  },
];

export default function Checkout({
  formulario,
  carrito,
  subtotal,
  costoEnvio,
  total,
  confirmacion,
  estimacionEnvio,
  alCambiarCampo,
  alEnviarFormulario,
}) {
  const carritoVacio = carrito.length === 0;

  return (
    <section className="seccion checkout" id="checkout" aria-labelledby="checkout-titulo">
      <div className="contenedor">
        <header className="seccion__encabezado" data-revelar>
          <p className="seccion__eyebrow">Checkout realista</p>
          <h2 className="seccion__titulo" id="checkout-titulo">
            Compra o reserva simple, con instrucciones reales según pago y entrega.
          </h2>
          <p className="seccion__descripcion">
            El flujo no intenta parecer enterprise. Está pensado para vender bien, ordenar datos y cerrar una
            coordinación creíble.
          </p>
        </header>

        <div className="checkout__grilla">
          <form className="checkout__formulario" onSubmit={alEnviarFormulario} data-revelar>
            <div className="checkout__grupo">
              <label className="checkout__etiqueta" htmlFor="nombre">
                Nombre y apellido
              </label>
              <input
                className="checkout__control"
                id="nombre"
                name="nombre"
                type="text"
                value={formulario.nombre}
                onChange={alCambiarCampo}
                placeholder="Cómo querés que te contacten"
                required
              />
            </div>

            <div className="checkout__dos-columnas">
              <div className="checkout__grupo">
                <label className="checkout__etiqueta" htmlFor="correo">
                  Correo
                </label>
                <input
                  className="checkout__control"
                  id="correo"
                  name="correo"
                  type="email"
                  value={formulario.correo}
                  onChange={alCambiarCampo}
                  placeholder="tuemail@dominio.com"
                  required
                />
              </div>

              <div className="checkout__grupo">
                <label className="checkout__etiqueta" htmlFor="telefono">
                  WhatsApp o teléfono
                </label>
                <input
                  className="checkout__control"
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formulario.telefono}
                  onChange={alCambiarCampo}
                  placeholder="+54 11..."
                  required
                />
              </div>
            </div>

            <fieldset className="checkout__fieldset">
              <legend className="checkout__legend">Método de entrega</legend>
              <div className="checkout__opciones">
                {opcionesEntrega.map((opcion) => {
                  const activa = formulario.tipoEntrega === opcion.valor;

                  return (
                    <label
                      className={`checkout__opcion ${activa ? 'checkout__opcion--activa' : ''}`}
                      key={opcion.valor}
                    >
                      <input
                        className="checkout__radio"
                        type="radio"
                        name="tipoEntrega"
                        value={opcion.valor}
                        checked={activa}
                        onChange={alCambiarCampo}
                      />
                      <span className="checkout__opcion-contenido">
                        <strong className="checkout__opcion-titulo">{opcion.titulo}</strong>
                        <span className="checkout__opcion-descripcion">{opcion.descripcion}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="checkout__fieldset">
              <legend className="checkout__legend checkout__legend--con-etiqueta">
                Método de pago
                <span className="checkout__pill">No se aceptan tarjetas</span>
              </legend>
              <div className="checkout__opciones checkout__opciones--pago">
                {opcionesPago.map((opcion) => {
                  const activa = formulario.metodoPago === opcion.valor;

                  return (
                    <label
                      className={`checkout__opcion ${activa ? 'checkout__opcion--activa' : ''}`}
                      key={opcion.valor}
                    >
                      <input
                        className="checkout__radio"
                        type="radio"
                        name="metodoPago"
                        value={opcion.valor}
                        checked={activa}
                        onChange={alCambiarCampo}
                      />
                      <span className="checkout__opcion-contenido">
                        <strong className="checkout__opcion-titulo">{opcion.titulo}</strong>
                        <span className="checkout__opcion-descripcion">{opcion.descripcion}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="checkout__dos-columnas">
              <div className="checkout__grupo">
                <label className="checkout__etiqueta" htmlFor="codigoPostalCheckout">
                  Código postal
                </label>
                <input
                  className="checkout__control"
                  id="codigoPostalCheckout"
                  name="codigoPostal"
                  type="text"
                  inputMode="numeric"
                  maxLength="8"
                  value={formulario.codigoPostal}
                  onChange={alCambiarCampo}
                  placeholder="Ej: 1406"
                />
              </div>

              <div className="checkout__grupo">
                <label className="checkout__etiqueta" htmlFor="ciudad">
                  Ciudad
                </label>
                <input
                  className="checkout__control"
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  value={formulario.ciudad}
                  onChange={alCambiarCampo}
                  placeholder="Localidad / provincia"
                  required
                />
              </div>
            </div>

            <div className="checkout__grupo">
              <label className="checkout__etiqueta" htmlFor="direccion">
                Dirección o referencia
              </label>
              <input
                className="checkout__control"
                id="direccion"
                name="direccion"
                type="text"
                value={formulario.direccion}
                onChange={alCambiarCampo}
                placeholder="Calle, altura, piso o aclaración"
              />
            </div>

            <div className="checkout__grupo">
              <label className="checkout__etiqueta" htmlFor="observaciones">
                Observaciones
              </label>
              <textarea
                className="checkout__control checkout__control--area"
                id="observaciones"
                name="observaciones"
                value={formulario.observaciones}
                onChange={alCambiarCampo}
                placeholder="Ej: necesito factura, quiero reservar, prefiero coordinar horario..."
              />
            </div>

            <article className="checkout__instrucciones">
              <h3 className="checkout__subtitulo">Instrucciones según el pago</h3>
              <p className="checkout__texto">{instruccionesPago[formulario.metodoPago]}</p>
              {formulario.metodoPago === 'usdt' ? (
                <code className="checkout__wallet">WALLET-USDT-ONI-PLACEHOLDER</code>
              ) : null}
              {formulario.tipoEntrega === 'envio' && estimacionEnvio ? (
                <p className="checkout__texto">
                  Envío estimado actual: {formatearMoneda(estimacionEnvio.costo)} · {estimacionEnvio.zona} ·{' '}
                  {estimacionEnvio.tiempo}
                </p>
              ) : null}
              {formulario.tipoEntrega === 'retiro' ? (
                <p className="checkout__texto">
                  Retiro coordinado en Parque Chacabuco, Buenos Aires, con seguimiento por WhatsApp.
                </p>
              ) : null}
            </article>

            <button
              type="submit"
              className="boton boton--primario boton--ancho"
              disabled={carritoVacio}
            >
              Confirmar pedido
            </button>
          </form>

          <aside className="checkout__resumen" data-revelar>
            <p className="checkout__resumen-kicker">Resumen persistente</p>
            <h3 className="checkout__resumen-titulo">Tu compra</h3>

            {carritoVacio ? (
              <p className="checkout__resumen-vacio">
                El resumen se activa cuando agregás una PC al carrito desde el catálogo.
              </p>
            ) : (
              <>
                <div className="checkout__resumen-lista">
                  {carrito.map((item) => (
                    <div className="checkout__resumen-item" key={item.producto.id}>
                      <span className="checkout__resumen-nombre">
                        {item.producto.nombre} x{item.cantidad}
                      </span>
                      <strong className="checkout__resumen-precio">
                        {formatearMoneda(item.producto.precioArs * item.cantidad)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="checkout__totales">
                  <div className="checkout__total-fila">
                    <span>Subtotal</span>
                    <strong>{formatearMoneda(subtotal)}</strong>
                  </div>
                  <div className="checkout__total-fila">
                    <span>Envío</span>
                    <strong>
                      {formulario.tipoEntrega === 'retiro'
                        ? 'Retiro coordinado'
                        : costoEnvio
                          ? formatearMoneda(costoEnvio)
                          : 'A calcular'}
                    </strong>
                  </div>
                  <div className="checkout__total-fila checkout__total-fila--final">
                    <span>Total estimado</span>
                    <strong>{formatearMoneda(total)}</strong>
                  </div>
                </div>
              </>
            )}

            {confirmacion ? (
              <div className="checkout__confirmacion" aria-live="polite">
                <span className="checkout__confirmacion-etiqueta">Pedido generado</span>
                <strong className="checkout__confirmacion-numero">{confirmacion.numeroPedido}</strong>
                <p className="checkout__confirmacion-texto">{confirmacion.mensaje}</p>
              </div>
            ) : (
              <p className="checkout__resumen-texto">
                Este bloque deja visible el resultado comercial del flujo: pedido claro, total estimado e
                instrucciones concretas sin fricción innecesaria.
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
