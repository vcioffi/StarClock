import document from "document";
import { display } from "display";
import { battery } from "power";

import { HeartRateSensor } from "heart-rate"; //bpm
import * as stats from "./stats";


const sensors = new Array(0);
const hrm = new HeartRateSensor({ frequency: 1 });

const heartRate = document.getElementById("heartRate")
const acr2 = document.getElementById("arc2");
const acr3 = document.getElementById("arc3");


export function init() {
  initHrm();
}

function initHrm() {
  
  hrm.addEventListener("reading", () => {
    heartRate.text = hrm.heartRate ? hrm.heartRate : "--";
    acr2.sweepAngle = hrm.heartRate ? converRatetoArch2(hrm.heartRate) : 0;
    acr3.sweepAngle = hrm.heartRate >= 113 ? converRatetoArch3(hrm.heartRate) : 0;
  });
  sensors.push(hrm);
  hrm.start()
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

//Heart max 113 min 60 (used 113 for the activity start)
//3.39 is the ratio obtained from (min arch - max arch)/(maxValue - min Value)
function converRatetoArch2(heartRate){
  if(heartRate < 60){
    heartRate = 60
  }
  return converterDeflection(113,60,heartRate)
}

//Red arch
function converRatetoArch3(heartRate){
  return converterDeflection(190,113,heartRate)
}


function converterDeflection(minValue, maxValue,v){
  let rate = 180/(maxValue-minValue)*(v-minValue) - 180
  var adbFinRate = Math.abs(rate)
  let roundedFinRate =  Math.round(adbFinRate)
  console.log("finalRate: " + roundedFinRate)
  return roundedFinRate > 180 ? 180 : roundedFinRate
}