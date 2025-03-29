<template>
    <form>
        <input type="text" v-model="model">
    </form>
</template>

<script lang="ts" setup>
const model = defineModel<string | null>()
</script>

<style scoped lang="scss">

</style>