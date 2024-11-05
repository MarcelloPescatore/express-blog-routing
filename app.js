const express = require('express');
const app = express();
const port = 3002;
// importo le rotte
const PostsRouter = require('./routing/posts.js');
// asset publici
app.use(express.static('public'))

// middleware 
app.use(express.json());
// Posts API 
app.use('/', PostsRouter);

// start the server
app.listen(port, (req, res) => {
    console.log(`Server is running at http://localhost:${port}`);   
})
