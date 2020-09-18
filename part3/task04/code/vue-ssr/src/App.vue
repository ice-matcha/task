<template>
    <div id="app">
        <h1>{{ message }}</h1>
        <h2>绝世小逗比</h2>
        <div>
            <input v-model="message">
        </div>
        <div>
            <button @click="onClick">Test</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'App',
    data() {
        return{
            message: '绝世小逗比'
        }
    },
    methods: {
        onClick(){
            console.log("test success");
        }
    }
}
</script>

<style scoped>

</style>