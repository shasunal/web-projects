window.onload=()=>{
    // const never changes to another element
    const moveDiv = document.getElementById('move')

    //get first button
    const rotateButton = document.getElementById('rotate')

    const stopButton = document.getElementById('stop')

    const time = document.getElementById('time')

    //allow adjusting of the angle
    let angle = 0
    //store which interval to stop
    let intervalId;

    let leftPos = 0;
    let speed = 1;

    rotateButton.addEventListener('click', ()=>{
        //increase moveDiv

        //grab rotation using style
    // moveDiv.style.transform = "rotate(" + angle +"deg)"
        //SHORTHAND
    //  moveDiv.style.transform = `rotate(${angle}deg)`

    //takes in 2 parameters: 
    //1. callback func
    //2. # of time before interval hppens again
    
    intervalId = setInterval(()=>{
 angle++
 moveDiv.style.transform = `rotate(${angle}deg)`
//add speed to left position
 leftPos += speed;

 if(leftPos >= window.innerWidth || leftPos <0 ){
    speed *= -1
 }
 //change css property based off math calc
 moveDiv.style.left = leftPos;
    },10);

});
//make rect stop moving when button clicks
stopButton.addEventListener("click", ()=>{
    clearInterval(intervalId)
})

//shows what time I am in

//12 hour time using remainder of 12 % modular


setInterval( ()=>{
    let date = new Date()
time.textContent = (date.getHours()%12) + ":" + date.getMinutes() + ":" + date.getSeconds();
},1000);

};