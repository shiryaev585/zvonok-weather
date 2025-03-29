<template>
    <div class="default-layout">
        <site-header />
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.default-layout {
    min-height: 100vh;
    background: linear-gradient(116.21deg, #052652 -3.25%, #2D9CDB 107.37%);
}
</style>