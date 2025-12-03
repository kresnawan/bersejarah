import { Outlet } from "react-router-dom"

function Parent() {
	return (
		<div>Parent
			<div>
				<Outlet />
			</div>
		</div>

	)
}

export default Parent