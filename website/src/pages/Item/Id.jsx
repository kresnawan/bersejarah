import { useParams } from 'react-router-dom'
import axiosPrivate from '../../axios.js';
import { useState, useEffect } from 'react';
import ItemPhotosCarousel from '../../components/ItemPhotosCarousel.jsx';
import { Spinner } from '@heroui/spinner';
import { Button, ButtonGroup } from "@heroui/button";
import { Image, Input, Textarea } from '@heroui/react';

function GMapsIcon() {
	return <Image height={28} src='https://www.gstatic.com/marketing-cms/assets/images/0f/9a/58f1d92b46069b4a8bdc556b612c/google-maps.webp=s48-fcrop64=1,00000000ffffffff-rw' />
}

function Id() {
	const { id } = useParams();
	const [item, setItem] = useState({});
	const [photos, setPhotos] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axiosPrivate.get(`/data/${id}`).then(res => {

			setItem(res.data);
			axiosPrivate.get(`/data/${id}/foto`).then(res => {
				setPhotos(res.data);
				setIsLoading(false)
			}).catch(err => {
				console.log(err);
			})

		}).catch(err => {
			console.log(err);
			setIsLoading(false)
		})
	}, []);


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
								<h1>Komentar</h1>
								<div className='mt-2'>
									<Input type='text' placeholder='Nama anda' radius='sm' />
									<Textarea fullWidth placeholder='Tambahkan komentar anda' radius='sm' className='mt-2' />
									<Button radius='sm' color='primary' className='mt-2'>Komentar</Button>
								</div>
								<div className='mt-5 border-1 border-default-200 p-10 rounded-md'>
									<h1 className='text-center'>Belum ada komentar..</h1>
								</div>
							</div>
						</div>
					</div>
			}

		</div>
	)
}

export default Id