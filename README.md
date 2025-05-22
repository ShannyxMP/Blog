# CapyBlog

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
- [Getting Started](#getting-started)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
- [Future Improvements](#future-improvements)
- [License](#license)

## Overview

### Screenshot

Mobile layout of the blog:

<img src="./public/images/CapyBlog - screenshot(1).png" alt="Mobile view of the blog - homepage" width="300"/> <img src="./public/images/CapyBlog - screenshot(2).png" alt="Mobile view of the blog - post detail" width="300"/>

## Getting Started

To run this project locally:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `node index.js`
4. Open `http://localhost:3000` in your browser

## My process

### Built with

- CSS custom properties
  - Flexbox
  - CSS Grid
- Mobile-first workflow
- JavaScript
- Node.js
- Express.js
- NPM: body-parser

### What I learned

This was a capstone project that practices the development of dynamic websites - a blog that allows you to view, add, edit and delete posts. I found it challenging but enjoyed the process overall. It allowed me to reaffirm the concepts of creating a server using JS, RESTful routing with express and embedding JS.

When these concepts are taught, they make sense at first — but it’s only when applying them independently that the real challenges appear. It was difficult to grasp how to handle data sent from forms to the server, and to process that data within the server before correctly passing and embedding that data correctly in other files for rendering. I took advantage of using the loop variable (`let i = 0`) of the for loop as an endpoint for the base URL and to subsequently use the `:postId` to access and represent the index of the targeted post in the `posts` array, which was essential for deleting or editing.

Below is a snippet of the embedded JS within the HTML for the homepage:

```JS
<!-- Loop through each post and display -->
  <% for (let i = 0; i < posts.length; i++) { %>
  <div class="container-orange all_posts-flex-item">
    <div class="delete-leaf">
      <!-- Form to delete current post -->
      <form action="/delete-post/<%= i %>" method="POST">
        <button
          class="icon underline"
          type="submit"
          onclick="return confirm('Are you sure you want to delete this post?')"
        >
          <img src="images/trash-icon.png" alt="delete icon" />
        </button>
      </form>
    </div>
    <div class="post-homepage">
      <div class="heading-homepage">
        <h1><%= posts[i].title %></h1>
        <!-- Link to edit current post -->
        <a href="/edit-post/<%= i %>" class="icon underline"
          ><img src="images/pencil-icon.png" alt="edit icon"
        /></a>
      </div>
      <p class="underline">
        <!-- Limit the amount of characters displayed as a preview -->
        <% var preview = (posts[i].content).substring(0, 250) %> <%= preview
        %>...
        <a href="/views/view-post/<%= i %>">View full text</a>
      </p>
      <p>Author: <span><%= posts[i].author %></span></p>
    </div>
  </div>
  <% } %>
```

Here is a snippet of the server, and how data is being transferred between each route - adding a post, and editing a post:

```JS
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
    posts[postIndex].author = req.body["author"];
    console.log("Edited post saved.");
  }

  res.redirect("/");
});
```

Although using viewport height and width units (`vh`/`vw`) seems beneficial for responsiveness, they often caused layout issues, especially when other elements exceeded the defined boundaries. I have realised using `100vh` or `100vw` to define the height and width of the intended section, respectively, is not always the best answer as it causes other elements to overflow if their dimensions go beyond the 'boundary' defined. Padding can be a much simpler alternative for having blocks of sections without compromising other sections.

### Continued development

The concepts of the various HTTP requests were briefly discussed in the lesson, so I was surprised to learn that using DELETE, PUT and PATCH requests would not work on the HTML forms without a workaround - ie. HTML forms only support GET and POST requests natively. As a result, this blog only handles GET and POST requests which I understand to be semantically incorrect when deleting or editing posts. To use PUT or DELETE, workarounds like method-override middleware or using JavaScript to send the request is needed. I plan to explore these alternatives in future iterations of the project.

### Useful resources

- [Body-parser](https://www.npmjs.com/package/body-parser) - This was essential middleware to parsing incoming request bodies before my handlers.
- [Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient) - This document was something I came across which helped me add more visual depth and interest to the design.

## Author

<!-- TODO: Add link of published Resume website from GitHub | cannot at the moment as Resume repo is private -->

- Resume - [ShannyxMP](https://www.your-site.com)

## Acknowledgments

Huge thanks to Dr Angela Yu for providing such a clear and supportive learning experience in Full-stack Web Development.

## Future Improvements

- [ ] Use method-override to simulate DELETE and PUT requests from HTML forms
- [ ] Update delete and edit form actions and routes to use DELETE and PUT methods
