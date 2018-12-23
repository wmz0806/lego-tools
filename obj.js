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
        keys.forEach(key => { tmpObj = tmpObj.hasOwnProperty(key) ? tmpObj[key] : undefined })
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

module.exports = {
    copy,
    deepGet,
    deepSet,
}