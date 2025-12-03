import { useEffect, } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ItemCard from './ItemCard.jsx'
import { useMyContext } from '../contexts/context.jsx'

function ItemCarousel({ data }) {
  const {markerFocus, ticker} = useMyContext();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, containScroll: false })

  // const logEmblaEvent = useCallback((emblaApi, eventName) =>{
  //   console.log(`Embla just triggered ${eventName}`)
  // }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(markerFocus);
    }
  }, [ticker, emblaApi, markerFocus])

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container w-screen max-w-3xl">
        {
          data.map((item, index) => (
            <div className="embla__slide" key={index}>
              <ItemCard data={item} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ItemCarousel;
