"use strict";



const appData = {
  title: "",
  screens: [],
  screenPrice: "",
  adaptive: "",
  rollback: "10",
  services: {},

  allServicePrices: "",
  fullPrice: "",
  servicePercentPrice: "",

  start: function () {
    appData.asking()
    appData.addPrices()
    appData.getFullPrice()
    appData.getServicePercentPrice(appData.fullPrice, appData.rollback)
    appData.getTitle(appData.title)
    appData.logger()
  },

  isNumber: function (num) {
    if (num === null || num[0] === ' ') return false
    return !isNaN(parseFloat(num)) && isFinite(num)

  },

  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
    } while (typeof appData.title !== "string" || appData.isNumber(appData.title) || typeof appData.title === null || appData == "")

    for (let i = 0; i < 2; i++) {
      let name = ""
      do {
        name = prompt("Какие типы экранов нужно разработать?", "Напишите тип экрана.")
      } while (typeof name !== "string" || appData.isNumber(name) || typeof name === null)


      let price = 0
      do {
        price = prompt("Сколько будет стоить данная работа?")
      } while (!appData.isNumber(price) || typeof price === null || price == "")

      appData.screens.push({ id: i, name: name, price: price })

    }


    for (let i = 0; i < 2; i++) {
      let name
      do {
        name = prompt("Какой дополнительный тип услуги нужен?")
      } while (typeof name !== "string" || appData.isNumber(name) || typeof name === null ||  name == "")

      let price = 0
      do {
        price = prompt("Сколько это будет стоить?")

      } while (!appData.isNumber(price) || typeof price === null)
      price = +price
      name = `${i + 1}, ${name}`
      appData.services[name] = price

    }


    appData.adaptive = confirm("Нужен ли адаптив на сайте? Да или Нет")
  },

  addPrices: function () {

    appData.screenPrice = appData.screens.reduce(function(a, b) {
      return a + b.price;
    },0);

    for (let key in appData.services) {
      appData.allServicePrices = +appData.allServicePrices + +appData.services[key]
    };
  },


  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + +appData.allServicePrices
  },


  getTitle: function (title1) {
    title1 = title1.trim()
    appData.title = title1[0].toUpperCase() + (title1.slice(1)).toLowerCase();

  },

  getServicePercentPrice: function (price1, rollbackVar) {
    appData.servicePercentPrice = Math.ceil(price1 * (100 - rollbackVar) / 100)


  },

  showTypeOf: function (variable) {
    return typeof variable;
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

appData.start();
console.log(appData.screenPrice)
console.log(appData.services)
console.log()
console.log(appData.screens)

console.log()
