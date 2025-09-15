// loading event ALWAYS NEED
window.onload=()=>{
    alert("page has loaded")
    console.log("page is fully loaded")

    //gives an array
    let allMyParagraphs = document.getElementsByTagName('p')
    console.log(allMyParagraphs)

    //more specif ,still returns array
    let blueParagraphs = document.getElementsByClassName('blue-paragraphs')
    console.log(blueParagraphs)

    //do not manipulate array, harder to retrieve
    //arrays are comprised of a series of data in order starts at 0
    
    console.log(allMyParagraphs[0])

    //ids best way to retrieve individual elements on a paragraph
    let importantParagraph = document.getElementById('important-paragraph')
    console.log(importantParagraph)

    importantParagraph.innerHTML = "this is new paragraph text <span> this is in a span"
    importantParagraph.style.color = "brown"

    importantParagraph.classList.add("red-paragraph")
    importantParagraph.classList.add("second-class")
    console.log(importantParagraph.classList)
    importantParagraph.classList.remove("second-class")
     console.log(importantParagraph.classList)

    let button = document.getElementById('click')
     button.addEventListener('click', ()=>{
        //create variable that is an instance of the element
        let newElement = document.createElement('p')
        //add context to element
        newElement.textContent = "hi"
        //added paragraph with javascript
        newElement.classList.add('greetings')
        //reference to where adding new element
        let containter = document.body
        //add element to the page
        containter.appendChild(newElement)

     })

     let byeButton = document.getElementById('bye')
     byeButton.addEventListener('click', ()=>{
        //retrieving all paragraphs that contain 'greeting class'
        let allMyGreetings = document.getElementsByClassName("greetings")
        console.log(allMyGreetings)
        allMyGreetings[0].remove()
     })
}

