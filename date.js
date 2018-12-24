const common = require('./src/common')

/**
 * common funciton
 */
const polyFun = {
    setTargetNum(tmpDate, num, type) {
        if(type === 'years') tmpDate.setFullYear(tmpDate.getFullYear() + num)
        else if(type === 'months') tmpDate.setMonth(tmpDate.getMonth() + num)
        else if(type === 'days') tmpDate.setDate(tmpDate.getDate() + num)
        else if(type === 'hours') tmpDate.setHours(tmpDate.getHours() + num)
        else if(type === 'minutes') tmpDate.setMinutes(tmpDate.getMinutes() + num)
        else if(type === 'seconds') tmpDate.setSeconds(tmpDate.getSeconds() + num)
        return tmpDate
    },
    setStringDate(date) {
        return typeof date === 'string' ? new Date(date) : date
    }
}

/**
 * change date to trarget format
 * @param {Date|string} date - date object
 * @param {tring} targetFormat - yyyy-MM-dd HH:mm:ss
 * @return {string} string date
 */
const format = (date, targetFormat) => {
    let tmpDate = polyFun.setStringDate(date)
    let result = (JSON.stringify(targetFormat)).replace(/"/g, '')
    result = result.replace('yyyy', tmpDate.getFullYear())
                    .replace('MM', common.fillNum(tmpDate.getMonth() + 1, 2))
                    .replace('dd', common.fillNum(tmpDate.getDate(), 2))
                    .replace('HH', common.fillNum(tmpDate.getHours(), 2))
                    .replace('mm', common.fillNum(tmpDate.getMinutes(), 2))
                    .replace('ss', common.fillNum(tmpDate.getSeconds(), 2))
    return result
}

/**
 * add target num to date
 * @param {Date|string} date 
 * @param {number} num 
 * @param {string} type - years, months, days, hours, minutes, seconds
 * @param {string} sourceFormat -(AllowNull) format
 * @return {Date|string} 
 */
const add = (date, num, type, sourceFormat) => {
    let tmpDate = polyFun.setStringDate(date)
    tmpDate = polyFun.setTargetNum(tmpDate, Math.abs(num), type)
    
    return (typeof date === 'string' && sourceFormat) ? format(tmpDate, sourceFormat) : tmpDate
}

/**
 * subtract target num to date
 * @param {Date|string} date 
 * @param {number} num 
 * @param {string} type - years, months, days, hours, minutes, seconds
 * @param {string} sourceFormat -(AllowNull) format
 * @return {Date|string}
 */
const subtract = (date, num, type, sourceFormat) => {
    let tmpDate = polyFun.setStringDate(date)
    tmpDate = polyFun.setTargetNum(tmpDate, -Math.abs(num), type)

    return (typeof date === 'string' && sourceFormat) ? format(tmpDate, sourceFormat) : tmpDate
}

/**
 * get current date
 * @param {string} targetFormat -(AllowNull) date format
 * @return {Date|string}
 */
const now = (targetFormat) => {
    let date = new Date()
    return targetFormat ? format(date, targetFormat) : date
}

/**
 * date diff
 * @param {*} firstDate 
 * @param {*} sencodDate 
 * @return {*} {days, hours...seconds}
 */
const diff = (firstDate, sencodDate) => {
    let tmpFirstTimes = (polyFun.setStringDate(firstDate)).getTime()
    let tmpSecondTims = (polyFun.setStringDate(sencodDate)).getTime()
    let diffTimes = Math.abs(tmpFirstTimes - tmpSecondTims)
    
    const DAYS_TIMS = 86400000
    const HOURS_TIMS = 3600000
    const MINUTES_TIMS = 60000
    let days = parseInt(diffTimes / DAYS_TIMS)
    let modDaysTimes = diffTimes % DAYS_TIMS
    let hours = parseInt(modDaysTimes / HOURS_TIMS)
    let modHourTimes = modDaysTimes % HOURS_TIMS
    let minutes = parseInt(modHourTimes / MINUTES_TIMS)
    let modMinuteTimes = modHourTimes % MINUTES_TIMS

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: parseInt(modMinuteTimes / 1000),
    }
}

module.exports = {
    format,
    now,
    add,
    subtract,
    diff,
}