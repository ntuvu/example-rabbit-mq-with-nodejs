const amqplib = require('amqplib')

const amqp_url_cloud = '' // connection link

const sendQueue = async ({msg}) => {
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
        // 5.Send to queue
        await channel.sendToQueue(nameQueue, Buffer.from(msg))
    } catch (error) {
        console.error(`Error::`, error.message)
    }
}

sendQueue({msg: 'Hello'})
