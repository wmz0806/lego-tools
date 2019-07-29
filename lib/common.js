"use strict";

module.exports = {
    /**
     * padding zero to num
     * @param {*} num
     * @param {*} targetLength - result num length
     * @returns
     */
    fillNum: function fillNum(num, targetLength) {
        var decimal = num / Math.pow(10, targetLength);
        decimal = decimal.toFixed(targetLength) + '';
        return decimal.substr(decimal.indexOf(".") + 1);
    }
};
