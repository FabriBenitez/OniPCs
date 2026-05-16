const opcionesUso = ['Todos', 'Gaming', 'Oficina', 'Streaming', 'Diseño', 'Edición'];
const opcionesPrecio = ['Todos', 'Hasta $1M', '$1M a $2M', 'Más de $2M'];
const opcionesDisponibilidad = ['Todas', 'Entrega inmediata', 'Armado / pedido'];

export default function FiltrosCatalogo({ filtros, alCambiarFiltro }) {
  return (
    <form className="filtros-catalogo" data-revelar onSubmit={(evento) => evento.preventDefault()}>
      <div className="filtros-catalogo__bloque">
        <label className="filtros-catalogo__etiqueta" htmlFor="filtro-uso">
          Tipo de uso
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
          Rango de precio
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
          Disponibilidad
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

      <label className="filtros-catalogo__destacadas" htmlFor="filtro-destacadas">
        <input
          id="filtro-destacadas"
          type="checkbox"
          name="soloDestacadas"
          checked={filtros.soloDestacadas}
          onChange={alCambiarFiltro}
        />
        Ver solo destacadas
      </label>
    </form>
  );
}
