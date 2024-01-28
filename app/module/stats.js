import document from "document";
import { battery } from "power";

const batlevindicator = document.getElementById("batlevindicator");

export function update() {
  batteryShow();
  
  //levelShow();
}

// function levelShow() {
//   let goalProgress;
  
//   if(primaryGoal === "activeZoneMinutes") {
//     goalProgress = today.adjusted["activeZoneMinutes"].total / goals["activeZoneMinutes"].total;
//   } else {
//     goalProgress = today.adjusted[primaryGoal] / goals[primaryGoal];
//   }
  
//   if(goalProgress > 1)
//     goalProgress = 1;
  
//   lvl.width = goalProgress*154;
// }

function batteryShow() {
  let charge = battery.chargeLevel;
  console.log("battery: " + battery.chargeLevel)
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