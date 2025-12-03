import DataCard from "../../components/DataCard.jsx"
import { useEffect, useState } from "react"
import axiosPrivate from "../../axios.js";
import { Spinner } from "@heroui/react";

function Tambah() {

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.location.sc
		axiosPrivate.get("/data").then(res => {
			setData(res.data);
			setIsLoading(false);
		})
	}, []);

	useEffect(() => {
		console.log(data);

	}, [data]);

	return (
		<div className="flex justify-center min-h-screen h-full">
			<div className="w-full h-full">
				<p className="my-5 text-2xl">Semua data</p>
				<p className="text-sm">Ketuk pada tombol Info untuk melihat informasi data lebih lengkap</p>
				<div>
					{
						isLoading ? 
						<div className="flex justify-center mt-30">
							<Spinner color="primary" size="lg" label="Loading..." />
						</div> :
						data.map((item, index) => (
							<DataCard key={index} nama={item.title} alamat={item.address} latitude={item.latitude} longitude={item.longitude} index={index + 1} id={item.id} />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Tambah