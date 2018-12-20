/**
 * copy object
 * @param {*} obj 
 */
const copy = obj => {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * get value from object
 * @param {*} obj - object
 * @param {*} keyStr - a.b.c.d...
 */
const deepGet = (obj, keyStr) => {
    const keys = keyStr.split('.')
    let value = copy(obj)
    keys.forEach(key => { value = value.hasOwnProperty(key) ? value[key] : undefined })
    return value
}

/**
 * set value to object
 * @param {*} obj - object
 * @param {*} keyStr - a.b.c.d
 * @param {*} value 
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