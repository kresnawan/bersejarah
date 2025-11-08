import { MapView, StyleURL } from "@maplibre/maplibre-react-native";
import mapStyle from "../map.json"

const MapLibre = () => {
  return <MapView
    style={{
      flex: 1
    }}
    mapStyle={"https://api.maptiler.com/maps/outdoor-v2/style.json?key=qMwjSy8lYbHFysUGYPyX"}
  />;
}

export default MapLibre