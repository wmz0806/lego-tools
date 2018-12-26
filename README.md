# lego-tools
![npm version](https://img.shields.io/badge/npm-v0.1.2-green.svg)
![build status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![coverage](https://img.shields.io/badge/coverage-95%25-yellowgreen.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)

The tools library, now is support date|object|number.

## Install
```
npm install --save lego-tools
```
## new version
[0.1.2] add repeat and diff function to obj (high performance)
```
LT.obj.repeat([1, '1', 1, 2]) => [1, '1', 2]
LT.obj.repeat([{age: 1}, {age: 1}], 'age') => [{age: 1}]

let source2 = {age: 5, name: 'Ken'}
let target2 = {age: 5, name: 'Ken',}
LT.obj.diff(source, target) => false

let source = {age: 5, name: 'Ken', address: 'test'}
let target = {age: 5, name: 'Tom', fav: 'book'}
LT.obj.diff(source, target) => {add: {fav: 'book}, delete: {address: 'test'}, keep: {age: 5}, update: {source: {name: 'Ken'}, target: {name: 'Tome'}}}
```
---
[0.1.1] add sort function to obj
```
LT.obj.sort([{age:1}, {age:2}], 'age:desc') => [{age:2}, {age:1}]
```
---
## Usage
### #num
#### support js to compute the times,div,plus,minus
* function: `compute(computeStr:string)`
* params: computeStr - like -> (2+5)\*3+(39.9\*3)\2 -> 80.85
* return: number
* example: `LT.num.compute('(2+5)*3+(39.9*3)\2')`
---
<br>

#### format the num like round,ceil,floor
* function: `format(num:string|number, targetFormat:string, type:string)`
* params: num:12.34,'12.34' | targetFormat:'.','.0','.00'... and more | type:'round','ceil','floor'
* return: source num type
* example: `LT.num.format(12.34, '.0', 'round') => 12.3`
---
<br>

#### format the num like money show
* function: `formatMoney(num:string|number, targetFormat:string(NULL), type:string(NULL))`
* params: num:1234.34,'1234.34' | targetFormat:'.','.0','.00'... and more | type:'round','ceil','floor'
* return: string
* example: `LT.num.formatMoney(1234.34) => 1,234.34`
---
<br>

### #obj
#### get value or list from object/array
* function: `deepGet(data:object|array, keyStr)`
* params: data | keyStr:object -> 'detail.name.version' / array -> 'detail.age>5&sex="man"'
* return: target vlaue/array
* example: `LT.obj.deepGet({detail: {name: 'Tom'}}, 'detail.name') => Tom`
---
<br>

#### set the target object
* function: `deepSet(data:object, keyStr, vlaue:any)`
* params: date | keyStr: 'detail.name.version' | value
* return: target object
* example: `LT.obj.deepSet({detail: {name: 'Tom'}}, 'detail.age', 10) => {detail: {name: 'Tom', age: 10}}`
---
<br>

#### sort array
* function: `sort(data:array, express)`
* params: date | keyStr: 'desc/asc' or 'detail.intro.age:desc/asc'
* return: data
* example: `LT.obj.sort([{age:1}, {age:2}], 'age:desc') => [{age:2}, {age:1}]`
---
<br>

#### #date
##### get current date
* function: `now(targetFormat(NULL))`
* params: targetFormat:yyyy-MM-dd HH:mm:ss
* return: date|string
* example: `LT.date.now() => Date; LT.date.now('yyyy-MM-dd') => 2018-12-20`
---
<br>

#### format target date/dateStr
* function: `format(date:string|date, targetFormat)`
* params: targetFormat:yyyy-MM-dd HH:mm:ss
* return: string
* example: `LT.date.format(new Date()|'2018-12-20 13:59:30', 'yyyy-MM-dd') //=> 2018-12-20`
---
<br>

#### add years,months,days,hours,minutes,second to date
* function: `add(date:string|date, num:number, type:string, targetFormat:string)`
* params: type:years,months,days,hours,minutes,second | targetFormat:yyyy-MM-dd HH:mm:ss
* return: source date type
* example: `LT.date.add('2018-12-20 12:29:30'|new Date(), 1, 'months', 'yyyy-MM-dd HH:mm:ss') => 2019-01-20 12:29:30`
---
<br>

#### subtract years,months,days,hours,minutes,second from date
* function: `subtract(date:string|date, num:number, type:string, targetFormat:string(NULL))`
* params: type:years,months,days,hours,minutes,second | targetFormat:yyyy-MM-dd HH:mm:ss
* return: source date type
* example: `LT.date.subtract('2018-12-20 12:29:30'|new Date(), 1, 'months', 'yyyy-MM-dd HH:mm:ss') => 2018-11-20 12:29:30`
---
<br>

#### diff two date
* function: `diff(date:string|date, date:string|date)`
* params: date
* return: object - {days: number, hours: number, minutes: number, seconds: number}
* example: `LT.date.diff('2018-12-20 12:29:30', '2018-12-18 12:29:30') => {days: 2, hours: 0, minutes: 0, seconds: 0}`
---

use in code:
```
const LT = require('lego-tools')//OR lego-tools/date
//todo
...
```