import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GlobalProvider from './Context/GlobalState.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import { ThemeProvider } from '@material-tailwind/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </GlobalProvider>,
)
