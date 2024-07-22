const cryptoHash = require("./utils/crypto-hash")
const Blockchain = require("./blockchain")

// console.log(cryptoHash("abc"))
const blockchain = new Blockchain()

// console.log(blockchain.chain)

console.log(cryptoHash(blockchain.chain))