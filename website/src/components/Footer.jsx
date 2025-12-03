import { useLocation, Link } from "react-router-dom";
import { MapIcon, InformationCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { MapIcon as Out, InformationCircleIcon as Outt, QuestionMarkCircleIcon as Outtt } from "@heroicons/react/24/outline";

function Footer() {
	const currentPath = useLocation().pathname;
	return (
		<div className="fixed bottom-0 w-full bg-default-100">
			<div className="flex justify-center">


				<div className="flex flex-row max-w-5xl w-screen justify-around items-center my-3">

					<Link to={"/"}>
						<div className="">
							{
								currentPath == "/" ?
									<MapIcon className="size-7 text-primary" />
									:
									<Out className="size-7 text-primary" />
							}
						</div>
					</Link>

					<Link to={"/tentang"}>
						<div className="">
							{
								currentPath == "/tentang" ?
									<InformationCircleIcon className="size-7 text-primary" />
									:
									<Outt className="size-7 text-primary" />
							}
						</div>
					</Link>

					<Link to={"/faq"}>
						<div className="">
							{
								currentPath == "/faq" ?
									<QuestionMarkCircleIcon className="size-7 text-primary" />
									:
									<Outtt className="size-7 text-primary" />
							}
						</div>
					</Link>


				</div>
			</div>
		</div>
	)
}

export default Footer