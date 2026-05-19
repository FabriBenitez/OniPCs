import { formatearMoneda } from '../utilidades/formato';

const instruccionesPago = {
  transferencia: 'Mostramos alias y CBU al confirmar el pedido.',
  efectivo: 'Coordinamos el retiro o entrega por WhatsApp.',
  usd_transferencia: 'Se valida con tipo de cambio y cuenta en USD.',
  usdt: 'Se comparte la wallet al cerrar la reserva.',
};

const opcionesEntrega = [
  {
    valor: 'retiro',
    titulo: 'Retiro en local',
    descripcion: 'Parque Chacabuco',
  },
  {
    valor: 'envio',
    titulo: 'Andreani',
    descripcion: 'Envio a domicilio',
  },
];

const opcionesPago = [
  {
    valor: 'efectivo',
    titulo: 'Efectivo',
    descripcion: 'Pago directo',
  },
  {
    valor: 'transferencia',
    titulo: 'Transferencia bancaria',
    descripcion: 'Alias y CBU',
  },
  {
    valor: 'usd_transferencia',
    titulo: 'USD por transferencia',
    descripcion: 'Cambio acordado',
  },
  {
    valor: 'usdt',
    titulo: 'USDT (wallet)',
    descripcion: 'Operacion crypto',
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
          <p className="seccion__eyebrow">Checkout</p>
          <h2 className="seccion__titulo" id="checkout-titulo">
            Datos claros, entrega simple y confirmacion directa.
          </h2>
          <p className="seccion__descripcion">
            El flujo prioriza cerrar rapido: primero tus datos, despues entrega,
            pago y resumen final.
          </p>
        </header>

        <div className="checkout__grilla">
          <form className="checkout__formulario" onSubmit={alEnviarFormulario} data-revelar>
            <div className="checkout__pasos" aria-hidden="true">
              <span className="checkout__paso">1. Datos</span>
              <span className="checkout__paso">2. Entrega</span>
              <span className="checkout__paso">3. Pago</span>
            </div>

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
                placeholder="Como quieres que te contacten"
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
                  WhatsApp o telefono
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
              <legend className="checkout__legend">Entrega</legend>
              <div className="checkout__opciones">
                {opcionesEntrega.map((opcion) => {
                  const activa = formulario.tipoEntrega === opcion.valor;

                  return (
                    <label
                      className={`checkout__opcion ${
                        activa ? 'checkout__opcion--activa' : ''
                      }`}
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
                        <span className="checkout__opcion-descripcion">
                          {opcion.descripcion}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="checkout__fieldset">
              <legend className="checkout__legend checkout__legend--con-etiqueta">
                Pago
                <span className="checkout__pill">Sin tarjetas</span>
              </legend>
              <div className="checkout__opciones checkout__opciones--pago">
                {opcionesPago.map((opcion) => {
                  const activa = formulario.metodoPago === opcion.valor;

                  return (
                    <label
                      className={`checkout__opcion ${
                        activa ? 'checkout__opcion--activa' : ''
                      }`}
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
                        <span className="checkout__opcion-descripcion">
                          {opcion.descripcion}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="checkout__dos-columnas">
              <div className="checkout__grupo">
                <label className="checkout__etiqueta" htmlFor="codigoPostalCheckout">
                  Codigo postal
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
                Direccion o referencia
              </label>
              <input
                className="checkout__control"
                id="direccion"
                name="direccion"
                type="text"
                value={formulario.direccion}
                onChange={alCambiarCampo}
                placeholder="Calle, altura, piso o aclaracion"
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
                placeholder="Factura, reserva, horario o comentario extra"
              />
            </div>

            <article className="checkout__instrucciones">
              <h3 className="checkout__subtitulo">Siguiente paso</h3>
              <p className="checkout__texto">{instruccionesPago[formulario.metodoPago]}</p>
              {formulario.metodoPago === 'usdt' ? (
                <code className="checkout__wallet">WALLET-USDT-ONI-PLACEHOLDER</code>
              ) : null}
              {formulario.tipoEntrega === 'envio' && estimacionEnvio ? (
                <p className="checkout__texto">
                  Envio estimado actual: {formatearMoneda(estimacionEnvio.costo)} ·{' '}
                  {estimacionEnvio.zona} · {estimacionEnvio.tiempo}
                </p>
              ) : null}
              {formulario.tipoEntrega === 'retiro' ? (
                <p className="checkout__texto">
                  Retiro coordinado en Parque Chacabuco, Buenos Aires.
                </p>
              ) : null}
            </article>

            <button
              type="submit"
              className="boton boton--primario boton--ancho"
              disabled={carritoVacio}
            >
              Reservar pedido
            </button>
          </form>

          <aside className="checkout__resumen" data-revelar>
            <p className="checkout__resumen-kicker">Resumen</p>
            <h3 className="checkout__resumen-titulo">Tu compra</h3>

            {carritoVacio ? (
              <p className="checkout__resumen-vacio">
                El resumen aparece cuando agregas una PC al carrito.
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
                    <span>Envio</span>
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
                <strong className="checkout__confirmacion-numero">
                  {confirmacion.numeroPedido}
                </strong>
                <p className="checkout__confirmacion-texto">{confirmacion.mensaje}</p>
              </div>
            ) : (
              <p className="checkout__resumen-texto">
                Veras subtotal, envio estimado y total antes de confirmar.
              </p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
