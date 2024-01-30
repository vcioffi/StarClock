import document from "document";
import { geolocation } from "geolocation";

const arc_north = document.getElementById("arc-north");
const txtSpeed = document.getElementById("txtSpeed");
const txtAlt = document.getElementById("txtAlt");

let myButton = document.getElementById("clickbg");

var clockGrid = document.getElementById('clockGrid');

var isActive = false ;

var posId;

export function init() {
  console.log("Position");
  initTrigger()
}

function locationSuccess(position) {
    //console.log("---------------------------------------------Position obj: " + position.coords.heading)
    arc_north.groupTransform.rotate.angle  = position.coords.heading;
    txtSpeed.text = position.coords.speed * 3.6
    txtAlt.text = position.coords.altitudeAccuracy
}

function locationError(error) {
  console.log("----------------------------------------------------Error: " + error.code,
              "Message: " + error.message);
  arc_north.startAngle = -2
}

function initTrigger() {
  myButton.addEventListener("click", (evt) => {
    if(!isActive){
      act();
    } else {
      deact(posId);
    }
  })
}

//Activation 
function act(){
  posId = geolocation.watchPosition(locationSuccess, locationError, { enableHighAccuracy:true ,timeout: 60 * 1000 });
  isActive = true;
  clockGrid.style.fill = "fb-red"
  asyncDeact(posId)
}

//Deactivation 
function deact(posId){
  console.log("posId: " + posId);
  if(posId){
    geolocation.clearWatch(posId);
    clockGrid.style.fill = "white"
  }
  isActive = false;
}

//Async Deactivation 
function asyncDeact(posId){
  console.log("asyncDeact");
  setTimeout(() => {
    //One minutes auto deact
    deact(posId);
  }, 120000)
}