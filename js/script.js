"use strict";

const title = document.getElementsByTagName("h1").title.outerText
const buttonPlus = document.querySelector(".screen-btn")


const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number")



const inputTypeRange = document.querySelectorAll(".rollback .range-value")[0];
const rangeValue = document.querySelector(".rollback").querySelector('.range-value');

const startButton = document.getElementsByClassName('handler_btn')[0]
const resetButton = document.getElementsByClassName('handler_btn')[1]

const totalInput = document.getElementsByClassName("total-input")
let total = totalInput[0]
let totalCount = totalInput[1]
let totalCountOther = totalInput[2]
let fullTotalCount = totalInput[3]
let totalCountRollback = totalInput[4]


let screens = document.querySelectorAll(".screen")


const inputRollback = document.querySelector('.rollback input')
const inputRollbackValue = document.querySelector('.rollback .range-value')


const inputs = document.querySelector('input[type=text]')
const cmsOpen = document.querySelector('#cms-open')

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  screenCount: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    this.addTitle();

    startButton.addEventListener('click', this.start.bind(this))// запуск расчёта
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))

    inputRollback.addEventListener('input', this.getRollback.bind(this))
    resetButton.addEventListener('click', this.reset.bind(this))// кнопка реазет, сброс данных
  },
  addTitle: () => {
    document.title = title

  },

  start: function () {

    this.addScreens();
    this.addServices();
    this.showInputRollback();
    this.addPrices();
    this.showResult();

  },

  showResult: function () {
    total.value = this.screenPrice
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
    fullTotalCount.value = this.fullPrice
    totalCountRollback.value = this.servicePercentPrice // Стоимость с учетом отката  
    totalCount.value = this.screenCount // вывод кол экранов
  },

  // процент (%) отката
  getRollback: function (event) {
    this.rollback = event.target.value;
    // отображение (%) процента отката 
    this.showInputRollback();
    

    // изменение отката после рассчёта  
    if (appData.fullPrice) {
      this.addPrices();
      totalCountRollback.value = this.servicePercentPrice;
      
    }
  },

  // показ процента отката 
  showInputRollback: function () {
    inputRollbackValue.textContent = this.rollback + '%';
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen")
    this.screens = []

    screens.forEach((screen, index) => {

      const select = screen.querySelector('select')
      const input = screen.querySelector('input')
      const selectName = select.options[select.selectedIndex].textContent
      const value = +input.value
      input.style.backgroundColor = 'lightgreen'
      select.style.backgroundColor = 'lightgreen'


      while (!select.selectedIndex) {
        select.style.backgroundColor = 'hotpink';
        alert('Введите тип экранов'); break
      }


      if (!value || value < 1) {
        input.style.backgroundColor = 'hotpink';
        alert('Введите количество экранов');

      } else {
        this.blockade()
        this.switchReset()
        input.style.backgroundColor = 'lightgreen'
      }




      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value, // количество экранов
      })


    })


  },


  blockade: function () { // Блокировать (свойство disabled) все input[type=text] и select с левой стороны после нажатия кнопки Рассчитать
    let selects = document.querySelectorAll('select')
    buttonPlus.disabled = true
    inputs.disabled = true

    selects.forEach(function (item) {
      item.disabled = true
      
    })
  
  },

  switchReset: function () {// Переключение кнопок
    startButton.style.display = 'none'
    resetButton.style.display = 'block'

  },

  reset: function () {  // функции сброса

    startButton.style.display = 'block'
    resetButton.style.display = 'none'

    const select = document.querySelector('select');
    const input = document.querySelector('input');

    buttonPlus.disabled = false



    total.value = 0
    totalCountOther.value = 0
    fullTotalCount.value = 0
    totalCountRollback.value = 0 // Стоимость с учетом отката      
    totalCount.value = 0// вывод кол экранов 
    inputRollback.value = 0 // обнуление бегунка
    this.rollback = 0
    inputRollbackValue.textContent = this.rollback + '%'



    screens.forEach((screen) => {

      select.selectedIndex = 0
      input.value = ''
      input.style.backgroundColor = 'white'
      select.style.backgroundColor = 'white'
      select.disabled = false
      input.disabled = false
      cmsOpen.checked = false

      for (let i = 1; i < screens.length; i++) {
        screens[i].remove(); // удаление дополнительных типов экранов
      }
    })

    screens = document.querySelectorAll('.screen');
    this.screens = [];

    otherItemsPercent.forEach(item => {
      item.querySelector('input[type=checkbox]').checked = false  // удаление галочек услуг в процентах    
    }
    )

    otherItemsNumber.forEach(item => {
      item.querySelector('input[type=checkbox]').checked = false  // удаление галочек услуг в рублях    
    }
    )

    this.rollback = 0
    this.servicePricesPercent = 0
    this.servicePricesNumber = 0
    this.fullPrice = 0
    this.screenPrice = 0
    this.screenCount = 0
    this.servicePercentPrice = 0


  },



  addServices: function () {
    otherItemsPercent.forEach(item => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')


      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value  // Процент Услуги

      }

    })

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')


      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value  // Сумма услуг Number в рублях

      }

    })

  },


  addScreenBlock: () => {
    const cloneScreen = screens[0].cloneNode(true)
    screens[screens.length - 1].after(cloneScreen)

  },


  addPrices: function () {

    this.screenPrice = this.screens.reduce((a, b) => {
      return a + +b.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber = this.servicePricesNumber + this.servicesNumber[key]
    };

    for (let key in this.servicesPercent) {
      this.servicePricesPercent = this.screenPrice * (this.servicesPercent[key] / 100)
    };

    this.fullPrice = +this.screenPrice + +this.servicePricesNumber + this.servicePricesPercent

    this.servicePercentPrice = Math.ceil(this.fullPrice * (100 - this.rollback) / 100)
    // итоговая стоимость с учётом (вычетом) суммы отката посреднику

    this.screenCount = 0

    for (let i = 0; i < this.screens.length; i++) {
      this.screenCount += this.screens[i].count;
    }
    

  },


  logger: () => {
    console.log("fullPrice: ", this.fullPrice);
    console.log("servicePercentPrice: ", this.servicePercentPrice);
    console.log(this.screens);

  },

}

appData.init();

