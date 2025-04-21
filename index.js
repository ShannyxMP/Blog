import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = []; // To store blog posts
let examplePostedAlready = false;

// Middlewares:
app.use(express.static("public")); // Handle static files
app.use(bodyParser.urlencoded()); // Parse URL-encoded form data

// Route: Homepage - displays blog posts
app.get("/", (req, res) => {
  console.log("On the homepage.");
  if (!examplePostedAlready) {
    // Example post #1:
    let post1 = {
      title: "Title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id mauris massa. Nullam id tempor eros. Vestibulum non leo viverra, ultrices eros ac, fringilla arcu. Quisque consectetur nibh at lacus porta commodo. Suspendisse facilisis felis velit, sed euismod ipsum tempus vel. Mauris feugiat enim sed lectus dapibus, eu auctor neque lacinia. Nam molestie pulvinar magna a consectetur. Morbi vel dolor risus. Duis at libero quis lacus feugiat aliquam a eget sem. Aliquam vitae orci at nulla semper convallis id posuere lorem. Fusce quis purus vitae lectus finibus pellentesque sit amet eu libero.",
      author: "Jane Doe",
    };
    // Example post #2:
    let post2 = {
      title: "Title",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut consequat diam. Vestibulum vitae tellus nisl. Mauris ut est vitae neque consequat viverra. Vestibulum vitae nibh tincidunt, sollicitudin ligula commodo, elementum ante. Nulla vitae sapien vel velit egestas cursus feugiat vitae orci. Fusce lacus quam, pulvinar sit amet maximus vel, ullamcorper eget lectus. Pellentesque ultrices interdum libero eu cursus. Morbi bibendum est justo, nec scelerisque ipsum vestibulum sed. In risus nunc, molestie eget sapien ut, efficitur elementum libero. Nunc consectetur, leo et iaculis tincidunt, purus ex pretium eros, eu fermentum arcu diam quis nisl.",
      author: "John Doe",
    };
    posts.push(post1, post2);
    examplePostedAlready = true;
  }

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
    author: req.body["author"],
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

// Route: View a post by its index
app.get("/views/view-post/:postId", (req, res) => {
  const postIndex = req.params.postId;

  if (!posts[postIndex]) {
    return res.status(404).send("Post not found.");
  }

  res.render("view-post.ejs", { posts: posts, index: postIndex });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
