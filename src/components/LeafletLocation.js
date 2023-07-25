import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const center = [28.2098, 83.9857];
const zoom = 13;

function LeafletLocation({ coordinates }) {
  const customIcon = new Icon({
    iconUrl: require('../images/marker-icon.png'),
    iconSize: [38, 38] // size of the icon
  });


  const displayMap = useMemo(
    () => {
    // Check if coordinates prop is defined and has valid format before rendering the map
    if (!coordinates || coordinates.length !== 2) {
      return null; // If coordinates are not provided or invalid, return null
    }

    console.log(coordinates);

    // Create a new variable for the map center in the correct format
    const mapCenter = [coordinates[0], coordinates[1]];

    return (
      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapCenter} icon={customIcon}>
          <Popup>II am here</Popup>
        </Marker>
      </MapContainer>
    );
  }, [coordinates, customIcon]);

  return displayMap;
}

export default LeafletLocation;
