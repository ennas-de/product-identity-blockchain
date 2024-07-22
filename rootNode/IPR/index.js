const { ec, cryptoHash } = require("../utils");

class IPR {
    constructor () {
        this.keyPair = ec.genKeyPair()

        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }
}

module.exports = IPR