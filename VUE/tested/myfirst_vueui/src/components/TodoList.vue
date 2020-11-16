<template>
    <ol>
        <li v-for="(todo, index) in todos" :key="index">
            {{ todo }}
        </li>
    </ol>
</template>

<script>
export default {
    name: "todo",
    props: ['todos'],
}
</script>

<style scoped>
ol {
    color: rgb(7, 159, 179);
}
</style>