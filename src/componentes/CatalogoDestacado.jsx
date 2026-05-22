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
          <p className="seccion__eyebrow">Catalogo</p>
          <h2 className="seccion__titulo" id="catalogo-titulo">
            Elegi por uso, mira las specs clave y reserva en minutos.
          </h2>
        </header>

        <FiltrosCatalogo
          filtros={filtros}
          alCambiarFiltro={alCambiarFiltro}
          cantidadResultados={productos.length}
        />

        {productos.length ? (
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
                /
              </span>
              <div className="catalogo__cta-cuerpo">
                <h3 className="catalogo__cta-titulo">Build a medida</h3>
                <p className="catalogo__cta-texto">
                  Si no ves tu equipo, abrimos una cotizacion guiada por uso y presupuesto.
                </p>
              </div>
              <a
                className="boton boton--inverso"
                href={enlaceWhatsApp}
                target="_blank"
                rel="noreferrer"
              >
                Cotizar
              </a>
            </aside>
          </div>
        ) : (
          <article className="catalogo__vacio" data-revelar>
            <h3 className="catalogo__vacio-titulo">No hay equipos con esos filtros.</h3>
            <p className="catalogo__vacio-texto">
              Ajusta uso, precio o disponibilidad para ver mas opciones.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
