"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//author: @camsong
var common = {
    digitLength: function digitLength(num) {
        var eSplit = num.toString().split(/[eE]/);
        var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
        return len > 0 ? len : 0;
    },
    float2Fixed: function float2Fixed(num) {
        if (num.toString().indexOf('e') === -1) {
            return Number(num.toString().replace('.', ''));
        }

        var dLen = common.digitLength(num);
        return dLen > 0 ? num * Math.pow(10, dLen) : num;
    },
    checkBoundary: function checkBoundary(num) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn("".concat(num, " is beyond boundary when transfer to integer, the results may not be accurate"));
        }
    },
    times: function times(num1, num2) {
        for (var _len = arguments.length, others = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            others[_key - 2] = arguments[_key];
        }

        if (others.length > 0) {
            return common.times.apply(common, [common.times(num1, num2), others[0]].concat(_toConsumableArray(others.slice(1))));
        }

        var num1Changed = common.float2Fixed(num1);
        var num2Changed = common.float2Fixed(num2);
        var baseNum = common.digitLength(num1) + common.digitLength(num2);
        var leftValue = num1Changed * num2Changed;
        common.checkBoundary(leftValue);
        return leftValue / Math.pow(10, baseNum);
    },
    plus: function plus(num1, num2) {
        for (var _len2 = arguments.length, others = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            others[_key2 - 2] = arguments[_key2];
        }

        if (others.length > 0) {
            return common.plus.apply(common, [common.plus(num1, num2), others[0]].concat(_toConsumableArray(others.slice(1))));
        }

        var baseNum = Math.pow(10, Math.max(common.digitLength(num1), common.digitLength(num2)));
        return (common.times(num1, baseNum) + common.times(num2, baseNum)) / baseNum;
    },
    minus: function minus(num1, num2) {
        for (var _len3 = arguments.length, others = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            others[_key3 - 2] = arguments[_key3];
        }

        if (others.length > 0) {
            return common.minus.apply(common, [common.minus(num1, num2), others[0]].concat(_toConsumableArray(others.slice(1))));
        }

        var baseNum = Math.pow(10, Math.max(common.digitLength(num1), common.digitLength(num2)));
        return (common.times(num1, baseNum) - common.times(num2, baseNum)) / baseNum;
    },
    div: function div(num1, num2) {
        for (var _len4 = arguments.length, others = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            others[_key4 - 2] = arguments[_key4];
        }

        if (others.length > 0) {
            return common.div.apply(common, [common.div(num1, num2), others[0]].concat(_toConsumableArray(others.slice(1))));
        }

        var num1Changed = common.float2Fixed(num1);
        var num2Changed = common.float2Fixed(num2);
        common.checkBoundary(num1Changed);
        common.checkBoundary(num2Changed);
        return common.times(num1Changed / num2Changed, Math.pow(10, common.digitLength(num2) - common.digitLength(num1)));
    }
    /**
     * support js to compute the times,div,plus,minus
     * @param {String} computeStr - 39.9\*3-(2/5)+3\*6
     * @return {number}
     */

};

var compute = function compute(computeStr) {
    var operators = [{
        operator: '*',
        fun: 'times'
    }, {
        operator: '/',
        fun: 'div'
    }, {
        operator: '+',
        fun: 'plus'
    }, {
        operator: '-',
        fun: 'minus'
    }];

    var matchOperator = function matchOperator(tmpStr, computeValue) {
        tmpStr = tmpStr.replace('(', '').replace(')', '');
        var value = null;

        var start = function start(regStr) {
            var reg = new RegExp("([0-9.]+)[".concat(regStr, "]([0-9.]+)"));
            var str = tmpStr.match(reg)[0];
            var targetOperator = {};

            for (var i = 0; i < operators.length; i++) {
                if (str.indexOf(operators[i].operator) > 0) {
                    targetOperator = operators[i];
                    break;
                }
            }

            var list = str.split(targetOperator.operator);
            value = common[targetOperator.fun](list[0], list[1]);
            tmpStr = tmpStr.replace(str, value);
        };

        if (tmpStr.indexOf('*') > 0 || tmpStr.indexOf('/') > 0) {
            start('\*\/');
            return matchOperator(tmpStr, value);
        } else if (tmpStr.indexOf('+') > 0 || tmpStr.indexOf('-') > 0) {
            start('\\+\\-');
            return matchOperator(tmpStr, value);
        } else {
            return computeValue;
        }
    }; //compute the bracket


    var bracketReg = /\(([^)]*)\)/g;
    var bracketValue = computeStr.match(bracketReg);

    if (bracketValue && bracketValue.length) {
        bracketValue.forEach(function (item) {
            computeStr = computeStr.replace(item, matchOperator(item));
        });
    }

    return matchOperator(computeStr);
};
/**
 *
 * @param {String|Number} num
 * @param {String} targetFormat - support: '.', '.0', '.000'|...
 * @param {String} mathType  - support: ceil, round, floor
 * @return {String|Number} example: (1234.78, '.0', 'round') => 1,234.78
 */


var format = function format(num, targetFormat, mathType) {
    var sourceType = _typeof(num);

    if (targetFormat && mathType) {
        var div = parseInt(targetFormat.replace('.', 1));
        num = Math[mathType](num * div) / div;
    }

    return sourceType === 'string' ? num + '' : num;
};
/**
 *
 * @param {String|Number} num
 * @param {String} targetFormat - support: '.'|int, '.0'|other mathType, '.000'|other mathType
 * @param {String} mathType  - support: int, ceil, round, floor
 * @return {String} example: (1234.78, '.0', 'round') => 1,234.78
 */


var formatMoney = function formatMoney(num, targetFormat, mathType) {
    if (mathType && targetFormat) {
        if (mathType === 'int') {
            num = parseInt(num);
        } else {
            var div = parseInt(targetFormat.replace('.', 1));
            num = Math[mathType](num * div) / div;
        }
    }

    var value = num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            return $1 + ',';
        });
    });
    return value;
};

module.exports = {
    format: format,
    formatMoney: formatMoney,
    compute: compute
};
