import { MapView, Camera, PointAnnotation } from "@maplibre/maplibre-react-native";
import { Text, View, Image } from "react-native";
import mapStyle from "../map.json"
import { useRef } from "react";
import { Pressable } from "react-native";



const MapLibre = ({ markers, zoomTo }) => {

  const cameraRef = useRef();

  return <MapView
    style={{
      flex: 1
    }}
    mapStyle={"https://api.maptiler.com/maps/outdoor-v2/style.json?key=qMwjSy8lYbHFysUGYPyX"}
  >
    {
      markers.map((item, index) =>(
        <PointAnnotation coordinate={[item.longitude, item.latitude]} key={index} />
      ))
    }
    <Camera centerCoordinate={[markers[0].longitude, markers[0].latitude]} zoomLevel={13} ref={cameraRef} />
  </MapView>
}

export default MapLibre