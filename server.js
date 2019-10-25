import dataFetch from './dataFetch';
import express from "express";
import cors from "cors";
import { urlencoded, json } from "body-parser";
import logger from "morgan";
const fs = require('fs');


let login = 'admin@terrenkur1'
let password = 'Dostyk128'

require('isomorphic-fetch') // polyfill
const Moysklad = require('moysklad')
const ms = Moysklad({ login: login, password: password })

const API_PORT = 3002;
const app = express();
app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(logger("dev"));

let dateFrom
let dateTo
app.post("/", async (req, res) => {
  // console.log(req.body.data);
  dateFrom = req.body.data.dateFrom + ` 00:00:00`
  dateTo = req.body.data.dateTo + ` 00:00:00`
  // console.log(dateFrom,dateTo)
  let report1 =  await dataFetch(req.body.data.selectedCategory,dateFrom,dateTo)
  // console.log(report1)
  let integerArr = []
  let floatArr = []
  for(let y=0;y<report1.length;y++){
    if(Number.isInteger(report1[y].sellQuantity)){
      integerArr.push(report1[y])
    } else {
      floatArr.push(report1[y])
    }
  }
  // console.log(integerArr,'+++++++++++++',floatArr)
  let sellQuantityArrInt = []
  let sellPriceArrInt = []
  let sellProfitArrInt = []
  let sellQuantityArrFloat = []
  let sellPriceArrFloat = []
  let sellProfitArrFloat = []
  function arrPushQuantity(iterationArr,pushArr){
    for(var i=0;i<iterationArr.length;i++){
    pushArr.push(iterationArr[i].sellQuantity/100)
  }
  return pushArr
  }
  function arrPushPrice(iterationArr,pushArr){
    for(var i=0;i<iterationArr.length;i++){
    pushArr.push(iterationArr[i].sellPrice/100)
  }
  return pushArr
  }
  function arrPushProfit(iterationArr,pushArr){
    for(var i=0;i<iterationArr.length;i++){
    pushArr.push(iterationArr[i].profit/100)
  }
  return pushArr
  }
  function arrSum(callback){
  let arrSum = callback.reduce((a,b) => a + b, 0)
  return arrSum
  }
  let QuantityResultInt = arrSum(arrPushQuantity(integerArr,sellQuantityArrInt))
  let QuantityResultFloat = arrSum(arrPushQuantity(floatArr,sellQuantityArrFloat))
  let PriceResultInt = arrSum(arrPushPrice(integerArr,sellPriceArrInt))
  let PriceResultFloat = arrSum(arrPushPrice(floatArr,sellPriceArrFloat))
  let ProfitResultInt = arrSum(arrPushProfit(integerArr,sellProfitArrInt))
  let ProfitResultFloat = arrSum(arrPushProfit(floatArr,sellProfitArrFloat))
  
  let report2 =  await ms.GET('/report/profit/byproduct',{
    expand: 'assortment',
    limit: 100,
    offset: 101
  })
  // console.log(report.rows[0].assortment)
  let data = {integerArr, floatArr, QuantityResultInt, QuantityResultFloat, PriceResultInt, PriceResultFloat, ProfitResultInt, ProfitResultFloat}

  res.send(data)
});
app.get("/", async (req, res) => {
  let productFolder =  await ms.GET('/entity/productfolder',{
    limit: 100
  })
  var arr = []
  for(let i=0;i<productFolder.rows.length;i++){
    arr.push(productFolder.rows[i].name)
  }
  res.send(arr)
})
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
