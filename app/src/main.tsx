import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import WikiDataProvider from './components/WikiDataProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <WikiDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WikiDataProvider>,
)
