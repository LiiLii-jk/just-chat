<script lang='ts' setup>
import { onMounted } from 'vue';
import { initRender } from './starAnimation'

onMounted(() => {
    initRender()
})

</script>

<template>
    <div class="main">
        <canvas id="my_canvas"></canvas>
    </div>
</template>

<style lang='less' scoped>
#my_canvas {
    position: absolute;
    top: 0;
    left: 0;
}

.main {
    position: relative;
    
    .content {
        position: absolute;
        z-index: 99;
    }
}
</style>