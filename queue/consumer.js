const amqplib = require('amqplib')

const amqp_url_cloud = '' // connection link

const receiveQueue = async () => {
    try {
        // 1.Create connection
        const conn = await amqplib.connect(amqp_url_cloud)
        // 2.Create channel
        const channel = await conn.createChannel()
        // 3.Create name queue
        const nameQueue = 'q1'
        // 4.Create queue
        await channel.assertQueue(nameQueue, {
            durable: false //
        })
        // 5.Receive to queue
        await channel.consume(nameQueue, msg => {
            console.log(`Msg::`, msg.content.toString())
        }, {
            noAck: false
        })
    } catch (error) {
        console.error(`Error::`, error.message)
    }
}

receiveQueue()
