import document from "document";
import { display } from "display";
import { battery } from "power";

import { HeartRateSensor } from "heart-rate"; //bpm
import * as stats from "./stats";


const sensors = new Array(0);
const hrm = new HeartRateSensor({ frequency: 1 });

const heartRate = document.getElementById("heartRate")
let iconHRM = document.getElementById("iconHRM")


export function init() {
  initHrm();
}

function initHrm() {
  
  hrm.addEventListener("reading", () => {
    heartRate.text = hrm.heartRate ? hrm.heartRate : "--";
    // if (data.zone === "out-of-range") {
    //   imgHRM.href = "resources\\icon\\heart_open.png"
    // } else {
    //   imgHRM.href = "iresources\icon\\heart_open.png"
    // }
  });
  sensors.push(hrm);

  hrm.start();
}

export function wake() {
  on();
  stats.update();
}

export function sleep() {
  off();
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