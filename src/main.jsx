import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import Interna from './Interna.jsx'
import Externa from './Externa.jsx'

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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
