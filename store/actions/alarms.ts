import { ref } from "vue";
import { everything, gqlClient } from "../gqlClient";
import { IAlarm } from "../../types";

export const alarms = ref<IAlarm[]>([]);

export async function getAlarms(limit: number, offset: number) {
    try {
        const response = await gqlClient.query({
            alarms: {
                __args: {
                    limit,
                    offset,
                },
                ...everything
            }
        })

        return response.alarms || [];
    } catch (err) {
        console.error(err);
    }
}

export async function getAlarmsByAknowledged(aknowledged: boolean) {
    try {
        const response = await gqlClient.query({
            getAlarmsByAknowledged: {
                __args: {
                    aknowledged
                },
                ...everything
            }
        });

        return response.getAlarmsByAknowledged || [];
    } catch (err) {
        console.error(err);
    }
}

export async function updateAlarm(alarmId: string, aknowledged: boolean) {
    try {
        await gqlClient.mutation({
            updateAlarm: {
                __args: {
                    alarmInput: {
                        _id: alarmId,
                        aknowledged
                    },
                },
                ...everything,
            },
        });

    } catch (err) {
        console.error(err);
    }
}
