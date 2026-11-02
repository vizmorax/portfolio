import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PrivacyPage from './components/PrivacyPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import './styles.css'

const path = window.location.pathname.replace(/\/$/, '') || '/'
const Page = path === '/privacy' ? PrivacyPage : path === '/' ? App : NotFoundPage

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
