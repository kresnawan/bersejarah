import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import ScrollToTop from './utils/ScrollToTop.jsx'

import { Navigate } from 'react-router-dom'

import DashboardParent from './pages/dashboard/DashboardParent.jsx'
import Data from './pages/dashboard/Data.jsx'
import Tambah from './pages/dashboard/Tambah.jsx'
import Id from './pages/dashboard/data/Id.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth */}
        <Route path='/' element={<Navigate to={"/dashboard/data"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashboardParent />}>
          <Route path='data' element={<Data />} />
          <Route path='data/:id' element={<Id />} />
          <Route path='tambah' element={<Tambah />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
