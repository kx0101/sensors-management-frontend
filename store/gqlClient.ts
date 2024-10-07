import { createClient, everything } from '../generated/index.js';

export const gqlClient = createClient({
    url: 'http://localhost:3000/graphql',
});

export { everything };
