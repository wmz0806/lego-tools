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

    it('sort deepGet', () => {
        let data = [{detail: {age:1}}, {detail: {age:7}}, {detail: {age:3}}]
        data = obj.sort(data, 'detail.age:desc')
        expect(data[0].detail.age).to.be.equal(7)
    })

    it('sort array', () => {
        let data = [{age:1}, {age:7}, {age:3}]
        data = obj.sort(data, 'age:desc')
        expect(data[0].age).to.be.equal(7)
    })
})