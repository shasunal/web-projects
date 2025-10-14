//1. global variables

let postContainer
//2. wait for window to load
window.onload=()=>{
    //make sure elements is laoded and exiss before using
postContainer = document.getElementById('posts')

getMessages()
}
//3. helper functions
//async means needs an "await" pair need await and async
async function getMessages(){
    let response = await fetch('/all-messages')
    console.log(response)

    let json = await response.json()
    console.log(json.notes)

   for (let n of json.notes){
    let newElement = document.createElement('div')
    let title = document.createElement('h3')
    title.textContent = n.username
    let paragraph = document.getElementById('p')
    paragraph.textContent += ' says ' + n.message + ' at ' + n.date

    newElement.appendChild(title)
    newElement.appendChild(paragraph)

    postContainer.appendChild(newElement)
   }

}