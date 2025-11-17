<!-- Fragmenta font is from https://www.dafont.com/ -->
 <!-- code help from https://developer.mozilla.org/en-US/docs/Web/API/Element-->
  <!-- get x and y  https://www.geeksforgeeks.org/html/html-dom-getboundingclientrect-method/ -->
<!-- SCRIPT -->
<script setup>
// import all libraries
//onMounted runs code onBeforeMounted runs before component is removed from page
import { ref, onMounted, onBeforeUnmount } from "vue";
//editable text-block
const editable = ref(null);
//array of reassurances
const overlays = ref([]);
// the actual spacing on the text starts at normal 0
const spacing = ref(0);
//spacing will move towards targer spacing
//target will change every few sec
let target = 0;
let animateLoop = null;
let targetLoop = null;
//floating overlay messages
const messages = [
 "Nothing like that will ever happen",
  "Don't think about that",
  "I am not my thoughts",
  "Until it feels right",
  "1 2 3 4 5",
  "5 10 15 20 25 30 35 40 45 50",
  "Do it again",
  "again",
  "That can't happen to me",
  "Everything will be okay",
];

//one glitch activates at once
function activateGlitches(count = 1) {
  //findspans hat are not already activated
   //gets all the spans by label
  let remaining = Array.from(
   
    document.querySelectorAll(".glitch-target:not(.glitch-activated)")
  );
//end if no more
  if (remaining.length === 0) return;
//loop
  for (let i = 0; i < count; i++) {
    if (remaining.length === 0) break;
    // choose random span
    const rand = Math.floor(Math.random() * remaining.length);
    const el = remaining[rand];
    // remove it from the list
    remaining.splice(rand, 1);
    // mark span as activated
    el.classList.add("glitch-activated");

    //delay appearance so it looks random
    const delay = 80 + Math.random() * 600;
    setTimeout(() => lockSpanToFragmenta(el), delay);
  }
}


//changes the font and adds class to ensure it is not picked again
function lockSpanToFragmenta(el) {
  el.style.fontFamily = "Fragmenta";
  el.classList.add("glitch-activated");
}




function handleDelete(e) {
  if (e.key !== "Backspace" && e.key !== "Delete") return;
//user cannot actually delete
  e.preventDefault();
  e.stopPropagation();
//stop if there is no highlight selection
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
//stop of selection is collapsed
  const range = selection.getRangeAt(0);
  if (range.collapsed) return;
//get the x y of where selection
  const rect = range.getClientRects()[0];
  if (!rect) return;

  const wrapperRect = editable.value.getBoundingClientRect();

  //positioning by subtract wrapper position from the selection's pos
  const relativeTop = rect.top - wrapperRect.top - 12;
  const relativeLeft = rect.left - wrapperRect.left;

  //pick a random msg from the array
  const msg = messages[Math.floor(Math.random() * messages.length)];
//push a new overlay with these values
  overlays.value.push({
    text: msg,
    top: relativeTop,
    left: relativeLeft,
  });
  //trigger the glitch 6 of them for 1 overlay
  activateGlitches(6);


  // Remove text highlight
  selection.removeAllRanges();

  

}




onMounted(() => {
  //random new target every 3 seconds for spacing
  targetLoop = setInterval(() => {
    target = Math.random() * 2; //spacing wideness
  }, 3000); //seconds for each new targer
  animateLoop = setInterval(() => {
    spacing.value += (target - spacing.value) * 0.05; //slow loop
  }, 10); //how fast the animation updates per second framerate
 
});
//stop the target and animation 
onBeforeUnmount(() => {
  clearInterval(animateLoop);
  clearInterval(targetLoop);
  
});


</script>

<!-- HTML -->
 <!-- this will loop through all the overly items
  and places them at a coordinate
  and show the overlay text -->
<template>
  <div class="wrapper">
    <div class="overlay-container">
      <div
     
        v-for="(o, index) in overlays"
        :key="index"
        class="overlay-text"
        :style="{ top: o.top + 'px', left: o.left + 'px' }"
      >
        {{ o.text }}
      </div>
    </div>



    <!--This tells Vue to watch spacing and update
whenever the letter spacing's value changes  
Contenteditable - the user can select the content
letterspacing animates the letter spacing animation
keydown creates the overlay text  -->
    <div
      ref="editable"
      class="text-block"
      :style="{ letterSpacing: spacing + 'px' }"
      @keydown="handleDelete"
      contenteditable="true"
      spellcheck="false"
     
       
    >
      This car I am in <span class="glitch-target">is going to crash</span> I am going to do <span class="glitch-target">s</span>omething terrible
      <span class="glitch-target">Their heads caved in The ceiling</span> <span class="glitch-target">and </span>floor will co<span class="glitch-target">llapse on al</span>l of us
      <span class="glitch-target">Blood everywhere My</span> right foot goes first <span class="glitch-target">Everyone on this train is going</span>
      to <span class="glitch-target">die</span> Don’t breathe in the <span class="glitch-target">dirt</span>y air The car is going to veer <span class="glitch-target">off</span> the
      b<span class="glitch-target">ridge Imagine the</span>ir <span class="glitch-target">scre</span>am<span class="glitch-target">ing</span> Don’t touch <span class="glitch-target">any</span>thing someone else has
      touched I might lose con <span class="glitch-target">trol Horrifying imagery</span> This car I am in is going
      to cr<span class="glitch-target">ash </span>I am going to do something <span class="glitch-target">te</span>rrible Their <span class="glitch-target">heads</span> caved in The
      ceiling and floor will collapse on <span class="glitch-target">all of us </span><span class="glitch-target">Blood everywhere</span> My right
      foot goes first Every <span class="glitch-target">one</span> on this train is going to <span class="glitch-target">die Don’t breathe in
      the dirty</span> air The <span class="glitch-target">car is going to veer off</span> the bridge Or else you'll die Imagine their
      scr <span class="glitch-target">eami</span>ng <span class="glitch-target">Don’t</span> touch anything someone else has touched I might lose
      control Horrifying imagery This car I am in is going to  <span class="glitch-target">cras</span>h I am going
      to do something te<span class="glitch-target">rrible Their hea</span>ds <span class="glitch-target">ca</span>ved in The ceiling and floor will
      collapse on all of us  <span class="glitch-target">Blood everywhere</span> <span class="glitch-target">My right foot goes</span> first Everyone
      on this t <span class="glitch-target">ra</span>in is going to <span class="glitch-target">die</span> Don’t breathe in the di<span class="glitch-target">rty</span> air Or else you'll die The car is
      going to veer off the bridge <span class="glitch-target">Imagine their screaming Don’t</span> touch anything
      someone <span class="glitch-target">els</span>e has touched <span class="glitch-target">I might lose control</span>  Horrifying ima<span class="glitch-target">gery This car
      I am in is going</span> to  <span class="glitch-target">crash</span> I am going to do so<span class="glitch-target">mething terrible</span> Their heads
      caved in <span class="glitch-target">Or else you'll die</span> The ceiling and floor will collapse on <span class="glitch-target">all</span> of us Blood everywhere
      My <span class="glitch-target">right foot goes</span> first Everyone <span class="glitch-target">on this train</span> is going to <span class="glitch-target">di</span>e Don’t
      breathe in the  <span class="glitch-target">dirty air The car is</span> going to veer  <span class="glitch-target">off</span> the bridge Imagine
      their screaming Don’t t <span class="glitch-target">ouch anything someone else</span> has touched I might lose
      <span class="glitch-target">control Horrifying</span> imagery Or else you'll die This car I am in is <span class="glitch-target">goin</span>g to crash I <span class="glitch-target">am </span>going
      to do something terrible <span class="glitch-target">Their hea</span>ds caved in The ceiling and floor will
      col <span class="glitch-target">lapse on all of us</span>  <span class="glitch-target">Blood ev</span>erywhere My right foot goes first Everyone
      on this train is going to <span class="glitch-target">>die Don’t breathe</span> in the dirty air The car is
      going to veer <span class="glitch-target">off the bridge</span> Imag<span class="glitch-target">ine</span> their screaming Don’t touch an<span class="glitch-target">ythi</span>ng
      someone else has  <span class="glitch-target">touched</span> I <span class="glitch-target">mig</span>ht lose control Ho <span class="glitch-target">rrif</span>ying imagery This car
      <span class="glitch-target">I a</span>m in is going to crash Or else you'll die I am going to do s<span class="glitch-target">omet</span>hing terrible Their heads
      caved in The cei<span class="glitch-target">ling</span> and floor <span class="glitch-target">wil</span>l collapse on all of us Or else you'll die Blood everywhere
      My right foot  <span class="glitch-target">es first Everyone on this train</span> is going to <span class="glitch-target">die D</span>on’t
      <span class="glitch-target">breathe in the</span> dirty air Or else you'll die The car is going to veer <span class="glitch-target">off the bridge</span> Imagine
      their  <span class="glitch-target">screaming Don’t</span> touch <span class="glitch-target">anything someone else has</span> touched I might lose
      control Hor<span class="glitch-target">rifying imagery</span> This car I am in is going to <span class="glitch-target">crash</span> I am going
      to do something terrible Their heads caved in The ceiling and floor will
      <span class="glitch-target">collapse on</span> all of us B<span class="glitch-target">loo</span>d everywhere My right foot goes first <span class="glitch-target">Everyone</span>
      on this train is going to  <span class="glitch-target">die Don’t</span> br <span class="glitch-target">eathe in the dirty air The</span> car is
      going to veer <span class="glitch-target">off the bridge</span> Imagine their scr<span class="glitch-target">eamin</span>g Don’t touch anything
      someone else has to<span class="glitch-target">uched I might lose</span> control <span class="glitch-target">Horrifying image</span>ry This car
      I am in <span class="glitch-target">is </span>going to  <span class="glitch-target">cra</span>sh I am going to do something terrible Their heads
      caved in The <span class="glitch-target">ceiling and floor will collapse </span>on all of us Blood everywhere
      My right foot goes first Ev<span class="glitch-target">eryone on</span> this train is <span class="glitch-target">going to die</span> Don’t
      breathe in the dirty<span class="glitch-target"> air</span> The car is going to <span class="glitch-target">veer off the bridge Imagine</span>
      their screaming  <span class="glitch-target">Don’t touc</span>h anything someone e<span class="glitch-target">lse has touched I might</span> lose
      control Horrifying imagery This car I am in <span class="glitch-target">is</span> going to crash I am going
      to do something terrible <span class="glitch>-target">Their heads caved in</span> The ceiling and floor will
      collapse on <span class="glitch-target">all</span> of us Blood every<span class="glitch-target">where My right</span> foot goes first Everyone
      on this train is <span class="glitch-target"> going to die Don’t breathe in the dirty</span> air The car is
      going to veer off the <span class="glitch-target">bridge</span> Imagine <span class="glitch-target">their screaming</span> Don’t touch anything
      someone else has touched I might <span class="glitch-target">los</span>e control Horrifying imagery This car
      I am <span class="glitch-target">in</span> is going to crash I am going to <span class="glitch-target">do something terrible</span> Their heads
      caved in The ceiling and floor will collapse on all of us <span class="glitch-target">Blood </span>everywhere
      My right foot goes first Everyone on this train is going to die Don’t
      breathe in <span class="glitch-target">the dirty air</span> The car is g<span class="glitch-target">oin</span>g to veer off the bridge Imagine
      their screaming Don’t touch anything someone else has touched I might lose
      control Horrifying imagery This car I am in is going to crash I am going
      to do something terrible Their heads <span class="glitch-target">caved in The</span> ceiling and floor will
      collapse on all of us Blood everywhere My right foot goes first Everyone
      on this train is going to <span class="glitch-target">die</span> Don’t breathe in the dirty air The car is
      going to veer off the bridge Imagine their screaming Don’t touch anything
      someone else has touched I might lose control <span class="glitch-target">Horrify</span>ing imagery This car
      I am in is going to crash I am going to do something terrible Their heads
      caved in The ceiling and floor will collapse on all of us Blood everywhere
      My right foot goes first Everyone on this train is going to die Don’t
      breathe in the dirty air The car is going to veer off the bridge Imagine
      their screaming Don’t touch anything someone else has touched I might lose
      control Horrifying imagery
    </div>
  </div>
</template>
<!-- STYLE CSS -->

<style>
body {
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "Fragmenta";
  src: url("/fonts/Fragmenta.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
</style>
<style scoped>
.wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  background-color: black;
  font-family: "Alike", serif;
}

.text-block {
  outline: none;
  font-size: 20px;
  color: #666666;
  outline: none;
  text-align: justify;
  line-height: 1.5;
  white-space: pre-wrap;
}

.overlay-container {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 100%;
  pointer-events: none;
  z-index: 9999;
}
.overlay-text {
  position: absolute;
  pointer-events: none;
  color: white;
  white-space: nowrap;
  font-size: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff; */
}

.text-block::selection,
.text-block *::selection {
  background: yellow;
  color: black;
}

.alike-regular {
  font-family: "Alike", serif;
  font-weight: 400;
  font-style: normal;
}

.glitch-font {
  font-family: "Fragmenta";
  font-size: 20px;
  color: #666666;
}

.glitch-active {
  color: gray;
 
}
.text-block {
  user-select: none;
}

.text-block span,
.text-block div {
  user-select: text;
}



</style>
