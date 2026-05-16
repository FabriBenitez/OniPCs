import { formatearMoneda } from '../utilidades/formato';

export default function EnvioAndreani({
  codigoPostal,
  alCambiarCodigoPostal,
  estimacionEnvio,
}) {
  return (
    <section className="seccion andreani" id="envios" aria-labelledby="envios-titulo">
      <div className="contenedor andreani__contenedor">
        <div className="andreani__contenido" data-revelar>
          <p className="seccion__eyebrow">Logística y despacho</p>
          <h2 className="seccion__titulo" id="envios-titulo">
            Módulo preparado para integrar Andreani sin romper la experiencia.
          </h2>
          <p className="seccion__descripcion">
            El prototipo ya contempla cálculo visual por código postal, costo estimado, retiro local y una lectura
            clara de despacho nacional.
          </p>

          <ul className="andreani__lista">
            <li>Ingreso de código postal dentro del flujo de compra.</li>
            <li>Estimación rápida de costo y ventana de entrega.</li>
            <li>Retiro coordinado en Parque Chacabuco como alternativa local.</li>
          </ul>
        </div>

        <aside className="andreani__panel" data-revelar>
          <label className="andreani__etiqueta" htmlFor="codigo-postal">
            Código postal
          </label>
          <input
            id="codigo-postal"
            className="andreani__input"
            type="text"
            inputMode="numeric"
            maxLength="8"
            name="codigoPostal"
            value={codigoPostal}
            onChange={alCambiarCodigoPostal}
            placeholder="Ej: 1406"
          />

          {estimacionEnvio ? (
            <div className="andreani__resultado" aria-live="polite">
              <strong className="andreani__precio">{formatearMoneda(estimacionEnvio.costo)}</strong>
              <span className="andreani__zona">{estimacionEnvio.zona}</span>
              <span className="andreani__tiempo">{estimacionEnvio.tiempo}</span>
            </div>
          ) : (
            <p className="andreani__placeholder">
              Ingresá tu código postal para ver una estimación inicial y dejar el flujo listo para la integración real.
            </p>
          )}

          <p className="andreani__nota">
            Estado del módulo: listo a nivel visual y estructural para conectar API logística más adelante.
          </p>
        </aside>
      </div>
    </section>
  );
}
