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
//1.38 is the ratio obtained from (min arch - max arch)/(maxValue - min Value)
function converRatetoArch(heartRate){
  console.log("heartRate: " + heartRate)
  let finalRate = (1.38 * (heartRate - 60)) - 180
  console.log("finalRate: " + finalRate)
  var adbFinRate = Math.abs(finalRate)
  console.log(" Abs finalRate: " + adbFinRate)
  var roundedFinRate =  Math.round(adbFinRate)
  console.log(" rounded finalRate: " + roundedFinRate)
  return roundedFinRate
}