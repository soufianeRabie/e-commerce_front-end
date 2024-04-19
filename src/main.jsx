import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GlobalProvider from './Context/GlobalState.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import { ThemeProvider } from '@material-tailwind/react'
import Banner from './Banner.jsx'
import Footer from './components/UserAndGuest/Footer/Footer.jsx'
import { DarkModeThemeProvider } from './components/theme-provider.jsx'
import { Toaster } from './components/ui/sonner.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GlobalProvider>
      <DarkModeThemeProvider>
        <ThemeProvider>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <RouterProvider router={router} />
          </div>
        </ThemeProvider>
      </DarkModeThemeProvider>
    </GlobalProvider>
    <Toaster />
  </>,
)
