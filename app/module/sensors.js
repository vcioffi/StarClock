import document from "document";
import { display } from "display";
import { battery } from "power";

import { HeartRateSensor } from "heart-rate"; //bpm
import * as stats from "./stats";


const sensors = new Array(0);
const hrm = new HeartRateSensor({ frequency: 1 });

const heartRate = document.getElementById("heartRate")
let iconHRM = document.getElementById("iconHRM")
const acr2 = document.getElementById("arc2");


export function init() {
  initHrm();
}

function initHrm() {
  
  hrm.addEventListener("reading", () => {
    heartRate.text = hrm.heartRate ? hrm.heartRate : "--";
    acr2.sweepAngle = hrm.heartRate ? converRatetoArch(hrm.heartRate) : "0";
  });
  sensors.push(hrm);
}

export function wake() {
  stats.update();
  hrm.start()
}

export function sleep() {
  hrm.stop()
}

/*--- Battery ---*/
battery.addEventListener("change", () => {
  stats.update();
});

/*--- Display ---*/
display.addEventListener("change", () => {
  if(display.on) {
    wake();
  } else {
    sleep();
  }
});

//Heart max 190 min 60 
//3.39 is the ratio obtained from (min arch - max arch)/(maxValue - min Value)
function converRatetoArch(heartRate){
  if(heartRate < 60){
    heartRate = 60
  }
  var roundedFinRate = 0
  let finalRate = (3.39 * (heartRate - 60)) - 180

  if(finalRate > 0){
    acr2.style.fill = "fb-red"
    roundedFinRate =  Math.round(finalRate)

  }else{
    acr2.style.fill = "#909090" 
    var adbFinRate = Math.abs(finalRate)
    roundedFinRate =  Math.round(adbFinRate)
  }
  return roundedFinRate > 180 ? 180 : roundedFinRate
}