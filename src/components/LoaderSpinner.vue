<template>
    <div :class="`${color == 'white' ? ' white-loader' : 'blue-loader'}`"></div>
</template>

<script>
export default {
    name: "LoaderSpinner",
    props: ['color']
};
</script>

<style scoped>
.blue-loader {
    border: 4px solid #2196f3;
    border-left-color: transparent;
    width: 30px;
    height: 30px;
    animation: spin89345 1s linear infinite;
    border-radius: 50%;
}

.white-loader {
    border: 4px solid #fff;
    border-left-color: transparent;
    width: 30px;
    height: 30px;
    animation: spin89345 1s linear infinite;
    border-radius: 50%;
}

@keyframes spin89345 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
