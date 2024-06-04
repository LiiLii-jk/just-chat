<script lang='ts' setup>
// import { onMounted } from 'vue';
// import { initRender } from './starAnimation'

// onMounted(() => {
//     initRender()
// })

</script>

<template>
    <div class="main">
        <div class="content">
            <div class="title">
                This Is My Chat
            </div>
        </div>
        <!-- <canvas id="my_canvas"></canvas> -->
    </div>
</template>

<style lang='less' scoped>
// #my_canvas {
//     position: absolute;
//     top: 0;
//     left: 0;
// }

.main {
    position: relative;
    
    .content {
        position: absolute;
        z-index: 99;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        background: url("https://bang-dream.bushimo.jp/mygo/assets/images/common/logo_mygo.png") center center no-repeat;

        .title {
            display: flex;
            align-items: center;
            height: 50px;
            font-size: 30px;
        }
    }
}
</style>