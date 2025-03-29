<template>
    <header class="container header">
        <nav class="header__nav">
            <nuxt-link class="header__link" to="/">Главная</nuxt-link>
            <nuxt-link class="header__link" to="/week">Погода за неделю</nuxt-link>
        </nav>
        <div class="header__select">
            <button :class="['header__select-btn', { 'header__select-btn--expanded': isSelect }]" @click="isSelect = !isSelect">
                <span>{{ currentCity }}</span>
                <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.6452 1.16467C2.41993 0.936796 2.14569 0.8125 1.83227 0.8125C1.17605 0.8125 0.666748 1.35111 0.666748 2.03474C0.666748 2.37655 0.794073 2.68729 1.01934 2.92552L7.87537 10.0104L1.01934 17.0745C0.794072 17.3127 0.666746 17.6338 0.666746 17.9653C0.666746 18.6489 1.17605 19.1875 1.83227 19.1875C2.14569 19.1875 2.41993 19.0632 2.6354 18.8353L10.2554 10.9633C10.5296 10.694 10.6667 10.3625 10.6667 10C10.6667 9.63747 10.5296 9.32673 10.2652 9.04707L2.6452 1.16467Z" fill="#E9E9F3"/>
                </svg>
            </button>

            <transition name="fade">
                <div v-if="isSelect" class="header__select-dropdown">
                    <ul class="header__select-list">
                        <li
                            v-for="city in cities"
                            :key="city.id"
                            class="header__select-city"
                            @click="citySelectHandler(city.name)"
                        >
                            {{ city.name }}
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useWeatherStore } from '~/stores/weather';

interface City {
    id: number;
    name: string;
}

const weatherStore = useWeatherStore();
const currentCity = computed(() => weatherStore.$state.currentCity);
const isSelect = ref<boolean>(false);
const cities: City[] = reactive([
    { id: 1, name: 'Москва' },
    { id: 2, name: 'Санкт-Петербург' },
    { id: 3, name: 'Казань' },
    { id: 4, name: 'Краснодар' },
    { id: 5, name: 'Тула' },
    { id: 6, name: 'Новосибирск' },
    { id: 7, name: 'Красноярск' },
    { id: 8, name: 'Омск' },
    { id: 9, name: 'Хабаровск' },
]);

const citySelectHandler = async (cityName: string): Promise<void> => {
    isSelect.value = false;
    await weatherStore.setCurrentCity(cityName);
};
</script>

<style lang="scss" scoped>
%header-item {
    background: rgba(233, 233, 243, 0.1);
    padding: 0.5rem 0.8rem;
    font-family: $font-main;
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.2;
    transition: opacity 0.3s;
}

.header {
    padding-top: 2rem;
    padding-bottom: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__nav {
        display: flex;
    }

    &__link {
        @extend %header-item;

        @include hover {
            opacity: 0.7;
        }

        &:first-of-type {
            border-radius: 8px 0 0 8px;
        }

        &:last-of-type {
            border-radius: 0 8px 8px 0;
        }

        &:not(.header__link:last-of-type) {
            border-right: 1px solid  rgba(233, 233, 243, 0.2);
        }

        &.router-link-active {
            color: rgba(255, 255, 255, 0.4);
            pointer-events: none;
        }
    }

    &__select {
        position: relative;
        min-width: 12.3rem;
    }

    &__select-btn {
        @extend %header-item;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        cursor: pointer;
        color: #fff;
        border-radius: 8px;

        @include hover {
            opacity: 0.7;
        }

        & svg {
            transition: transform 0.3s;
        }

        &--expanded {
            & svg {
                transform: rotate(90deg);
            }
        }
    }

    &__select-dropdown {
        width: 100%;
        max-height: 11.5rem;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        left: 0;
        top: calc(100% + 12px);
        background: rgba(26, 102, 156, 1);
        border-radius: 8px;
        scrollbar-width: thin;
        scrollbar-color: #1a669c #3977a2;

        &::-webkit-scrollbar {
            width: 12px;
            height: 12px;
        }

        ::-webkit-scrollbar-track {
            background: #3977a2;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: #1a669c;
            border-radius: 10px;
        }
    }

    &__select-list {

    }

    &__select-city {
        @extend %header-item;
        cursor: pointer;
        transition: background 0.3s;

        &:first-of-type {
            border-radius: 8px 8px 0 0;
        }

        &:last-of-type {
            border-radius: 0 0 8px 8px;
        }

        @include hover {
            background: rgba(233, 233, 243, 0.2);

        }
    }
}
</style>