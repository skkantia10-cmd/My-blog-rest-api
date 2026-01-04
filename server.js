const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- DATABASE MODELS ---
// In models mein Authors, Posts, Comments, Categories, Tags sab cover hain.

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: String, // Author Name
  category: String, // Blog Category
  tags: [String],   // Blog Tags
  comments: [{ user: String, text: String, date: { type: Date, default: Date.now } }]
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

// --- REST API ROUTES ---

// 1. Saari Posts dekhne ke liye (Read)
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// 2. Nayi Post dalne ke liye (Create)
app.post('/api/posts', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

// 3. Post delete karne ke liye (Delete)
app.delete('/api/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post Deleted Successfully" });
});

// MongoDB Connection (Demo Database)
mongoose.connect('mongodb+srv://admin:admin123@cluster.mongodb.net/blogDB')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server is running on port 5000"));
  
