const express = require("express");
const path = require("path");
const cors = require("cors");
const Blockchain = require("./blockchain");
const PubSub = require("./app/pubsub");

const isDevelopment = process.env.ENV === "development" // || false; // to be replaced with a dotEnv() setup
// console.log({isDevelopment})

const REDIS_URL = isDevelopment ? "localhost" : "redis://default:d2JDknzPFVd3MC41iGnitB5hIkW9lHSv@redis-15494.c293.eu-central-1-1.ec2.redns.redis-cloud.com:15494";
// const REDIS_URL = "localhost"
const DEFAULT_PORT = 3000;

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain, redisUrl: REDIS_URL});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/api/blocks/length", (req, res) => {
    res.json(blockchain.chain.length);
});

app.get("/api/blocks", (req, res) => {
    res.json(blockchain.chain);
});

app.get("/api/blocks/:id", (req, res) => {
    const {id} = req.params;
    const {length} = blockchain.chain;

    const blocksReversed = blockchain.chain.slice().reverse();

    let startIndex = (id - 1) * 5;
    let endIndex = id * 5;

    startIndex = startIndex < length ? startIndex : length;
    endIndex = endIndex < length ? endIndex : length;

    res.json(blocksReversed.slice(startIndex, endIndex));
});

app.post("/api/create", async (req, res) => {
    const data = req.body;

    const products = [...blockchain.chain];

    const foundProduct = products.filter(
        (product) =>
            product.data?.manufacturerInformation?.manufacturerName === data.manufacturerInformation?.manufacturerName &&
            product.data?.productInformation?.productName === data.productInformation?.productName &&
            product.data?.productInformation?.issn === data.productInformation?.issn
    );

    if (foundProduct.length > 0) {
        return res.json({
            status: "failed",
            message: "Product already exists."
        });
    }

    const newBlock = blockchain.addBlock({data, pubsub});
    pubsub.broadcastChain();

    const {hash, ipr} = newBlock

    // console.log("newblock:", {hash})
    // console.log("newblock:", {ipr})


    return res.status(201).json({
        status: "success",
        message: "Product information added to blockchain.",
        hash: newBlock.hash,
        ipr: newBlock.ipr
    });
});

app.get("/api/blocks/scan/:id", (req, res) => {
    const {id} = req.params;
    const {chain} = blockchain;

    let foundData = null;

    chain.some((block) => {
        if (block.hash === id) {
            foundData = {
                data: block.data,
                ipr: block.ipr.map(iprEntry => ({
                    packageIpr: iprEntry.packageIpr,
                    productIpr: iprEntry.productIpr
                }))
            };
            return true
        } else if (block.ipr) {
            for (const iprEntry of block.ipr) {
                if (iprEntry.packageIpr.includes(id)) {
                    foundData = {
                        data: block.data,
                        ipr: {
                            packageIpr: iprEntry.packageIpr,
                            productIpr: iprEntry.productIpr
                        }
                    };
                    return true;
                }

                if (iprEntry.productIpr.includes(id)) {
                    foundData = {
                        data: block.data,
                        ipr: {
                            packageIpr: iprEntry.packageIpr,
                            productIpr: [id]
                        }
                    };
                    return true;
                }
            }
        }
        return false;
    });

    if (foundData) {
        return res.status(200).json({
            success: true,
            message: "Product information fetched",
            data: foundData
        });
    } else {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
});

app.get("/", (req, res) => {
    res.json({
        message: "Please connect to any of the peer nodes below:",
        peerOne: "https://medscan-peer-node-one.onrender.com",
        peerTwo: "https://medscan-peer-node-two.onrender.com",
    })
})

app.listen(DEFAULT_PORT, () => {
    console.log(`MedScan server running on port: ${DEFAULT_PORT}`)
})
