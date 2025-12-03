import { useParams } from 'react-router-dom'
import axiosPrivate from '../../axios.js';
import { useState, useEffect } from 'react';
import ItemPhotosCarousel from '../../components/ItemPhotosCarousel.jsx';
import { Spinner } from '@heroui/spinner';
import { Button, ButtonGroup } from "@heroui/button";
import { Image, Input, Textarea } from '@heroui/react';
import { PlusIcon } from "@heroicons/react/24/solid";

function GMapsIcon() {
	return <Image height={28} src='https://www.gstatic.com/marketing-cms/assets/images/0f/9a/58f1d92b46069b4a8bdc556b612c/google-maps.webp=s48-fcrop64=1,00000000ffffffff-rw' />
}

function Id() {
	const { id } = useParams();
	const [item, setItem] = useState({});
	const [photos, setPhotos] = useState([]);

	const [komentar, setKomentar] = useState([]);

	const [namaKomentar, setNamaKomentar] = useState("");
	const [pesanKomentar, setPesanKomentar] = useState("");

	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingK, setIsLoadingK] = useState(false);
	const [isLoadingPostKomentar, setIsLoadingPostKomentar] = useState(false);

	const [showKomentar, setShowKomentar] = useState(false)

	function getKomentar() {
		setIsLoadingK(true);
		axiosPrivate.get(`/data/${id}/komentar`).then(res => {
			setKomentar(res.data);
		}).catch(err => {
			console.log(err);
		}).finally(() => {
			setIsLoadingK(false);
		})
	}

	function postKomentar() {

		if (namaKomentar === "" || pesanKomentar === "") {
			return alert("Komentar harus valid")
		}

		setIsLoadingPostKomentar(true);
		axiosPrivate.post(`/data/${id}/komentar`, {
			nama: namaKomentar,
			pesan: pesanKomentar
		}).then(() => {
			getKomentar();
			setShowKomentar(false)
		}).catch(err => {
			console.log(err);
		}).finally(() => {
			setIsLoadingPostKomentar(false);
		})
	}

	useEffect(() => {
		axiosPrivate.get(`/data/${id}`).then(res => {

			setItem(res.data);
			axiosPrivate.get(`/data/${id}/foto`).then(res => {
				setPhotos(res.data);
				getKomentar();
				setIsLoading(false)
			}).catch(err => {
				console.log(err);
			})

		}).catch(err => {
			console.log(err);
		}).finally(() => {
			setIsLoading(false)
		})
	}, []);

	useEffect(() => {
		if (showKomentar) {
			window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
		}
	}, [showKomentar])


	return (
		<div>
			{
				isLoading ? <Spinner size='lg' label='Loading...' /> :
					<div className='px-5 max-w-5xl w-screen overflow-hidden mb-20'>
						<div className='mt-5 mb-10 flex justify-center' >
							<ItemPhotosCarousel data={photos} />
						</div>
						<div>
							<h1 className='text-3xl'>{item.title}</h1>
							<div className='mt-7 text-justify'>
								<div>
									<h1 className='font-bold text-primary'>Alamat</h1>
									<p>{item.address}</p>
								</div>
								<div className='mt-5'>
									<h1 className='font-bold text-primary'>Deskripsi</h1>
									<p>{item.description}</p>
								</div>
							</div>
							<div className='mt-10'>

								<a href={`https://www.google.com/maps/search/${item.latitude},${item.longitude}`} target='_blank'>
									<Button
										variant="bordered"
										color='default'
										fullWidth
										startContent={<GMapsIcon />}
									>Buka di Google Maps</Button>
								</a>
							</div>

							{/* Comment section */}
							<div className='mt-10'>
								<div className='flex flex-row justify-between'>
									<h1 className='text-medium font-bold'>Komentar</h1>
									{
										!showKomentar && <PlusIcon className='size-6 hover:cursor-pointer' onClick={() => { setShowKomentar(true); }} />
									}
								</div>

								<div className='mt-5 border-t-1 border-default-200 pt-5 rounded-md'>
									{
										!isLoadingK ?
										
											<div>
												{
													komentar.map((item, index) => (
														<div key={index} className='mb-3 border-default-200 border-b-1 p-5 rounded-md'>
															<div className='flex flex-row justify-between'>
																<div>
																	<h1 className='font-bold'>{item.sender_name}</h1>
																	<p className='mt-2'>{item.message}</p>
																</div>
																<div className='text-right'>
																	<p className='text-default-400'>
																		{new Date(item.created_at).getDate()}/
																		{new Date(item.created_at).getMonth() + 1}/
																		{new Date(item.created_at).getFullYear()}
																	</p>
																	<p className='text-default-400'>
																		{new Date(item.created_at).getHours()}:
																		{new Date(item.created_at).getMinutes()}:
																		{new Date(item.created_at).getSeconds()}
																	</p>
																</div>
															</div>
														</div>
													))
												}
											</div>
											:
											<h1 className='text-center'>
												Belum ada komentar..
											</h1>
									}
								</div>
								{
									showKomentar && (
										<div className='mt-10'>
											<Input
												type='text'
												placeholder='Nama anda'
												radius='sm'
												value={namaKomentar}
												onChange={e => setNamaKomentar(e.target.value)}
											/>
											<Textarea
												fullWidth
												placeholder='Tambahkan komentar anda'
												radius='sm'
												className='mt-2'
												value={pesanKomentar}
												onChange={e => setPesanKomentar(e.target.value)}
											/>
											<Button
												radius='sm'
												color='primary'
												className='mt-4'
												onPress={postKomentar}
												isLoading={isLoadingPostKomentar}
											>
												Komentar
											</Button>
											<Button
												radius='sm'
												color='default'
												className='mt-4 ml-2'
												onPress={() => { setShowKomentar(false) }}
											>
												Batalkan
											</Button>
										</div>
									)
								}
							</div>
						</div>
					</div>
			}

		</div>
	)
}

export default Id