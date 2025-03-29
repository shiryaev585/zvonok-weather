import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#imports';

interface DayWeather {
    id: number;
    name: string;
    timezone: number;
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
    }>;
}

interface WeatherState {
    currentCity: string;
    dayWeather: Partial<DayWeather> | null;
}

export const useWeatherStore = defineStore('weather', {
    state: (): WeatherState => ({
        dayWeather: null,
        currentCity: 'Казань'
    }),

    actions: {
        async setCurrentCity(city: string): Promise<void> {
            this.currentCity = city;

            const { apiUrl, apiKey } = useRuntimeConfig().public;

            try {
                const data = await $fetch('/weather', {
                    baseURL: apiUrl,
                    params: {
                        q: this.currentCity,
                        units: 'metric',
                        APPID: apiKey,
                    },
                });

                if (data) {
                    this.dayWeather = data as DayWeather;
                }
            } catch (err) {
                console.error('Ошибка при запросе погоды:', err);
            }
        }
    }
});