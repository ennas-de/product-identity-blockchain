const {createClient} = require("redis");

const CHANNELS = {
    // TEST: "TEST",
    BLOCKCHAIN: "BLOCKCHAIN"
};

class PubSub {
    constructor({ blockchain, redisUrl }) {
        console.log(`Connecting to Redis at ${redisUrl}`);
        this.blockchain = blockchain;
        this.publisher = createClient(redisUrl);
        const client = createClient(redisUrl);
        this.subscriber = client.duplicate();

        // Handle connection success
        this.publisher.on("ready", () => {
            console.error("Publisher ready");
        });
        this.subscriber.on("ready", () => {
            console.error("Subscriber ready:");
        });
        // Handle connection errors
        this.publisher.on("error", (err) => {
            console.error("Publisher error:", err);
        });
        this.subscriber.on("error", (err) => {
            console.error("Subscriber error:", err);
        });

        (async () => {
            try {
                await this.publisher.connect();
                await this.subscriber.connect();
                console.log("redis connected.")
            } catch (error) {
                console.error("error while connecting to redis:", error)
            }
        })()

        this.subscribeToChannels();

        this.subscriber.on(
            "message",
            (channel, message) => this.handleMessage(channel, message)
        );
    }

    async handleMessage(channel, message) {
        console.log("handleMessage ()...")
        console.log(`Message Received on channel (${channel}): ${message}`);
        const parsedMessage = JSON.parse(message);

        switch (channel) {
            case CHANNELS.BLOCKCHAIN:
                await this.blockchain.replaceChain({chain: parsedMessage, onSuccess: true});
                break;
            default:
                console.log(`Unhandled message on ${channel}`);
                break;
        }
    }

    subscribeToChannels() {
        Object.values(CHANNELS).forEach(async channel => {
            await this.subscriber.subscribe(channel, (msg) => {
                // console.log(`Subscribed to channel ${channel}`)
                // console.log(`Subscribed to channel ${channel} with message:`, msg)
                this.handleMessage(channel, msg);
            });
            

        });
    }


    publish({ channel, message }) {
        try {
            console.log("publishing...")
            // this.subscriber.unsubscribe(channel)
            this.publisher.publish(channel, message);
            // await this.subscriber.subscribe(channel, (msg) => {
            //     console.log(`Subscribed to channel ${channel} with message:`, msg)

            // });
            console.log("Message published!");
        } catch (error) {
            console.error("Error publishing message:", error);
        }
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    // broadcastNewBlock(newBlock){
    //     this.publish({
    //         channel: CHANNELS.BLOCKCHAIN,
    //         message: JSON.stringify(newBlock)
    //     })
    // }

}

module.exports = PubSub;
