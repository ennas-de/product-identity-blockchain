const MINE_RATE = 1;
const INITIAL_DIFFICULTY = 0

const BLOCKCHAIN_METADATA =  {
    name: "MedScan - Internationalized Product Record",
    symbol: "IPR",
    logo: {
        logo: "",
        svg: ""
    },
    description: "A decentralized identity records for goods."
}

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: 'MedScan-Internationalized-Product-Record-lastHash',
    hash: 'MedScan-Internationalized-Product-Record-Hash',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: [],
    ipr: [],
    metadata: BLOCKCHAIN_METADATA
}

const STARTING_BALANCE = 0

const REWARD_INPUT = {address: "*medscan-ipr-reward-system*"};

const MINING_REWARD = 10 

module.exports = {
    GENESIS_DATA,
    MINE_RATE,
    // STARTING_BALANCE,
    // REWARD_INPUT,
    // MINING_REWARD,
    BLOCKCHAIN_METADATA
}