

// 1. Requirements
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config() 
const PORT = process.env.PORT 
const { isAuthenticated } = require('./middleware/isAuthenticated')
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')


// 2. Middleware
app.use(express.json())
app.use(cors())


const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')

//users can post as much as they would like and each post only has one author.
User.hasMany(Post)
Post.belongsTo(User)


// create a post request to /register, and link it to the register function we created in the auth.js controller file.
app.post('/register', register)

// create a post request to /login, and link it to the login function we created in the auth.js controller file.
app.post('/login', login)

// create a get request to /posts, and link it to the getAllPosts function we created in the posts.js controller file.
app.get('/posts, getAllPosts')

// create a get request to /userposts/:userId, and link it to the getCurrentUserPosts function we created in the posts.js controller file. 
//For this endpoint, the userId is a variable that can be accessed with req.params.
app.get('/userposts/:userId, getCurrentUserPosts')

// create a post request to /posts, and link it to the addPost function we created in the posts.js controller file.
app.post('/posts', isAuthenticated , addPost)

// create a put request to /posts/:id, and link it to the editPost function we created in the posts.js controller file. 
//For this endpoint, the id is a variable that can be accessed with req.params.
app.put('/posts/:id', isAuthenticated, editPost)

// create a delete request to /posts/:id, and link it to the deletePost function we created in the posts.js controller file. For this endpoint, the id is a variable that can be accessed with req.params.
app.delete('/posts/:id', isAuthenticated, deletePost);


sequelize.sync().then(() => {
    app.listen(PORT, () => 
    console.log(`Running on Port ${PORT}`))
})
.catch(err => {
    console.error('Unable to connect to the database:', err)
})



