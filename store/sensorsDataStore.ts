import { defineStore } from 'pinia';
import {
    getSensorsByBatch,
    getSensorByAddressAndId,
    getSensorEntriesLast24Hours,
    sensors,
    deleteSensor,
    fetchSensors,
    getSensor,
    getSensors,
    getSensorsByBuilding,
    getSensorUniqueBuildings,
    uniqueBuildings,
    loading,
} from './actions/sensors';
import { bell, fetchBell, updateBellStatus, testBell, getBell } from './actions/bell';
import { getAlarms, updateAlarm, getAlarmsByAknowledged, alarms } from './actions/alarms';
import { getEntry } from './actions/entries';

export const useSensorsDataStore = defineStore('sensorsdata', () => {
    async function initStore() {
        await fetchSensors();
        await fetchBell();
        await getSensorUniqueBuildings();
    }

    return {
        bell,
        sensors,
        alarms,
        getSensor,
        getSensors,
        getBell,
        initStore,
        updateBellStatus,
        testBell,
        getSensorsByBuilding,
        uniqueBuildings,
        updateAlarm,
        getAlarms,
        getAlarmsByAknowledged,
        deleteSensor,
        getEntry,
        getSensorUniqueBuildings,
        getSensorsByBatch,
        getSensorByAddressAndId,
        getSensorEntriesLast24Hours,
        loading,
    };
});
