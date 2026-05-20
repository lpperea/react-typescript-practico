import { useReducer } from 'react'
import {
  calculadoraReducer,
  estadoInicial,
  type AccionCalculadora,
} from './calculadoraReducer'
import './App.css'

type CeldaTeclado =
  | { id: string; tipo: 'hueco' }
  | {
      id: string
      tipo: 'boton'
      etiqueta: string
      accion: AccionCalculadora
      variante?: 'operador' | 'secundario' | 'igual'
      /** Ocupa dos columnas en la cuadrícula (ej. el 0). */
      ancho?: 'doble'
    }

/**
 * Orden en flujo de cuadrícula 4×N (la tecla = usa `btn-igual` con `grid-row: span 2` en CSS).
 */
const TECLADO: readonly CeldaTeclado[] = [
  {
    id: 'limpiar',
    tipo: 'boton',
    etiqueta: 'AC',
    accion: { type: 'limpiar' },
    variante: 'secundario',
  },
  { id: 'hueco-1', tipo: 'hueco' },
  {
    id: 'dividir',
    tipo: 'boton',
    etiqueta: '÷',
    accion: { type: 'operador', op: '/' },
    variante: 'operador',
  },
  {
    id: 'multiplicar',
    tipo: 'boton',
    etiqueta: '×',
    accion: { type: 'operador', op: '*' },
    variante: 'operador',
  },

  { id: 'd7', tipo: 'boton', etiqueta: '7', accion: { type: 'digito', digito: '7' } },
  { id: 'd8', tipo: 'boton', etiqueta: '8', accion: { type: 'digito', digito: '8' } },
  { id: 'd9', tipo: 'boton', etiqueta: '9', accion: { type: 'digito', digito: '9' } },
  {
    id: 'restar',
    tipo: 'boton',
    etiqueta: '−',
    accion: { type: 'operador', op: '-' },
    variante: 'operador',
  },

  { id: 'd4', tipo: 'boton', etiqueta: '4', accion: { type: 'digito', digito: '4' } },
  { id: 'd5', tipo: 'boton', etiqueta: '5', accion: { type: 'digito', digito: '5' } },
  { id: 'd6', tipo: 'boton', etiqueta: '6', accion: { type: 'digito', digito: '6' } },
  {
    id: 'sumar',
    tipo: 'boton',
    etiqueta: '+',
    accion: { type: 'operador', op: '+' },
    variante: 'operador',
  },

  { id: 'd1', tipo: 'boton', etiqueta: '1', accion: { type: 'digito', digito: '1' } },
  { id: 'd2', tipo: 'boton', etiqueta: '2', accion: { type: 'digito', digito: '2' } },
  { id: 'd3', tipo: 'boton', etiqueta: '3', accion: { type: 'digito', digito: '3' } },
  {
    id: 'igual',
    tipo: 'boton',
    etiqueta: '=',
    accion: { type: 'igual' },
    variante: 'igual',
  },

  {
    id: 'd0',
    tipo: 'boton',
    etiqueta: '0',
    accion: { type: 'digito', digito: '0' },
    ancho: 'doble',
  },
  { id: 'coma', tipo: 'boton', etiqueta: ',', accion: { type: 'punto' } },
]

function clasesBoton(celda: Extract<CeldaTeclado, { tipo: 'boton' }>): string {
  const partes = ['btn']
  if (celda.variante === 'operador') partes.push('btn-operador')
  if (celda.variante === 'secundario') partes.push('btn-secundario')
  if (celda.variante === 'igual') partes.push('btn-igual')
  if (celda.ancho === 'doble') partes.push('span-2')
  return partes.join(' ')
}

function App() {
  const [estado, dispatch] = useReducer(calculadoraReducer, estadoInicial)

  return (
    <div className="app">
      <header className="cabecera">
        <h1>Calculadora</h1>
        <p className="subtitulo">
          Estado con <code>useReducer</code> y acciones tipadas.
        </p>
      </header>

      <div
        className="calculadora"
        role="application"
        aria-label="Calculadora básica"
      >
        <output className="pantalla" aria-live="polite">
          {estado.pantalla}
        </output>

        <div className="teclado">
          {TECLADO.map((celda) => {
            if (celda.tipo === 'hueco') {
              return (
                <span key={celda.id} className="hueco" aria-hidden />
              )
            }

            return (
              <button
                key={celda.id}
                type="button"
                className={clasesBoton(celda)}
                onClick={() => dispatch(celda.accion)}
              >
                {celda.etiqueta}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
