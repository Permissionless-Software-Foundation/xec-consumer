/*
  Integration tests for the bch.js library.
*/

// Configure this constant for your use in the test.
// const RESTURL = 'https://free-bch.fullstack.cash'
const RESTURL = 'http://localhost:5005'
console.log(`Using this REST URL for integration tests: ${RESTURL}`)

// npm libraries
const assert = require('chai').assert

// Unit under test
const BCH = require('../../lib/bch')
const uut = new BCH({ restURL: RESTURL })

describe('#bch.js', () => {
  describe('#getBalance', () => {
    it('should get BCH balance for an address', async () => {
      const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'

      const result = await uut.getBalance(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.success, true)

      assert.property(result, 'balances')
      assert.property(result.balances[0].balance, 'confirmed')
    })
  })

  describe('#getUtxos', () => {
    it('should get UTXOs for an address', async () => {
      const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'

      const result = await uut.getUtxos(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.property(result[0], 'bchUtxos')
      assert.property(result[0], 'slpUtxos')
    })
  })

  describe('#getTransactions', () => {
    it('should get transaction history for an address', async () => {
      const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'

      const result = await uut.getTransactions(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.success, true)
      assert.equal(result.transactions[0].address, addr)
      assert.isArray(result.transactions[0].transactions)
    })
  })

  describe('#sendTx', () => {
    it('should try to broadcast a hex tx', async () => {
      const hex =
        '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000'

      const result = await uut.sendTx(hex)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.success, false)
      assert.equal(result.endpoint, 'broadcast')
    })
  })

  describe('#getTransaction', () => {
    it('should try to broadcast a hex tx', async () => {
      const txid =
        '01517ff1587fa5ffe6f5eb91c99cf3f2d22330cd7ee847e928ce90ca95bf781b'

      const result = await uut.getTransaction(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.equal(result.txid, txid)
      assert.property(result, 'vin')
      assert.property(result, 'vout')
    })
  })
})
