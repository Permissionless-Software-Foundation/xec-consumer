# bch-consumer

_bch-consumer_ is a JS library for retrieving eCash or BCH blockchain data from [ipfs-bch-wallet-consumer](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer), which in turn gets its information from [ipfs-bch-wallet-service](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-service). Read the article [Realizing the Web3 Cash Stack](https://psfoundation.cash/blog/realizing-the-web-3-cash-stack) to learn more about this software stack.

## Installation

```
npm install --save bch-consumer
```

## Instantiation

```javascript
// Configure this constant for your use in the test.
const RESTURL = 'https://free-bch.fullstack.cash'
// const RESTURL = 'http://localhost:5005'
console.log(`Using this REST URL for integration tests: ${RESTURL}`)

// Instantiate bch-consumer
const BchConsumer = require('bch-consumer')
const bchConsumer = new BchConsumer({ restURL: RESTURL })
```

## Examples

Here are some simple examples illustrating how to use this library. These examples assume the BCH blockchain.

### Get a Balance for an Address

```javascript
const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'
const result = await bchConsumer.getBalance(addr)
console.log('result: ', result)
```

### Get UTXOs for an Address

```javascript
const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'
const result = await bchConsumer.getUtxos(addr)
console.log('result: ', result)
```

### Send a Transaction

```javascript
const hex = '010000000100000000000000000000000'
const result = await bchConsumer.sendTx(hex)
console.log('result: ', result)
```

### Get Transaction History for an Address

```javascript
const addr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'
const result = await bchConsumer.getTxHistory(addr)
console.log('result: ', result)
```

### Get Transaction Details for a TXID

```javascript
const txids = [
  '01517ff1587fa5ffe6f5eb91c99cf3f2d22330cd7ee847e928ce90ca95bf781b'
]
const result = await bchConsumer.getTxData(txids)
console.log('result: ', result)
```

## Licence

[MIT](LICENSE.md)
