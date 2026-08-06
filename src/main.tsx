import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { CartProvider } from './app/cart/CartContext'
import { Toaster } from './app/components/ui/sonner'
import { ErrorBoundary } from './components/ErrorBoundary'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
