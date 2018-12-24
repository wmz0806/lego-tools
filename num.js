/**
 * 
 * @param {String|Number} num 
 * @param {String} targetFormat - support: '.', '.0', '.000'|...
 * @param {String} mathType  - support: ceil, round, floor
 * @return {String|Number} example: (1234.78, '.0', 'round') => 1,234.78
 */
const format = (num, targetFormat, mathType) => {
    let sourceType = typeof num
    if(targetFormat && mathType) {
        let div = parseInt(targetFormat.replace('.', 1))
        num = Math[mathType](num * div) / div
    }
    return sourceType === 'string' ? (num + '') : num
}

/**
 * 
 * @param {String|Number} num 
 * @param {String} targetFormat - support: '.'|int, '.0'|other mathType, '.000'|other mathType
 * @param {String} mathType  - support: int, ceil, round, floor
 * @return {String} example: (1234.78, '.0', 'round') => 1,234.78
 */
const formatMoney = (num, targetFormat, mathType) => {
    if(mathType && targetFormat) {
        if(mathType === 'int') {
            num = parseInt(num)
        }else {
            let div = parseInt(targetFormat.replace('.', 1))
            num = Math[mathType](num * div) / div
        }
    }

    let value = num.toString().replace(/\d+/, n => {
        return n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
            return $1 + ','
        })
    })
    return value
}

module.exports = {
    format,
    formatMoney,
}