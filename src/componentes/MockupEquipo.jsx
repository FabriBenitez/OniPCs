import { useId } from 'react';

function obtenerAcento(acento) {
  if (acento === 'cian') {
    return '#42d5ff';
  }

  if (acento === 'grafito') {
    return '#d8dde5';
  }

  return '#ef4f31';
}

export default function MockupEquipo({
  titulo,
  subtitulo,
  acento = 'rojo',
  variante = 'principal',
}) {
  const identificador = useId().replace(/:/g, '');
  const colorAcento = obtenerAcento(acento);
  const esVarianteHorizontal = variante === 'detalle';
  const idPanel = `panel-${acento}-${identificador}`;
  const idLinea = `linea-${acento}-${identificador}`;

  return (
    <figure
      className={`mockup-equipo mockup-equipo--${variante}`}
      aria-label={`Mockup del equipo ${titulo}`}
    >
      <svg
        viewBox="0 0 420 320"
        role="img"
        aria-hidden="true"
        className="mockup-equipo__grafico"
      >
        <defs>
          <linearGradient id={idPanel} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#17191f" />
            <stop offset="100%" stopColor="#0c0d11" />
          </linearGradient>
          <linearGradient id={idLinea} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={colorAcento} stopOpacity="0.1" />
            <stop offset="50%" stopColor={colorAcento} stopOpacity="1" />
            <stop offset="100%" stopColor={colorAcento} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect x="20" y="18" width="380" height="284" rx="24" fill="#151820" opacity="0.18" />
        <path
          d="M74 48 H300 L346 96 V254 L302 272 H74 L54 248 V72 Z"
          fill={`url(#${idPanel})`}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        <path
          d="M96 78 H278 L316 114 V228 L282 244 H96 Z"
          fill="#0b0d12"
          stroke={colorAcento}
          strokeOpacity="0.32"
        />
        <rect x="118" y="104" width="134" height="10" rx="4" fill={colorAcento} opacity="0.95" />
        <rect x="118" y="132" width="168" height="6" rx="3" fill="#aeb7c5" opacity="0.55" />
        <rect x="118" y="152" width="144" height="6" rx="3" fill="#aeb7c5" opacity="0.32" />
        <rect x="118" y="172" width="90" height="6" rx="3" fill="#aeb7c5" opacity="0.32" />
        <path d="M92 240 H330" stroke={`url(#${idLinea})`} strokeWidth="2" />
        <path d="M92 254 H286" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <rect x="286" y="120" width="30" height="84" rx="10" fill="#11151d" stroke={colorAcento} strokeOpacity="0.4" />
        <circle cx="301" cy="138" r="6" fill={colorAcento} opacity="0.9" />
        <circle cx="301" cy="162" r="6" fill={colorAcento} opacity="0.5" />
        <circle cx="301" cy="186" r="6" fill={colorAcento} opacity="0.25" />
        <path d="M60 92 L90 68" stroke={colorAcento} strokeWidth="3" opacity="0.7" />
        <path d="M310 272 L354 244" stroke={colorAcento} strokeWidth="3" opacity="0.7" />
        {esVarianteHorizontal ? (
          <>
            <rect x="66" y="46" width="84" height="24" rx="12" fill={colorAcento} opacity="0.16" />
            <rect x="70" y="52" width="48" height="8" rx="4" fill={colorAcento} />
          </>
        ) : null}
      </svg>

      <figcaption className="mockup-equipo__texto">
        <span className="mockup-equipo__titulo">{titulo}</span>
        <span className="mockup-equipo__subtitulo">{subtitulo}</span>
      </figcaption>
    </figure>
  );
}
