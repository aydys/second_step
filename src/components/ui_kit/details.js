import flatpickr from "flatpickr";
import rangePlugin from '../../../node_modules/flatpickr/dist/plugins/rangePlugin';

// Локализация Flatpickr и инициализация его самого

const Russian = require("../../../node_modules/flatpickr/dist/l10n/ru.js").default.ru;
flatpickr.localize(Russian);

const nativeElement = document.querySelector('#datepicker_wrap');

let data = sessionStorage.getItem('arrDate');
let arrSplit = data.split(' — ');

let date1 = arrSplit[0];
let date2 = arrSplit[1];

let calendar = flatpickr(nativeElement, {  
  wrap: true,
  defaultDate: [`${date1}`, `${date2}`],
  dateFormat: "d m",  
  altInput: true,
  altFormat: "d.m.Y",
  prevArrow: "<img src='img/arrow_back.svg'>",
  nextArrow: "<img src='img/arrow_forward.svg'>",  
  position: 'below',
  closeOnSelect: false,
  plugins: [new rangePlugin({input: "#endDate"})]  
});

// Добавление кнопок "Очистить" и "Применить" 

const container = document.createElement('div');
container.className = "container-date-buttons"

const btnClear = document.createElement('div');
btnClear.className = "clearCalendar";
btnClear.innerHTML = "Очистить";

const btnUse = document.createElement('div');
btnUse.className = "use-select";
btnUse.innerHTML = "Применить";

container.appendChild(btnClear);
container.appendChild(btnUse);

btnClear.addEventListener('click', function() {
  calendar.clear()
})

btnUse.addEventListener('click', function() {
  calendar.close()
})

const elementCalendar = document.querySelector('.flatpickr-calendar');
elementCalendar.appendChild(container);
