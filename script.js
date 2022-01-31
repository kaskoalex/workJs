"use strict";

let rollback = 20;
let title = prompt("Как называется ваш проект?");

let screens = prompt("Какие типы экранов нужно разработать? - Простые, Сложные, Интерактивные");

let screenPrice = +prompt("Сколько будет стоить данная работа?");

let adaptive = prompt("Нужен ли адаптив на сайте? Да или Нет");
if (adaptive.toLowerCase() === "да") {
  adaptive = true;
} else {
  adaptive = false;
}

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");

let service2 = prompt("Какой ещё дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");


let fullPrice = screenPrice + servicePrice1 + servicePrice2


let fullPriceRollback = fullPrice*(100-rollback)/100;
let servicePercentPrice = Math.ceil(fullPriceRollback );

console.log("Итоговая стоимость работы", servicePercentPrice, "рублей.");



switch (true) {
  case fullPrice > 30000:
    console.log("Даем скидку в 10%");
    break

  case 15000 <= fullPrice && fullPrice<30000:
    console.log("Даем скидку в 5%");
    break
  case fullPrice > 0 && fullPrice <15000:
    console.log("Скидка не предусмотрена");
    break  
  case fullPrice < 0 :
    console.log("Что то пошло не так");
    break   
}  


