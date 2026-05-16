import FiltrosCatalogo from './FiltrosCatalogo';
import TarjetaProducto from './TarjetaProducto';

export default function CatalogoDestacado({
  filtros,
  productos,
  alCambiarFiltro,
  alVerDetalle,
  alAgregarAlCarrito,
  enlaceWhatsApp,
}) {
  return (
    <section className="seccion catalogo" id="catalogo" aria-labelledby="catalogo-titulo">
      <div className="contenedor">
        <header className="seccion__encabezado" data-revelar>
          <p className="seccion__eyebrow">Catálogo 2026</p>
          <h2 className="seccion__titulo" id="catalogo-titulo">
            Equipos listos, organizados por uso y pensados para decidir rápido.
          </h2>
          <p className="seccion__descripcion">
            Cada ficha combina imagen, resumen técnico, disponibilidad y precio contado para que el usuario entienda
            qué está comprando en pocos segundos.
          </p>
        </header>

        <FiltrosCatalogo filtros={filtros} alCambiarFiltro={alCambiarFiltro} />

        <div className="catalogo__lista">
          {productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              alVerDetalle={alVerDetalle}
              alAgregarAlCarrito={alAgregarAlCarrito}
            />
          ))}

          <aside className="catalogo__cta" data-revelar>
            <span className="catalogo__cta-icono" aria-hidden="true">
              01
            </span>
            <div className="catalogo__cta-cuerpo">
              <h3 className="catalogo__cta-titulo">¿Buscás algo a medida?</h3>
              <p className="catalogo__cta-texto">
                Si el equipo que necesitás no está publicado, abrimos una cotización guiada con base en tu flujo real
                de trabajo, juego o producción.
              </p>
            </div>
            <a className="boton boton--inverso" href={enlaceWhatsApp} target="_blank" rel="noreferrer">
              Cotizar custom
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
