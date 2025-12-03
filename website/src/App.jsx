import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useMyContext } from "./contexts/context.jsx";
import Parent from "./pages/Parent.jsx"

import Homepage from "./pages/Homepage.jsx"
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";

import './main.css';
import Id from "./pages/Item/Id.jsx";

function App() {

  const {theme} = useMyContext();

  return (
    <div className={`${theme} text-foreground text-[12px] bg-background min-h-screen h-full overflow-x-hidden`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Parent />}>
            <Route path="" element={<Homepage />} />
            <Route path="tentang" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="/data/:id" element={<Id />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
