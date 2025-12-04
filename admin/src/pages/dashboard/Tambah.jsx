import { Button, Form, Input, Textarea, Image, NumberInput } from "@heroui/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../axios.js";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

function Tambah() {

	const navigate = useNavigate();
	const cropperRef = useRef(null);

	const [files, setFiles] = useState([]);
	const [imagesURL, setImagesURL] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [croppedImages, setCroppedImages] = useState([]);
	const [currentCrop, setCurrentCrop] = useState(0);

	const [fileIn, setFileIn] = useState(false);

	const [formInput, setFormInput] = useState({
		nama_tempat: "",
		alamat_jalan: "",
		alamat_dusun: "",
		alamat_kelurahan: "",
		alamat_kecamatan: "",
		alamat_kabupaten: "",
		deskripsi: "",
		lat: 0,
		long: 0
	});

	function getCropImage() {
		if (cropperRef.current?.cropper !== "undefined") {
			cropperRef.current?.cropper.getCroppedCanvas().toBlob(blob => {
				if (blob) {
					const file = new File([blob], 'asdfg.jpg', {type: 'image/jpeg'});
					setCroppedImages(prev => [...prev, file])
				}
			})
			if (currentCrop < imagesURL.length - 1) {
				setCurrentCrop(currentCrop + 1);
			} else {
				setFileIn(false);
			}
		}
	}

	function uploadImage(id) {
		console.log(croppedImages)
		console.log(files)
		const formData = new FormData();
		for (var file in croppedImages) {
			formData.append("images", croppedImages[file]);
		}

		formData.append("id", id);

		axiosPrivate.post("/data/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}).then(res => {
			console.log(res.data);
			setIsLoading(false);
			alert("Data berhasil ditambahkan")
			navigate("/dashboard/data")
		}).catch(err => {
			console.log(err);
			setIsLoading(false);
			alert("Maaf terjadi error");
		})
	}

	function handleSubmit(e) {

		e.preventDefault();
		setIsLoading(true);

		if (formInput.lat > 90 || formInput.lat < -90) {
			alert("Latitude antara -90 sampai 90");
			return
		}

		if (formInput.long > 180 || formInput.long < -180) {
			alert("Longitude antara -180 sampai 180");
			return
		}


		axiosPrivate.post("/data", formInput).then(res => {
			console.log(res.data);
			uploadImage(res.data.insertid);
		}).catch(err => {
			console.log(err);
			setIsLoading(false);
			alert("Maaf terjadi error");
		})
	}

	function handleFormInput(event) {
		const { name, value, type } = event.target

		setFormInput((prev) => ({
			...prev, [name]: type === 'number' ? parseFloat(value) : value
		}))
	}

	function handleFormInputNumber(key, value) {

		setFormInput((prev) => ({
			...prev, [key]: parseFloat(value)
		}))
	}

	function handleFileChange(e) {

		let filesArr = Array.from(e.target.files);
		setFiles(filesArr);

		let tempURL = [];
		for (var a in filesArr) {
			tempURL.push(URL.createObjectURL(filesArr[a]))
		}

		setImagesURL(tempURL);
		setCurrentCrop(0);
		setFileIn(true);
	}

	useEffect(() => {
		console.log(files);
		console.log(imagesURL)
	}, [files, imagesURL])

	return (
		<div className="flex justify-center overflow-hidden">
			<div className="w-full h-full pb-5 overflow">
				<p className="my-5 text-2xl">Tambah data</p>
				<div>
					<Form className="flex flex-col gap-4" onSubmit={handleSubmit}>

						<Input
							isRequired
							label="Nama tempat"
							type="text"
							variant="flat"
							radius="sm"
							name="nama_tempat"
							onChange={handleFormInput}
						/>

						<Input
							isRequired
							label="Alamat (jalan)"
							type="text"
							variant="flat"
							radius="sm"
							name="alamat_jalan"
							onChange={handleFormInput}
						/>

						<div className="flex flex-row gap-4 w-full">
							<Input
								isRequired
								label="Dusun"
								type="text"
								variant="flat"
								className="w-[50%]"
								radius="sm"
								name="alamat_dusun"
								onChange={handleFormInput}
							/>
							<Input
								isRequired
								label="Kelurahan"
								type="text"
								variant="flat"
								className="w-[50%]"
								radius="sm"
								name="alamat_kelurahan"
								onChange={handleFormInput}
							/>
						</div>

						<div className="flex flex-row gap-4 w-full">
							<Input
								isRequired
								label="Kecamatan"
								type="text"
								variant="flat"
								className="w-[50%]"
								radius="sm"
								name="alamat_kecamatan"
								onChange={handleFormInput}
							/>
							<Input
								isRequired
								label="Kabupaten"
								type="text"
								variant="flat"
								className="w-[50%]"
								radius="sm"
								name="alamat_kabupaten"
								onChange={handleFormInput}
							/>
						</div>

						<NumberInput
							isRequired
							minValue={-90}
							maxValue={90}
							formatOptions={{
								maximumFractionDigits: 20
							}}
							label="Latitude"
							type="number"
							variant="flat"
							radius="sm"
							name="lat"
							description="Gunakan titik (.) untuk desimal"
							value={formInput.lat}
							onValueChange={e => handleFormInputNumber("lat", e)}
						/>

						<NumberInput
							isRequired
							maxValue={180}
							minValue={-180}
							formatOptions={{
								maximumFractionDigits: 20
							}}
							label="Longitude"
							type="number"
							variant="flat"
							radius="sm"
							name="long"
							description="Gunakan titik (.) untuk desimal"
							value={formInput.long}
							onValueChange={e => handleFormInputNumber("long", e)}
						/>

						<Textarea
							isRequired
							label="Deskripsi"
							labelPlacement="inside"
							name="deskripsi"
							type="text"
							minRows={9}
							maxRows={9}
							variant="flat"
							radius="sm"
							onChange={handleFormInput}
						/>

						<Input
							label="Foto"
							labelPlacement="outside"
							placeholder="Enter your email"
							type="file"
							variant="flat"
							description="Max. 10 file"
							radius="sm"
							multiple
							onChange={handleFileChange}
						/>

						{
							fileIn &&
							<div>
								<Cropper
									src={imagesURL[currentCrop]}
									//   style={{ height: 400, width: "100%" }}
									// Cropper.js options
									ref={cropperRef}
									style={{ height: 400, width: "100%" }}
									aspectRatio={5 / 3}
									preview=".img-preview"
									viewMode={1}
									minCropBoxHeight={10}
									minCropBoxWidth={10}
									background={false}
									responsive={true}
									autoCropArea={1}
									checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
									guides={true}
								/>
								<div>
									<Button onPress={getCropImage}>Crop</Button>
								</div>
							</div>
						}

						<Button
							type="submit"
							fullWidth
							color="primary"
							isLoading={isLoading}
						>
							Submit
						</Button>

					</Form>


				</div>
			</div>
		</div>
	)
}

export default Tambah