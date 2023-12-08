import document from "document";

import { HeartRateSensor } from "heart-rate"; //bpm


const sensors = new Array(0);
const hrm = new HeartRateSensor({ frequency: 1 });

const heartRate = document.getElementById("heartRate")


export function init() {
  initHrm();
}

function initHrm() {
  
  hrm.addEventListener("reading", () => {
    heartRate.text = hrm.heartRate ? hrm.heartRate : "--";
    console.log(`Current heart rate: ${hrm.heartRate}`);
  });
  sensors.push(hrm);

  hrm.start();
}