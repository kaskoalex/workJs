"use strict";

let title
let screens
let screenPrice
let adaptive
let rollback = 20
let service1
let service2
let allServicePrices
let fullPrice
let servicePercentPrice

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num)

}

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор вёрстки")
  screens = prompt("Какие типы экранов нужно разработать? - ", "Простые, Сложные, Интерактивные")

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?")
  }
  while (!isNumber(screenPrice))



  adaptive = confirm("Нужен ли адаптив на сайте? Да или Нет")
}

const getAllServicePrices = function () {
  let sum = 0
  let sum1 = 0

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?")

    } else if (i === 1) {
      service2 = prompt("Какой ещё дополнительный тип услуги нужен?")

    }

    do { sum = prompt("Сколько это будет стоить?"), sum1 += +sum }

    while (!isNumber(sum))

  }

  return sum1


  //return price1+price2
}

const getFullPrice = function (price1, price2) {
  return price1 + price2
}

const getTitle = function (title1) {
  title1 = title1.trim()
  return title1[0].toUpperCase() + (title1.slice(1)).toLowerCase();

}

const getServicePercentPrice = function (price1, rollback1) {
  return Math.ceil(price1 * (100 - rollback1) / 100)


}

let showTypeOf = function (variable) {
  return typeof variable;
}




const getRollbackMessage = function (price) {
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
}

asking()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice(screenPrice, allServicePrices)
title = getTitle(title)
servicePercentPrice = getServicePercentPrice(fullPrice, rollback)


console.log("allServicePrices", allServicePrices);

console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toLowerCase().toString());
console.log("Итоговая стоимость работы", servicePercentPrice, "рублей.");
console.log(getRollbackMessage(fullPrice))
