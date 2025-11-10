<script setup>
import { ref } from 'vue'

//declare variable
let numClicks = ref(0)

function buttonClick(){
console.log('click detected')
//incrementing number
//.value needes to be used to access vlue of the variable
numClicks.value++
}

</script>

<template>
<button @click = "buttonClick">click me</button>
<div>
  number of clicks {{ numClicks }}
</div>
</template>

<style scoped>
</style>