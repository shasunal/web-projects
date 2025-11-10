<script setup>
import {ref} from "vue"
const myVariable = ref('hello')
const greetings = ()=>{
  console.log('hi')
}
onMounted( ()=>{
  console.log(document.getElementById('blue-paragraph'))
})

</script>

<template>
  <button @click = "greetings">{{myVariable}}</button>
  <p id = "blue-paragraph">
   now I have some text0-szax
  </p>
</template>

<style scoped></style>
