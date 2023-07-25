import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const center = [28.2098, 83.9857];
const zoom = 13;

// New component to wrap useMapEvents hook
function MapEventWrapper({ onMapClick }) {

    useMapEvents({
      click: (e) => {
        onMapClick(e.latlng);
      },
    });
  
    return null; // This component doesn't render anything
  }

// function DisplayPosition({ position, onClick, markerPosition }) {
//   return (
//     <div>
//       <p>
//         latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
//         <button onClick={onClick}>reset</button>
//       </p>
//       {markerPosition && (
//         <Marker position={markerPosition}>
//           <Popup>
//             Marker Position: {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
//           </Popup>
//         </Marker>
//       )}
//     </div>
//   );
// }

function Leaflet({ onCoordinatesChange }) {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(center);


  const customIcon = new Icon({
    iconUrl: require('../images/marker-icon.png'),
    iconSize: [38, 38] // size of the icon
  });

  const markers = [
    {
      geocode: [28.2098, 83.9857],
      popUp: "Hello I am first popup"
    },
    {
      geocode: [28.2090, 83.9840],
      popUp: "Hello I am second popup"
    }
  ];

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="leaflet-container"
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >

        {/* New component to handle map click events */}
        <MapEventWrapper onMapClick={(latlng) => setMarkerPosition(latlng)} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))} */}
      {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>
              Marker Position: {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    ),
    [customIcon]
  );

  // const onClick = useCallback(() => {
  //   console.log("onclick ");

  //   map.setView(center, zoom);
  //   setMarkerPosition(null);

  // }, [map]);

  useEffect(() => {
    if (markerPosition) {
      const coordinates = { latitude: markerPosition?.lat, longitude: markerPosition?.lng };
      onCoordinatesChange(coordinates); // Pass the coordinates to the callback function
      console.log({coordinatesssss:coordinates});

    }
  }, [markerPosition]);

  return (
    <div>
      {/* {map ? (
        <DisplayPosition
          position={currentPosition}
          markerPosition={markerPosition}
        />
      ) : null} */}
      {displayMap}
    </div>
  );
}

export default Leaflet;
