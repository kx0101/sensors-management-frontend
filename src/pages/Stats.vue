<template>
    <div class="card-container">
        <Card v-for="sensor in sensors" :key="`${sensor.sensor_id}-${sensor.address}`" class="card pt-2">
            <template #content>
                <div class="chart-container">
                    <Chart class="h-30rem" :update-mode="'active'" type="line" :options="chartOptions(sensor)"
                        :data="chartData(sensor.sensor_id, sensor.address, sensor.name)" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, registerables } from 'chart.js';
import { computed, onMounted, ref, watch } from "vue";
import { useSensorsDataStore } from '../../store';
import { ISensor } from '../../types';

ChartJS.register(...registerables);

const store = useSensorsDataStore();
const sensors = computed(() => store.sensors);

const results = ref<{ sensorId: number; address: string; averagePerHour: number[] }[]>([]);

const chartData = (sensorId: number, address: string, sensorName: string) => {
    const result = results.value.find(r => r.sensorId === sensorId && r.address === address);

    return {
        labels: [...Array(24).keys()].map(hour => `${hour}:00`),
        datasets: [
            {
                label: sensorName,
                data: result ? result.averagePerHour : new Array(24).fill(0),
                fill: true,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--cyan-800'),
                tension: 0.8,
            },
        ],
    };
};

const chartOptions = (sensor: ISensor) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = '#FFFFFF';
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const result = results.value.find(r => r.sensorId === sensor.sensor_id && r.address === sensor.address);
    const data = result ? result.averagePerHour : new Array(24).fill(0);

    const minDataValue = Math.min(...data);
    const maxDataValue = Math.max(...data);

    const minLimit = Math.min(sensor.down_limit, minDataValue);
    const maxLimit = Math.max(sensor.up_limit, maxDataValue);

    return {
        maintainAspectRatio: false,
        responsive: true,
        layout: {
            padding: { left: 10, top: 10, right: 10, bottom: 10 },
        },
        plugins: {
            legend: { labels: { color: textColor } },
        },
        scales: {
            x: {
                type: 'category',
                ticks: { color: textColor },
                grid: { color: surfaceBorder },
            },
            y: {
                min: minLimit,
                max: maxLimit,
                ticks: { color: textColor },
                grid: { color: surfaceBorder },
            },
        },
    };
};

watch(sensors, async (sensors) => {
    const sensorInputs = sensors.map(sensor => ({
        address: sensor.address,
        sensor_id: sensor.sensor_id,
    }));

    try {
        const averages = await store.getSensorEntriesLast24Hours(sensorInputs);

        averages.forEach(({ sensorId, averages, address }) => {
            results.value.push({
                sensorId: sensorId,
                averagePerHour: averages,
                address,
            });
        });
    } catch (error) {
        console.error("Error fetching data for sensors:", error);
    }
});

</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 16px;
}

.card {
    transition: all 0.3s ease;
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.chart-container {
    width: 100%;
    flex: 1;
    padding: 0;
    margin: 0;
}

@media (max-width: 768px) {
    .card {
        width: 100%;
    }
}
</style>
