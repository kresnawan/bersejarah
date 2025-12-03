// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SunIcon } from "@heroicons/react/24/solid";
import { SunIcon as SunIconOutline } from "@heroicons/react/24/outline";
import { useMyContext } from "../contexts/context.jsx";

function Navbar() {
	const { theme, setTheme } = useMyContext();
	const currentPath = useLocation().pathname;

	function switchTheme() {
		if (theme === "light") {
			setTheme("dark")
		} else {
			setTheme("light")
		}
	}

	function getPageName(currentPath) {
		if (currentPath === "/") {
			return "Peta"
		} else if (currentPath === "/tentang") {
			return "Tentang"
		} else if (currentPath === "/faq") {
			return "Pertanyaan"
		} else {
			return "Data"
		}
	}
	return (
		<div className="w-screen flex justify-center bg-default-100">
			<div className="py-2 px-5 font-bold w-full max-w-5xl flex justify-between items-center">
				{/* Nav */}
				<p>{getPageName(currentPath)}</p>
				<div className="hover:cursor-pointer">
					{
						theme === "light" ?
							<SunIcon className="size-6" onClick={switchTheme} />
							:
							<SunIconOutline className="size-6" onClick={switchTheme} />
					}
				</div>
			</div>
		</div>

	)
}

export default Navbar