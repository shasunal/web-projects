<!-- SCRIPT -->
<script setup>
// import all libraries
import {ref, onMounted, onBeforeUnmount} from "vue"
// the actual spacing on the text starts at normal 0
const spacing = ref(0);
// how the spacing will change
let target = 0;
let animateLoop = null
let targetLoop = null

onMounted(()=>{
  //random new target every 3 seconds for spacing
  targetLoop = setInterval(()=>{
    target = Math.random() * 2 //spacing wideness
  }, 2000) //seconds
animateLoop = setInterval(()=>{
  spacing.value += (target - spacing.value) * 0.05 //slow loop
}, 2) //how fast the animation updates per second


})
onBeforeUnmount(()=>{
  clearInterval(animateLoop)
  clearInterval(targetLoop)
})

</script>

<!-- HTML -->
<template>
  <div class="wrapper">

    <!--This tells Vue to watch currentSpacing and update
whenever the letter spacing's value changes  
Contenteditable - the user can edit the content -->
    <div
      ref="textBlock"
      class="text-block"
      :style="{ letterSpacing: spacing + 'px' }"
      contenteditable="true"
    >
     This car I am in is going to crash I am going to do something terrible Their heads caved in The ceiling and floor will collapse on all of us Blood everywhere My right foot goes first Everyone on this train is going to die Don’t breathe in the dirty air The car is going to veer off the bridge Imagine their screaming Don’t touch anything someone else has touched I might lose control Horrifying imagery This car I am in is going to crash I am going to do something terrible Their heads caved in The ceiling and floor will collapse on all of us Blood everywhere My right foot goes first Everyone on this train is going to die Don’t breathe in the dirty air The car is going to veer off the bridge Imagine their screaming Don’t touch anything someone else has touched I might lose control Horrifying imagery This car I am in is going to crash I am going to do something terrible Their heads caved in The ceiling and floor will collapse on all of us Blood everywhere My right foot goes first Everyone on this train is going to die Don’t breathe in the dirty air The car is going to veer off the bridge Imagine their screaming Don’t touch anything someone else has touched I might lose control Horrifying imagery This car I am in is going to crash I am going to do something terrible Their heads caved in The ceiling and floor will collapse on all of us Blood everywhere My right foot goes first Everyone on this train is going to die Don’t breathe in the dirty air The car is going to veer off the bridge Imagine their screaming Don’t touch anything someone else has touched I might lose control Horrifying imagery This car I am in is going to crash I am going to do something terrible Their heads caved in The ceiling and floor will collapse on all of us Blood everywhere My right foot goes first Everyone on this train is going to die Don’t breathe in the dirty air The car is going to veer off the bridge Imagine their screaming Don’t touch anything someone else has touched I might lose control Horrifying imagery This car I am in is going to crash I am going to do something terrible Their heads caved in The ceiling and floor will collapse on all of us Blood everywhere My right foot goes first Everyone on this train is going to die Don’t breathe in the dirty air The car is going to veer off the bridge Imagine their screaming Don’t touch anything someone else has touched I might lose control Horrifying imagery 

    </div>
  </div>
</template>
<!-- STYLE CSS -->

<style>
body{
  margin: 0;
  padding: 0;
  background-color: black;
}

</style>
<style scoped>



.wrapper{
  background-color: black;
  min-height: 100vh;
  overflow: hidden;
  color: gray;
  padding: 0;
  margin: 0;
  font-size: 20px;
  padding: 1rem;
  
  
}

.text-block{
  outline: none;
  text-align: justify;
  line-height: 1.5;
}


</style>
