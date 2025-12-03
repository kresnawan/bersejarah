import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Parent() {

	return (
		<div className="overflow-hidden">
			<Navbar />
			<div className="flex justify-center">
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

export default Parent