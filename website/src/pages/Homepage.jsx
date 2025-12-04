import Map from 'react-map-gl/maplibre';
import { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import useScreenSize from '../hooks/useScreenSize.jsx';
import axiosPrivate from '../axios';
import { useEffect, useState } from 'react';
import { Spinner } from '@heroui/spinner';
import { useMap } from 'react-map-gl/maplibre';
import { Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { useMyContext } from '../contexts/context.jsx';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Image } from '@heroui/react';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';

function fitMapToMarkers(markers) {
  const bounds = new maplibregl.LngLatBounds();
  if (markers.length === 0) {
    bounds.extend([112.66342096888027, -7.887987748384947])
    return bounds
  }

  markers.forEach(item => {
    bounds.extend([item.longitude, item.latitude])
  });
  return bounds
}

function CustomizedMarker({ item, index, setPopup, setShowPopup }) {
  const { current: map } = useMap();
  const { setMarkerFocus, setTicker, ticker, ticker2, latFocus, longFocus } = useMyContext();

  useEffect(() => {
    if (ticker2 > 0) {
      map.flyTo({ center: [longFocus, latFocus], zoom: 14 });
    }
  }, [ticker2, latFocus, longFocus, map]);

  return (
    <Marker
      color='orange'
      onClick={() => {
        console.log("Clicked")
        setPopup({
          lat: item.latitude,
          long: item.longitude,
          tle: item.title,
          desc: item.description,
          img: item.photo,
          id: item.id
        });
        setShowPopup(true);
        setMarkerFocus(index);
        setTicker(ticker + 1)
        map.flyTo({ center: [item.longitude, item.latitude], zoom: 14, offset: [0, 110] });
      }}
      latitude={item.latitude}
      longitude={item.longitude}
      key={index} />
  )
}


function App({ data }) {
  const { width, height } = useScreenSize();
  const [showPopup, setShowPopup] = useState(false);

  const [popUp, setPopup] = useState({
    lat: 0,
    long: 0,
    tle: "",
    desc: "",
    img: "",
    id: 0
  });

  useEffect(() => {
    console.log(popUp);
  }, [popUp]);

  return (
    <Map
      initialViewState={{
        bounds: fitMapToMarkers(data),
        fitBoundsOptions: {
          padding: 60,
          maxZoom: 12
        }
      }}
      style={{
        width: width,
        height: height - 40 - 52
      }}
      mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=qMwjSy8lYbHFysUGYPyX"
    >
      {
        showPopup &&
        <Popup
          latitude={popUp.lat}
          longitude={popUp.long}
          offset={40}
          anchor='bottom'
          className='text-black'
          closeOnClick={false}
          closeButton={false}
          maxWidth={`200px`}
        >
          <XMarkIcon className='size-5 absolute right-1 top-1 hover:cursor-pointer' onClick={() => setShowPopup(false)} />

          <div className='overflow-hidden rounded-sm mt-2 mb-2'>
            <Image src={`http://localhost:3032/api/v1/uploads/${popUp.img}`} radius='none' />
          </div>
          <p className='font-bold text-[18px]'>{popUp.tle}</p>
          <p className='mt-2'>{popUp.desc.slice(0, 120) + ".."}</p>
          <Link to={`/data/${popUp.id}`}>
            <Button fullWidth className='mt-2' radius='sm'>Lihat</Button>
          </Link>
        </Popup>
      }
      {
        data.map((item, index) => (
          <div key={index}>
            <CustomizedMarker item={item} index={index} setPopup={setPopup} setShowPopup={setShowPopup} />

          </div>
        ))
      }
    </Map>
  );
}

function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosPrivate.get("/data").then(res => {
      setData(res.data);
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    })
  }, []);

  return (
    <div className=''>
      <div className='flex justify-center overflow-y-hidden'>
        {
          isLoading ?
            <div className='flex justify-center items-center mt-30'>
              <Spinner size='lg' label='Loading...' />
            </div>
            :
            <div className='overflow-hidden'>
              <App data={data} />
            </div>
        }
      </div>
      {/* <div>
        {
          isLoading ?
            <div className='flex justify-center items-center mt-30'>
              <Spinner size='lg' label='Loading...' />
            </div>
            :
            <div className='flex justify-center mt-5'>
              <ItemCarousel data={data} />
            </div>
        }
      </div> */}
    </div>
  )
}

export default Homepage