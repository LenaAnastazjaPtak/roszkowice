import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/variables.css'
import './css/app.css'
import './css/style.css'
import './css/plugins.css'
import './css/navigation-menu.css'
import './css/modules.css'
import './i18n'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
