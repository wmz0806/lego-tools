const expect = require('chai').expect
const obj = require('../obj')

describe('obj', () => {
    it('deepGet for obj', () => {
        let data = { detail: {name: 'Tom', age: 21, address: {home: 0}} }
        expect(obj.deepGet(data, 'detail.address.home')).to.be.equal(0)
    })
    it('deepGet for array', () => {
        let data = [
            { detail: {name: 'Tom', age: 21, address: {home: 0}}, max: '1' },
            { detail: {name: 'Ken', age: 25, address: {home: 1}}, max: 1 },
        ]
        let result = obj.deepGet(data, 'detail.address.home==0||max===1')
        expect(result[0].detail.name).to.be.equal('Tom')
    })
    it('deepSet', () => {
        let data = { detail: {name: 'Tom', age: 21, address: {home: 0}} }
        let result = obj.deepSet(data, 'detail.address.home', 1)
        expect(result.detail.address.home).to.be.equal(1)
    })

    it('copy', () => {
        let data = { detail: {name: 'Tom', age: 21, address: {home: 0}} }
        expect(obj.copy(data)).to.be.a('object')
    })
})