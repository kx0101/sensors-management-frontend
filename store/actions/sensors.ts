import { gqlClient, everything } from '../gqlClient';
import type { ISensor } from '../../types';
import { ref, computed } from 'vue';

export const sensors = ref<ISensor[]>([]);
export const uniqueBuildings = ref<string[]>([]);

export const getSensor = computed(() => (id: string) => sensors.value.find(sensor => sensor._id === id));
export const getSensors = computed(() => sensors.value);
export const getUniqueBuildings = computed(() => uniqueBuildings.value);

export async function fetchSensors() {
    try {
        const data = await gqlClient.query({
            sensors: {
                ...everything,
            }
        });
        sensors.value = (data.sensors || []).filter(sensor => sensor !== null) as ISensor[];
    } catch (err) {
        console.error(err);
    }
}

export async function getSensorsByBuilding(building: string) {
    try {
        const response = await gqlClient.query({
            getSensorsByBuilding: {
                __args: { building },
                ...everything,
            }
        });
        return response.getSensorsByBuilding || [];
    } catch (err) {
        console.error(err);
    }
}

export async function getSensorUniqueBuildings() {
    try {
        const response = await gqlClient.query({
            getSensorUniqueBuildings: true
        });

        uniqueBuildings.value = response.getSensorUniqueBuildings || [];
    } catch (err) {
        console.error('Failed to fetch unique buildings:', err);
    }
}

export async function updateSensor(data: ISensor) {
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

export async function deleteSensor(id: string) {
    try {
        await gqlClient.mutation({
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

export async function createSensor(data: ISensor) {
    try {
        await gqlClient.mutation({
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

export async function getSensorEntriesLast24Hours(sensorInputs) {
    try {
        const response = await gqlClient.query({
            getSensorEntriesLast24Hours: {
                __args: {
                    sensors: sensorInputs,
                },
                ...everything
            }
        });

        return response.getSensorEntriesLast24Hours || [];
    } catch (err) {
        console.error(err);
    }
}

export async function getSensorByAddressAndId(address: string, sensor_id: number) {
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

export async function getSensorsByBatch(sensorInputs) {
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
