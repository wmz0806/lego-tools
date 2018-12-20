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

module.exports = {
    copy,
    deepGet,
}