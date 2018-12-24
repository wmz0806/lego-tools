const expect = require('chai').expect
const num = require('../num')

describe('obj', () => {
    it('format number round Number', () => {
        expect(num.format(123.556, '.0', 'round')).to.be.equal(123.6)
    })
    it('format number round String', () => {
        expect(num.format('123.556', '.0', 'round')).to.be.equal('123.6')
    })

    it('format money', () => {
        let vlaue = num.formatMoney(123456.556)
        expect(vlaue).to.be.equal('123,456.556')
    })
})