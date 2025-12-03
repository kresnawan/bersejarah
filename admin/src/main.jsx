import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './contexts/authContextProvider.jsx'
import './main.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <HeroUIProvider className='w-full h-full'>
        <main className='dark text-foreground bg-background'>
          <App />
        </main>
      </HeroUIProvider>
    </AuthContextProvider>
  </StrictMode>,
)
