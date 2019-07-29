"use strict";

var common = require('../common');
/**
 * common funciton
 */


var polyFun = {
    setTargetNum: function setTargetNum(tmpDate, num, type) {
        if (type === 'years') tmpDate.setFullYear(tmpDate.getFullYear() + num);else if (type === 'months') tmpDate.setMonth(tmpDate.getMonth() + num);else if (type === 'days') tmpDate.setDate(tmpDate.getDate() + num);else if (type === 'hours') tmpDate.setHours(tmpDate.getHours() + num);else if (type === 'minutes') tmpDate.setMinutes(tmpDate.getMinutes() + num);else if (type === 'seconds') tmpDate.setSeconds(tmpDate.getSeconds() + num);
        return tmpDate;
    },
    setStringDate: function setStringDate(date) {
        return typeof date === 'string' ? new Date(date) : date;
    }
};
/**
 * change date to trarget format
 * @param {Date|string} date - date object
 * @param {tring} targetFormat - yyyy-MM-dd HH:mm:ss
 * @return {string} string date
 */

var format = function format(date, targetFormat) {
    var tmpDate = polyFun.setStringDate(date);
    var result = JSON.stringify(targetFormat).replace(/"/g, '');
    result = result.replace('yyyy', tmpDate.getFullYear()).replace('MM', common.fillNum(tmpDate.getMonth() + 1, 2)).replace('dd', common.fillNum(tmpDate.getDate(), 2)).replace('HH', common.fillNum(tmpDate.getHours(), 2)).replace('mm', common.fillNum(tmpDate.getMinutes(), 2)).replace('ss', common.fillNum(tmpDate.getSeconds(), 2));
    return result;
};
/**
 * add target num to date
 * @param {Date|string} date
 * @param {number} num
 * @param {string} type - years, months, days, hours, minutes, seconds
 * @param {string} sourceFormat -(AllowNull) format
 * @return {Date|string}
 */


var add = function add(date, num, type, sourceFormat) {
    var tmpDate = polyFun.setStringDate(date);
    tmpDate = polyFun.setTargetNum(tmpDate, Math.abs(num), type);
    return typeof date === 'string' && sourceFormat ? format(tmpDate, sourceFormat) : tmpDate;
};
/**
 * subtract target num to date
 * @param {Date|string} date
 * @param {number} num
 * @param {string} type - years, months, days, hours, minutes, seconds
 * @param {string} sourceFormat -(AllowNull) format
 * @return {Date|string}
 */


var subtract = function subtract(date, num, type, sourceFormat) {
    var tmpDate = polyFun.setStringDate(date);
    tmpDate = polyFun.setTargetNum(tmpDate, -Math.abs(num), type);
    return typeof date === 'string' && sourceFormat ? format(tmpDate, sourceFormat) : tmpDate;
};
/**
 * get current date
 * @param {string} targetFormat -(AllowNull) date format
 * @return {Date|string}
 */


var now = function now(targetFormat) {
    var date = new Date();
    return targetFormat ? format(date, targetFormat) : date;
};
/**
 * date diff
 * @param {*} firstDate
 * @param {*} sencodDate
 * @return {*} {days, hours...seconds}
 */


var diff = function diff(firstDate, sencodDate) {
    var tmpFirstTimes = polyFun.setStringDate(firstDate).getTime();
    var tmpSecondTims = polyFun.setStringDate(sencodDate).getTime();
    var diffTimes = Math.abs(tmpFirstTimes - tmpSecondTims);
    var DAYS_TIMS = 86400000;
    var HOURS_TIMS = 3600000;
    var MINUTES_TIMS = 60000;
    var days = parseInt(diffTimes / DAYS_TIMS);
    var modDaysTimes = diffTimes % DAYS_TIMS;
    var hours = parseInt(modDaysTimes / HOURS_TIMS);
    var modHourTimes = modDaysTimes % HOURS_TIMS;
    var minutes = parseInt(modHourTimes / MINUTES_TIMS);
    var modMinuteTimes = modHourTimes % MINUTES_TIMS;
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: parseInt(modMinuteTimes / 1000)
    };
};

module.exports = {
    format: format,
    now: now,
    add: add,
    subtract: subtract,
    diff: diff
};
