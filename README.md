# React con TypeScript — curso práctico

Formación orientada a **SPA con React y TypeScript**: componentes, estado, hooks, router y consumo de APIs. Pensado para entornos profesionales (presencial o remoto con Codespaces).

## Objetivos

Capacitar para desarrollar aplicaciones SPA básicas con React: componentes, estado, navegación y consumo de APIs, usando **Vite** y **TypeScript**.

## Cómo seguir el curso

1. Haz **fork** de este repositorio.
2. Abre un **Codespace** (*Code* → *Codespaces* → *Create codespace on main*).
3. Lee [Requisitos](00-requisitos.md).
4. Lee cada **capítulo** (teoría) y ejecuta los **labs** enlazados en tu proyecto Vite ([lab 2.1](02-01-lab-vite.md)).

Los laboratorios están en **archivos MD dedicados**: objetivo por paso, comprobaciones y retos.

## Índice

| # | Capítulo | Laboratorios |
|---|----------|--------------|
| — | [Requisitos](00-requisitos.md) | — |
| 1 | [Introducción](01-introduccion-react-ecosistema.md) | — |
| 2 | [Entorno](02-entorno-desarrollo.md) | [2.1 Vite](02-01-lab-vite.md) |
| 3 | [JSX](03-jsx-renderizado.md) | [3.1 Lista noticias](03-01-lab-lista-noticias.md) |
| 4 | [Componentes](04-componentes.md) | [4.1 Composición](04-01-lab-composicion.md) |
| 5 | [Estado y hooks](05-estado-hooks.md) | [5.1 useState](05-01-lab-useState.md) · [5.2 useEffect](05-02-lab-useEffect-reloj.md) |
| 6 | [Eventos y formularios](06-eventos-formularios.md) | [6.1 Formulario](06-01-lab-formulario-contacto.md) |
| 7 | [Comunicación avanzada](07-comunicacion-componentes.md) | [7.0](07-00-lab-prop-drilling.md) · [7.1 Context idioma](07-01-lab-useContext.md) · [7.2 Context tema](07-02-lab-context-tema.md) · [7.3 HOC hover](07-03-lab-hoc-withHover.md) · [7.4 HOC data](07-04-lab-hoc-withData.md) · [7.5 useReducer](07-05-lab-useReducer-contador.md) · [7.6 useReducer caja](07-06-lab-useReducer-caja.md) · [7.7 useLang](07-07-lab-hook-useLang.md) |
| 8 | [Routing](08-routing.md) | [8.1 React Router](08-01-lab-react-router.md) |
| 9 | [APIs](09-consumo-apis.md) | [9.1 Fetch](09-01-lab-consumo-api.md) |
| 10 | [Organización](10-organizacion-buenas-practicas.md) | — |

## Proyectos de código en el repositorio

| Carpeta | Qué es |
|---------|--------|
| [`calculadora-reducer/`](calculadora-reducer/) | Calculadora **Vite + React + TypeScript** con **`useReducer`**, botonera declarativa (`TECLADO.map`). Encaja con los labs **7.5 y 7.6** (useReducer). |
| [`demo-laboratorios-7/`](demo-laboratorios-7/) | Una sola app con los ejemplos del **capítulo 7** (Context, HOC, useReducer, hooks). |

En cada carpeta: `npm install` y `npm run dev`.
