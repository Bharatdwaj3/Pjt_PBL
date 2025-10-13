import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Card, Badge, ListGroup, Button } from "react-bootstrap";
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
  
  return (
    <>
     {pgData.length > 0  &&(
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
                  mouseover:()=>setSelectPg(pg),
                  mouseout:()=>setSelectPg(null),
                }}
          />
            ))}
        </MapContainer>
            {selectPg &&(
              <div
              style={{
                position:"absolute",
                bottom:"20px",
                left:"50%",
                zIndex:9999,
                width:"300px",
              }}
            >
              <Card
                className="shadow-lg border-0"
                style={{
                  borderRadius: "15px",
                  overflow:"hidden",
                  animation:"slideUp 0.3s ease-out"
                }}
              >
                <Card.Header 
                  className="bg-primary text-white d-flex justify-content-between align-items-center"
                  style={{ padding: "15px 20px" }}
                >
                  <div>
                    <h5 className="mb-0" style={{fontWeight:"600"}}>
                      {selectPg?.city || "Unknown City"}
                    </h5>
                    <small style={{opacity:0.9}}>
                      {selectPg?.area || "Unknown Area"}
                    </small>
                  </div>
                  <Badge
                    bg={selectPg?.avaliable?"success":"danger"}
                    style={{fontSize:"0.85rem",padding:"8px 12px"}}
                  >
                    {selectPg?.avaliable?"avaialble":"Occupied"}
                  </Badge>
                </Card.Header>
                  <Card.Body >
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>
                          <strong>Bedrooms</strong>
                        </span>
                        <Badge bg="secondary">
                          {selectPg?.rooms?.bedrooms?.["$numberInt"] || selectPg?.rooms?.bedrooms ||  0}
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>
                          <strong>Bathrooms</strong>
                        </span>
                        <Badge bg="secondary">
                          {selectPg?.rooms?.washroom?.["$numberInt"] || selectPg?.rooms?.washroom ||  0}
                        </Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>
                          <strong>Type</strong>
                        </span>
                        <Badge bg="info">
                          {selectPg?.type || "N/A"}
                        </Badge>
                      </ListGroup.Item>
                      {selectPg?.landmark && (
                        <ListGroup.Item>
                          <small className="text-muted">
                          <strong>Landmark: </strong>{selectPg?.landmark}
                        </small>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer
                    className="bg-light text-center"
                      style={{padding:"12px"}}
                  >
                      <Button
                        variant="primary"
                        size="sm"
                        style={{
                          borderRadius:"20px",
                          padding:"8px 25px",
                          fontWeight:"500"
                        }}
                      >
                        View Details
                      </Button>
                  </Card.Footer>
                  </Card>
            </div>
            )}
      </div>
     )}
    </>
  );
};

export default LocationMap;
