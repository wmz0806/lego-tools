/**
 * copy object
 * @param {*} obj 
 * @return {*}
 */
const copy = obj => {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * get value from object
 * @param {Object.<string,object>} obj - object
 * @param {string} keyStr - a.b.c.d... | 'a.b==b||a.b>=1' for array
 * @return {*}
 */
const deepGet = (obj, keyStr) => {//detail.age>=22&&(detail.name=Tom||detail.name=Ken)
    let tmpObj = copy(obj)
    if(tmpObj instanceof Array) {
        let reg = /(\w+.)*\w[>=<]+/g
        let matchKeys = keyStr.match(reg)
        matchKeys = matchKeys.map(item => item.replace(/=/g, '').replace(/>/, '').replace(/</, ''))
        let resultList = []
        try {
            for(let i=0; i<obj.length; i++) {
                let tmpKeyStr = keyStr + ''
                matchKeys.forEach(item => {
                    let value = deepGet(obj[i], item)
                    isNaN(value) ? value = `"${value}"` : value
                    tmpKeyStr = tmpKeyStr.replace(item, value)
                })
                if(eval(tmpKeyStr)) resultList.push(obj[i])
            }
        } catch (error) {
            console.warn('keyStr is invalid', error)   
        }
        return resultList.length ? resultList : null
    }else{
        const keys = keyStr.split('.')
        keys.forEach(key => { tmpObj = (tmpObj && tmpObj.hasOwnProperty(key)) ? tmpObj[key] : undefined })
        return tmpObj
    }
}

/**
 * set value to object
 * @param {Object.<string,object>} obj - object
 * @param {string} keyStr - a.b.c.d
 * @param {*} value 
 * @return {Object.<string,object>}
 */
const deepSet = (obj, keyStr, value) => {
    const keys = keyStr.split('.')
    let keyLen = keys.length

    function setKey(tmpObj, keyList, index) {
        let key = keyList[index]
        if(index === (keyLen - 1)) {
            tmpObj[key] = value
        }else{
            if(!obj.hasOwnProperty(key)) tmpObj[key] = {}
            setKey(tmpObj[key], keyList, ++index)
        }
    }
    setKey(obj, keys, 0)
    return obj
}

/**
 * sort array
 * @param {Array} data 
 * @param {string} express - desc/asc => detail.age:desc
 * @return {array} data
 */
const sort = (data, express) => {
    let start = (type, keyStr) => {
        let preType = 1 * type
        let afterType = -1 * type

        if(keyStr) {
            data.sort((a, b) => {
                if(deepGet(a, keyStr) > deepGet(b, keyStr)) return preType
                else return afterType
            })
        }else{
            data.sort((a, b) => {
                if(a > b) return preType
                else return afterType
            })
        }
    }
    let sortType = null
    let keyStr = null

    if(express.indexOf(':') > 0) {
        let expressList = express.split(':')
        sortType = expressList[1]
        keyStr = expressList[0]
    }else{
        sortType = express
    }

    if(sortType === 'asc') start(1, keyStr)
    else if(sortType === 'desc') start(-1, keyStr)

    return data
}

/**
 * filter array repeat element is high performance 
 * @param {Array} data 
 * @param {string} express - (NULL) default is NULL, use to object in array like [{age:1}, {age:1}] => 'age' OR deepKey 'age.name..' and more.
 */
const repeat = (data, express) => {
    let tmp = {}
    let backTmp = {}
    let tmpList = []
    let recordItem = (key, item) => {
        let newKey = key + ''
        if(!tmp[newKey]) {
            tmpList.push(item)
            tmp[newKey] = key
        }else if(tmp[newKey] !== key && !backTmp[newKey]) {
            tmpList.push(item)
            backTmp[newKey] = key
        }
    }
    if(express) data.forEach(item => { recordItem(deepGet(item, express), item) })
    else data.forEach(item => { recordItem(item, item) })
    return tmpList
}

/**
 * diff two object or array
 * @param {Object.<string,object>} source
 * @param {Object.<string,object>} target
 * @return {*} {add, update: {source, target}, delete, keep, is_equal} if source equal target will return only false.
 */
const diff = (source, target) => {
    let result = {
        add: null,
        update: null,
        delete: null,
        keep: null,
    }
    let setValue = (type, key, value) => {
        if(!result[type]) result[type] = {}
        result[type][key] = value
    }

    let compare = (a, b) => {
        let typeA = a instanceof Object
        let typeB = b instanceof Object

        if(!typeA || !typeB) return a === b
        if(Object.keys(a).length !== Object.keys(b).length) return false

        for(let key in a) {
            let itemA = a[key]
            let itemB = b[key]
            let tmpA = itemA instanceof Object
            let tmpB = itemB instanceof Object
            if(tmpA && tmpB) return compare(itemA, itemB)
            else if(itemA !== itemB) return false
        }
        return true
    }

    let start = (sourceObj, targetObj) => {
        for(let key in sourceObj) {
            let sourceItem = sourceObj[key]
            let targetItem = target[key]
    
            if(targetItem) {//exist
                if(compare(sourceItem, targetItem)) {
                    setValue('keep', key, sourceItem)
                }else{
                    if(!result.update) result.update = {source: {}, target: {}}
                    result.update.source[key] = sourceItem
                    result.update.target[key] = targetItem
                }
            }else {//not exist
                setValue('delete', key, sourceItem)
            }
        }
        for(let key in targetObj) {
            if(!sourceObj[key]) setValue('add', key, targetObj[key])
        }
    }
    start(source, target)
    if(!result.add && !result.update && !result.delete) return false

    return result
}

module.exports = {
    copy,
    deepGet,
    deepSet,
    sort,
    repeat,
    diff,
}