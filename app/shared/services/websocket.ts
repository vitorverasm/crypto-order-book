import SubscribeTo from '../../modules/order-book/constants/pair-connection-messages'

let connection: WebSocket | undefined;

function connect({ onSuccessfulConnection, onNewMessage, onClose }: {
    onSuccessfulConnection?: () => void;
    onClose?: () => void;
    onNewMessage?: (event: MessageEvent<any>) => void
}) {
    if (connection === undefined) {
        const client = new WebSocket('wss://api-pub.bitfinex.com/ws/2')

        client.addEventListener("open", () => {
            console.log('[ws] info: Connection opened')
            client.send(SubscribeTo.btcUsd)
        });

        client.addEventListener("message", (event) => {
            if (onNewMessage) {
                onNewMessage(event)
            }
        });

        client.addEventListener("close", () => {
            if (connection !== undefined) {
                connection.close()
                connection = undefined
                console.log('[ws] info: Connection closed')
                if (onClose) {
                    onClose()
                }
            }
        });

        connection = client
        if (onSuccessfulConnection) {
            onSuccessfulConnection()
        }
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
