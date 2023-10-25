import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import Interna from './Interna/Interna.jsx'
import Externa from './Externa/Externa.jsx'
import MenuExterna from './Externa/Estructura/ExpansionTotal.jsx'
import EstructuraIndices from './Indices/EstructuraIndices.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/interna",
    element: <Interna />,
  },
  {
    path: "/externa",
    element: <Externa />,
  },
  {
    path: "/estructura-externa",
    element: <MenuExterna />,
  },
  {
    path:"/indices",
    element: <EstructuraIndices/>
  }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
