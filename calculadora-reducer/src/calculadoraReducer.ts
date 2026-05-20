export type Operador = '+' | '-' | '*' | '/'

export type EstadoCalculadora = {
  pantalla: string
  operandoPrevio: number | null
  operadorPendiente: Operador | null
  entradaNueva: boolean
}

export const estadoInicial: EstadoCalculadora = {
  pantalla: '0',
  operandoPrevio: null,
  operadorPendiente: null,
  entradaNueva: true,
}

export type AccionCalculadora =
  | { type: 'digito'; digito: string }
  | { type: 'punto' }
  | { type: 'operador'; op: Operador }
  | { type: 'igual' }
  | { type: 'limpiar' }

function parsePantalla(pantalla: string): number {
  if (pantalla === 'Error') return NaN
  const n = Number(pantalla.replace(',', '.'))
  return Number.isFinite(n) ? n : NaN
}

function aplicar(a: number, op: Operador, b: number): number {
  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return b === 0 ? NaN : a / b
    default: {
      const _: never = op
      return _
    }
  }
}

function formatear(n: number): string {
  if (!Number.isFinite(n) || Number.isNaN(n)) return 'Error'
  const redondeado = Math.round(n * 1e12) / 1e12
  let s = String(redondeado)
  if (s.length > 16) s = redondeado.toPrecision(12)
  return s
}

function conDigito(
  estado: EstadoCalculadora,
  digito: string
): EstadoCalculadora {
  if (estado.pantalla === 'Error') {
    return {
      ...estadoInicial,
      pantalla: digito,
      entradaNueva: false,
    }
  }

  if (estado.entradaNueva) {
    return {
      ...estado,
      pantalla: digito,
      entradaNueva: false,
    }
  }

  if (estado.pantalla === '0' && digito !== '0') {
    return { ...estado, pantalla: digito }
  }

  if (estado.pantalla === '0' && digito === '0') {
    return estado
  }

  if (estado.pantalla.length >= 16) return estado

  return { ...estado, pantalla: estado.pantalla + digito }
}

function conPunto(estado: EstadoCalculadora): EstadoCalculadora {
  if (estado.pantalla === 'Error') {
    return { ...estadoInicial, pantalla: '0.', entradaNueva: false }
  }

  if (estado.entradaNueva) {
    return { ...estado, pantalla: '0.', entradaNueva: false }
  }

  if (estado.pantalla.includes('.')) return estado

  return { ...estado, pantalla: `${estado.pantalla}.` }
}

/** Si hay operación pendiente y un segundo operando, la resuelve (p. ej. al pulsar otro operador). */
function resolverOperacionPendiente(
  estado: EstadoCalculadora
): EstadoCalculadora {
  const { operandoPrevio, operadorPendiente, pantalla, entradaNueva } = estado
  if (
    operandoPrevio === null ||
    operadorPendiente === null ||
    entradaNueva
  ) {
    return estado
  }

  const actual = parsePantalla(pantalla)
  if (Number.isNaN(actual)) return { ...estado, pantalla: 'Error' }

  const res = aplicar(operandoPrevio, operadorPendiente, actual)
  const pantallaFmt = formatear(res)
  if (pantallaFmt === 'Error') {
    return { ...estadoInicial, pantalla: 'Error' }
  }

  return {
    ...estado,
    pantalla: pantallaFmt,
    operandoPrevio: res,
    operadorPendiente: null,
    entradaNueva: true,
  }
}

function conOperador(
  estado: EstadoCalculadora,
  op: Operador
): EstadoCalculadora {
  if (estado.pantalla === 'Error') return estado

  const actual = parsePantalla(estado.pantalla)
  if (Number.isNaN(actual)) return { ...estado, pantalla: 'Error' }

  if (estado.entradaNueva && estado.operandoPrevio !== null) {
    return { ...estado, operadorPendiente: op }
  }

  return {
    ...estado,
    operandoPrevio: actual,
    operadorPendiente: op,
    entradaNueva: true,
  }
}

function conIgual(estado: EstadoCalculadora): EstadoCalculadora {
  if (estado.pantalla === 'Error') return estado
  if (estado.operandoPrevio === null || estado.operadorPendiente === null) {
    return estado
  }

  const actual = parsePantalla(estado.pantalla)
  if (Number.isNaN(actual)) return { ...estado, pantalla: 'Error' }

  const res = aplicar(
    estado.operandoPrevio,
    estado.operadorPendiente,
    actual
  )
  const pantalla = formatear(res)

  return {
    pantalla,
    operandoPrevio: null,
    operadorPendiente: null,
    entradaNueva: true,
  }
}

export function calculadoraReducer(
  estado: EstadoCalculadora,
  accion: AccionCalculadora
): EstadoCalculadora {
  switch (accion.type) {
    case 'limpiar':
      return estadoInicial
    case 'digito':
      if (!/^[0-9]$/.test(accion.digito)) return estado
      return conDigito(estado, accion.digito)
    case 'punto':
      return conPunto(estado)
    case 'operador':
      return conOperador(resolverOperacionPendiente(estado), accion.op)
    case 'igual':
      return conIgual(estado)
    default: {
      const _: never = accion
      return _
    }
  }
}
