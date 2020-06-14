import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/global'
import AuthProvider from './context/AuthContext'
import Routes from './Routes'
import { ToastProvider } from './context/ToastContext'

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </>
)
export default App
