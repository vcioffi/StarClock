import document from "document";

import { HeartRateSensor } from "heart-rate"; //bpm


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