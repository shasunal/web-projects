//run after entire page finishes loading
window.onload = async () => {

  //find the two pages for transition animation
 const galleryLinks = document.querySelectorAll(
    'a[href="actualgallery.html"], a[href="gallery.html"]'
  );

  galleryLinks.forEach(link => {
    //event listener for click
    link.addEventListener("click", (e) => {
      //prevent immediately going to the next page to play animation
      e.preventDefault(); 
      //stores the destination url
      const target = link.getAttribute("href");

      gsap.to("body", {
        //slide and fade
        x: "-100vw",       
        opacity: 0.8,      
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          //go to the target location when done
          window.location.href = target; 
        }
      });
    });
  });
  
//get element menu container
   const menuContainer = document.querySelector(".menu-container");
  if (menuContainer) {
    //make sure it is invisible before gsap starts
    menuContainer.style.opacity = 0;

    gsap.to(menuContainer, {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
    });
  }


  console.log({
  postDetail: document.getElementById('post-detail'),
});

  // get all elements
  const postList = document.getElementById('post-list');
  const postDetail = document.getElementById('post-detail');
  const detailImage = document.getElementById('detail-image');
  const detailCaption = document.getElementById('detail-caption');
  const backBtn = document.getElementById('back-btn');

  //track if it is first pos t opened
  let firstOpen = true;
  //tracks which title is opened
   let activeItem = null;
//tracks # of photos
   let currentImageIndex=0;

  // get submissions from all-submissions
  //need this on any js fetching from submissions
  const res = await fetch('/all-submissions');
  const data = await res.json();
  const submissions = data.submissions;

  //fill in the title
  postList.innerHTML = '';
  submissions.forEach((post) => {
    //make <list with the titles
    const li = document.createElement('li');
    //adds the class to style
    li.textContent = post.title;
    li.classList.add('post-item');
    //event listener to click on title
    li.addEventListener('click', () => showPost(post, li));
    postList.appendChild(li);
  });

  //show selected post where the magic happens
  function showPost(post, clickedLi) { 

//bold highlight the clicked title
//remove the previously active title, and updates which one is clicked
     if (activeItem) activeItem.classList.remove('active');
    clickedLi.classList.add('active');
    activeItem = clickedLi;

    //array of each image
    const images = post.images || [];
    //start at first image of each new post
    currentImageIndex = 0;

    //load the image and caption
    detailImage.src = images[currentImageIndex] || '';
  detailCaption.textContent = post.caption || '';

//event listener for next and prev arrows
  const nextBtn = document.getElementById('next-img');
  const prevBtn = document.getElementById('prev-img');
  //do not show images if less than or equal to 1 image
  if (images.length <= 1) {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
    prevBtn.style.display = 'block';
  }

  //cycling through image
   nextBtn.onclick = () => {
    if (images.length > 1) {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      detailImage.src = images[currentImageIndex];
    }
  };

  prevBtn.onclick = () => {
    if (images.length > 1) {
      currentImageIndex =
        (currentImageIndex - 1 + images.length) % images.length;
      detailImage.src = images[currentImageIndex];
    }
  };

//for each post's detail 
    //if already visible, skip animation

    if(!firstOpen){
  
        return;
    }
    //makes the panel visible
    postDetail.classList.remove('hidden');

// Slide post-detail in over the right side (no fade)
gsap.fromTo(
  postDetail,
  { x: "100%", opacity: 1 },
  { x: "0%", opacity: 1, duration: 0.8, ease: "power2.inOut" }
);
//false = it is open
firstOpen = false;
  }

  //Back button
  backBtn.addEventListener('click', () => {
    // slide post-detail to the right
    gsap.to(postDetail, {
      x: "100%",
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        postDetail.classList.add('hidden');
  
        //reset again 
        firstOpen = true;
        if (activeItem) activeItem.classList.remove('active');

       
        
         
      }
    });
  });
};
