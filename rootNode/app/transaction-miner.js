// const Transaction = require("./../wallet/transaction")

class TransactionMiner {
    constructor ({blockchain, transactionPool, pubsub}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool
        this.pubsub = pubsub
    }

    mineTransactions() {
        const validTransactions = this.transactionPool.validTransactions()

        validTransactions.push()
    }
}