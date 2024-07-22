const Block = require("./Block");
const {cryptoHash} = require("./../utils");
const IPR = require("../IPR");

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data, pubsub}) {
        let ipr = [];

        for (let i = 0; i < data.packageInformation.totalPackages; i++) {
            let packageIpr = [];
            let productIpr = [];

            const newAddr = new IPR().publicKey;
            packageIpr.push(newAddr);

            for (let j = 0; j < data.packageInformation.sku / data.packageInformation.totalPackages; j++) {
                const newAddr = new IPR().publicKey;
                productIpr.push(newAddr);
            }

            const unitIpr = {
                packageIpr,
                productIpr
            };

            ipr.push(unitIpr);
        }

        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data,
            ipr
        });

        this.chain.push(newBlock);

        const hash = this.chain[this.chain.length-1].hash

        // console.log("addblock:", {hash})

        return {hash, ipr};
    }

    replaceChain({chain, onSuccess}) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain must be longer");
            return;
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain must be valid");
            return;
        }

        // if (validateTransactions && !this.validTransactionData({chain})) {
        //     console.error("The incoming chain has invalid data");
        //     return;
        // }

        if (onSuccess) console.log("new chain:", chain, " vs old chain:", this.chain)

        // console.log("Replacing chain with", chain);
        this.chain = chain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const {timestamp, lastHash, hash, nonce, difficulty, data, ipr} = chain[i];
            const actualLastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;

            if (lastHash !== actualLastHash) {
                console.error("Last hash mismatch");
                return false;
            }

            const validateHash = cryptoHash(timestamp, lastHash, data, ipr, nonce, difficulty);
            if (hash !== validateHash) {
                console.error("Hash mismatch", {hash, validateHash});
                return false;
            }

            if (Math.abs(lastDifficulty - difficulty) > 1) {
                console.error("Difficulty mismatch");
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;
