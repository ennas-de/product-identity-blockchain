const IPR = require("./index")

const ipr = new IPR()

const address = ipr.sign("data")
// console.log({address})

console.log(ipr.publicKey)