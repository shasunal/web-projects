//libraries
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// global middleware everything is in assets
app.use(express.static("assets"));
//parses url bodies
app.use(express.urlencoded({ extended: true }));

// up to 2 images per upload with multer disk storage
const storage = multer.diskStorage({
  //save files in assets/uploads
  destination: (req, file, cb) => cb(null, "assets/uploads/"),
  //gives timestamp and the original file name
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

//2 image field uploads
const uploadProcessor = multer({ storage }).fields([
  { name: "photo1" },
  { name: "photo2" },
]);

// Store posts in memory
let allPosts = [
 {
      "title": "Swapped parts of several broken TVs.",
      "caption": "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. ",
      "images": [
        "/uploads/1761583048600-natural-ameriwood-home-tv-stands-de67427-64_600.avif",
        "/uploads/1761583048600-b429460b91d5d41e7d5dba9cda0a783f.jpg"
      ],
      "postNumber": 1
    },
    {
      "title": " Empty soup cans washed, poured with wax, and glowing again.",
      "caption": "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\r\n\r\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
      "images": [
        "/uploads/1761582916035-s-l1200.jpg"
      ],
      "postNumber": 0
    },
    {
      "title": "Garden fence made from tree branches.",
      "caption": "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.\r\n",
      "images": [
        "/uploads/1761427189317-tips-for-making-a-fence-out-of-branches-and-twigs-v0-ehtbdny629pc1.jpg",
        "/uploads/1761427189320-fallen-branches-need-chipping.jpg"
      ],
      "postNumber": 4
    },
    {
      "title": "Cardboard boxes turned into cat tree.",
      "caption": "turned a bunch of shipping boxes into a multi-level cat tower. It’s crooked, covered in claw marks, and I’m pretty sure it’s held together by pure willpower — but she loves it. Recycling, but make it architectural.",
      "images": [
        "/uploads/1761427077311-cattree.jpg"
      ],
      "postNumber": 3
    },
    {
      "title": "Discarded wood from a construction site becomes a floating shelf for plants.",
      "caption": "Step 1: See a pile of scrap wood.\r\nStep 2: Carry it home like a raccoon with a mission.\r\nStep 3: Sand, stain, and pretend I know what I’m doing with a drill.\r\nStep 4: Suddenly I have a floating shelf that makes my plants look expensive.",
      "images": [
        "/uploads/1761426987498-wood.jpg",
        "/uploads/1761426987499-shelf.jpeg"
      ],
      "postNumber": 2
    },
    {
      "title": "An abandoned shirt remade into a tote bag for groceries.",
      "caption": "Found this old shirt that was too worn to wear but too soft to toss so I turned it into a grocery tote instead. \r\n\r\nIt’s got that lived-in feel and holds way more than I expected. Feels good giving something a second life.",
      "images": [
        "/uploads/1761426839069-shirtbefore.jpeg",
        "/uploads/1761426839071-shirtafter.jpg"
      ],
      "postNumber": 1
    },
    {
      "title": "Apple pie made from apples found in a bin outside grocery store. ",
      "caption": "These apples were found in a bin by Whole Foods located on 375 Wall Street. During 9pm they put all the bins out.\r\n\r\nMost of the apples were perfectly fine. \r\n\r\nMy apple pie tasted absolutely delicious!",
      "images": [
        "/uploads/1761415784473-applepie.jpg"
      ],
      "postNumber": 0
    }

];
//number each sbmission starting from 0
let postNum = 0;

//ROUTES

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets/index.html"));
});

// Menu page
app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "assets/menu.html"));
});

// Gallery upload form
app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "assets/gallery.html"));
});

// Actual gallery grid view
app.get("/actualgallery", (req, res) => {
  res.sendFile(path.join(__dirname, "assets/actualgallery.html"));
});

// Handle uploads post
//uploadprocesser parses the files and stores them
app.post("/upload", uploadProcessor, (req, res) => {
  const title = req.body.title;
  const caption = req.body.caption;
  const images = [];

  //image urls
  if (req.files["photo1"]) {
    images.push(`/uploads/${req.files["photo1"][0].filename}`);
  }
  if (req.files["photo2"]) {
    images.push(`/uploads/${req.files["photo2"][0].filename}`);
  }

  // post data object
  const postData = {
    title,
    caption,
    images,
    postNumber: postNum,
  };

  //add newest post first
  allPosts.unshift(postData);
  postNum++;

  console.log("New post uploaded:", postData);

  //redirect back to menu
  res.redirect("/menu");
});

//get all submissions 
app.get("/all-submissions", (req, res) => {
  res.json({ submissions: allPosts });
});

// Start the server
app.listen(3001, () => {
  console.log("Server running at http://127.0.0.1:3001/");
});
