const hexToBinary = require("hex-to-binary")
const {GENESIS_DATA, MINE_RATE, INITIAL_DIFFICULTY} = require("./../config")
const {cryptoHash} = require("./../utils")

class Block {
    constructor({timestamp, lastHash, hash, data, ipr, nonce, difficulty}) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash 
        this.data = data 
        this.ipr = ipr
        this.nonce = nonce 
        this.difficulty = difficulty
    }

    static genesis() {
        return new this(GENESIS_DATA)
    }

    static mineBlock({lastBlock, data, ipr}) {
        const lastHash = lastBlock.hash
        let hash, timestamp
        let {difficulty} = lastBlock
        let nonce = 0

        do {
            nonce++
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp})
            hash = cryptoHash(timestamp, lastHash, data, ipr, nonce, difficulty)
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))

            // console.log("added data hash:", {hash})

        return new this({timestamp, lastHash, data, ipr, difficulty, nonce, hash})

    }

    static adjustDifficulty({originalBlock, timestamp}) {
        const {difficulty} = originalBlock;

        if (difficulty < 1) return 1
        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty -1

        return difficulty + 1
    }
}

module.exports = Block