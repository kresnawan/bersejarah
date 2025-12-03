import { Image, Button } from "@heroui/react"
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize.jsx"
import { useMyContext } from "../contexts/context.jsx"

function ItemCard({ data }) {

	const navigate = useNavigate();
	const { height } = useScreenSize();

	const {ticker2, setTicker2, setLatFocus, setLongFocus} = useMyContext();

	return (
		<div className="border-1 rounded-md border-gray-700 bg-default-100 w-full hover:cursor-pointer" onClick={() => {
			setTicker2(ticker2 + 1);
			setLatFocus(data.latitude)
			setLongFocus(data.longitude)
		}}>
			<div className="flex flex-col">
				<div className="bg-white w-full h-35 overflow-hidden rounded-t-md">
					<Image src={`https://b-api.kresnawan.com/static/${data.photo}`} className="min-w-full" radius="none" />
				</div>
				<div className="p-4">
					<h1 className="font-bold truncate-single-line">{data.title}</h1>
					{
						height >= 720 && (
							<div className="mt-2 text-sm">
								<p className="truncate-single-line">{data.address}</p>
								<div className="mt-3">
									<Button onPress={() => navigate(`/data/${data.id}`)} fullWidth radius="sm" variant="bordered">Info</Button>
								</div>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default ItemCard