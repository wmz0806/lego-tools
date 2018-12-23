const expect = require('chai').expect
const date = require('../date')

describe('now date', () => {
    it('empty format', () => {
        expect(date.now()).to.be.an('date')
    })

    it('with format', () => {
        expect(date.format(new Date(), 'yyyy-MM-dd')).to.be.a('string')
    })
})

describe('date format', () => {
    it('string', () => {
        expect(date.format('2018-12-20 12:29:30', 'yyyy-MM-dd')).to.be.equal('2018-12-20')
    })

    it('date', () => {
        expect(date.format(new Date(), 'yyyy-MM-dd')).to.be.a('string')
    })
})

describe('date add/subtract', () => {
    it('add', () => {
        expect(date.subtract('2018-12-20 12:29:30', 1, 'months', 'yyyy-MM-dd HH:mm:ss')).to.be.a('string')
    })

    it('subtract', () => {
        expect(date.subtract('2018-12-20 12:29:30', 1, 'months', 'yyyy-MM-dd HH:mm:ss')).to.be.a('string')
    })
})

describe('date diff', () => {
    it('diff', () => {
        expect(date.diff('2018-12-20 01:29:30', '2018-11-15 12:53:13')).to.be.a('object')
    })
})