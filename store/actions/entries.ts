import { gqlClient, everything } from '../gqlClient';

export async function getEntry(sensorAddress: string, sensorId: number) {
    try {
        const response = await gqlClient.query({
            entry: {
                __args: {
                    sensorAddress,
                    sensorId,
                },
                ...everything
            }
        })

        return response.entry;
    } catch (err) {
        console.error(err);
    }
}
