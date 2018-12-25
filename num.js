//author: @camsong
const common = {
    digitLength: num => {
        const eSplit = num.toString().split(/[eE]/);
        const len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
        return len > 0 ? len : 0;
    },
    float2Fixed: num => {
        if (num.toString().indexOf('e') === -1) {
            return Number(num.toString().replace('.', ''));
        }
        const dLen = common.digitLength(num);
        return dLen > 0 ? num * Math.pow(10, dLen) : num;
    },
    checkBoundary: num => {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
        }
    },
    times: (num1, num2, ...others) => {
        if (others.length > 0) {
            return common.times(common.times(num1, num2), others[0], ...others.slice(1));
        }
        const num1Changed = common.float2Fixed(num1);
        const num2Changed = common.float2Fixed(num2);
        const baseNum = common.digitLength(num1) + common.digitLength(num2);
        const leftValue = num1Changed * num2Changed;
    
        common.checkBoundary(leftValue);
    
        return leftValue / Math.pow(10, baseNum);
    },
    plus: (num1, num2, ...others) => {
        if (others.length > 0) {
            return common.plus(common.plus(num1, num2), others[0], ...others.slice(1));
        }
        const baseNum = Math.pow(10, Math.max(common.digitLength(num1), common.digitLength(num2)));
        return (common.times(num1, baseNum) + common.times(num2, baseNum)) / baseNum;
    },
    minus: (num1, num2, ...others) => {
        if (others.length > 0) {
            return common.minus(common.minus(num1, num2), others[0], ...others.slice(1));
        }
        const baseNum = Math.pow(10, Math.max(common.digitLength(num1), common.digitLength(num2)));
        return (common.times(num1, baseNum) - common.times(num2, baseNum)) / baseNum;
    },
    div: (num1, num2, ...others) => {
        if (others.length > 0) {
            return common.div(common.div(num1, num2), others[0], ...others.slice(1));
        }
        const num1Changed = common.float2Fixed(num1);
        const num2Changed = common.float2Fixed(num2);
        common.checkBoundary(num1Changed);
        common.checkBoundary(num2Changed);
        return common.times((num1Changed / num2Changed), Math.pow(10, common.digitLength(num2) - common.digitLength(num1)));
    }
}

/**
 * support js to compute the times,div,plus,minus
 * @param {String} computeStr - 39.9\*3-(2/5)+3\*6
 * @return {number}
 */
const compute = computeStr => {
    const operators = [
        {operator: '*', fun: 'times'},
        {operator: '/', fun: 'div'},
        {operator: '+', fun: 'plus'},
        {operator: '-', fun: 'minus'},
    ]
    const matchOperator = (tmpStr, computeValue) => {
        tmpStr = tmpStr.replace('(', '').replace(')', '')
        let value = null
        const start = (regStr) => {
            const reg = new RegExp(`([0-9.]+)[${regStr}]([0-9.]+)`)
            let str = tmpStr.match(reg)[0]
            let targetOperator = {}
            for(let i=0; i<operators.length; i++) {
                if(str.indexOf(operators[i].operator) > 0) {
                    targetOperator = operators[i]
                    break
                }
            }

            const list = str.split(targetOperator.operator)
            value = common[targetOperator.fun](list[0], list[1])
            tmpStr = tmpStr.replace(str, value)
        }

        if(tmpStr.indexOf('*') > 0 || tmpStr.indexOf('/') > 0) {
            start('\*\/')
            return matchOperator(tmpStr, value)
        }else if(tmpStr.indexOf('+') > 0 || tmpStr.indexOf('-') > 0){
            start('\\+\\-')
            return matchOperator(tmpStr, value)
        }else{
            return computeValue
        }
    }

    //compute the bracket
    const bracketReg = /\(([^)]*)\)/g
    const bracketValue = computeStr.match(bracketReg)
    if(bracketValue && bracketValue.length) {
        bracketValue.forEach(item => {
            computeStr = computeStr.replace(item, matchOperator(item))
        })
    }

    return matchOperator(computeStr)
}

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
    compute,
}