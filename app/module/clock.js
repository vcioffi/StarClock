import clock from "clock";
import { dayNames } from "../data/dateNames";
import { monthNames } from "../data/dateNames";
import * as document from "document";
import {FitFont} from "../fitfont";

clock.granularity = "seconds"; // seconds, minutes, hours

function zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

const clockLabel = new FitFont({ 
    id: document.getElementById("clock"),
    font:'Monofonto_45',
    halign: 'middle',
    valign: 'middle ' })

const dateBox = new FitFont({ 
    id: document.getElementById("dateBox"),
    font:'Monofonto_16',
    halign: 'middle',
    valign: 'middle ' })

const dayBox = new FitFont({ 
    id: document.getElementById("dayBox"),
    font:'Monofonto_16',
    halign: 'middle',
    valign: 'middle ' })

const kmBox = new FitFont({ 
  id: document.getElementById("txtkm"),
  font:'Monofonto_16',
  halign: 'middle',
  valign: 'middle ' })

const mtBox = new FitFont({ 
  id: document.getElementById("txtmt"),
  font:'Monofonto_16',
  halign: 'middle',
  valign: 'middle ' })

let previousDay = 8;

export function init() {
    kmBox.text = "KMH"
    mtBox.text = "M"
    clock.addEventListener("tick", (evt) => {
    let today = evt.date;
    let hours = zeroPad(today.getHours());
    let min = zeroPad(today.getMinutes());
    let sec = zeroPad(today.getSeconds());
    clockLabel.text = `${hours}:${min}:${sec}`;//evt.date.toTimeString().slice(0, -4);

    if(previousDay !== today.getDay()){
        updateDate(evt);
    }

    });
}

function updateDate(evt) {

  let today = evt.date

  let dayNumber = today.getDay();
  let monthNumber = today.getMonth();
  let dayOfWeek = dayNames[dayNumber];
  let dayOfMonth = today.getDate();
  let month = monthNames[monthNumber];
  let year = today.getFullYear();

  dayBox.text = `${dayOfWeek}`;
  dateBox.text = `${month} ${dayOfMonth} ${year}`;

  previousDay = dayNumber;

}