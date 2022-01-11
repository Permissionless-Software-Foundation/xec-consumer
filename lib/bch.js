/*
  BCH-specific endpoints.
*/

// Global npm libraries
const axios = require('axios')

class BCH {
  constructor (localConfig = {}) {
    this.restUrl = localConfig.restUrl
    if (!this.restUrl) {
      throw new Error('restURL required when instantiating BCH library')
    }

    // Encapsulate dependencies
    this.axios = axios
  }

  /**
   * @api bch.getBalance() getBalance()
   * @apiName getBalance
   * @apiGroup BCH
   * @apiDescription Get the balance for a BCH address.
   *
   * @apiExample {js} Example usage:
   * (async () => {
   *   try {
   *     const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'
   *     const balance = await bchConsumer.bch.getBalance(addr)
   *     console.log(balance)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   */
  async getBalance (addr) {
    // Input validation
    if (typeof addr !== 'string') {
      throw new Error('Input must be a string containing bitcoincash address')
    }

    const body = {
      addresses: [addr]
    }
    const result = await this.axios.post(`${this.restUrl}/bch/balance`, body)

    // console.log(`result.data: ${JSON.stringify(result.data, null, 2)}`);
    return result.data
  }

  /**
   * @api bch.getUtxos() getUtxos()
   * @apiName getUtxos
   * @apiGroup BCH
   * @apiDescription Get UTXOs controlled by a BCH address.
   *
   * @apiExample {js} Example usage:
   * (async () => {
   *   try {
   *     const addr = 'bitcoincash:qqh793x9au6ehvh7r2zflzguanlme760wuzehgzjh9'
   *     const utxos = await bchConsumer.bch.getUtxos(addr)
   *     console.log(utxos)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   */
  async getUtxos (addr) {
    // Input validation
    if (typeof addr !== 'string') {
      throw new Error('Input must be a string containing bitcoincash address')
    }

    const body = {
      address: addr
    }

    const result = await this.axios.post(`${this.restUrl}/bch/utxos`, body)

    // console.log(`result.data: ${JSON.stringify(result.data, null, 2)}`);
    return result.data
  }

  /**
   * @api bch.sendTx() sendTx()
   * @apiName sendTx
   * @apiGroup BCH
   * @apiDescription Broadcast a transaction to the BCH network.
   *
   * @apiExample {js} Example usage:
   * (async () => {
   *   try {
   *     const hex = "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000"
   *     const txid = await bchConsumer.bch.sendTx(hex)
   *     console.log(txid)
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   */
  async sendTx (hex) {
    // Input validation
    if (typeof hex !== 'string') {
      throw new Error(
        'Input must be a string containing hex representation of a transaction'
      )
    }

    const body = {
      hex
    }

    const result = await this.axios.post(`${this.restUrl}/bch/broadcast`, body)

    // console.log(`result.data: ${JSON.stringify(result.data, null, 2)}`);
    return result.data
  }
}

module.exports = BCH
