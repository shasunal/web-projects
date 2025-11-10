<script setup>

import { onMounted } from 'vue';
import MyButton from './MyButton.vue';

//onmounted is like window.onload
onMounted(()=>{
  console.log('the component has mounted, added to the DOM');
})

// const buttonClick = ()=>{
// }

//same as above


</script>

<template>
<MyButton />


</template>



<style scoped>
button{
  border: 3px solid violet;
}

</style>
