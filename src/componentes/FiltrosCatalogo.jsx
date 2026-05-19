const opcionesUso = ['Todos', 'Gaming', 'Oficina', 'Streaming', 'Diseño', 'Edicion'];
const opcionesPrecio = ['Todos', 'Hasta $1M', '$1M a $2M', 'Mas de $2M'];
const opcionesDisponibilidad = ['Todas', 'Entrega inmediata', 'Armado / pedido'];

export default function FiltrosCatalogo({
  filtros,
  alCambiarFiltro,
  cantidadResultados,
}) {
  return (
    <form
      className="filtros-catalogo"
      data-revelar
      onSubmit={(evento) => evento.preventDefault()}
    >
      <div className="filtros-catalogo__superior">
        <div>
          <p className="filtros-catalogo__eyebrow">Filtrado rapido</p>
          <strong className="filtros-catalogo__cantidad">
            {cantidadResultados} equipos visibles
          </strong>
        </div>

        <label
          className={`filtros-catalogo__switch ${
            filtros.soloDestacadas ? 'filtros-catalogo__switch--activa' : ''
          }`}
          htmlFor="filtro-destacadas"
        >
          <input
            id="filtro-destacadas"
            className="filtros-catalogo__checkbox"
            type="checkbox"
            name="soloDestacadas"
            checked={filtros.soloDestacadas}
            onChange={alCambiarFiltro}
          />
          Solo destacadas
        </label>
      </div>

      <div className="filtros-catalogo__grilla">
        <div className="filtros-catalogo__bloque">
          <label className="filtros-catalogo__etiqueta" htmlFor="filtro-uso">
            Uso
          </label>
          <select
            id="filtro-uso"
            className="filtros-catalogo__control"
            name="uso"
            value={filtros.uso}
            onChange={alCambiarFiltro}
          >
            {opcionesUso.map((opcion) => (
              <option value={opcion} key={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div className="filtros-catalogo__bloque">
          <label className="filtros-catalogo__etiqueta" htmlFor="filtro-precio">
            Precio
          </label>
          <select
            id="filtro-precio"
            className="filtros-catalogo__control"
            name="precio"
            value={filtros.precio}
            onChange={alCambiarFiltro}
          >
            {opcionesPrecio.map((opcion) => (
              <option value={opcion} key={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div className="filtros-catalogo__bloque">
          <label className="filtros-catalogo__etiqueta" htmlFor="filtro-disponibilidad">
            Entrega
          </label>
          <select
            id="filtro-disponibilidad"
            className="filtros-catalogo__control"
            name="disponibilidad"
            value={filtros.disponibilidad}
            onChange={alCambiarFiltro}
          >
            {opcionesDisponibilidad.map((opcion) => (
              <option value={opcion} key={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
