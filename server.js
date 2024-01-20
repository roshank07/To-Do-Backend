const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const env =require("dotenv");

env.config();
const app = express();
const PORT =process.env.PORT||3001;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

let savedArticles = [];

app.get('/api/savedArticles', (req, res) => {
  res.json(savedArticles);
});

app.post('/api/savedArticles', (req, res) => {
  const newArticle = req.body.article;
  savedArticles.push(newArticle);
  res.json(savedArticles);
});


app.delete('/api/savedArticles/:index', (req, res) => {
    const indexToDelete = parseInt(req.params.index, 10);
    if (!isNaN(indexToDelete) && indexToDelete >= 0 && indexToDelete < savedArticles.length) {
      savedArticles.splice(indexToDelete, 1);
      res.json(savedArticles);
    } else {
      res.status(400).json({ error: 'Invalid index for deletion' });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
