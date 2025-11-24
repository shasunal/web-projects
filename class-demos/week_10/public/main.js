window.onload=()=>{


//make fetch req to the server/database to retrieve posts that currently exist
loadPosts()
}
async function loadPosts(){
    const postContainer = document.getElementById('all-posts')

    //retrieves sdata from database on the server
    const response = await fetch('/populate-posts')
    //converts response to json data
    const postsArray = await response.json()
    // console.log(json)

    //loop through every post and create new div
    for(let post of postsArray){
        //creates div that will hold all post data and add post class
        let newDiv = document.createElement('div')
        newDiv.classList.add('post')
//holds time span
        let span = document.createElement('span')
        span.textContent = post.postTime
//paragraph to hold text
        let paragraphText = document.createElement('p')
        paragraphText.textContent = post.postText

//create a button to delete posts
let deleteButton = document.createElement('button')
deleteButton.textContent = 'x'
//grab individual id by using post._id


deleteButton.addEventListener('click', ()=>{
handleClick(post._id)
})

        newDiv.append(deleteButton)
        newDiv.append(span)
        newDiv.append(paragraphText)
        postContainer.append(newDiv)
    }
}

async function handleClick(postId){
    console.log('button was clicked:'+ postId)

    //send info
    let request = await fetch('/delete-post', {
        method:"DELETE",
        //data sent in json format
        body: JSON.stringify({id:postId}),
        //what type of data the server should expect
        headers: {
            "Content_Type":"application/json"
        }
    }).then(()=>{
        window.location.href = '/'
    })
}