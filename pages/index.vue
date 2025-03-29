<template>
    <div class="container index">
        <site-preloader :show-preloader="showPreloader" />
        <section>
            <h2 class="index__section-subtitle">Погода в городе {{ currentCity }}</h2>
            <span class="index__current-day">{{ currentDay }}</span>
            <div v-if="dayWeather" class="index__day-weather">
                <div>
                    <p>Температура: {{ dayWeather?.main.temp }}°C</p>
                    <p>Состояние: {{ dayWeather.weather[0].description }}</p>
                </div>
            </div>
        </section>

        <site-form v-model="name" />
    </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '~/stores/weather';

const weatherStore = useWeatherStore();
const showPreloader = ref<boolean>(false);
const currentCity = computed(() => weatherStore.$state.currentCity);
const currentDay = computed(() => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
    return formatter.format(date);
});

const dayWeather = computed(() => weatherStore.$state.dayWeather);

const name = ref<string>('');

onMounted(async () => {
    // await weatherStore.setCurrentCity(currentCity.value);
});

// const dayWeather = reactive({
//     "coord": {
//         "lon": 49.1221,
//         "lat": 55.7887
//     },
//     "weather": [
//         {
//             "id": 800,
//             "main": "Clear",
//             "description": "clear sky",
//             "icon": "01n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 1.34,
//         "feels_like": -2.11,
//         "temp_min": 1.34,
//         "temp_max": 1.34,
//         "pressure": 1034,
//         "humidity": 62,
//         "sea_level": 1034,
//         "grnd_level": 1020
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 3.27,
//         "deg": 279,
//         "gust": 8.82
//     },
//     "clouds": {
//         "all": 0
//     },
//     "dt": 1742746293,
//     "sys": {
//         "type": 1,
//         "id": 9038,
//         "country": "RU",
//         "sunrise": 1742697481,
//         "sunset": 1742742126
//     },
//     "timezone": 10800,
//     "id": 551487,
//     "name": "Kazan’",
//     "cod": 200
// });

</script>

<style scoped lang="scss">
.index {
    &__section-subtitle {
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 1.3;
        letter-spacing: -1px;
    }

    &__current-day {
        display: inline-block;
        font-size: 1.5rem;
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -1px;
        opacity: 0.6;
        margin-top: 12px;
    }

    &__day-weather {
        margin-top: 2.4rem;
        display: flex;
        justify-content: space-between;
    }
}
</style>