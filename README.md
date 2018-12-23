# lego-tools
![npm version](https://img.shields.io/badge/npm-v0.0.51-green.svg)
![build status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![coverage](https://img.shields.io/badge/coverage-90%25-yellowgreen.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)

The tools library, now is support date and object.

## Install
```
npm install --save lego-tools
```

## Usage
```
const legoTools = require('lego-tools')//OR lego-tools/date

//[new update, form example: u can filter the array like it.]
let data = [
    {name: 'Tom1', age: 23, detail: {address: 'test'}},
    {name: 'Tom2', age: 21, detail: {address: 'test'}},
]
let result = LT.obj.deepGet(data, 'age>=22&&detail.address=="test"')//=> [{...}]

//===========================date tool============================================
const date1 = LT.date.now()// => date object
const date2 = LT.date.now('yyyy-MM-dd HH:mm:ss')//=> 2018-12-20 01:28:25

//format date
const date3 = LT.date.format(new Date(), 'yyyy-MM-dd')//=> 2018-12-20
const date4 = LT.date.format('2018-12-20 13:59:30' 'yyyy-MM-dd')//=> 2018-12-20

//add or subtract,support years,months,days,hours,minutes,seconds
const date5 = LT.date.add('2018-12-20 12:29:30', 1, 'months', 'yyyy-MM-dd HH:mm:ss')
const date6 = LT.date.subtract('2018-12-20 12:29:30', 1, 'days', 'yyyy-MM-dd HH:mm:ss')
const date7 = LT.date.subtract(new Date(), 1, 'days', 'yyyy-MM-dd HH:mm:ss')//=> date string
const date8 = LT.date.subtract(new Date(), 1, 'days')//=> date object

//date diff
const date9 = LT.date.diff('2018-12-20 12:29:30', '2018-11-10 12:19:20')//=> {days: number, hours: number, minutes: number, seconds: number}

//===========================obj tool============================================
let data = { detail: {name: 'Tom', age: 21, address: {home: 'unknow'}} }
let obj1 = LT.obj.deepGet(data, 'detail.address.home')//=> unknow
let obj1 = LT.obj.deepSet(data, 'detail.address.home', 'test')//=> {...home:'test'}
let obj2 = LT.obj.copy(data)//=> data
```