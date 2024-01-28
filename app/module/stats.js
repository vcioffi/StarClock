import document from "document";
import { battery } from "power";

const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const b4 = document.getElementById("b4");
const b5 = document.getElementById("b5");

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
  
  if(charge <= 5) { /* Charge under 20 */
    b1.style.fill = "#e63e3e";
    b2.style.fill = "#909090";
    b3.style.fill = "#909090";
    b4.style.fill = "#909090";
    b5.style.fill = "#909090";
    
  }
  else if(charge <= 20) {
    b1.style.fill = "#f6f6f6";
    b2.style.fill = "#909090";
    b3.style.fill = "#909090";
    b4.style.fill = "#909090";
    b5.style.fill = "#909090";
  }
  else if(charge <= 40) {
    b1.style.fill = "#f6f6f6";
    b2.style.fill = "#f6f6f6";
    b3.style.fill = "#909090";
    b4.style.fill = "#909090";
    b5.style.fill = "#909090";

  }
  else if(charge <= 60) {
    b1.style.fill = "#f6f6f6";
    b2.style.fill = "#f6f6f6";
    b3.style.fill = "#f6f6f6";
    b4.style.fill = "#909090";
    b5.style.fill = "#909090";
    
  }
  else if(charge <= 80) {
    b1.style.fill = "#f6f6f6";
    b2.style.fill = "#f6f6f6";
    b3.style.fill = "#f6f6f6";
    b4.style.fill = "#f6f6f6";
    b5.style.fill = "#909090";

  }
  else { /* Charge between 80 and 100 */
  b1.style.fill = "#f6f6f6";
  b2.style.fill = "#f6f6f6";
  b3.style.fill = "#f6f6f6";
  b4.style.fill = "#f6f6f6";
  b5.style.fill = "#f6f6f6";

  }
  
  return;
}