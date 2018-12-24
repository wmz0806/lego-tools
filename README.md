# lego-tools
![npm version](https://img.shields.io/badge/npm-v0.0.7-green.svg)
![build status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![coverage](https://img.shields.io/badge/coverage-90%25-yellowgreen.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)

The tools library, now is support date|object|number.

## Install
```
npm install --save lego-tools
```

## Usage
```
const legoTools = require('lego-tools')//OR lego-tools/date

//===========================update to 0.0.6============================================
//[support js to compute the times,div,plus,minus]
LT.num.compute('39.9*3/2+10-3*2') //=> 63.85
//===========================end============================================


//===========================update to 0.0.6============================================
//[add support to num and format money]
let num = 1234567.789
LT.num.format(num, '.00', 'round') //=> 1234567.79
LT.num.format(num, '.', 'round') //=> 1234568
LT.num.formatMoney(num) //=> 1，234，567.789
LT.num.formatMoney(num, '.00', 'round') //=> 1，234，567.79
//===========================end============================================


//===========================update to 0.0.51============================================
//[new update, form example: u can filter the array like it.]
let data = [
    {name: 'Tom1', age: 23, detail: {address: 'test'}},
    {name: 'Tom2', age: 21, detail: {address: 'test'}},
]
LT.obj.deepGet(data, 'age>=22&&detail.address=="test"') //=> [{...}]

//===========================end============================================


//===========================date tool start============================================

LT.date.now() // => date object
LT.date.now('yyyy-MM-dd HH:mm:ss') //=> 2018-12-20 01:28:25

//format date
LT.date.format(new Date(), 'yyyy-MM-dd') //=> 2018-12-20
LT.date.format('2018-12-20 13:59:30' 'yyyy-MM-dd') //=> 2018-12-20

//add or subtract,support years,months,days,hours,minutes,seconds
LT.date.add('2018-12-20 12:29:30', 1, 'months', 'yyyy-MM-dd HH:mm:ss')
LT.date.subtract('2018-12-20 12:29:30', 1, 'days', 'yyyy-MM-dd HH:mm:ss')
LT.date.subtract(new Date(), 1, 'days', 'yyyy-MM-dd HH:mm:ss') //=> date string
LT.date.subtract(new Date(), 1, 'days') //=> date object

//date diff
//=> {days: number, hours: number, minutes: number, seconds: number}
LT.date.diff('2018-12-20 12:29:30', '2018-11-10 12:19:20')
//===========================date tool end============================================


//===========================obj tool start============================================
let data = { detail: {name: 'Tom', age: 21, address: {home: 'unknow'}} }
LT.obj.deepGet(data, 'detail.address.home') //=> unknow
LT.obj.deepSet(data, 'detail.address.home', 'test') //=> {...home:'test'}
LT.obj.copy(data) //=> data
//===========================obj tool end============================================
```