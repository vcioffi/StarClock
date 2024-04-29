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
  });
  sensors.push(hrm);

  hrm.start();
}

export function wake() {
 // on();
  stats.update();
}

export function sleep() {
 // off();
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