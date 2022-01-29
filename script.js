"use strict";


const title = "Lesson JS";
const screens = "Простые, Сложные, Интерактивные";
let screenPrice = 200;
const rollback = 20;
let fullPrice = 500;
const adaptive = false;


console.log('Тип переменной:',typeof title);
console.log('Тип переменной:',typeof fullPrice);
console.log('Тип переменной:',typeof adaptive);


console.log('Длинна строки:',screens.length);


console.log("Стоимость верстки экранов", screenPrice, "долларов.");
console.log("Стоимость разработки сайта", fullPrice, "долларов.");


console.log(screens.toLowerCase().split(', '));


console.log("Процент отката посреднику за работу", fullPrice * rollback / 100);