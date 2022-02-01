"use strict";

let rollback = 20;
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать? - " ,"Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = prompt("Нужен ли адаптив на сайте? Да или Нет");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let fullPrice
let allServicePrices
let servicePercentPrice 


const getAllServicePrices = function() {
  allServicePrices= servicePrice1 + servicePrice2
  return allServicePrices
}

const getFullPrice= function(){
  fullPrice = screenPrice + getAllServicePrices()
  return fullPrice
}

const getTitle = function () {
  title = title.trim()
  title = title[0].toUpperCase() + (title.slice(1)).toLowerCase();
  return title
}

const getServicePercentPrice = function () {
  servicePercentPrice = Math.ceil(getFullPrice() * (100 - rollback) / 100)
  return servicePercentPrice

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

if (adaptive.toLowerCase() === "да") {
  adaptive = true;
} else {
  adaptive = false;
}

console.log(showTypeOf(getTitle()));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toString());
console.log("Итоговая стоимость работы", getServicePercentPrice(), "рублей.");
console.log(getRollbackMessage(getFullPrice()))
