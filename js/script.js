"use strict";

const title = document.getElementsByTagName("h1").title.outerText
const buttonPlus = document.querySelector(".screen-btn")


const buttonStart = document.getElementsByClassName("handler_btn")[0]
const buttonReset = document.getElementsByClassName("handler_btn")[1]

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number")



const inputTypeRange = document.querySelectorAll(".rollback .range-value")[0];
const rangeValue = document.querySelector(".rollback").querySelector('.range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const totalInput = document.getElementsByClassName("total-input")
let total = totalInput[0]
let totalCount = totalInput[1]
let totalCountOther = totalInput[2]
let fullTotalCount = totalInput[3]
let totalCountRollback = totalInput[4]


let screens = document.querySelectorAll(".screen")


const inputRollback = document.querySelector('.rollback input')
const inputRollbackValue = document.querySelector('.rollback .range-value')


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

    startBtn.addEventListener('click', this.start.bind(this))
    buttonPlus.addEventListener('click', this.addScreenBlock.bind(this))

    inputRollback.addEventListener('input', this.getRollback.bind(this))
  },
  addTitle: () => {
    document.title = title

  },

  start: function()  {

    this.addScreens()
    this.addServices()
    this.showInputRollback()

    this.addPrices()
   
    this.showResult()
  },

  showResult: function ()  {
    total.value = this.screenPrice
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
    fullTotalCount.value = this.fullPrice
    totalCountRollback.value = this.servicePercentPrice // Стоимость с учетом отката

    console.log(totalCountRollback.value)
    totalCount.value = this.screenCount // вывод кол экранов
  },

  // процент (%) отката
  getRollback: function (event)  {
    this.rollback = event.target.value;
    // отображение (%) процента отката 
    this.showInputRollback();
    console.log(this.rollback)

    // изменение отката после рассчёта  
    if (appData.fullPrice) {
      this.addPrices();
      totalCountRollback.value = this.servicePercentPrice ;
      console.log(this.fullPrice)
    }
  },

  // показ процента отката 
  showInputRollback: function()  {
    inputRollbackValue.textContent = this.rollback + '%';
  },



  addScreens: function ()  {
    screens = document.querySelectorAll(".screen")
    this.screens = []

    screens.forEach( (screen, index) => {

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

      }



      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value, // количество экранов
      })


    })


  },
  addServices: function() {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')


      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value  // Процент Услуги
        
      }

    })

    otherItemsNumber.forEach( (item) => {
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
    console.dir(this.screenCount);
    for (let i = 0; i < this.screens.length; i++) {
      this.screenCount += this.screens[i].count;
    }
    console.log(this.screenCount);
    console.dir(this.screens)

  },


  logger: () => {
    console.log("fullPrice: ", this.fullPrice);
    console.log("servicePercentPrice: ", this.servicePercentPrice);
    console.log(this.screens);

  },

}

appData.init();

