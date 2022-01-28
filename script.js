

const title = "Lesson JS";
const screens = "Простые, Сложные, Интерактивные";
let screenPrice = 200;
const rollback = 20;
let fullPrice = 500;
const adaptive = false;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);


console.log(screens.length);


console.log("Стоимость верстки экранов", screenPrice, "долларов.");

console.log(screens.toLowerCase());


console.log("Процент отката посреднику за работу", fullPrice * rollback / 100);