import document from "document";
import { geolocation } from "geolocation";

const arc_north = document.getElementById("arc-north");

export function init() {
  console.log("Position");
  var watchID = geolocation.watchPosition(locationSuccess, locationError, { enableHighAccuracy:true ,timeout: 60 * 1000 });
}

function locationSuccess(position) {
    //console.log("---------------------------------------------Position obj: " + position.coords.heading)
    arc_north.groupTransform.rotate.angle  = position.coords.heading
    //arc_north.groupTransform.rotate.angle  = position.coords.speed
}

function locationError(error) {
  console.log("----------------------------------------------------Error: " + error.code,
              "Message: " + error.message);
  arc_north.startAngle = -2
}