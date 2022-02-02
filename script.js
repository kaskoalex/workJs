"use strict";

let rollback = 20;
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать? - " ,"Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте? Да или Нет");

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");



const getAllServicePrices = function(price1,price2) {  
  return price1+price2
}

const getFullPrice = function (price1, price2){
  return price1 + price2
}

const getTitle = function (title1) {
  title1 = title1.trim()
  return title1[0].toUpperCase() + (title1.slice(1)).toLowerCase();
  
}

const getServicePercentPrice = function (price1,rollback1) {
  return Math.ceil(price1 * (100 - rollback1) / 100)
  

}

let showTypeOf = function (variable) {
  return typeof variable;
} 


let allServicePrices=getAllServicePrices(servicePrice1,servicePrice2)
let fullPrice = getFullPrice(screenPrice, allServicePrices)
let title=getTitle(title)
let servicePercentPrice = getServicePercentPrice(fullPrice,rollback)

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


console.log(showTypeOf(title));
console.log(showTypeOf(screenPrice));
console.log(showTypeOf(adaptive));
console.log(screens.toString());
console.log("Итоговая стоимость работы", servicePercentPrice, "рублей.");
console.log(getRollbackMessage(fullPrice))
