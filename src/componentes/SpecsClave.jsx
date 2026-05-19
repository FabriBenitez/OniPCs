const mapaEspecificaciones = {
  Procesador: { sigla: 'CPU', etiqueta: 'Procesador' },
  'Placa de video': { sigla: 'GPU', etiqueta: 'Grafica' },
  Memoria: { sigla: 'RAM', etiqueta: 'Memoria' },
  Almacenamiento: { sigla: 'SSD', etiqueta: 'Disco' },
  Video: { sigla: 'GPU', etiqueta: 'Video' },
  Refrigeracion: { sigla: 'AIO', etiqueta: 'Refrigeracion' },
  Fuente: { sigla: 'PSU', etiqueta: 'Fuente' },
  Gabinete: { sigla: 'CASE', etiqueta: 'Gabinete' },
  Conectividad: { sigla: 'I/O', etiqueta: 'Conectividad' },
};

function obtenerMeta(clave) {
  return mapaEspecificaciones[clave] ?? {
    sigla: clave.slice(0, 3).toUpperCase(),
    etiqueta: clave,
  };
}

export default function SpecsClave({
  especificaciones,
  limite = 4,
  compacta = false,
}) {
  return (
    <ul className={`specs-clave ${compacta ? 'specs-clave--compacta' : ''}`}>
      {especificaciones.slice(0, limite).map(([clave, valor]) => {
        const meta = obtenerMeta(clave);

        return (
          <li className="specs-clave__item" key={clave}>
            <span className="specs-clave__icono" aria-hidden="true">
              {meta.sigla}
            </span>
            <span className="specs-clave__texto">
              <span className="specs-clave__etiqueta">{meta.etiqueta}</span>
              <strong className="specs-clave__valor">{valor}</strong>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
