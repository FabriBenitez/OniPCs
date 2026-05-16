const formateadorMoneda = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const formateadorDolares = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function formatearMoneda(valor) {
  return formateadorMoneda.format(valor);
}

export function formatearUsd(valor) {
  return formateadorDolares.format(valor);
}
