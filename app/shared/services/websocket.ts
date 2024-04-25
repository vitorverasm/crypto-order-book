import SubscribeTo from '../../modules/order-book/constants/pair-connection-messages'

let connection: WebSocket | undefined;

function connect(callback: () => void) {
    if (connection === undefined) {
        const client = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

        client.addEventListener("open", () => {
            console.log('[ws] info: Connection opened')
            client.send(SubscribeTo.btcUsd)
        });

        client.addEventListener("message", (event) => {
            console.log('[ws] new message: ', event.data)
        });

        connection = client
        callback()
    }
    return connection
}

function disconnect(callback: () => void) {
    if (connection === undefined) {
        console.log('[ws] info: Connection already closed')
    }
    if (connection !== undefined) {
        connection.close()
        connection = undefined
        console.log('[ws] info: Connection closed')
        callback()
    }
}

export {
    connect,
    disconnect
}
