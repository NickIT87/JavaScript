<template>
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <TodoList v-bind:todos='todos'/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  data() {
    return {
      isActive: true,
      todos: ['Ремонт', 'учеба', 'vue cli']
    }
  },
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
