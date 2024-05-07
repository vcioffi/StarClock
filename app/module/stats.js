import document from "document";
import { battery } from "power";
import { goals } from "user-activity";
import { today } from "user-activity"; //steps, elevation, goals, ...

const batlevindicator = document.getElementById("batlevindicator");
const acr2 = document.getElementById("arc2");
const test = document.getElementById("test");

export function update() {
  batteryShow();
//   levelShow();
}

function levelShow() {
  //let goalprogress = today.adjusted["steps"].total / goals["steps"].total;
  console.log("Goals: " + JSON.stringify(goals));
  test.text =  today.adjusted.steps;
  //acr2.sweepAngle = Math.round(pcnt*2.7);
}

function batteryShow() {
  let charge = battery.chargeLevel;
  let mod = (charge % 20)*0.8;
  let rmd = 14 - mod;
  
  if(mod == 0 && charge != 0) {
    mod = 14;
    rmd = 0;
  }
  
  batlevindicator.width = Math.round(charge*0.35)

  batlevindicator.style.fill = "white"
  if(charge <= 15) { /* Charge under 20 */
    batlevindicator.style.fill = "#e63e3e"
  }
  
  return;
}