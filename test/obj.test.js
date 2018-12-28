const expect = require('chai').expect
const { obj } = require('../')

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

    it('repeat array<object>', () => {
        let data = [{age:1}, {age:7}, {age:3}, {age:1}]
        data = obj.repeat(data, 'age')
        expect(data.length).to.be.equal(3)
    })

    it('repeat array<number>', () => {
        let data = [1, 1, 3, 4, 4]
        data = obj.repeat(data)
        expect(data.length).to.be.equal(3)
    })

    it('repeat array<string>', () => {
        let data = [1, '1', 1, '3', '4', '4']
        data = obj.repeat(data)
        expect(data.length).to.be.equal(4)
    })

    it('diff two obj', () => {
        let source = {age: 5, name: 'Ken', address: 'test'}
        let target = {age: 5, name: 'Tom', fav: 'book'}
        let data = obj.diff(source, target)

        expect(data.add.fav).to.be.equal('book')
        expect(data.delete.address).to.be.equal('test')
        expect(data.keep.age).to.be.equal(5)
        expect(data.update.source.name).to.be.equal('Ken')
        expect(data.update.target.name).to.be.equal('Tom')
    })

    it('diff two equal obj', () => {
        let source = {age: 5, name: 'Ken'}
        let target = {age: 5, name: 'Ken'}
        let data = obj.diff(source, target)
        expect(data).to.be.false
    })
})