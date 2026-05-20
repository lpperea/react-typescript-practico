# Calculadora con `useReducer`

Proyecto **Vite + React + TypeScript**: calculadora de escritorio con todas las transiciones concentradas en un **`calculadoraReducer`** y acciones discrimadas por union (`digito`, `punto`, `operador`, `igual`, `limpiar`).

## Arranque

```bash
cd calculadora-reducer
npm install
npm run dev
```

## Idea clave

- **`EstadoCalculadora`**: pantalla visible, operando guardado, operador pendiente y si la próxima tecla empieza un número nuevo.
- **`resolverOperacionPendiente`**: al pulsar otro operador tras el segundo operando, se evalúa la operación anterior y queda lista la cadena.
- **`AC`**: vuelve a `estadoInicial`.

División entre cero muestra **`Error`**; `AC` reinicia.
