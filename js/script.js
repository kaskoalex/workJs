"use strict";
//Получить заголовок "Калькулятор верстки" 
const title = document.getElementsByTagName("h1").title.outerText
console.log(title);

//Получить кнопки "Рассчитать" и "Сброс" 
const buttonStart = document.getElementsByClassName("handler_btn")[0]
const buttonReset = document.getElementsByClassName("handler_btn")[1]
console.log(buttonStart, buttonReset);

//Получить кнопку "+" 
const buttonPlus = document.querySelector(".screen-btn")
console.log(buttonPlus);

//Получить все элементы с классом other-items в две разные переменные. 

const otherItems = document.querySelectorAll(".other-items");
const percentItems = document.querySelectorAll(".percent");
const numberItems = document.querySelectorAll(".number")
console.log(otherItems, percentItems, numberItems);

//Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector.

const inputTypeRange = document.querySelector(".rollback").querySelector('[type="range"]');
console.log(inputTypeRange);

//Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector.

const rangeValue = document.querySelector(".rollback").querySelector('.range-value');
console.log(rangeValue);

//Получить все инпуты с классом total-input справа через метод getElementsByClassName. (класс total-input, получить именно элементы, а не коллекции)

const totalInput = document.getElementsByClassName("total-input")
for (let i = 0; i < 5; i++) {
  console.log(totalInput[i])
};

//Получить все блоки с классом screen в изменяемую переменную(let) через метод querySelectorAll(далее мы будем переопределять ее значение)

let screens = document.querySelectorAll(".screen");
console.log(screens);



/*const appData = {
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

  isStr: function(title) {
    if (( appData.isNumber(title) || typeof title === null || title == "" || typeof title !== "string")) return true
  },

  asking: function () {
    do {
      appData.title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
    } while (appData.isStr(appData.title))

    for (let i = 0; i < 2; i++) {
      let name = ""
      do {
        name = prompt("Какие типы экранов нужно разработать?", "Напишите тип экрана.")
      } while (appData.isStr(name))


      let price = 0
      do {
        price = prompt("Сколько будет стоить данная работа?")
      } while (!appData.isNumber(price))

      appData.screens.push({ id: i, name: name, price: price })

    }


    for (let i = 0; i < 2; i++) {
      let name
      do {
        name = prompt("Какой дополнительный тип услуги нужен?")
      } while (appData.isStr(name))

      let price = 0
      do {
        price = prompt("Сколько это будет стоить?")

      } while (!appData.isNumber(price))
      price = +price
      name = `${i + 1}, ${name}`
      appData.services[name] = price

    }


    appData.adaptive = confirm("Нужен ли адаптив на сайте? Да или Нет")
  },

  addPrices: function () {

    appData.screenPrice = appData.screens.reduce(function(a, b) {
      return a + +b.price;
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
*/