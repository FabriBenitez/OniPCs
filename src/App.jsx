import { useEffect, useState } from 'react';
import Encabezado from './componentes/Encabezado';
import HeroPrincipal from './componentes/HeroPrincipal';
import PropuestaValor from './componentes/PropuestaValor';
import CatalogoDestacado from './componentes/CatalogoDestacado';
import DetalleProducto from './componentes/DetalleProducto';
import ServicioMantenimiento from './componentes/ServicioMantenimiento';
import MetodosPago from './componentes/MetodosPago';
import EnvioAndreani from './componentes/EnvioAndreani';
import CarritoLateral from './componentes/CarritoLateral';
import Checkout from './componentes/Checkout';
import Confianza from './componentes/Confianza';
import PreguntasFrecuentes from './componentes/PreguntasFrecuentes';
import LlamadoAccion from './componentes/LlamadoAccion';
import PiePagina from './componentes/PiePagina';
import { productosCatalogo } from './datos/productos';
import {
  configuracionMarca,
  diferencialesConfianza,
  metodosPago,
  preguntasFrecuentes,
  propuestasValor,
  serviciosMantenimiento,
} from './datos/contenido';

function desplazarA(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
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
  const [filtros, setFiltros] = useState({
    uso: 'Todos',
    precio: 'Todos',
    disponibilidad: 'Todas',
    soloDestacadas: false,
  });
  const [productoActivo, setProductoActivo] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [formularioCheckout, setFormularioCheckout] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    codigoPostal: '',
    ciudad: '',
    direccion: '',
    tipoEntrega: 'envio',
    metodoPago: 'transferencia',
    observaciones: '',
  });
  const [confirmacionPedido, setConfirmacionPedido] = useState(null);

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
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      'cuerpo--bloqueado',
      Boolean(productoActivo) || carritoAbierto,
    );
  }, [productoActivo, carritoAbierto]);

  const productosFiltrados = filtrarProductos(productosCatalogo, filtros);
  const estimacionEnvio = obtenerEstimacionEnvio(formularioCheckout.codigoPostal);
  const subtotal = calcularSubtotal(carrito);
  const costoEnvio =
    formularioCheckout.tipoEntrega === 'envio' && estimacionEnvio ? estimacionEnvio.costo : 0;
  const total = subtotal + costoEnvio;
  const cantidadCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0,
  );

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

  function manejarEnvioFormulario(evento) {
    evento.preventDefault();

    if (carrito.length === 0) {
      desplazarA('catalogo');
      return;
    }

    const numeroPedido = `ONI-${String(Date.now()).slice(-6)}`;
    const mensaje = obtenerMensajeConfirmacion(formularioCheckout, estimacionEnvio);

    setConfirmacionPedido({
      numeroPedido,
      mensaje,
    });

    desplazarA('checkout');
  }

  return (
    <div className="pagina">
      <a className="salto-contenido" href="#contenido">
        Saltar al contenido principal
      </a>

      <Encabezado
        cantidadCarrito={cantidadCarrito}
        alAbrirCarrito={() => setCarritoAbierto(true)}
      />

      <main className="pagina__principal" id="contenido">
        <HeroPrincipal
          alIrCatalogo={() => desplazarA('catalogo')}
          alIrCheckout={() => desplazarA('checkout')}
          imagenHero={configuracionMarca.imagenHero}
        />

        <PropuestaValor propuestas={propuestasValor} />

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

        <Confianza diferenciales={diferencialesConfianza} />

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

        <PreguntasFrecuentes preguntas={preguntasFrecuentes} />

        <LlamadoAccion
          enlaceWhatsApp={configuracionMarca.enlaceWhatsApp}
          alIrCatalogo={() => desplazarA('catalogo')}
        />
      </main>

      <PiePagina enlaceWhatsApp={configuracionMarca.enlaceWhatsApp} />

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
        alIrCheckout={() => {
          setCarritoAbierto(false);
          desplazarA('checkout');
        }}
      />
    </div>
  );
}
