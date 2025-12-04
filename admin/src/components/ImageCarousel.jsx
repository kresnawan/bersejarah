import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'
import { Image } from '@heroui/react'

function ImageCarousel({ images }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi.slideNodes()) // Access API
		}
	}, [emblaApi])

	return (
		<div className="embla rounded-lg" ref={emblaRef}>
			<div className="embla__container">
				{
					images.map((item, index) => (
						<div className="embla__slide">
							<Image src={`http://localhost:3032/api/v1/uploads/${item}`} key={index} className='max-w-full min-w-0 w-5xl' radius='none' />
						</div>
					))
				}
			</div>
		</div>
	)
}

export default ImageCarousel;
