import { useState } from 'react';
import { formatearMoneda, formatearUsd } from '../utilidades/formato';

const formularioProductoInicial = {
  nombre: '',
  subtitulo: '',
  resumen: '',
  resumenTecnico: '',
  descripcion: '',
  uso: 'Gaming',
  disponibilidad: 'Entrega inmediata',
  etiqueta: 'PC_ARMADA',
  precioArs: '',
  precioUsd: '',
  acento: 'rojo',
  imagen: '',
  imagenAlt: '',
  procesador: '',
  grafica: '',
  memoria: '',
  almacenamiento: '',
  especificacionesExtra: '',
  idealParaTexto: '',
  destacadosTexto: '',
  galeriaTexto: '',
  destacado: false,
  visualPrincipal: false,
};

const opcionesUso = ['Gaming', 'Streaming', 'Diseño', 'Edición', 'Oficina'];
const opcionesDisponibilidad = [
  'Entrega inmediata',
  'Armado en 72 hs',
  'Armado prioritario',
  'Bajo pedido',
  'Cotización en 5 días',
];
const opcionesAcento = ['rojo', 'cian', 'grafito'];

const formateadorFecha = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function crearIdentificador(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizarLineas(texto) {
  return texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean);
}

function obtenerValorEspecificacion(producto, clave) {
  return producto.especificaciones.find((item) => item[0] === clave)?.[1] ?? '';
}

function obtenerGrafica(producto) {
  return (
    obtenerValorEspecificacion(producto, 'Placa de video') ||
    obtenerValorEspecificacion(producto, 'Video')
  );
}

function crearFormularioDesdeProducto(producto) {
  const especificacionesExtra = producto.especificaciones
    .slice(4)
    .map(([clave, valor]) => `${clave}: ${valor}`)
    .join('\n');

  return {
    nombre: producto.nombre,
    subtitulo: producto.subtitulo,
    resumen: producto.resumen,
    resumenTecnico: producto.resumenTecnico,
    descripcion: producto.descripcion,
    uso: producto.uso,
    disponibilidad: producto.disponibilidad,
    etiqueta: producto.etiqueta,
    precioArs: String(producto.precioArs),
    precioUsd: String(producto.precioUsd),
    acento: producto.acento,
    imagen: producto.imagen ?? '',
    imagenAlt: producto.imagenAlt ?? '',
    procesador: obtenerValorEspecificacion(producto, 'Procesador'),
    grafica: obtenerGrafica(producto),
    memoria: obtenerValorEspecificacion(producto, 'Memoria'),
    almacenamiento: obtenerValorEspecificacion(producto, 'Almacenamiento'),
    especificacionesExtra,
    idealParaTexto: producto.idealPara.join('\n'),
    destacadosTexto: producto.destacadosRendimiento.join('\n'),
    galeriaTexto: (producto.galeria ?? [])
      .filter((imagen) => imagen && imagen !== producto.imagen)
      .join('\n'),
    destacado: Boolean(producto.destacado),
    visualPrincipal: Boolean(producto.visualPrincipal),
  };
}

function parsearEspecificacionesExtra(texto) {
  return normalizarLineas(texto)
    .map((linea) => {
      const [clave, ...resto] = linea.split(':');
      const valor = resto.join(':').trim();

      if (!clave || !valor) {
        return null;
      }

      return [clave.trim(), valor];
    })
    .filter(Boolean);
}

function construirProductoDesdeFormulario(formulario, productoActual) {
  const imagenPrincipal = formulario.imagen.trim();
  const galeriaExtra = normalizarLineas(formulario.galeriaTexto).filter(
    (imagen) => imagen !== imagenPrincipal,
  );
  const especificaciones = [
    ['Procesador', formulario.procesador.trim()],
    ['Placa de video', formulario.grafica.trim() || 'Gráficos integrados'],
    ['Memoria', formulario.memoria.trim()],
    ['Almacenamiento', formulario.almacenamiento.trim()],
    ...parsearEspecificacionesExtra(formulario.especificacionesExtra),
  ].filter((item) => item[1]);

  const nombre = formulario.nombre.trim();
  const resumenTecnico =
    formulario.resumenTecnico.trim() ||
    especificaciones
      .slice(0, 4)
      .map(([, valor]) => valor)
      .join(', ');

  return {
    id:
      productoActual?.id ??
      `${crearIdentificador(nombre || 'pc-oni')}-${String(Date.now()).slice(-4)}`,
    nombre,
    subtitulo: formulario.subtitulo.trim(),
    resumen: formulario.resumen.trim() || formulario.descripcion.trim(),
    resumenTecnico,
    descripcion: formulario.descripcion.trim(),
    uso: formulario.uso,
    disponibilidad: formulario.disponibilidad,
    etiqueta: formulario.etiqueta.trim() || 'PC_ARMADA',
    precioArs: Number(formulario.precioArs) || 0,
    precioUsd: Number(formulario.precioUsd) || 0,
    acento: formulario.acento,
    imagen: imagenPrincipal,
    imagenAlt:
      formulario.imagenAlt.trim() || `Imagen de ${nombre || 'PC armada de oni.pcworkshop'}`,
    galeria: [imagenPrincipal, ...galeriaExtra].filter(Boolean),
    destacado: Boolean(formulario.destacado),
    visualPrincipal: Boolean(formulario.visualPrincipal),
    especificaciones,
    idealPara: normalizarLineas(formulario.idealParaTexto),
    destacadosRendimiento: normalizarLineas(formulario.destacadosTexto),
  };
}

export default function PanelAdmin({
  productos,
  pedidos,
  alGuardarProducto,
  alEliminarProducto,
  alIrInicio,
}) {
  const [formularioProducto, setFormularioProducto] = useState(
    formularioProductoInicial,
  );
  const [productoEditandoId, setProductoEditandoId] = useState(null);

  const estaEditando = Boolean(productoEditandoId);

  function manejarCambioProducto(evento) {
    const { name, value, type, checked } = evento.target;
    setFormularioProducto((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function prepararNuevoProducto() {
    setProductoEditandoId(null);
    setFormularioProducto(formularioProductoInicial);
  }

  function editarProducto(producto) {
    setProductoEditandoId(producto.id);
    setFormularioProducto(crearFormularioDesdeProducto(producto));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function eliminarProducto(producto) {
    const confirmar = window.confirm(
      `Eliminar ${producto.nombre} del catálogo y del panel admin?`,
    );

    if (!confirmar) {
      return;
    }

    if (productoEditandoId === producto.id) {
      prepararNuevoProducto();
    }

    alEliminarProducto(producto.id);
  }

  function guardarProducto(evento) {
    evento.preventDefault();

    const productoActual = productos.find(
      (producto) => producto.id === productoEditandoId,
    );
    const productoGuardado = construirProductoDesdeFormulario(
      formularioProducto,
      productoActual,
    );

    alGuardarProducto(productoGuardado);
    prepararNuevoProducto();
  }

  return (
    <section className="admin-pagina seccion" aria-labelledby="admin-titulo">
      <div className="contenedor admin__contenedor">
        <header className="admin__encabezado" data-revelar>
          <p className="seccion__eyebrow">Admin</p>
          <h1 className="seccion__titulo" id="admin-titulo">
            Panel de administración
          </h1>
          <p className="seccion__descripcion">
            Carga, edita o elimina productos y revisa los pedidos generados desde el
            checkout.
          </p>

          <div className="admin__acciones">
            <button
              type="button"
              className="boton boton--primario"
              onClick={alIrInicio}
            >
              Volver al catálogo
            </button>
            <button
              type="button"
              className="boton boton--fantasma"
              onClick={prepararNuevoProducto}
            >
              Nuevo producto
            </button>
          </div>
        </header>

        <div className="admin__metricas" data-revelar>
          <article className="admin__metrica">
            <span className="admin__metrica-etiqueta">Productos</span>
            <strong className="admin__metrica-valor">{productos.length}</strong>
          </article>
          <article className="admin__metrica">
            <span className="admin__metrica-etiqueta">Pedidos</span>
            <strong className="admin__metrica-valor">{pedidos.length}</strong>
          </article>
          <article className="admin__metrica">
            <span className="admin__metrica-etiqueta">Vista actual</span>
            <strong className="admin__metrica-valor">
              {estaEditando ? 'Editando producto' : 'Alta de producto'}
            </strong>
          </article>
        </div>

        <div className="admin__paneles">
          <section className="admin__panel admin__panel--formulario" data-revelar>
            <div className="admin__panel-encabezado">
              <div>
                <p className="admin__panel-kicker">Catálogo</p>
                <h2 className="admin__panel-titulo">
                  {estaEditando ? 'Modificar producto' : 'Cargar producto'}
                </h2>
              </div>
              {estaEditando ? (
                <button
                  type="button"
                  className="boton boton--fantasma"
                  onClick={prepararNuevoProducto}
                >
                  Cancelar edición
                </button>
              ) : null}
            </div>

            <form className="admin__formulario" onSubmit={guardarProducto}>
              <div className="admin__dos-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminNombre">
                    Nombre comercial
                  </label>
                  <input
                    className="admin__control"
                    id="adminNombre"
                    name="nombre"
                    type="text"
                    value={formularioProducto.nombre}
                    onChange={manejarCambioProducto}
                    placeholder="Ej: ONI_VECTOR_X"
                    required
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminEtiqueta">
                    Tag
                  </label>
                  <input
                    className="admin__control"
                    id="adminEtiqueta"
                    name="etiqueta"
                    type="text"
                    value={formularioProducto.etiqueta}
                    onChange={manejarCambioProducto}
                    placeholder="PREMIUM_BUILD"
                    required
                  />
                </div>
              </div>

              <div className="admin__grupo">
                <label className="admin__etiqueta" htmlFor="adminSubtitulo">
                  Subtítulo corto
                </label>
                <input
                  className="admin__control"
                  id="adminSubtitulo"
                  name="subtitulo"
                  type="text"
                  value={formularioProducto.subtitulo}
                  onChange={manejarCambioProducto}
                  placeholder="Qué resuelve esta PC en una sola línea"
                  required
                />
              </div>

              <div className="admin__tres-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminUso">
                    Uso
                  </label>
                  <select
                    className="admin__control"
                    id="adminUso"
                    name="uso"
                    value={formularioProducto.uso}
                    onChange={manejarCambioProducto}
                  >
                    {opcionesUso.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminDisponibilidad">
                    Disponibilidad
                  </label>
                  <select
                    className="admin__control"
                    id="adminDisponibilidad"
                    name="disponibilidad"
                    value={formularioProducto.disponibilidad}
                    onChange={manejarCambioProducto}
                  >
                    {opcionesDisponibilidad.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminAcento">
                    Acento visual
                  </label>
                  <select
                    className="admin__control"
                    id="adminAcento"
                    name="acento"
                    value={formularioProducto.acento}
                    onChange={manejarCambioProducto}
                  >
                    {opcionesAcento.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin__dos-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminPrecioArs">
                    Precio ARS
                  </label>
                  <input
                    className="admin__control"
                    id="adminPrecioArs"
                    name="precioArs"
                    type="number"
                    min="0"
                    value={formularioProducto.precioArs}
                    onChange={manejarCambioProducto}
                    placeholder="2450000"
                    required
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminPrecioUsd">
                    Precio USD
                  </label>
                  <input
                    className="admin__control"
                    id="adminPrecioUsd"
                    name="precioUsd"
                    type="number"
                    min="0"
                    value={formularioProducto.precioUsd}
                    onChange={manejarCambioProducto}
                    placeholder="2100"
                    required
                  />
                </div>
              </div>

              <div className="admin__dos-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminImagen">
                    Imagen principal
                  </label>
                  <input
                    className="admin__control"
                    id="adminImagen"
                    name="imagen"
                    type="url"
                    value={formularioProducto.imagen}
                    onChange={manejarCambioProducto}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminImagenAlt">
                    Alt de imagen
                  </label>
                  <input
                    className="admin__control"
                    id="adminImagenAlt"
                    name="imagenAlt"
                    type="text"
                    value={formularioProducto.imagenAlt}
                    onChange={manejarCambioProducto}
                    placeholder="Descripción accesible de la imagen"
                    required
                  />
                </div>
              </div>

              <div className="admin__grupo">
                <label className="admin__etiqueta" htmlFor="adminGaleria">
                  Imágenes extra
                </label>
                <textarea
                  className="admin__control admin__control--area"
                  id="adminGaleria"
                  name="galeriaTexto"
                  value={formularioProducto.galeriaTexto}
                  onChange={manejarCambioProducto}
                  placeholder="Una URL por línea para la galería del detalle"
                />
              </div>

              <div className="admin__tres-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminProcesador">
                    CPU
                  </label>
                  <input
                    className="admin__control"
                    id="adminProcesador"
                    name="procesador"
                    type="text"
                    value={formularioProducto.procesador}
                    onChange={manejarCambioProducto}
                    placeholder="Ryzen 7 7700"
                    required
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminGrafica">
                    GPU
                  </label>
                  <input
                    className="admin__control"
                    id="adminGrafica"
                    name="grafica"
                    type="text"
                    value={formularioProducto.grafica}
                    onChange={manejarCambioProducto}
                    placeholder="RTX 4070 Super"
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminMemoria">
                    RAM
                  </label>
                  <input
                    className="admin__control"
                    id="adminMemoria"
                    name="memoria"
                    type="text"
                    value={formularioProducto.memoria}
                    onChange={manejarCambioProducto}
                    placeholder="32 GB DDR5"
                    required
                  />
                </div>
              </div>

              <div className="admin__dos-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminAlmacenamiento">
                    SSD / almacenamiento
                  </label>
                  <input
                    className="admin__control"
                    id="adminAlmacenamiento"
                    name="almacenamiento"
                    type="text"
                    value={formularioProducto.almacenamiento}
                    onChange={manejarCambioProducto}
                    placeholder="SSD NVMe 1 TB"
                    required
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminResumenTecnico">
                    Resumen técnico
                  </label>
                  <input
                    className="admin__control"
                    id="adminResumenTecnico"
                    name="resumenTecnico"
                    type="text"
                    value={formularioProducto.resumenTecnico}
                    onChange={manejarCambioProducto}
                    placeholder="CPU, GPU, RAM y SSD en una línea"
                  />
                </div>
              </div>

              <div className="admin__grupo">
                <label className="admin__etiqueta" htmlFor="adminResumen">
                  Resumen comercial
                </label>
                <textarea
                  className="admin__control admin__control--area"
                  id="adminResumen"
                  name="resumen"
                  value={formularioProducto.resumen}
                  onChange={manejarCambioProducto}
                  placeholder="Resumen corto para card o detalle"
                />
              </div>

              <div className="admin__grupo">
                <label className="admin__etiqueta" htmlFor="adminDescripcion">
                  Descripción
                </label>
                <textarea
                  className="admin__control admin__control--area"
                  id="adminDescripcion"
                  name="descripcion"
                  value={formularioProducto.descripcion}
                  onChange={manejarCambioProducto}
                  placeholder="Descripción principal del producto"
                  required
                />
              </div>

              <div className="admin__dos-columnas">
                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminIdealPara">
                    Ideal para
                  </label>
                  <textarea
                    className="admin__control admin__control--area"
                    id="adminIdealPara"
                    name="idealParaTexto"
                    value={formularioProducto.idealParaTexto}
                    onChange={manejarCambioProducto}
                    placeholder="Un punto por línea"
                    required
                  />
                </div>

                <div className="admin__grupo">
                  <label className="admin__etiqueta" htmlFor="adminDestacados">
                    Destacados
                  </label>
                  <textarea
                    className="admin__control admin__control--area"
                    id="adminDestacados"
                    name="destacadosTexto"
                    value={formularioProducto.destacadosTexto}
                    onChange={manejarCambioProducto}
                    placeholder="Un punto por línea"
                    required
                  />
                </div>
              </div>

              <div className="admin__grupo">
                <label className="admin__etiqueta" htmlFor="adminEspecificacionesExtra">
                  Specs extra
                </label>
                <textarea
                  className="admin__control admin__control--area"
                  id="adminEspecificacionesExtra"
                  name="especificacionesExtra"
                  value={formularioProducto.especificacionesExtra}
                  onChange={manejarCambioProducto}
                  placeholder="Formato: Fuente: 750 W 80 Plus Gold"
                />
              </div>

              <div className="admin__checks">
                <label className="admin__check">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formularioProducto.destacado}
                    onChange={manejarCambioProducto}
                  />
                  <span>Mostrar como destacada</span>
                </label>

                <label className="admin__check">
                  <input
                    type="checkbox"
                    name="visualPrincipal"
                    checked={formularioProducto.visualPrincipal}
                    onChange={manejarCambioProducto}
                  />
                  <span>Tarjeta principal en catálogo</span>
                </label>
              </div>

              <div className="admin__acciones admin__acciones--formulario">
                <button type="submit" className="boton boton--primario">
                  {estaEditando ? 'Guardar cambios' : 'Publicar producto'}
                </button>
                <button
                  type="button"
                  className="boton boton--fantasma"
                  onClick={prepararNuevoProducto}
                >
                  Limpiar formulario
                </button>
              </div>
            </form>
          </section>

          <section className="admin__panel admin__panel--catalogo" data-revelar>
            <div className="admin__panel-encabezado">
              <div>
                <p className="admin__panel-kicker">Productos</p>
                <h2 className="admin__panel-titulo">Catálogo cargado</h2>
              </div>
              <p className="admin__panel-texto">
                Edita, reemplaza imágenes o elimina cualquier build publicada.
              </p>
            </div>

            <div className="admin__lista-productos">
              {productos.map((producto) => (
                <article className="admin__producto" key={producto.id}>
                  <div className="admin__producto-media">
                    {producto.imagen ? (
                      <img
                        className="admin__producto-imagen"
                        src={producto.imagen}
                        alt={producto.imagenAlt}
                      />
                    ) : (
                      <div className="admin__producto-placeholder">Sin imagen</div>
                    )}
                  </div>

                  <div className="admin__producto-cuerpo">
                    <div className="admin__producto-cabecera">
                      <div>
                        <p className="admin__producto-etiqueta">{producto.etiqueta}</p>
                        <h3 className="admin__producto-nombre">{producto.nombre}</h3>
                      </div>
                      <strong className="admin__producto-precio">
                        {formatearMoneda(producto.precioArs)}
                      </strong>
                    </div>

                    <div className="admin__producto-meta">
                      <span>{producto.uso}</span>
                      <span>{producto.disponibilidad}</span>
                      <span>Ref. {formatearUsd(producto.precioUsd)}</span>
                    </div>

                    <p className="admin__producto-texto">{producto.subtitulo}</p>

                    <ul className="admin__producto-specs">
                      {producto.especificaciones.slice(0, 4).map(([clave, valor]) => (
                        <li className="admin__spec" key={`${producto.id}-${clave}`}>
                          <span>{clave}</span>
                          <strong>{valor}</strong>
                        </li>
                      ))}
                    </ul>

                    <div className="admin__producto-acciones">
                      <button
                        type="button"
                        className="boton boton--fantasma"
                        onClick={() => editarProducto(producto)}
                      >
                        Modificar
                      </button>
                      <button
                        type="button"
                        className="boton boton--secundario"
                        onClick={() => eliminarProducto(producto)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="admin__panel admin__panel--pedidos" data-revelar>
          <div className="admin__panel-encabezado">
            <div>
              <p className="admin__panel-kicker">Ventas</p>
              <h2 className="admin__panel-titulo">Pedidos realizados</h2>
            </div>
            <p className="admin__panel-texto">
              Lista completa con los datos cargados por cada cliente en el checkout.
            </p>
          </div>

          {pedidos.length ? (
            <div className="admin__lista-pedidos">
              {pedidos.map((pedido, indice) => (
                <details className="admin__pedido" key={pedido.numeroPedido} open={indice === 0}>
                  <summary className="admin__pedido-resumen">
                    <div className="admin__pedido-principal">
                      <span className="admin__pedido-numero">{pedido.numeroPedido}</span>
                      <strong className="admin__pedido-cliente">
                        {pedido.cliente.nombre}
                      </strong>
                      <span className="admin__pedido-meta">
                        {formateadorFecha.format(new Date(pedido.creadoEn))}
                      </span>
                    </div>
                    <strong className="admin__pedido-total">
                      {formatearMoneda(pedido.total)}
                    </strong>
                  </summary>

                  <div className="admin__pedido-cuerpo">
                    <div className="admin__pedido-grid">
                      <article className="admin__pedido-bloque">
                        <h3 className="admin__pedido-subtitulo">Cliente</h3>
                        <ul className="admin__pedido-lista">
                          <li>
                            <span>Correo</span>
                            <strong>{pedido.cliente.correo}</strong>
                          </li>
                          <li>
                            <span>Teléfono</span>
                            <strong>{pedido.cliente.telefono}</strong>
                          </li>
                          <li>
                            <span>Ciudad</span>
                            <strong>{pedido.cliente.ciudad}</strong>
                          </li>
                          <li>
                            <span>Código postal</span>
                            <strong>{pedido.cliente.codigoPostal || 'No cargado'}</strong>
                          </li>
                          <li>
                            <span>Dirección</span>
                            <strong>{pedido.cliente.direccion || 'No cargada'}</strong>
                          </li>
                        </ul>
                      </article>

                      <article className="admin__pedido-bloque">
                        <h3 className="admin__pedido-subtitulo">Entrega y pago</h3>
                        <ul className="admin__pedido-lista">
                          <li>
                            <span>Entrega</span>
                            <strong>{pedido.cliente.tipoEntrega}</strong>
                          </li>
                          <li>
                            <span>Pago</span>
                            <strong>{pedido.cliente.metodoPago}</strong>
                          </li>
                          <li>
                            <span>Estado</span>
                            <strong>{pedido.estado}</strong>
                          </li>
                          <li>
                            <span>Envío</span>
                            <strong>
                              {pedido.costoEnvio
                                ? formatearMoneda(pedido.costoEnvio)
                                : 'Retiro coordinado'}
                            </strong>
                          </li>
                        </ul>
                      </article>
                    </div>

                    <article className="admin__pedido-bloque">
                      <h3 className="admin__pedido-subtitulo">Productos</h3>
                      <div className="admin__pedido-items">
                        {pedido.items.map((item) => (
                          <div className="admin__pedido-item" key={`${pedido.numeroPedido}-${item.id}`}>
                            <div>
                              <strong>{item.nombre}</strong>
                              <p>
                                {item.uso} · {item.disponibilidad}
                              </p>
                            </div>
                            <div className="admin__pedido-item-precio">
                              <span>x{item.cantidad}</span>
                              <strong>
                                {formatearMoneda(item.precioArs * item.cantidad)}
                              </strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>

                    <article className="admin__pedido-bloque">
                      <h3 className="admin__pedido-subtitulo">Observaciones</h3>
                      <p className="admin__pedido-observacion">
                        {pedido.cliente.observaciones || 'Sin observaciones del cliente.'}
                      </p>
                      <p className="admin__pedido-mensaje">{pedido.mensaje}</p>
                    </article>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <article className="admin__vacio">
              <h3 className="admin__panel-titulo">Todavía no hay pedidos</h3>
              <p className="admin__panel-texto">
                Los pedidos que entren desde el checkout se van a listar acá con la
                información completa del cliente.
              </p>
            </article>
          )}
        </section>
      </div>
    </section>
  );
}
