import { Client, createClient as createWsClient } from 'graphql-ws';

class WebSocketManager {
    private wsClient: Client;
    private activeSubscriptions: Record<string, boolean> = {};

    constructor() {
        this.wsClient = createWsClient({
            url: 'ws://localhost:3000/graphql',
        });
    }

    subscribe(subscriptionName: string, query: string, callback: (data: any) => void) {
        if (this.activeSubscriptions[subscriptionName]) {
            console.log(`Already subscribed to ${subscriptionName}`);
            return;
        }

        this.wsClient.subscribe(
            { query },
            {
                next: (data) => {
                    callback(data.data[subscriptionName]);
                },
                error: (error) => console.error(error),
                complete: () => console.log(`${subscriptionName} subscription completed`),
            }
        );

        this.activeSubscriptions[subscriptionName] = true;
    }

    unsubscribe(subscriptionName: string) {
        if (this.activeSubscriptions[subscriptionName]) {

            // graphql-ws handles closing the connection automatically

            this.activeSubscriptions[subscriptionName] = false;
            console.log(`Unsubscribed from ${subscriptionName}`);
        }
    }
}

export const wsManager = new WebSocketManager();
export const entryCreatedQuery = `
subscription EntrySubscription {
    entryCreated {
        _id
        address
        sensor
        value
        expireAt
        createdAt
        updatedAt
    }
}
`
export const alarmCreatedQuery = `
subscription AlarmSubscription {
    alarmCreated {
        _id
        address
        aknowledged
        createdAt
        reason
        sensor
        updatedAt
    }
}
`

export const timeoutCreatedQuery = `
subscription TimeoutSubscription {
    timeoutCreated {
        sensor_id
        timeout
    }
}
`
