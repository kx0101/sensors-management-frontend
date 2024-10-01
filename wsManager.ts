import { Client, createClient as createWsClient } from 'graphql-ws';

class WebSocketManager {
    private wsClient: Client;
    private isSubscribed: boolean = false;

    constructor() {
        this.wsClient = createWsClient({
            url: 'ws://localhost:3000/graphql',
        });
    }

    subscribe(callback: (data: any) => void) {
        if (this.isSubscribed) {
            return;
        }

        const query = `
            subscription {
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
        `;

        this.wsClient.subscribe(
            { query },
            {
                next: (data) => {
                    callback(data.data.entryCreated);
                },
                error: (error) => console.error(error),
                complete: () => console.log('Subscription completed'),
            }
        );

        this.isSubscribed = true;
    }

    unsubscribe() {
        this.isSubscribed = false;
    }
}

export const wsManager = new WebSocketManager();
