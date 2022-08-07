import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {

  let { latLng1, latLng2,  setDistance } = props;
  if (!latLng1) latLng1 = [28.679079, 77.06971];
  if (!latLng2) latLng2 = [19.101803, 72.890353];
  const instance = new L.Routing.control({
    waypoints: [
      L.latLng(Number(latLng1[0]), Number(latLng1[1])),
      L.latLng(latLng2[0], latLng2[1]),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
  });
  
   instance.on("routesfound", function(e) {
    var waypoints = e.waypoints || [];
    var destination = waypoints[waypoints.length - 1]; // there you have the destination point between your hands
     setDistance(e.routes[0].summary.totalDistance);
    var time = e.routes[0].summary.totalTime;
  });
  return instance
};

const RoutingMachine =() => createControlComponent(createRoutineMachineLayer);

export default RoutingMachine();
