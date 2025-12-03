import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HeroUIProvider } from "@heroui/react";
import ContextProvider from './contexts/ContextProvider.jsx';


createRoot(document.getElementById('root')).render(
    <HeroUIProvider>
      <ContextProvider>
          <App />
      </ContextProvider>
    </HeroUIProvider>
)
