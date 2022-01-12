/*
  Unit tests for the bch.js library
*/

// npm libraries
const assert = require('chai').assert
const sinon = require('sinon')

// Unit under test
const BCH = require('../../lib/bch')

describe('#BCH', () => {
  let sandbox, uut

  beforeEach(() => {
    // Restore the sandbox before each test.
    sandbox = sinon.createSandbox()

    uut = new BCH({ restURL: 'fakeurl' })
  })

  afterEach(() => sandbox.restore())

  describe('#constructor', () => {
    it('should throw error if restURL is not input', () => {
      try {
        uut = new BCH()

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'restURL required when instantiating BCH library'
        )
      }
    })
  })

  describe('#getBalance', () => {
    it('should request a balance', async () => {
      // Mock network
      sandbox.stub(uut.axios, 'post').resolves({ data: { key: 'value' } })

      const addr = 'testaddr'

      const result = await uut.getBalance(addr)

      assert.equal(result.key, 'value')
    })

    it('should throw an error if input is not a string', async () => {
      try {
        await uut.getBalance(123)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'Input must be a string containing bitcoincash address'
        )
      }
    })
  })

  describe('#getUtxos', () => {
    it('should request utxos', async () => {
      // Mock network
      sandbox.stub(uut.axios, 'post').resolves({ data: { key: 'value' } })

      const addr = 'testaddr'

      const result = await uut.getUtxos(addr)

      assert.equal(result.key, 'value')
    })

    it('should throw an error if input is not a string', async () => {
      try {
        await uut.getUtxos(123)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'Input must be a string containing bitcoincash address'
        )
      }
    })
  })

  describe('#sendTx', () => {
    it('should broadcast a transaction', async () => {
      // Mock network
      sandbox.stub(uut.axios, 'post').resolves({ data: { key: 'value' } })

      const hex = 'fakehex'

      const result = await uut.sendTx(hex)

      assert.equal(result.key, 'value')
    })

    it('should throw an error if input is not a string', async () => {
      try {
        await uut.sendTx(123)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'Input must be a string containing hex representation of a transaction'
        )
      }
    })
  })

  describe('#transactions', () => {
    it('should get transaction history', async () => {
      // Mock network
      sandbox.stub(uut.axios, 'post').resolves({ data: { key: 'value' } })

      const addr = 'testaddr'

      const result = await uut.getTransactions(addr)

      assert.equal(result.key, 'value')
    })

    it('should throw an error if input is not a string', async () => {
      try {
        await uut.getTransactions(123)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(
          err.message,
          'Input must be a string containing bitcoincash address'
        )
      }
    })
  })

  describe('#transaction', () => {
    it('should get transaction data', async () => {
      // Mock network
      sandbox.stub(uut.axios, 'post').resolves({ data: { key: 'value' } })

      const txid = 'testaddr'

      const result = await uut.getTransaction(txid)

      assert.equal(result.key, 'value')
    })

    it('should throw an error if input is not a string', async () => {
      try {
        await uut.getTransaction(123)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.equal(err.message, 'Input must be a string containing a TXID')
      }
    })
  })
})
