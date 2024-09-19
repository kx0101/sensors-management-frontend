<template>
    <div>
        <button @click="subscribe">Subscribe to Updates</button>
        <button @click="createEntry">Create Entry</button>
        <div v-if="loading">Loading...</div>
        <div v-if="error">{{ error }}</div>
        <ul>
            <li v-for="item in data" :key="item.id">{{ item.address }} - {{ item.sensor }}: {{ item.value }}</li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue';
import { GraphQLClient } from 'graphql-request';
import { createClient } from 'graphql-ws';

export const wsClient = createClient({
    url: 'ws://localhost:3000/subscriptions',
});

const endpoint = 'http://localhost:3000/graphql';
const graphqlClient = new GraphQLClient(endpoint);

export default {
    setup() {
        const loading = ref(false);
        const error = ref(null);
        const data = ref([]);

        const subscribe = () => {
            const query = `
        subscription {
          entryCreated {
            address
            sensor
            value
          }
        }
      `;

            wsClient.subscribe(
                { query },
                {
                    next: (response) => {
                        data.value.push(response.data.entryCreated);
                    },
                    error: (err) => {
                        error.value = err.message;
                    },
                }
            );
        };

        const createEntry = async () => {
            const mutation = `
        mutation CreateEntry($entryInput: EntryCreate!) {
          createEntry(entryInput: $entryInput) {
            address
            sensor
            value
          }
        }
      `;

            const variables = {
                entryInput: {
                    address: 'liakos',
                    sensor: 1,
                    value: 22,
                },
            };

            try {
                loading.value = true;
                error.value = null;
                await graphqlClient.request(mutation, variables);
            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };

        return {
            loading,
            error,
            data,
            subscribe,
            createEntry,
        };
    },
};
</script>
