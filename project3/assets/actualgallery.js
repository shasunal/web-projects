//need to use async to use await
window.onload = async () => {
  //grabs grid element
  const grid = document.getElementById("gallery-grid");

  //fetch all submissions Get request with fetch
  const res = await fetch("/all-submissions");
  //this parses the json to be used
  const data = await res.json();
  const submissions = data.submissions;

  //go through each submission
  submissions.forEach((post) => {
    const images = post.images || [];
    //if no images, nothing happens
    if (!images.length) return;
    //make a new div to store each submission's image
    const item = document.createElement("div");
    //adds class for css
    item.classList.add("gallery-item");

    //wrapper tile images ONLY
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    //add first image
    const img = document.createElement("img");
    img.src = images[0];
    //adds the css class
    img.classList.add("gallery-img");
    //appends inside the grid tile
    imageContainer.appendChild(img);

    //if it has more than 1 image, second image stacked on top
    if (images.length > 1) {
      const hoverImg = document.createElement("img");
      hoverImg.src = images[1];
      //starts with 0 opacity when hovering
      hoverImg.classList.add("gallery-img", "hover-img");
      imageContainer.appendChild(hoverImg);
    }
    //append imagecontainer
    item.appendChild(imageContainer);

    //adds captions under images in the container
    //creates a paragraph
    const caption = document.createElement("p");
    caption.textContent = post.caption || "";
    //add to the gallery caption which i
    //underneath image
    caption.classList.add("gallery-caption");
    item.appendChild(caption);

    //event listenener important clicking
    item.addEventListener("click", () => {
      //if it is already triggered, do not do anything
      if (item.classList.contains("falling")) return;
      item.classList.add("falling");
      //find only image container, not captions
      const imageContainer = item.querySelector(".image-container");
      if (!imageContainer) return;

      // find current position but not the full item
      const rect = item.getBoundingClientRect();

      //create paper.png and clone
      //floating position over each grid's exact position
      //so that when clicking, and turns into paper.png grid will not collapse
      const paper = document.createElement("img");
      paper.src = "imgs/paper.png";
      paper.classList.add("paper-ball");
      paper.style.position = "absolute";
      paper.style.left = `${rect.left}px`;
      paper.style.top = `${rect.top}px`;
      paper.style.width = `${rect.width * 0.6}px`; // smaller paper
      paper.style.height = "auto";
      paper.style.zIndex = 9999;
      paper.style.pointerEvents = "none";

      document.body.appendChild(paper);
      //hide only images and not captions
      imageContainer.style.visibility = "hidden";

      // paper gsap animation
      const targetY = window.innerHeight + rect.height * 1.5; // far enough to disappear
      gsap.to(paper, {
        top: `${targetY}px`,
        rotation: Math.random() * 360 - 180,
        duration: 2 + Math.random() * 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(paper, {
            opacity: 0,
            duration: 1,
            onComplete: () => paper.remove(),
          });
        },
      });
       setTimeout(() => {
    imageContainer.style.visibility = "visible";
    gsap.fromTo(
      imageContainer,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power1.inOut" }
    );
    item.classList.remove("falling"); // allow clicking again
  }, 5000);

    });

    grid.appendChild(item);
  });
};
