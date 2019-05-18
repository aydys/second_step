// При пустом sessionStorage [arrDate] возникает предупреждение

import flatpickr from "flatpickr";
import noUiSlider from "nouislider";
import wNumb from "wnumb";

// Локализация Flatpickr и инициализация его самого

const Russian = require("../../../node_modules/flatpickr/dist/l10n/ru.js").default.ru;
flatpickr.localize(Russian);

let date1 = null;
let date2 = null;

let data = sessionStorage.getItem('arrDate');

if(data != null) {
    let arrSplit = data.split(' — ');

    date1 = arrSplit[0];
    date2 = arrSplit[1];
}


let calendar = flatpickr( ".search__input-date", {
    mode: "range",    
    defaultDate: [`${date1}`, `${date2}`],
  dateFormat: "d m",  
  altInput: true,
  altFormat: "d M",
  prevArrow: "<img src='img/arrow_back.svg'>",
  nextArrow: "<img src='img/arrow_forward.svg'>",  
  position: 'below',
  closeOnSelect: false,   
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

// Передача данных через веб-хранилище

const button2 = document.querySelectorAll('.search__number');

[].forEach.call(button2, (e)=>{
    e.addEventListener('click', function(){
        const inputStart = document.querySelector('.search__input-date').value;
        sessionStorage.setItem('arrDate', `${inputStart}`);
    })
});

// Фильтр Гость

const inputGuest = document.querySelector('.search__input-guest');
inputGuest.setAttribute('readonly', 'readonly');
const guestArea = document.querySelector('.search__form-guest');


const dropdown = document.createElement('div');
dropdown.className = "dropdown";
guestArea.appendChild(dropdown);
// Блок взрослые
const blockAdults = document.createElement('div');
blockAdults.className = 'blockAdults';
const textAdults = document.createElement('div');
textAdults.className = 'textAdults';
textAdults.innerHTML = "Взрослые";
const counterContainer1 = document.createElement('div');
counterContainer1.className = 'counterContainer';
const btnMinus1 = document.createElement('button');
btnMinus1.setAttribute('type', 'button');
btnMinus1.className = 'btnMinus';
btnMinus1.innerHTML = '-';
const counterNumber1 = document.createElement('div');
counterNumber1.className = 'counterNumber';
counterNumber1.innerHTML = '0';    // заглушка
const btnPlus1 = document.createElement('button');
btnPlus1.setAttribute('type', 'button');
btnPlus1.className = 'btnPlus';
btnPlus1.innerHTML = '+';
counterContainer1.appendChild(btnMinus1);
counterContainer1.appendChild(counterNumber1);
counterContainer1.appendChild(btnPlus1);
blockAdults.appendChild(textAdults);
blockAdults.appendChild(counterContainer1);    

// Блок дети
const blockChildren = document.createElement('div');
blockChildren.className = 'blockChildren';
const textChildren = document.createElement('div');
textChildren.className = 'textChildren';
textChildren.innerHTML = "Дети";
const counterContainer2 = document.createElement('div');
counterContainer2.className = 'counterContainer';
const btnMinus2 = document.createElement('button');
btnMinus2.setAttribute('type', 'button');
btnMinus2.className = 'btnMinus';
btnMinus2.innerHTML = '-';
const counterNumber2 = document.createElement('div');
counterNumber2.className = 'counterNumber';
counterNumber2.innerHTML = '0';    // заглушка
const btnPlus2 = document.createElement('button');
btnPlus2.setAttribute('type', 'button');
btnPlus2.className = 'btnPlus';
btnPlus2.innerHTML = '+';
counterContainer2.appendChild(btnMinus2);
counterContainer2.appendChild(counterNumber2);
counterContainer2.appendChild(btnPlus2)
blockChildren.appendChild(textChildren);
blockChildren.appendChild(counterContainer2);
// Блок младенец
const blockBaby = document.createElement('div');
blockBaby.className = 'blockBaby';
const textBaby = document.createElement('div');
textBaby.className = 'textBaby';
textBaby.innerHTML = "Младенцы";
const counterContainer3 = document.createElement('div');
counterContainer3.className = 'counterContainer';
const btnMinus3 = document.createElement('button');
btnMinus3.setAttribute('type', 'button');
btnMinus3.className = 'btnMinus';
btnMinus3.innerHTML = '-';
const counterNumber3 = document.createElement('div');
counterNumber3.className = 'counterNumber';
counterNumber3.innerHTML = '0';    // заглушка
const btnPlus3 = document.createElement('button');
btnPlus3.setAttribute('type', 'button');
btnPlus3.className = 'btnPlus';
btnPlus3.innerHTML = '+';
counterContainer3.appendChild(btnMinus3);
counterContainer3.appendChild(counterNumber3);
counterContainer3.appendChild(btnPlus3)
blockBaby.appendChild(textBaby);
blockBaby.appendChild(counterContainer3);
// Счетчик Взрослые и дети
let count1 = 0;
let count2 = 0;
let count3 = 0;
const stringData = sessionStorage.getItem('arrGuest');
if (!(stringData == null)) {
  const splitArrGuest = stringData.split(',');  

  count1 = parseInt(splitArrGuest[0]);
  count2 = parseInt(splitArrGuest[1]);
  count3 = parseInt(splitArrGuest[2]);

  const val1 = splitArrGuest[3];
  const val2 = splitArrGuest[4];

  if (splitArrGuest[4]) {
  inputGuest.value = `${val1}, ${val2}`;
  } else {
      inputGuest.value = `${val1}`;
  }

  counterNumber1.innerHTML = `${count1}`;
  counterNumber2.innerHTML = `${count2}`;
  counterNumber3.innerHTML = `${count3}`;
}
btnMinus1.addEventListener('click', function(){
    if(count1 > 0) {
        count1--;
        counterNumber1.innerHTML = `${count1}`;
        inputGuest.value = `${count1 + count2} гостя, ${count3} младенец`;;
        
        if (count3 == 0) {
            inputGuest.value = `${count1 + count2} гостя`;
        }
        if(count3 > 1) {
            inputGuest.value = `${count1 + count2} гостя, ${count3} младенца`;
        }
        if(count1 == 0 && count2 == 0 && count3 !== 0) {
            inputGuest.value = `${count3} младенец`;                   
        }
        
        if (count1 == 0 && count2 == 0 && count3 == 0) {
            inputGuest.value = "";
        }         
    }
})
btnPlus1.addEventListener('click', function(){
    count1++;
    counterNumber1.innerHTML = `${count1}`;
    inputGuest.value = `${count1 + count2} гостя, ${count3} младенец`;;
    if (count3 == 0) {
        inputGuest.value = `${count1 + count2} гостя`;
    }
    if(count3 > 1) {
        inputGuest.value = `${count1 + count2} гостя, ${count3} младенца`;
    }       
})
btnMinus2.addEventListener('click', function(){
    if(count2 > 0) {
        count2--;
        counterNumber2.innerHTML = `${count2}`;
        inputGuest.value = `${count1 + count2} гостя, ${count3} младенец`;
        
        if (count3 == 0) {
            inputGuest.value = `${count1 + count2} гостя`;
        }
        if(count3 > 1) {
            inputGuest.value = `${count1 + count2} гостя, ${count3} младенца`;
        }
        if(count1 == 0 && count2 == 0 && count3 !== 0) {
            inputGuest.value = `${count3} младенец`;                   
        }
        
        if (count1 == 0 && count2 == 0 && count3 == 0) {
            inputGuest.value = "";
        }            
    }
})   
btnPlus2.addEventListener('click', function(){
    count2++;
    counterNumber2.innerHTML = `${count2}`;
    inputGuest.value = `${count1 + count2} гостя, ${count3} младенец`;
    if (count3 == 0) {
        inputGuest.value = `${count1 + count2} гостя`;
    }
    if(count3 > 1) {
        inputGuest.value = `${count1 + count2} гостя, ${count3} младенца`;
    }
})
// Счетчик младенцы
btnMinus3.addEventListener('click', function(){
    if(count3 > 0) {
        count3--;
        counterNumber3.innerHTML = `${count3}`;
        inputGuest.value = `${count1 + count2} гостя, ${count3} младенец`;
        if (count3 == 0) {
            inputGuest.value = `${count1 + count2} гостя`;
        }
        if (count1 == 0 && count2 == 0 && count3 == 0) {
            inputGuest.value = "";
        }
        if(count1 == 0 && count2 == 0 && count3 !== 0) {
            inputGuest.value = `${count3} младенец`;                   
        }
        if(count1 == 0 && count2 == 0 && count3 > 1) {
            inputGuest.value = `${count3} младенца`;
        }
        if(count1 !== 0 && count2 !== 0 && count3 > 1) {
            inputGuest.value = `${count3} младенца`;
        }
        if(count1 !== 0 && count2 !== 0 && count3 > 1) {
            inputGuest.value = `${count1 + count2} гостя, ${count3} младенца`;
        }             
    }
})   
btnPlus3.addEventListener('click', function(){
    count3++;
    counterNumber3.innerHTML = `${count3}`;
    inputGuest.value = `${count1 + count2} гостя, ${count3} младенец`;
    if(count1 == 0 && count2 == 0) {
        inputGuest.value = `${count3} младенец`;
    }
    if(count1 == 0 && count2 == 0 && count3 > 1) {
        inputGuest.value = `${count3} младенца`;
    }
    if(count1 !== 0 && count2 !== 0 && count3 > 1) {
        inputGuest.value = `${count1 + count2} гостя, ${count3} младенца`;
    }
})   

// Кнопки очистить и применить
const container2 = document.createElement('div');
container2.className = "container-date-buttons";
const btnClear2 = document.createElement('div');
btnClear2.className = "clearCalendar";
btnClear2.innerHTML = "Очистить";
const btnUse2 = document.createElement('div');
btnUse2.className = "use-select";
btnUse2.innerHTML = "Применить";
container2.appendChild(btnClear2);
container2.appendChild(btnUse2);
// функционал кнопки "Очистить"
btnClear2.addEventListener('click', function(){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    counterNumber1.innerHTML = `${count1}`;
    counterNumber2.innerHTML = `${count1}`;
    counterNumber3.innerHTML = `${count1}`;
    inputGuest.value = ``;
});
// функционал кнопки "Применить"
btnUse2.addEventListener('click', function() {
    dropdown.style.display = 'none';
    const valueInput = inputGuest.value;
  const dataGuest = [count1,count2,count3,valueInput];    
  sessionStorage.setItem('arrGuest', dataGuest);
})
//добавление в dropdown
dropdown.appendChild(blockAdults);
dropdown.appendChild(blockChildren);
dropdown.appendChild(blockBaby);
dropdown.appendChild(container2);
  
inputGuest.addEventListener('click', function(){
    const checkInput = dropdown.style.display = 'none';
    if (checkInput) {
        dropdown.style.display = 'block';
    } 
})

const arrowInput = document.querySelector('.search__form-guest .search__input-img');

arrowInput.addEventListener('click', function(e){    
    const checkInput = dropdown.style.display = 'none';
    if (checkInput) {
        dropdown.style.display = 'block';
    }
})

// Preferences dropdown

const prefInput = document.getElementById('prefInput');
const prefDrop = document.querySelector('.search__container-dropdown');
prefDrop.setAttribute('style', 'display:none');

prefInput.addEventListener('click', function(){
    const checkDrop = prefDrop.getAttribute('style');
    if (checkDrop == 'display:none') {
        prefDrop.setAttribute('style','display:block');
    } else {
        prefDrop.setAttribute('style','display:none');
    }
})

const arrowInpPref = document.querySelector('#arrowPref');

arrowInpPref.addEventListener('click', function(){
    const checkDrop = prefDrop.getAttribute('style');
    if (checkDrop == 'display:none') {
        prefDrop.setAttribute('style','display:block');
    } else {
        prefDrop.setAttribute('style','display:none');
    }
})

let countPref1 = 2;
let text1;

let countPref2 = 2;
let text2;

let countPref3 = 0;
let text3;

if(countPref1==1){
    text1 = "спальня";            
} else {
text1 = "спальни";
}

if(countPref2==1){
    text2 = "кровать";            
} else {
text2 = "кровати";
}

if(countPref3==1){
    text3 = "ванная";            
} else if (countPref3==0) {
    text3 = "..."
}
else {
    text3 = "ванные";
}  

const minus1 = document.getElementById('minus1');
const plus1 = document.getElementById('plus1');
const textNumber1 = document.getElementById('text-number1');

minus1.addEventListener('click', function(){
    if(countPref1>1) {
        countPref1--;

        if(countPref1==1){
                text1 = "спальня";            
        } else {
            text1 = "спальни";
        }  

        textNumber1.innerHTML = `${countPref1}`;
        
        prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}, ${countPref3} ${text3}`;
        if(countPref3 == 0) {
            prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}${text3}`;
        }   
    }      
})

plus1.addEventListener('click', function(){    
    ++countPref1;
    if(countPref1==1){
        text1 = "спальня";    
    } else {
        text1 = "спальни";
    }

    textNumber1.innerHTML = `${countPref1}`;
    prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}, ${countPref3} ${text3}`;
    if(countPref3 == 0) {
        prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}${text3}`;
    }    
})

const minus2 = document.getElementById('minus2');
const plus2 = document.getElementById('plus2');
const textNumber2 = document.getElementById('text-number2');

minus2.addEventListener('click', function(){
    if(countPref2>1) {
        countPref2--;

        if(countPref2==1){
                text2 = "кровать";            
        } else {
            text2 = "кровати";
        }  

        textNumber2.innerHTML = `${countPref2}`;
        
        prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}, ${countPref3} ${text3}`;
        if(countPref3 == 0) {
            prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}${text3}`;
        }
    }      
})

plus2.addEventListener('click', function(){    
    ++countPref2;
    if(countPref2==1){
        text2 = "кровать";    
    } else {
        text2 = "кровати";
    }

    textNumber2.innerHTML = `${countPref2}`;
    prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}, ${countPref3} ${text3}`;
    if(countPref3 == 0) {
        prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}${text3}`;
    }    
})

const minus3 = document.getElementById('minus3');
const plus3 = document.getElementById('plus3');
const textNumber3 = document.getElementById('text-number3');

minus3.addEventListener('click', function(){
    if(countPref3>0) {
        countPref3--;

        if(countPref3==1){
            text3 = "ванная";            
        } else if (countPref3==0) {
            text3 = "..."
        }
        else {
            text3 = "ванные";
        }  

        textNumber3.innerHTML = `${countPref3}`;
        
        prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}, ${countPref3} ${text3}`;
        if(countPref3 == 0) {
            prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}${text3}`;
        }
    }      
})

plus3.addEventListener('click', function(){    
    ++countPref3;
    if(countPref3==1){
        text3 = "ванная";    
    } else {
        text3 = "ванные";
    }

    textNumber3.innerHTML = `${countPref3}`;
    prefInput.value = `${countPref1} ${text1}, ${countPref2} ${text2}, ${countPref3} ${text3}`;    
})

// Additional Preferences

const addPref = document.querySelector('.search__addition-inner');
const animArrow = document.getElementById('animArrow');

const contPref = document.querySelector('.addition__container');
contPref.setAttribute('style', 'visibility:hidden');

addPref.addEventListener('click', function(){
    const checkPref = contPref.getAttribute('style');
    if (checkPref == 'visibility:hidden') {
        contPref.setAttribute('style','visibility:visible');
        animArrow.classList.add("transformed");
    } else {
        contPref.setAttribute('style','visibility:hidden');
        animArrow.classList.remove("transformed");
    }
})

// Price Range Slider

const slider = document.querySelector('.search__span-line');
const valueContainer = document.querySelector('.search__span-price');

noUiSlider.create(slider, {
    start: [5000, 10000],
    step: 100,
    behaviour: 'unconstrained-tap',
    connect: true,
    range: {
        'min': 0,
        'max': 15000
    },
    ariaFormat: wNumb({
        decimals: 0
    }),
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '₽'
    })
});

slider.noUiSlider.on('update', function (values){
    valueContainer.innerHTML = values.join(' - ')
})