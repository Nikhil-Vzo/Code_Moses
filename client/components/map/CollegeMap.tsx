import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


type College = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

interface CollegeMapProps {
  colleges: College[];
}

export default function CollegeMap({ colleges }: CollegeMapProps) {
  // Filter out colleges that don't have location data
  const collegesWithLocation = colleges.filter(c => c.lat && c.lng);

  if (collegesWithLocation.length === 0) {
    return <p>No colleges with location data to display on the map.</p>;
  }

  // Calculate the center of the map
  const centerLat = collegesWithLocation.reduce((acc, c) => acc + c.lat, 0) / collegesWithLocation.length;
  const centerLng = collegesWithLocation.reduce((acc, c) => acc + c.lng, 0) / collegesWithLocation.length;

  return (
    <MapContainer center={[centerLat, centerLng]} zoom={10} style={{ height: "400px", width: "100%", borderRadius: "1rem" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {collegesWithLocation.map((college) => (
        <Marker key={college.id} position={[college.lat, college.lng]}>
          <Popup>
            <strong>{college.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}