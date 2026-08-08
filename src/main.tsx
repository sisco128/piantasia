import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { CartProvider } from './app/cart/CartContext'
import { Toaster } from './app/components/ui/sonner'
import { ErrorBoundary } from './components/ErrorBoundary'
import { initCookieConsent } from './lib/consent'
import './styles/index.css'

// Outside React, and before the first render: on a returning visit this is
// what re-grants analytics_storage, and GTM only waits 500ms for it.
initCookieConsent()

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
