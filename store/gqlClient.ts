import { createClient, everything } from '../generated/index.js';

export const gqlClient = createClient({
    url: `http://${import.meta.env.VITE_SERVER_URL}/graphql`,
});

export { everything };
