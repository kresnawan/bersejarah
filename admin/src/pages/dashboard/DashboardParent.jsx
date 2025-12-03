import Nav from "../../components/Navbar.jsx"
import { Outlet } from "react-router-dom"

function DashboardParent() {
  return (
    <div className="w-full">
      <div>
        <Nav />
      </div>
      <div className="flex flex-row justify-center">
        <div className="px-5 py-6 mt-16 w-5xl">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default DashboardParent