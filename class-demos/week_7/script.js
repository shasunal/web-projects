window.onload=()=>{
   //add 2 p elements to contain sizes of the screen
    let p =document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')

    //adding elements to html 
     document.getElementById('content').appendChild(p)
    document.getElementById('content').appendChild(p2)
    document.getElementById('content').appendChild(p3)

 //event listerner based on window when size changes
   window.addEventListener('resize', ()=>{


 p.innerHTML = "window inner width: " + window.innerWidth
p2.innerHTML = "body inner width: " + document.getElementById('body').clientWidth
p3.innerHTML = "screen width: " + screen.width

   
    

   })
}
    
