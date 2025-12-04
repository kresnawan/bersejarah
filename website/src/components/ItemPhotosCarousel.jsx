import { useEffect } from 'react'
import { Image } from '@heroui/react'
import useEmblaCarousel from 'embla-carousel-react'

function ItemPhotosCarousel({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  return (
    <div className="emblaz" ref={emblaRef} style={{borderRadius: 10}}>
      <div className="embla__containerz" >
        {
          data.map((item, index) => (
            <div className="embla__slidez" key={index}>
                <Image src={`http://localhost:3032/api/v1/uploads/${item}`} radius='none' className='min-w-full w-5xl min-h-full' />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ItemPhotosCarousel;
