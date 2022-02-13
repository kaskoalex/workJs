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
    appData.addTitle()

    startBtn.addEventListener('click', appData.start)
    buttonPlus.addEventListener('click', appData.addScreenBlock)

    inputRollback.addEventListener('input', appData.getRollback)
  },
  addTitle: function () {
    document.title = title

  },

  start: function () {

    appData.addScreens()
    appData.addServices()
    appData.showInputRollback()

    appData.addPrices()
    /*
        
    appData.logger()*/
    console.log(appData);
    appData.showResult()
  },

  showResult: function () {
    total.value = appData.screenPrice
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
    fullTotalCount.value = appData.fullPrice
    totalCountRollback.value = appData.servicePercentPrice
    totalCount.value = appData.screenCount // вывод кол экранов
  },

  // процент отката
  getRollback: function (event) {
    appData.rollback = event.target.value;
    // отображение процента отката 
    appData.showInputRollback();

    // изменение отката после рассчёта  
    if (appData.fullPrice) {
      appData.addPrices();
      appData.showResult();
    }
  },

  // показ процента отката 
  showInputRollback: function () {
    inputRollbackValue.textContent = appData.rollback + '%';
  },



  addScreens: function () {
    screens = document.querySelectorAll(".screen")
    appData.screens = []

    screens.forEach(function (screen, index) {

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

      if (!value || value < 1 || value > appData.maxTypeScreens) {
        input.style.backgroundColor = 'hotpink';
        alert('Введите количество экранов');

      }



      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value, // количество экранов
      })


    })


  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')


      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value
      }

    })

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')


      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value
      }

    })

  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true)

    screens[screens.length - 1].after(cloneScreen)

  },


  addPrices: function () {

    appData.screenPrice = appData.screens.reduce(function (a, b) {
      return a + +b.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber = +appData.servicePricesNumber + +appData.servicesNumber[key]
    };

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
    };

    appData.fullPrice = +appData.screenPrice + +appData.servicePricesNumber + appData.servicePricesPercent

    appData.servicePercentPrice = Math.ceil(appData.fullPrice * (100 - appData.rollback) / 100)
    // итоговая стоимость с учётом (вычетом) суммы отката посреднику

    appData.screenCount = 0
    console.dir(appData.screenCount);
    for (let i = 0; i < appData.screens.length; i++) {
      appData.screenCount += appData.screens[i].count;
    }
    console.log(appData.screenCount);
    console.dir(appData.screens)

  },


  logger: function () {
    console.log("fullPrice: ", appData.fullPrice);
    console.log("servicePercentPrice: ", appData.servicePercentPrice);
    console.log(appData.screens);

  },

}

appData.init();

