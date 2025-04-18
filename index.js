import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  console.log("You are on the homepage.");
  res.render("index.ejs", { posts: posts });
});

app.get("/add-post", (req, res) => {
  console.log("You are on the 'add-post' page.");
  res.render("add-post.ejs");
});

app.post("/submit", (req, res) => {
  let post = {
    title: req.body["title"],
    content: req.body["content"],
  };
  posts.push(post);
  console.log("Post added.");

  res.render("index.ejs", { posts: posts });
});

app.get("/edit-post/:postId", (req, res) => {
  const postIndex = req.params.postId;
  const post = posts[postIndex];

  res.render("edit-post.ejs", { post: post, index: postIndex });
});

app.post("/", (req, res) => {
  const postIndex = req.body["index"];

  posts[postIndex].title = req.body["title"];
  posts[postIndex].content = req.body["content"];

  console.log("Editted post saved.");
  // res.render("index.ejs", { posts: posts });
  res.redirect("/");
});
});

// Start the server:
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
