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

  // Get the balance for an address.
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

  // Get the UTXOs for an address.
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
}

module.exports = BCH
