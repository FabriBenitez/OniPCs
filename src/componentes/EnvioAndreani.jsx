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
          <p className="seccion__eyebrow">Envios</p>
          <h2 className="seccion__titulo" id="envios-titulo">
            El envio ya tiene un modulo listo para integrarse.
          </h2>
          <p className="seccion__descripcion">
            El usuario puede calcular una referencia y decidir si prefiere despacho o retiro.
          </p>

          <ul className="andreani__lista">
            <li>Codigo postal dentro del flujo de compra.</li>
            <li>Costo y plazo estimado al instante.</li>
            <li>Retiro coordinado en Parque Chacabuco.</li>
          </ul>
        </div>

        <aside className="andreani__panel" data-revelar>
          <label className="andreani__etiqueta" htmlFor="codigo-postal">
            Codigo postal
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
              <strong className="andreani__precio">
                {formatearMoneda(estimacionEnvio.costo)}
              </strong>
              <span className="andreani__zona">{estimacionEnvio.zona}</span>
              <span className="andreani__tiempo">{estimacionEnvio.tiempo}</span>
            </div>
          ) : (
            <p className="andreani__placeholder">
              Ingresa tu codigo postal para ver una referencia inicial.
            </p>
          )}

          <p className="andreani__nota">
            Estado del modulo: listo para conectar la API logistica mas adelante.
          </p>
        </aside>
      </div>
    </section>
  );
}
