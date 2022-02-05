"use strict";



const appData={
  title:"",
  screens:"",
  screenPrice:"",
  adaptive:"",
  rollback:"20",
  service1:"",
  service2:"",
  allServicePrices:"",
  fullPrice:"",
  servicePercentPrice:"",

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)

  },

  asking:function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
    appData.screens = prompt("Какие типы экранов нужно разработать? - ", "Простые, Сложные, Интерактивные");

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?")
    }
    while (!appData.isNumber(appData.screenPrice))



    appData.adaptive = confirm("Нужен ли адаптив на сайте? Да или Нет")
  },

  getAllServicePrices: function () {
    let sum = 0
    let result = 0

    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?")

      } else if (i === 1) {
        appData.service2 = prompt("Какой ещё дополнительный тип услуги нужен?")

      }

      do { 
        sum = prompt("Сколько это будет стоить?")
        
          
      
      }

      while (!appData.isNumber(sum))

      result += +sum 

    }

    return result
    
  },

  getFullPrice: function (price1, price2) {
    return +price1 + price2;
  },


  getTitle: function (title1) {
    title1 = title1.trim()
    return title1[0].toUpperCase() + (title1.slice(1)).toLowerCase();

  },

  getServicePercentPrice: function (price1, rollback1) {
    return Math.ceil(price1 * (100 - rollback1) / 100)


  },

  showTypeOf:function (variable) {
    return typeof variable;
  },




  getRollbackMessage:function (price) {
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


  start:function() {
    appData.asking(),
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.title = appData.getTitle(appData.title);
    appData.servicePercentPrice = appData.getServicePercentPrice(appData.fullPrice, appData.rollback);


    console.log("allServicePrices", appData.allServicePrices);
    
    console.log(appData.showTypeOf(appData.title));
    console.log(appData.showTypeOf(appData.screenPrice));
    console.log(appData.showTypeOf(appData.adaptive));
    console.log(appData.screens.toLowerCase().toString());
    console.log("Итоговая стоимость работы", appData.servicePercentPrice, "рублей.");
    console.log(appData.getRollbackMessage(appData.fullPrice))

  },

  logger: function () {
    for (let prop in appData) {
      console.log(prop);
    }
  }

}

appData.start();