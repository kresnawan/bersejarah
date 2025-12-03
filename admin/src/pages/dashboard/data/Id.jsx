import axiosPrivate from '../../../axios.js';
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Textarea, Button, NumberInput } from '@heroui/react';
import ImageCarousel from '../../../components/ImageCarousel.jsx';
import { Input } from '@heroui/react';

function Id() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [editData, setEditData] = useState({
		lat: 0,
		long: 0,
		addr: "",
		desc: ""
	});

	const [loadingDeleteData, setLoadingDeleteData] = useState(false);
	const [loadingUpdateData, setLoadingUpdateData] = useState(false);

	function deleteData() {
		setLoadingDeleteData(true)
		axiosPrivate.delete(`/data/${id}`).then(() => {
			setLoadingDeleteData(false)
			navigate("/dashboard/data")
		}).catch(err => {
			setLoadingDeleteData(false)
			console.log(err);
		})
	}

	function updateData() {
		setLoadingUpdateData(true);
		axiosPrivate.post(`/data/${id}/update`, {
			id: parseInt(id),
			addr: editData.addr,
			desc: editData.desc,
			lat: editData.lat,
			long: editData.long
		}).then(() => {
			setLoadingUpdateData(false)
			alert("Data berhasil diubah")
			fetchData();
			setEditMode(false);
		}).catch(err => {
			setLoadingUpdateData(false)
			alert("Maaf, terjadi error")
			console.log(err);
		})

	}

	function handleFormInput(event) {
		const { name, value, type } = event.target

		setEditData((prev) => ({
			...prev, [name]: type === 'number' ? parseFloat(value) : value
		}))
	}

	function handleFormInputNumber(key, value) {

		setEditData((prev) => ({
			...prev, [key]: parseFloat(value)
		}))
	}

	function fetchData() {
		axiosPrivate.get(`/data/${id}`).then(res => {
			setData(res.data);
			axiosPrivate.get(`/data/${id}/foto`).then(res => {
				setImages(res.data)
			}).catch(err => {
				console.log(err);
			})
		}).catch(err => {
			console.log(err)
		})
	}



	useEffect(() => {
		fetchData();
	}, [id])

	useEffect(() => {
		setEditData({
			lat: data.latitude,
			long: data.longitude,
			addr: data.address,
			desc: data.description
		});
	}, [data]);

	return (
		<div className='min-h-screen h-full w-full overflow-x-hidden'>
			<div className='border-b-1 border-default-200 pb-10'>
				<p className='text-3xl'>{data.title}</p>
				<div className='mt-5'>
					<ImageCarousel images={images} />
				</div>
			</div>
			<div className=''>
				<div className='pt-5'>
					<p className='font-bold text-primary'>Latitude</p>
					<NumberInput
						value={editData.lat}
						maxValue={90}
						minValue={-90}
						formatOptions={{
							maximumFractionDigits: 20,
							minimumFractionDigits: 0
						}}
						isDisabled={!editMode}
						className='max-w-full'
						variant={editMode ? "bordered" : "flat"}
						name='lat'
						onValueChange={e => handleFormInputNumber("lat", e)}
					/>
				</div>
				<div className='pt-5'>
					<p className='font-bold text-primary'>Longitude</p>
					<NumberInput
						value={editData.long}
						maxValue={180}
						minValue={-180}
						formatOptions={{
							maximumFractionDigits: 20,
							minimumFractionDigits: 0
						}}
						isDisabled={!editMode}
						className='max-w-full'
						variant={editMode ? "bordered" : "flat"}
						name='long'
						onValueChange={e => handleFormInputNumber("long", e)}
					/>
				</div>
			</div>
			<div className='pt-5'>
				<p className='font-bold text-primary'>Alamat</p>
				<Textarea
					value={editData.addr}
					maxRows={Infinity}
					isDisabled={!editMode}
					className='max-w-full'
					variant={editMode ? "bordered" : "flat"}
					name='addr'
					onChange={handleFormInput}
				/>
			</div>
			<div className='pt-5'>
				<p className='font-bold text-primary'>Deskripsi</p>
				<Textarea
					value={editData.desc}
					maxRows={Infinity}
					isDisabled={!editMode}
					className='max-w-full'
					variant={editMode ? "bordered" : "flat"}
					name='desc'
					onChange={handleFormInput}
				/>
			</div>
			{
				editMode ?
					<div className='pt-10'>
						<Button color='default' onPress={() => {
							setEditMode(false)
							setEditData({
								lat: data.latitude,
								long: data.longitude,
								addr: data.address,
								desc: data.description
							});
						}} variant='bordered' className='w-full'>Batal</Button>
						<Button
							color='success'
							onPress={updateData}
							variant='flat'
							isLoading={loadingUpdateData}
							className='w-full mt-3'
						>
							Simpan perubahan
						</Button>
					</div>
					:
					<div className='pt-10'>
						<Button color='default' onPress={() => setEditMode(true)} variant='bordered' className='w-full'>Edit</Button>
						<Button color='danger' isLoading={loadingDeleteData} className='w-full mt-3' onPress={deleteData}>Hapus</Button>
					</div>
			}
		</div>
	)
}

export default Id