import { useEffect, useState } from 'react';
import Encabezado from './componentes/Encabezado';
import HeroPrincipal from './componentes/HeroPrincipal';
import CatalogoDestacado from './componentes/CatalogoDestacado';
import DetalleProducto from './componentes/DetalleProducto';
import ServicioMantenimiento from './componentes/ServicioMantenimiento';
import MetodosPago from './componentes/MetodosPago';
import EnvioAndreani from './componentes/EnvioAndreani';
import CarritoLateral from './componentes/CarritoLateral';
import Checkout from './componentes/Checkout';
import PanelAdmin from './componentes/PanelAdmin';
import PreguntasFrecuentes from './componentes/PreguntasFrecuentes';
import LlamadoAccion from './componentes/LlamadoAccion';
import PiePagina from './componentes/PiePagina';
import { productosCatalogo } from './datos/productos';
import {
  configuracionMarca,
  metodosPago,
  preguntasFrecuentes,
  serviciosMantenimiento,
} from './datos/contenido';

const CLAVE_PRODUCTOS = 'oni.pcworkshop.productos';
const CLAVE_PEDIDOS = 'oni.pcworkshop.pedidos';

const formularioCheckoutInicial = {
  nombre: '',
  correo: '',
  telefono: '',
  codigoPostal: '',
  ciudad: '',
  direccion: '',
  tipoEntrega: 'envio',
  metodoPago: 'transferencia',
  observaciones: '',
};

function desplazarA(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function obtenerNombrePagina(ruta) {
  if (ruta === '/checkout') {
    return 'checkout';
  }

  if (ruta === '/admin') {
    return 'admin';
  }

  return 'inicio';
}

function obtenerPaginaActual() {
  return obtenerNombrePagina(window.location.pathname);
}

function leerEstadoLocal(clave, respaldo) {
  if (typeof window === 'undefined') {
    return respaldo;
  }

  try {
    const valor = window.localStorage.getItem(clave);

    if (!valor) {
      return respaldo;
    }

    return JSON.parse(valor);
  } catch {
    return respaldo;
  }
}

function construirGaleria(producto) {
  if (Array.isArray(producto.galeria) && producto.galeria.length > 0) {
    return producto.galeria.filter(Boolean);
  }

  if (producto.imagen) {
    return [producto.imagen];
  }

  return [];
}

function normalizarProducto(producto) {
  const especificaciones = Array.isArray(producto.especificaciones)
    ? producto.especificaciones.filter(
        (item) => Array.isArray(item) && item.length === 2 && item[0] && item[1],
      )
    : [];

  const idealPara =
    Array.isArray(producto.idealPara) && producto.idealPara.length > 0
      ? producto.idealPara
      : ['Compra lista para usar'];

  const destacadosRendimiento =
    Array.isArray(producto.destacadosRendimiento) &&
    producto.destacadosRendimiento.length > 0
      ? producto.destacadosRendimiento
      : ['Equipo listo para compra directa'];

  const galeria = construirGaleria(producto);
  const especificacionesBase =
    especificaciones.length > 0
      ? especificaciones
      : [
          ['Procesador', 'A definir'],
          ['Placa de video', 'A definir'],
          ['Memoria', 'A definir'],
          ['Almacenamiento', 'A definir'],
        ];

  return {
    ...producto,
    id: producto.id,
    nombre: producto.nombre ?? 'PC_ONI',
    subtitulo: producto.subtitulo ?? '',
    precioArs: Number(producto.precioArs) || 0,
    precioUsd: Number(producto.precioUsd) || 0,
    etiqueta: producto.etiqueta ?? 'PC_ARMADA',
    uso: producto.uso ?? 'Gaming',
    disponibilidad: producto.disponibilidad ?? 'Bajo pedido',
    destacado: Boolean(producto.destacado),
    visualPrincipal: Boolean(producto.visualPrincipal),
    acento: producto.acento ?? 'grafito',
    imagen: producto.imagen ?? '',
    imagenAlt: producto.imagenAlt ?? `Imagen de ${producto.nombre ?? 'PC armada'}`,
    galeria,
    resumen: producto.resumen ?? producto.descripcion ?? '',
    resumenTecnico:
      producto.resumenTecnico ??
      especificacionesBase
        .slice(0, 4)
        .map(([, valor]) => valor)
        .join(', '),
    descripcion: producto.descripcion ?? '',
    idealPara,
    destacadosRendimiento,
    especificaciones: especificacionesBase,
  };
}

function obtenerProductosIniciales() {
  const productosGuardados = leerEstadoLocal(CLAVE_PRODUCTOS, productosCatalogo);
  const origen = Array.isArray(productosGuardados) ? productosGuardados : productosCatalogo;

  return origen.map(normalizarProducto);
}

function obtenerPedidosIniciales() {
  const pedidosGuardados = leerEstadoLocal(CLAVE_PEDIDOS, []);
  return Array.isArray(pedidosGuardados) ? pedidosGuardados : [];
}

function normalizarTexto(valor) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function filtrarProductos(productos, filtros) {
  return productos.filter((producto) => {
    const coincideUso =
      filtros.uso === 'Todos' ||
      normalizarTexto(producto.uso) === normalizarTexto(filtros.uso);

    const coincidePrecio =
      filtros.precio === 'Todos' ||
      (filtros.precio === 'Hasta $1M' && producto.precioArs <= 1000000) ||
      (filtros.precio === '$1M a $2M' &&
        producto.precioArs > 1000000 &&
        producto.precioArs <= 2000000) ||
      (normalizarTexto(filtros.precio) === 'mas de $2m' && producto.precioArs > 2000000);

    const coincideDisponibilidad =
      filtros.disponibilidad === 'Todas' ||
      (filtros.disponibilidad === 'Entrega inmediata' &&
        producto.disponibilidad === 'Entrega inmediata') ||
      (filtros.disponibilidad === 'Armado / pedido' &&
        producto.disponibilidad !== 'Entrega inmediata');

    const coincideDestacada = !filtros.soloDestacadas || producto.destacado;

    return coincideUso && coincidePrecio && coincideDisponibilidad && coincideDestacada;
  });
}

function obtenerEstimacionEnvio(codigoPostal) {
  if (!codigoPostal || codigoPostal.trim().length < 4) {
    return null;
  }

  const primerDigito = codigoPostal.trim()[0];
  const tabla = {
    0: { zona: 'AMBA extendida', costo: 12000, tiempo: '24 a 72 hs habiles' },
    1: { zona: 'Buenos Aires interior', costo: 16800, tiempo: '2 a 4 dias habiles' },
    2: { zona: 'Centro del pais', costo: 18900, tiempo: '3 a 5 dias habiles' },
    3: { zona: 'Centro ampliado', costo: 19800, tiempo: '3 a 5 dias habiles' },
    4: { zona: 'Litoral y norte', costo: 21400, tiempo: '4 a 6 dias habiles' },
    5: { zona: 'Cuyo', costo: 22900, tiempo: '4 a 6 dias habiles' },
    6: { zona: 'Noroeste', costo: 24800, tiempo: '5 a 7 dias habiles' },
    7: { zona: 'Patagonia norte', costo: 28900, tiempo: '5 a 8 dias habiles' },
    8: { zona: 'Patagonia', costo: 31200, tiempo: '6 a 9 dias habiles' },
    9: { zona: 'Sur austral', costo: 34500, tiempo: '6 a 10 dias habiles' },
  };

  return tabla[primerDigito] ?? {
    zona: 'Cobertura nacional',
    costo: 22000,
    tiempo: '3 a 6 dias habiles',
  };
}

function obtenerMensajeConfirmacion(formulario, estimacionEnvio) {
  const mensajesPago = {
    transferencia:
      'Te mostramos alias y CBU para cerrar la transferencia y confirmar la reserva.',
    efectivo: 'Coordinamos por WhatsApp el pago en efectivo y la entrega o retiro.',
    usd_transferencia:
      'Te enviamos los datos para la transferencia en USD y validamos la operacion con el cambio acordado.',
    usdt:
      'Te compartimos la wallet placeholder del prototipo para cerrar la reserva y luego reemplazarla por la operativa.',
  };

  const mensajeEntrega =
    formulario.tipoEntrega === 'retiro'
      ? 'Retiro coordinado en Parque Chacabuco.'
      : estimacionEnvio
        ? `Envio estimado: ${estimacionEnvio.zona}, ${estimacionEnvio.tiempo}.`
        : 'Queda pendiente calcular el envio con el codigo postal final.';

  return `${mensajesPago[formulario.metodoPago]} ${mensajeEntrega}`;
}

function calcularSubtotal(carrito) {
  return carrito.reduce(
    (acumulado, item) => acumulado + item.producto.precioArs * item.cantidad,
    0,
  );
}

export default function App() {
  const [paginaActual, setPaginaActual] = useState(obtenerPaginaActual);
  const [productos, setProductos] = useState(obtenerProductosIniciales);
  const [pedidos, setPedidos] = useState(obtenerPedidosIniciales);
  const [filtros, setFiltros] = useState({
    uso: 'Todos',
    precio: 'Todos',
    disponibilidad: 'Todas',
    soloDestacadas: false,
  });
  const [productoActivo, setProductoActivo] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [formularioCheckout, setFormularioCheckout] = useState(
    formularioCheckoutInicial,
  );
  const [confirmacionPedido, setConfirmacionPedido] = useState(null);

  useEffect(() => {
    function sincronizarPagina() {
      setPaginaActual(obtenerPaginaActual());
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.addEventListener('popstate', sincronizarPagina);
    return () => window.removeEventListener('popstate', sincronizarPagina);
  }, []);

  useEffect(() => {
    const elementos = document.querySelectorAll('[data-revelar]');
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('revelado');
          }
        });
      },
      { threshold: 0.15 },
    );

    elementos.forEach((elemento) => observador.observe(elemento));

    return () => observador.disconnect();
  }, [paginaActual, productos, pedidos]);

  useEffect(() => {
    document.body.classList.toggle(
      'cuerpo--bloqueado',
      Boolean(productoActivo) || carritoAbierto,
    );
  }, [productoActivo, carritoAbierto]);

  useEffect(() => {
    window.localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    window.localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));
  }, [pedidos]);

  useEffect(() => {
    setProductoActivo((estadoAnterior) => {
      if (!estadoAnterior) {
        return estadoAnterior;
      }

      const productoActualizado = productos.find(
        (producto) => producto.id === estadoAnterior.id,
      );

      return productoActualizado ?? null;
    });

    setCarrito((estadoAnterior) => {
      let huboCambios = false;

      const carritoActualizado = estadoAnterior.flatMap((item) => {
        const productoActualizado = productos.find(
          (producto) => producto.id === item.producto.id,
        );

        if (!productoActualizado) {
          huboCambios = true;
          return [];
        }

        if (productoActualizado !== item.producto) {
          huboCambios = true;
          return [{ ...item, producto: productoActualizado }];
        }

        return [item];
      });

      return huboCambios ? carritoActualizado : estadoAnterior;
    });
  }, [productos]);

  const productosFiltrados = filtrarProductos(productos, filtros);
  const estimacionEnvio = obtenerEstimacionEnvio(formularioCheckout.codigoPostal);
  const subtotal = calcularSubtotal(carrito);
  const costoEnvio =
    formularioCheckout.tipoEntrega === 'envio' && estimacionEnvio ? estimacionEnvio.costo : 0;
  const total = subtotal + costoEnvio;
  const cantidadCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0,
  );

  function navegarA(ruta) {
    if (window.location.pathname !== ruta) {
      window.history.pushState({}, '', ruta);
    }

    setPaginaActual(obtenerNombrePagina(ruta));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function irAInicio() {
    navegarA('/');
  }

  function irAAdmin() {
    setCarritoAbierto(false);
    setProductoActivo(null);
    navegarA('/admin');
  }

  function irACheckout() {
    setCarritoAbierto(false);
    setProductoActivo(null);
    navegarA('/checkout');
  }

  function manejarFiltros(evento) {
    const { name, value, type, checked } = evento.target;
    setFiltros((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function agregarAlCarrito(producto) {
    setCarrito((estadoAnterior) => {
      const productoExistente = estadoAnterior.find(
        (item) => item.producto.id === producto.id,
      );

      if (productoExistente) {
        return estadoAnterior.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...estadoAnterior, { producto, cantidad: 1 }];
    });

    setCarritoAbierto(true);
    setConfirmacionPedido(null);
  }

  function actualizarCantidad(productoId, cantidadNueva) {
    if (cantidadNueva <= 0) {
      quitarDelCarrito(productoId);
      return;
    }

    setCarrito((estadoAnterior) =>
      estadoAnterior.map((item) =>
        item.producto.id === productoId ? { ...item, cantidad: cantidadNueva } : item,
      ),
    );
  }

  function quitarDelCarrito(productoId) {
    setCarrito((estadoAnterior) =>
      estadoAnterior.filter((item) => item.producto.id !== productoId),
    );
  }

  function manejarFormularioCheckout(evento) {
    const { name, value } = evento.target;
    setFormularioCheckout((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  }

  function manejarGuardarProducto(productoGuardado) {
    const productoNormalizado = normalizarProducto(productoGuardado);

    setProductos((estadoAnterior) => {
      const existe = estadoAnterior.some(
        (producto) => producto.id === productoNormalizado.id,
      );

      if (existe) {
        return estadoAnterior.map((producto) =>
          producto.id === productoNormalizado.id ? productoNormalizado : producto,
        );
      }

      return [productoNormalizado, ...estadoAnterior];
    });
  }

  function manejarEliminarProducto(productoId) {
    setProductos((estadoAnterior) =>
      estadoAnterior.filter((producto) => producto.id !== productoId),
    );
  }

  function manejarEnvioFormulario(evento) {
    evento.preventDefault();

    if (carrito.length === 0) {
      irAInicio();
      requestAnimationFrame(() => desplazarA('catalogo'));
      return;
    }

    const numeroPedido = `ONI-${String(Date.now()).slice(-6)}`;
    const mensaje = obtenerMensajeConfirmacion(formularioCheckout, estimacionEnvio);

    const pedidoNuevo = {
      numeroPedido,
      creadoEn: new Date().toISOString(),
      cliente: { ...formularioCheckout },
      items: carrito.map((item) => ({
        id: item.producto.id,
        nombre: item.producto.nombre,
        uso: item.producto.uso,
        disponibilidad: item.producto.disponibilidad,
        precioArs: item.producto.precioArs,
        cantidad: item.cantidad,
      })),
      subtotal,
      costoEnvio,
      total,
      mensaje,
      estimacionEnvio,
      estado: 'Nuevo',
    };

    setPedidos((estadoAnterior) => [pedidoNuevo, ...estadoAnterior]);
    setConfirmacionPedido({
      numeroPedido,
      mensaje,
    });
  }

  return (
    <div className="pagina">
      <a className="salto-contenido" href="#contenido">
        Saltar al contenido principal
      </a>

      <Encabezado
        cantidadCarrito={cantidadCarrito}
        alAbrirCarrito={() => setCarritoAbierto(true)}
        paginaActual={paginaActual}
        alIrInicio={irAInicio}
        alIrAdmin={irAAdmin}
      />

      {paginaActual === 'checkout' ? (
        <main className="pagina__principal pagina__principal--checkout" id="contenido">
          <section className="checkout-pagina" data-revelar>
            <div className="contenedor checkout-pagina__barra">
              <button
                type="button"
                className="checkout-pagina__volver"
                onClick={irAInicio}
              >
                Volver al catalogo
              </button>

              <div className="checkout-pagina__estado">
                <span className="checkout-pagina__paso">Paso final</span>
                <p className="checkout-pagina__texto">
                  Revisa carrito, entrega y pago antes de confirmar.
                </p>
              </div>
            </div>
          </section>

          <Checkout
            formulario={formularioCheckout}
            carrito={carrito}
            subtotal={subtotal}
            costoEnvio={costoEnvio}
            total={total}
            confirmacion={confirmacionPedido}
            estimacionEnvio={estimacionEnvio}
            alCambiarCampo={manejarFormularioCheckout}
            alEnviarFormulario={manejarEnvioFormulario}
          />
        </main>
      ) : paginaActual === 'admin' ? (
        <main className="pagina__principal pagina__principal--checkout" id="contenido">
          <PanelAdmin
            productos={productos}
            pedidos={pedidos}
            alGuardarProducto={manejarGuardarProducto}
            alEliminarProducto={manejarEliminarProducto}
            alIrInicio={irAInicio}
          />
        </main>
      ) : (
        <>
          <main className="pagina__principal" id="contenido">
            <HeroPrincipal
              alIrCatalogo={() => desplazarA('catalogo')}
              imagenHero={configuracionMarca.imagenHero}
            />

            <CatalogoDestacado
              filtros={filtros}
              productos={productosFiltrados}
              alCambiarFiltro={manejarFiltros}
              alVerDetalle={setProductoActivo}
              alAgregarAlCarrito={agregarAlCarrito}
              enlaceWhatsApp={configuracionMarca.enlaceWhatsApp}
            />

            <ServicioMantenimiento
              servicios={serviciosMantenimiento}
              enlaceWhatsApp={configuracionMarca.enlaceWhatsApp}
            />

            <MetodosPago metodos={metodosPago} />

            <EnvioAndreani
              codigoPostal={formularioCheckout.codigoPostal}
              alCambiarCodigoPostal={manejarFormularioCheckout}
              estimacionEnvio={estimacionEnvio}
            />

            <PreguntasFrecuentes preguntas={preguntasFrecuentes} />

            <LlamadoAccion
              enlaceWhatsApp={configuracionMarca.enlaceWhatsApp}
              alIrCatalogo={() => desplazarA('catalogo')}
            />
          </main>

          <PiePagina enlaceWhatsApp={configuracionMarca.enlaceWhatsApp} />
        </>
      )}

      <DetalleProducto
        producto={productoActivo}
        alCerrar={() => setProductoActivo(null)}
        alAgregarAlCarrito={agregarAlCarrito}
        enlaceWhatsApp={configuracionMarca.enlaceWhatsApp}
      />

      <CarritoLateral
        abierto={carritoAbierto}
        items={carrito}
        subtotal={subtotal}
        alCerrar={() => setCarritoAbierto(false)}
        alActualizarCantidad={actualizarCantidad}
        alQuitarProducto={quitarDelCarrito}
        alIrCheckout={irACheckout}
      />
    </div>
  );
}
