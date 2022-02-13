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


const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
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
  },
  addTitle: function () {
    document.title = title

  },

  start: function () {

    appData.addScreens()
    appData.addServices()

    appData.addPrices()
    /*
    
    appData.getServicePercentPrice(appData.fullPrice, appData.rollback)
    
    appData.logger()*/
    console.log(appData);
    appData.showResult()
  },

  showResult: function () {
    total.value = appData.screenPrice
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
    fullTotalCount.value = appData.fullPrice
  },



  addScreens: function () {
    screens = document.querySelectorAll(".screen")

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select')
      const input = screen.querySelector('input')
      const selectName = select.options[select.selectedIndex].textContent

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value
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


  },


  getServicePercentPrice: function (price1, rollbackVar) {
    appData.servicePercentPrice = Math.ceil(price1 * (100 - rollbackVar) / 100)


  },



  getRollbackMessage: function (price) {
    switch (true) {
      case price >= 30000:
        return "Даем скидку в 10%"
      case 15000 <= price && price < 30000:
        return "Даем скидку в 5%"
      case price > 0 && price < 15000:
        return "Скидка не предусмотрена"
      case price <= 0:
        return "Что то пошло не так"
    }
  },

  logger: function () {
    console.log("fullPrice: ", appData.fullPrice);
    console.log("servicePercentPrice: ", appData.servicePercentPrice);
    console.log(appData.screens);

  },

}

appData.init();
console.log(appData.screenPrice)
console.log(appData.services)
console.log()
console.log(appData.screens)

console.log()
