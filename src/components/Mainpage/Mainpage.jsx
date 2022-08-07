import React, { useState } from "react";
import "./mainpage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "./osmprovider";
import { useRef } from "react";
import L from "leaflet";
import RoutingMachine from "./RoutingMachine";

const markerIcon = new L.Icon({
  iconUrl: require("../Mainpage/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const Mainpage = () => {
  const [center, setCenter] = useState({ lat: 28.212851, lng: 76.861649 });
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0)
  const [origin, setOrigin] = useState("");
  const [latLng1, setLatLng1] = useState("");
  const [latLng2, setLatLng2] = useState("");
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();


  return (
    <>
      <div className="main">
        <div className="heading">
          <p className="head-text">Let's calculate distance from Google maps</p>
        </div>
        <div className="content">
          <div className="left-content">
            <div className="top">
              <div className="top-left">
                <label htmlFor="text">Origin</label>
                <img src="./images/marker.png" alt="location"  className="inputimage"/>
                <input
                  type="text"
                  name="origin"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="lat,lng"
                />
                <label htmlFor="text">Destination</label>
                <img src="./images/marker.png" alt="location"  className="inputimage"/>

                <input
                  type="text"
                  name="destination"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="lat,lng"
                />
              </div>
              <div className="top-right">
                <button
                className="calculate-button"
                  onClick={() => {
                    setLatLng1("")
                    setLatLng2("")
                    setLatLng1(origin.split(","));
                    setLatLng2(destination.split(","));
                  }}
                >
                  Calculate
                </button>
              </div>
            </div>
            <div className="bottom">
              <div className="bottom-top">
                <div className="text-bottom">
                  <p className="text-distance">Distance</p>
                  <p className="text-km"> {distance} Kms</p>
                </div>
              </div>
              <div className="bottom-bottom">
                <p className="text-last">
                  The distance between <b>Mumbai</b> and <b>Delhi</b> is{" "}
                  <b>{distance} kms.</b>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="container">
              <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />
                <Marker position={center} icon={markerIcon}>
                  <Popup>
                    <b>My Location</b>
                  </Popup>
                </Marker>
                {latLng1 && latLng2 && (
                  <RoutingMachine setDistance={setDistance} latLng1={latLng1} latLng2={latLng2} />
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
