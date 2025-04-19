import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = []; // To store blog posts

// Middlewares:
app.use(express.static("public")); // Handle static files
app.use(bodyParser.urlencoded()); // Parse URL-encoded form data

// Route: Homepage - displays blog posts
app.get("/", (req, res) => {
  console.log("On the homepage.");
  res.render("index.ejs", { posts: posts });
});

// Route: Add post page - form for creating new post
app.get("/add-post", (req, res) => {
  console.log("On 'add-post' page.");
  res.render("add-post.ejs");
});

// Route: Handle form submission to add new post
app.post("/submit", (req, res) => {
  let post = {
    title: req.body["title"],
    content: req.body["content"],
  };
  posts.push(post);
  console.log("Post added.");

  res.redirect("/");
});

// Route: Edit post page - shows form to edit chosen post
app.get("/edit-post/:postId", (req, res) => {
  const postIndex = req.params.postId;
  const post = posts[postIndex];

  res.render("edit-post.ejs", { post: post, index: postIndex });
});

// Route: Handle form submission to update a post
app.post("/edit-post/:postId", (req, res) => {
  const postIndex = req.body["index"];

  if (!posts[postIndex]) {
    console.log("No post found at that index.");
  } else {
    posts[postIndex].title = req.body["title"];
    posts[postIndex].content = req.body["content"];
    console.log("Editted post saved.");
  }

  res.redirect("/");
});

// Route: Delete a post by its index
app.post("/delete-post/:postId", (req, res) => {
  const postIndex = req.params.postId;

  if (!posts[postIndex]) {
    console.log("No post found at this index.");
  } else {
    posts.splice(postIndex, 1);
    console.log(`Post ${postIndex} deleted`);
  }

  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
