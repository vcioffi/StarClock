import clock from "clock";
import * as document from "document";

clock.granularity = "seconds"; // seconds, minutes, hours

const clockLabel = document.getElementById("clock-label");
const dateBox = document.getElementById("dateBox");

let previousDay = 8;

export function init() {

    clock.addEventListener("tick", (evt) => {
    let today = evt.date;
    clockLabel.text = evt.date.toTimeString().slice(0, -4);

    if(previousDay !== today.getDay()){
        updateDate(evt);
    }

    });
}

function updateDate(evt) {

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  let today = evt.date

  let dayNumber = today.getDay();
  let dayOfWeek = dayNames[dayNumber];
  let dayOfMonth = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  dateBox.text = `${dayOfWeek} ${year}-${month}-${dayOfMonth}`;

  previousDay = dayNumber;

}