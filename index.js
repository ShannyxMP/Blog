import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  console.log("You are on the homepage.");
  res.render("index.ejs");
});

// Start the server:
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
