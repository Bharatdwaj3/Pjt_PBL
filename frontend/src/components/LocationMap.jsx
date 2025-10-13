import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Card } from "react-bootstrap";

  delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMap = () => {


  const mapRef = useRef(null);
  const [pgData, setPgData]=useState([]);
  const [selectPg, setSelectPg]=useState(null);
  
  useEffect(()=>{
    axios.get(`http://localhost:4001/pg`)
    .then(res=>setPgData(res.data))
    .catch(err=>console.log(err));
  },[]);
  
  //const latitude = 30.2689;
  //const longitude = 77.9931;



  

  return (
    <>
      <div style={{ 
          position: "relative",
          width: "100%",
          height: "100vh",

        }}>
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[30.2689, 77.9931]}
          zoom={13}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

            {pgData.map(pg=>(
              <Marker
                key={pg._id}
                position={[pg.latitude || 30.2689, pg.longitude || 77.9931]}
                eventHandlers={{
                  click:()=>setSelectPg(pg ||null)
                }}
          />
            ))}
        </MapContainer>
            <div
              style={{
                position:"absolute",
                bottom:"20px",
                left:"50%",
                zIndex:9999,
                width:"300px",
              }}
            >
              <Card>
                  
                  <Card.Body>
                    <Card.Title>City:  {selectPg?.city || "Unknown City"} </Card.Title>
                      <Card.Text>
                        <strong>Area: {selectPg?.area || "Unknown Area"}</strong><br />
                        <strong>BedRooms: {selectPg?.rooms?.bedrooms ?? "N/A" }bedroom {selectPg?.rooms?.washrooms ?? "N/A"} bathroom</strong>
                        <strong>BathRooms: {selectPg?.rooms?.washrooms ?? "N/A"} bathroom</strong>
                      </Card.Text>
                      <p style={{margin:0, fontSize:"0.85rem",color:"#666"}}></p>
                        Landmark: {selectPg?.landmark || "Unknown landmark"}
                  </Card.Body>
                  </Card>
            </div>
      </div>
    </>
  );
};

export default LocationMap;
