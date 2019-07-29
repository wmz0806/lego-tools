"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

/**
 * copy object
 * @param {*} obj
 * @return {*}
 */
var copy = function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
};
/**
 * get value from object
 * @param {Object.<string,object>} obj - object
 * @param {string} keyStr - a.b.c.d... | 'a.b==b||a.b>=1' for array
 * @return {*}
 */


var deepGet = function deepGet(obj, keyStr) {
    //detail.age>=22&&(detail.name=Tom||detail.name=Ken)
    var tmpObj = copy(obj);

    if (_instanceof(tmpObj, Array)) {
        var reg = /(\w+.)*\w[>=<]+/g;
        var matchKeys = keyStr.match(reg);
        matchKeys = matchKeys.map(function (item) {
            return item.replace(/=/g, '').replace(/>/, '').replace(/</, '');
        });
        var resultList = [];

        try {
            var _loop = function _loop(i) {
                var tmpKeyStr = keyStr + '';
                matchKeys.forEach(function (item) {
                    var value = deepGet(obj[i], item);
                    isNaN(value) ? value = "\"".concat(value, "\"") : value;
                    tmpKeyStr = tmpKeyStr.replace(item, value);
                });
                if (eval(tmpKeyStr)) resultList.push(obj[i]);
            };

            for (var i = 0; i < obj.length; i++) {
                _loop(i);
            }
        } catch (error) {
            console.warn('keyStr is invalid', error);
        }

        return resultList.length ? resultList : null;
    } else {
        var keys = keyStr.split('.');
        keys.forEach(function (key) {
            tmpObj = tmpObj && tmpObj.hasOwnProperty(key) ? tmpObj[key] : undefined;
        });
        return tmpObj;
    }
};
/**
 * set value to object
 * @param {Object.<string,object>} obj - object
 * @param {string} keyStr - a.b.c.d
 * @param {*} value
 * @return {Object.<string,object>}
 */


var deepSet = function deepSet(obj, keyStr, value) {
    var keys = keyStr.split('.');
    var keyLen = keys.length;

    function setKey(tmpObj, keyList, index) {
        var key = keyList[index];

        if (index === keyLen - 1) {
            tmpObj[key] = value;
        } else {
            if (!obj.hasOwnProperty(key)) tmpObj[key] = {};
            setKey(tmpObj[key], keyList, ++index);
        }
    }

    setKey(obj, keys, 0);
    return obj;
};
/**
 * sort array
 * @param {Array} data
 * @param {string} express - desc/asc => detail.age:desc
 * @return {array} data
 */


var sort = function sort(data, express) {
    var start = function start(type, keyStr) {
        var preType = 1 * type;
        var afterType = -1 * type;

        if (keyStr) {
            data.sort(function (a, b) {
                if (deepGet(a, keyStr) > deepGet(b, keyStr)) return preType;else return afterType;
            });
        } else {
            data.sort(function (a, b) {
                if (a > b) return preType;else return afterType;
            });
        }
    };

    var sortType = null;
    var keyStr = null;

    if (express.indexOf(':') > 0) {
        var expressList = express.split(':');
        sortType = expressList[1];
        keyStr = expressList[0];
    } else {
        sortType = express;
    }

    if (sortType === 'asc') start(1, keyStr);else if (sortType === 'desc') start(-1, keyStr);
    return data;
};
/**
 * filter array repeat element is high performance
 * @param {Array} data
 * @param {string} express - (NULL) default is NULL, use to object in array like [{age:1}, {age:1}] => 'age' OR deepKey 'age.name..' and more.
 */


var repeat = function repeat(data, express) {
    var tmp = {};
    var backTmp = {};
    var tmpList = [];

    var recordItem = function recordItem(key, item) {
        var newKey = key + '';

        if (!tmp[newKey]) {
            tmpList.push(item);
            tmp[newKey] = key;
        } else if (tmp[newKey] !== key && !backTmp[newKey]) {
            tmpList.push(item);
            backTmp[newKey] = key;
        }
    };

    if (express) data.forEach(function (item) {
        recordItem(deepGet(item, express), item);
    });else data.forEach(function (item) {
        recordItem(item, item);
    });
    return tmpList;
};
/**
 * diff two object or array
 * @param {Object.<string,object>} source
 * @param {Object.<string,object>} target
 * @return {*} {add, update: {source, target}, delete, keep, is_equal} if source equal target will return only false.
 */


var diff = function diff(source, target) {
    var result = {
        add: null,
        update: null,
        delete: null,
        keep: null
    };

    var setValue = function setValue(type, key, value) {
        if (!result[type]) result[type] = {};
        result[type][key] = value;
    };

    var compare = function compare(a, b) {
        var typeA = _instanceof(a, Object);

        var typeB = _instanceof(b, Object);

        if (!typeA || !typeB) return a === b;
        if (Object.keys(a).length !== Object.keys(b).length) return false;

        for (var key in a) {
            var itemA = a[key];
            var itemB = b[key];

            var tmpA = _instanceof(itemA, Object);

            var tmpB = _instanceof(itemB, Object);

            if (tmpA && tmpB) return compare(itemA, itemB);else if (itemA !== itemB) return false;
        }

        return true;
    };

    var start = function start(sourceObj, targetObj) {
        for (var key in sourceObj) {
            var sourceItem = sourceObj[key];
            var targetItem = target[key];

            if (targetItem) {
                //exist
                if (compare(sourceItem, targetItem)) {
                    setValue('keep', key, sourceItem);
                } else {
                    if (!result.update) result.update = {
                        source: {},
                        target: {}
                    };
                    result.update.source[key] = sourceItem;
                    result.update.target[key] = targetItem;
                }
            } else {
                //not exist
                setValue('delete', key, sourceItem);
            }
        }

        for (var _key in targetObj) {
            if (!sourceObj[_key]) setValue('add', _key, targetObj[_key]);
        }
    };

    start(source, target);
    if (!result.add && !result.update && !result.delete) return false;
    return result;
};

module.exports = {
    copy: copy,
    deepGet: deepGet,
    deepSet: deepSet,
    sort: sort,
    repeat: repeat,
    diff: diff
};
