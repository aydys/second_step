import flatpickr from "flatpickr";
import rangePlugin from '../../../node_modules/flatpickr/dist/plugins/rangePlugin';
const Russian = require("../../../node_modules/flatpickr/dist/l10n/ru.js").default.ru;
flatpickr.localize(Russian);

const nativeElement = document.querySelector('#datepicker_wrap');

flatpickr(nativeElement, {  
  wrap: true,  
  plugins: [new rangePlugin({input: "#endDate"})]  
})


