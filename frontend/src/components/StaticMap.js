import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícono azul
const blueIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'custom-blue-icon'
});

const StaticMap = () => {
  // Coordenadas exactas Cl. 67 #7 - 35, Bogotá
  const position = [4.653424, -74.059197];

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer 
        center={position} 
        zoom={19} 
        style={{ height: '100%', width: '100%' }} 
        scrollWheelZoom={true}  // ✅ activar zoom con la rueda
        dragging={true}        // ✅ permitir mover el mapa
        doubleClickZoom={true} // ✅ zoom con doble clic
        zoomControl={true}     // ✅ controles de zoom visibles
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={blueIcon}>
          <Popup>
            Meridian Consulting Ltda <br /> Cl. 67 #7 - 35, Bogotá
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StaticMap;
