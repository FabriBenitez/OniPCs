const imagenRedVoid =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAA5ieB7MxhaHarl1_ex_YV0abEIl0mOPxijRPvABHBqMhzo_zNncXQHtJ6IOxUmjCK54DDYEZIat_HkJ9bcZhzmlGD-upICLf36aA6-jTZzBczD-POl9_XDsvjjaWik3yrjyV6uq52hVe6DLLCHsb4mDZBxMeXpCSJZUBa3tquxCZAMk4C9kzt-huaaiYFcXU_kuqPAIP6To6aVrTD06k1Hp4nGm4YZpdUnJ5odX8Ego441QVHeGVLb2X8__cT2WGayltKTHsndqo';

const imagenMonolith =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDwKOx7H3AKDfM2zGfHmLGDgGvNAPenlNXKQKeW3NFE5_eSRdW31jUgKa7xxjXr5QwgkyoRQWqvcxUIFKsQhY2s1fNqQ8PjLpnRBFr6kNFfgAp-5WuBTrrWieYmAeZ37KtKe2U-eSakto_6WjYPkv__LogUEw813E6EfFPSAPTdCenLzaItwpgVxWSI5xtii5HUBJURQvBJd1DNJwBvdWdfFVVK-RU61AEbjrH2ikVX2PQn7M6kcFN9p7gzNNEm7lr7LksKxoVPqwU';

const imagenMotherboard =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCppiloar8Lxlp8bHEM6AMuLUrhrnC-GBje2l6VvJ1J09BhKQUbI8jUQVeSj2mF4nYMZuRYbYHHJyeLDW8rBBSPmO_R7D_yBdO-XLLt7iYxJXtyojzBBAt61NfxaHwUZACmvlBOBHBgBmLCG1ICm_1YQJ4QiKO-cRr4iotl6_SJw6iQm8nAHwGv0fWLAL8WF6j_CLeG5NLYlAIrCMp-d7sE3aNO4CEkl2zGkMnvVSV6xyuinIlnOXAQv0tEqqM7fPGpANjEHU9piDY';

export const productosCatalogo = [
  {
    id: 'oni-red-void',
    nombre: 'ONI_RED_VOID',
    subtitulo: 'Gaming extremo con margen térmico, cableado prolijo y presencia flagship',
    precioArs: 4250000,
    precioUsd: 4150,
    etiqueta: 'PREMIUM_BUILD',
    uso: 'Gaming',
    disponibilidad: 'Entrega inmediata',
    destacado: true,
    visualPrincipal: true,
    acento: 'rojo',
    imagen: imagenRedVoid,
    imagenAlt: 'PC gamer de alto rendimiento con chasis oscuro y acentos rojos',
    resumen:
      'Una configuración pensada para resoluciones altas, sesiones largas y usuarios que quieren una compra fuerte desde el primer paso.',
    resumenTecnico:
      'Intel Core i9-14900K, RTX 4090 24 GB, 64 GB DDR5 y almacenamiento NVMe Gen4.',
    descripcion:
      'El perfil más agresivo del catálogo. Rinde para gaming premium, streaming exigente y creación de contenido sin dejar de verse como una máquina de showroom.',
    idealPara: [
      'Gaming AAA y competitivo en alto nivel',
      'Streaming simultáneo con margen de multitarea',
      'Usuarios que buscan un equipo definitivo y visualmente impactante',
    ],
    destacadosRendimiento: [
      'Plataforma lista para cargas sostenidas y altas tasas de cuadros',
      'Gestión térmica pensada para uso real y no solo para benchmark',
      'Lectura comercial clara para una compra premium sin ruido',
    ],
    especificaciones: [
      ['Procesador', 'Intel Core i9-14900K'],
      ['Placa de video', 'NVIDIA GeForce RTX 4090 24 GB'],
      ['Memoria', '64 GB DDR5 6400 MHz'],
      ['Almacenamiento', 'SSD NVMe 4 TB'],
      ['Refrigeración', 'AIO 360 mm con curva térmica ajustada'],
      ['Gabinete', 'Full tower black edition con panel lateral templado'],
    ],
  },
  {
    id: 'oni-monolith',
    nombre: 'ONI_MONOLITH',
    subtitulo: 'Workstation sólida para diseño, render y producción con estética sobria',
    precioArs: 3890000,
    precioUsd: 3800,
    etiqueta: 'WORKSTATION',
    uso: 'Diseño',
    disponibilidad: 'Armado prioritario',
    destacado: true,
    visualPrincipal: false,
    acento: 'grafito',
    imagen: imagenMonolith,
    imagenAlt: 'Workstation profesional con interior iluminado y gabinete negro',
    resumen:
      'Una workstation de lectura limpia para estudios, motion, edición y flujos donde importan memoria, estabilidad y GPU.',
    resumenTecnico:
      'AMD Ryzen 9 7950X, RTX 4080 Super, 128 GB DDR5 y SSD NVMe de 2 TB.',
    descripcion:
      'Equilibrada para render, edición y trabajo pesado. Mantiene un lenguaje visual más sobrio, pero con una ficha técnica de perfil muy alto.',
    idealPara: [
      'Motion graphics, video, fotografía y 3D intermedio/alto',
      'Estudios que priorizan estabilidad y tiempo de entrega',
      'Usuarios que quieren potencia sin caer en un look gamer',
    ],
    destacadosRendimiento: [
      'Memoria amplia para proyectos complejos y bibliotecas pesadas',
      'GPU con margen para viewport, render y exportaciones largas',
      'Arquitectura ideal para estudio, agencia o creador profesional',
    ],
    especificaciones: [
      ['Procesador', 'AMD Ryzen 9 7950X'],
      ['Placa de video', 'NVIDIA GeForce RTX 4080 Super'],
      ['Memoria', '128 GB DDR5'],
      ['Almacenamiento', 'SSD NVMe 2 TB'],
      ['Fuente', '1000 W 80 Plus Gold'],
      ['Gabinete', 'Chasis profesional con flujo controlado'],
    ],
  },
  {
    id: 'oni-frame-4070s',
    nombre: 'ONI_FRAME_4070S',
    subtitulo: '1440p, streaming y creación de contenido con plataforma actual',
    precioArs: 2480000,
    precioUsd: 2110,
    etiqueta: 'STREAM_BUILD',
    uso: 'Streaming',
    disponibilidad: 'Armado en 72 hs',
    destacado: true,
    visualPrincipal: true,
    acento: 'rojo',
    imagen: imagenMotherboard,
    imagenAlt: 'Detalle técnico de hardware premium con componentes negros y acentos rojos',
    resumen:
      'Un punto medio muy fuerte para quienes necesitan jugar alto, producir contenido y mantener una experiencia fluida en varios frentes.',
    resumenTecnico:
      'Ryzen 7 7700, RTX 4070 Super, 32 GB DDR5 y NVMe 1 TB Gen4.',
    descripcion:
      'La opción de salto real del catálogo: más margen que una PC gamer de entrada, pero sin entrar todavía en territory flagship.',
    idealPara: [
      'Gaming premium en 1440p',
      'Streaming con buena reserva de recursos',
      'Creadores que quieren una plataforma moderna y escalable',
    ],
    destacadosRendimiento: [
      'Relación equilibrada entre potencia, precio y plataforma',
      'Buena reserva para multitarea y grabación',
      'Lectura ideal para usuarios que suben un escalón de verdad',
    ],
    especificaciones: [
      ['Procesador', 'AMD Ryzen 7 7700'],
      ['Placa de video', 'NVIDIA GeForce RTX 4070 Super 12 GB'],
      ['Memoria', '32 GB DDR5 6000 MHz'],
      ['Almacenamiento', 'SSD NVMe 1 TB Gen4'],
      ['Fuente', '750 W 80 Plus Gold'],
      ['Gabinete', 'Mid tower airflow con gestión interna limpia'],
    ],
  },
  {
    id: 'oni-silent-desk',
    nombre: 'ONI_SILENT_DESK',
    subtitulo: 'Productividad premium con presencia sobria y respuesta inmediata',
    precioArs: 1120000,
    precioUsd: 960,
    etiqueta: 'OFFICE_PRO',
    uso: 'Oficina',
    disponibilidad: 'Entrega inmediata',
    destacado: false,
    visualPrincipal: false,
    acento: 'grafito',
    resumen:
      'Una PC armada elegante para multitarea seria, administración, estudio y jornadas largas sin ruido innecesario.',
    resumenTecnico:
      'Intel Core i5-14400, 32 GB DDR4, SSD NVMe 1 TB y configuración silenciosa.',
    descripcion:
      'Ideal para oficinas, estudios y usuarios que priorizan velocidad general, silencio y una compra clara sin componentes de más.',
    idealPara: [
      'Administración, oficina y multitarea intensa',
      'Usuarios que valoran silencio y estabilidad',
      'Puestos de trabajo que necesitan una solución prolija y durable',
    ],
    destacadosRendimiento: [
      'Respuesta muy sólida con varias aplicaciones abiertas',
      'Perfil térmico y acústico controlado',
      'Estética limpia para escritorio, oficina o estudio',
    ],
    especificaciones: [
      ['Procesador', 'Intel Core i5-14400'],
      ['Memoria', '32 GB DDR4'],
      ['Almacenamiento', 'SSD NVMe 1 TB'],
      ['Video', 'Integrado Intel UHD'],
      ['Gabinete', 'Torre sobria con panel lateral sólido'],
      ['Conectividad', 'Wi-Fi AC y Bluetooth según stock'],
    ],
  },
  {
    id: 'oni-studio-x',
    nombre: 'ONI_STUDIO_X',
    subtitulo: 'Edición, diseño y workloads creativos con una base profesional',
    precioArs: 2890000,
    precioUsd: 2460,
    etiqueta: 'DESIGN_PRO',
    uso: 'Diseño',
    disponibilidad: 'Bajo pedido',
    destacado: true,
    visualPrincipal: false,
    acento: 'cian',
    resumen:
      'Orientada a edición, motion, diseño y producción de contenido donde importan memoria, GPU y estabilidad sostenida.',
    resumenTecnico:
      'Intel Core i7-14700, RTX 4070 Super, 64 GB DDR5 y NVMe 2 TB.',
    descripcion:
      'Pensada para producción seria de contenido, con foco en estabilidad, lectura clara de configuración y armado prolijo.',
    idealPara: [
      'Edición de video y fotografía',
      'Diseño gráfico, motion y 3D intermedio',
      'Equipos de trabajo que no quieren improvisar hardware',
    ],
    destacadosRendimiento: [
      'Memoria amplia para flujos de trabajo pesados',
      'GPU sólida para render y viewport',
      'Plataforma lista para crecer con almacenamiento adicional',
    ],
    especificaciones: [
      ['Procesador', 'Intel Core i7-14700'],
      ['Placa de video', 'NVIDIA GeForce RTX 4070 Super 12 GB'],
      ['Memoria', '64 GB DDR5'],
      ['Almacenamiento', 'SSD NVMe 2 TB'],
      ['Fuente', '850 W 80 Plus Gold'],
      ['Gabinete', 'Chasis de alto flujo para trabajo sostenido'],
    ],
  },
  {
    id: 'oni-creator-dual',
    nombre: 'ONI_CREATOR_DUAL',
    subtitulo: 'Render, IA local y producción pesada con perfil flagship',
    precioArs: 3690000,
    precioUsd: 3140,
    etiqueta: 'HEAVY_EDIT',
    uso: 'Edición',
    disponibilidad: 'Cotización en 5 días',
    destacado: false,
    visualPrincipal: false,
    acento: 'rojo',
    resumen:
      'Una estación de trabajo para quienes necesitan potencia alta, almacenamiento serio y margen térmico estable.',
    resumenTecnico:
      'Ryzen 9 7900X, RTX 4080 Super, 64 GB DDR5 y doble almacenamiento SSD.',
    descripcion:
      'La propuesta más potente del catálogo después de la flagship gamer, orientada a render, simulación, IA y edición de gran volumen.',
    idealPara: [
      'Render, simulación y creación de contenido exigente',
      'Procesos largos con mucha carga sostenida',
      'Perfiles que necesitan una compra fuerte y bien resuelta',
    ],
    destacadosRendimiento: [
      'Potencia sostenida para cargas largas',
      'Espacio rápido para bibliotecas y proyectos grandes',
      'Arquitectura premium con lectura clara de upgrade futuro',
    ],
    especificaciones: [
      ['Procesador', 'AMD Ryzen 9 7900X'],
      ['Placa de video', 'NVIDIA GeForce RTX 4080 Super 16 GB'],
      ['Memoria', '64 GB DDR5 6000 MHz'],
      ['Almacenamiento', 'SSD NVMe 2 TB + SSD 2 TB'],
      ['Fuente', '850 W 80 Plus Gold'],
      ['Gabinete', 'Full tower con flujo optimizado y terminación premium'],
    ],
  },
];
