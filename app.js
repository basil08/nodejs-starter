// config environment variables
import dotenv from "dotenv";
dotenv.config();
// connect to database
import connect from "./config/database.js";
connect();

// create express app
import express from "express";
const app = express();

import auth from "./middleware/auth.js";

import Post from "./model/post.js";

// express middleware setup
app.use(express.json());

// setup authentication routes
import initAuthentication from "./authentication.js";
initAuthentication(app);

function getWordCount(text) {
  // TODO: Find a better regex ffs
  return text.split(' ').length;
}

// create your endpoints below
app.post("/createNewPost", auth, async (req, res) => {

  const { title, text, type, is_public } = req.body;

  const word_count = getWordCount(text);

  if (word_count < 3) {
    return res.status(400).json({ error: "Text has too few words!"});
  }

  // TODO: Add a markdown processed HTML representation of the post
  try {
    const post = await Post.create({
      title: title,
      rawText: text,
      word_count,
      created_by: req.user.user_id,
      is_public,
    })
    post.save();
    return res.status(200).json({"msg": "Post saved successfully!"});
  } catch (err) {
    console.error(err);
  }
});

app.get('/getPost', auth, (req, res) => {

});

app.get('/deletePost', auth, (req, res) => {

});

app.post('/updatePost', auth, (req, res) => {

});

app.get('/getPostList', auth, (req, res) => {

});

app.get('/getProfile', auth, (req, res) => {

});

app.post('/updateProfile', auth, (req, res) => {

});

app.post('/changePassword', auth, (req, res) => {

});

app.post('/updatePostVisibility', auth, (req, res) => {

});

app.get('/getArchive', auth, (req, res) => {

});

app.get('/getImages', auth, (req, res) => {

});

app.get('getProfilePic', auth, (req, res) => {

});

app.post('/deleteUser', auth, (req, res) => {

});

app.get('/getPostLikes', auth, (req, res) => {

});

app.get('/likePost', auth, (req, res) => {

});

app.get('/unlikePost', auth, (req, res) => {

});

export default app;
