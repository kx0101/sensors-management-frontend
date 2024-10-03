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
    const uniqueBuildings = ref<string[]>([]);

    const getSensor = computed(() => (id: string) => sensors.value.find((sensor) => sensor._id === id));
    const getSensors = computed(() => sensors.value);
    const getBell = computed(() => bell.value);
    const getAlarm = computed(() => alarms.value);
    const getUniqueBuildings = computed(() => uniqueBuildings.value);

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

    async function getSensorByAddressAndId(address: string, sensor_id: number) {
        try {
            const response = await gqlClient.query({
                getSensorByAddressAndId: {
                    __args: {
                        address,
                        sensor_id,
                    },
                    ...everything,
                }
            })

            return response.getSensorByAddressAndId || null
        } catch (err) {
            console.error(err);
        }
    }

    async function getSensorsByBatch(sensorInputs) {
        try {
            const response = await gqlClient.query({
                getSensorsByBatch: {
                    __args: {
                        inputs: sensorInputs,
                    },
                    ...everything,
                }
            })

            return response.getSensorsByBatch || [];
        } catch (err) {
            console.error(err);
        }
    }

    async function getSensorsByBuilding(building: string) {
        try {
            const response = await gqlClient.query({
                getSensorsByBuilding: {
                    __args: {
                        building,
                    },
                    ...everything,
                }
            })

            return response.getSensorsByBuilding || [];
        } catch (err) {
            console.error(err);
        }
    }

    async function getSensorUniqueBuildings() {
        try {
            const response = await gqlClient.query({
                getSensorUniqueBuildings: true
            });

            uniqueBuildings.value = response.getSensorUniqueBuildings || [];
        } catch (err) {
            console.error('Failed to fetch unique buildings:', err);
        }
    }

    async function updateSensor(data: ISensor) {
        try {
            const response = await gqlClient.mutation({
                updateSensor: {
                    __args: {
                        sensorInput: {
                            _id: data._id,
                            name: data.name,
                            description: data.description,
                            address: data.address,
                            location: data.location,
                            type: data.type,
                            sensor_id: data.sensor_id,
                            unit: data.unit,
                            status: data.status,
                            building: data.building,
                            up_limit: data.up_limit,
                            down_limit: data.down_limit,
                        },
                    },
                    ...everything,
                },
            });

            return {
                success: true,
                data: response.updateSensor,
            }
        } catch (err) {
            return {
                success: false,
                error: err,
            }
        }
    }

    async function deleteSensor(id: string) {
        try {
            const response = await gqlClient.mutation({
                deleteSensor: {
                    __args: {
                        _id: id
                    },
                    ...everything,
                },
            });

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

            return response.updateBell;
        } catch (err) {
            console.error(err);
        }
    }

    function setVisible() {
        visible.value = !visible.value;
    }

    async function getAlarmsByAknowledged(aknowledged: boolean) {
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

    async function updateAlarm(alarmId: string, aknowledged: boolean) {
        try {
            const response = await gqlClient.mutation({
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

    async function createSensor(data: ISensor) {
        try {
            const response = await gqlClient.mutation({
                createSensor: {
                    __args: {
                        sensorInput: {
                            name: data.name,
                            description: data.description,
                            address: data.address,
                            location: data.location,
                            type: data.type,
                            sensor_id: data.sensor_id,
                            unit: data.unit,
                            status: data.status,
                            building: data.building,
                            up_limit: data.up_limit,
                            down_limit: data.down_limit,
                        },
                    },
                    ...everything
                },
            });

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
        createSensor,
        getSensorsByBuilding,
        getSensorUniqueBuildings,
        uniqueBuildings,
        getUniqueBuildings,
        getAlarmsByAknowledged,
        getSensorsByBatch,
        getSensorByAddressAndId,
    };
},
)
