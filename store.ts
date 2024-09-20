import { defineStore } from 'pinia';
import type { ISensor, IBell, IAlarm } from './types';
import { ref, computed } from 'vue';

import { createClient, everything } from './generated/index.js';

const gqlClient = createClient({
    url: 'http://localhost:3000/graphql',
})

export const useSensorsDataStore = defineStore('sensorsdata', () => {
    const sensors = ref<ISensor[]>([]);
    const bell = ref<IBell>({
        _id: '',
        status: false,
    });
    const alarms = ref<IAlarm[]>([]);
    const visible = ref(false);

    const getSensor = computed(() => (id: string) => sensors.value.find((sensor) => sensor._id === id));
    const getSensors = computed(() => sensors.value);
    const getBell = computed(() => bell.value);
    const getAlarm = computed(() => alarms.value);

    async function initStore() {
        try {
            const data = await gqlClient.query({
                sensors: {
                    ...everything,
                }
            })

            sensors.value = (data.sensors || []).filter(sensor => sensor !== null) as ISensor[];

            const bellData = await gqlClient.query({
                bell: {
                    ...everything,
                }
            })

            bell.value = bellData.bell || { _id: '', status: false } as IBell;
        } catch (err) {
            console.error(err);
        }
    }

    async function updateSensor(data: ISensor) {
        try {
            const response = await gqlClient.mutation({
                updateSensor: {
                    __args: {
                        sensorInput: data,
                    }
                },
            });

            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteSensor(id: string) {
        try {
            const response = await gqlClient.mutation({
                deleteSensor: {
                    __args: {
                        _id: id
                    }
                },
            });

            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    function changeStatus(index: number) {
        if (sensors.value[index]) {
            sensors.value[index].status = true;
        }
    }

    async function updateBell(data: IBell) {
        try {
            const response = await gqlClient.mutation({
                updateBell: {
                    __args: {
                        bellInput: data,
                    },
                    _id: true,
                    status: true,
                },
            });

            console.log(response.updateBell);
            return response.updateBell;
        } catch (err) {
            console.error(err);
        }
    }

    function setVisible() {
        visible.value = !visible.value;
    }

    async function updateAlarm(alarm: any) {
        try {
            const response = await gqlClient.mutation({
                updateAlarm: {
                    __args: {
                        alarmInput: alarm,
                    }
                },
            });

            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return {
        sensors,
        bell,
        visible,
        alarms,
        getSensor,
        getSensors,
        getBell,
        getAlarm,
        initStore,
        updateSensor,
        deleteSensor,
        changeStatus,
        updateBell,
        setVisible,
        updateAlarm,
    };
},
)
