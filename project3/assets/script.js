window.onload = () => {
  //gets the form id
  const form = document.getElementById("uploadForm");
  //IF the id is found
  if (form) {
    //gets the values input 
    //check they are not empty, they are required fields
    form.addEventListener("submit", (e) => {
      const title = form.title.value.trim();
      const caption = form.caption.value.trim();
      const photo1 = form.photo1.value;

      if (!title || !caption || !photo1) {
    //if none of these apply stop form from submitting
        e.preventDefault();
        alert("Please fill in all required fields and upload at least one image.");
      }
    });
  }

  //falling images
  const images = document.getElementsByClassName("fallingimgs");
  //IF they page even includes the element
  if (images.length > 0) {
    let currentImage = 0;
//listens for click event 
    document.addEventListener("click", (e) => {
        //do NOT do event listener if it is on the arrow
         if (e.target.id === "indexarrow" || e.target.closest("#indexarrow")) return;
         //or inside it
      if (currentImage >= images.length) return;

        //incrementation for images with clicks
      const img = images[currentImage];
      //unhide
      img.classList.remove("hidden");
      img.style.position = "absolute";
      //center on cursor
      img.style.left = `${e.clientX - 75}px`;
      img.style.top = `${e.clientY - 75}px`;
      img.style.zIndex = 1000;

        //animate to the bottom of the viewport
      gsap.to(img, {
    
        top: `${window.innerHeight - img.offsetHeight}px`,
        rotation: Math.random() * 360 - 180,
        duration: 2 + Math.random(),
        ease: "bounce.out",
      });

      currentImage++;
    });
  }

  //arrow animation and transition
  //get the arrow id
  const arrow = document.getElementById("indexarrow");
  if (arrow) {
    //bounce animation
    gsap.to("#indexarrow", {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // scroll down transition to menu.html
    function goToMenuPage() {
      gsap.to("body", {
        y: "-100vh",           
        opacity: 0.8,        
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          window.location.href = "menu.html";
        },
      });
    }
    //scrolling
    let hasScrolled = false;
    arrow.addEventListener("click", goToMenuPage);
    //listens to scroll event
    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0 && !hasScrolled) {
        hasScrolled=true;
        //direct to menu
        goToMenuPage();
      }
    });
  }
};
