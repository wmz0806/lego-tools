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

module.exports = {
    copy,
    deepGet,
    deepSet,
    sort,
}