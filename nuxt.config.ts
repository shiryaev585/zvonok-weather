// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    css: ['~/assets/style/main.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: '@use "~/assets/style/global" as *;',
                },
            },
        },
    },
    modules: [
        '@nuxt/image',
        '@pinia/nuxt',
        ['@nuxtjs/google-fonts',
            {
                families: {
                    Geologica: {
                        wght: [400, 500, 600],
                    },

                }
            }
        ],
    ],
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            apiKey: process.env.API_KEY,
        }
    },
});