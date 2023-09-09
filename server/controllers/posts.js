const {User} = require('../models/user')
const {Post} = require('../models/post')

module.exports = {
    addPost: async (req, res) => {
        try {
        let {title, content, status, userId} = req.body; 
        await Post.create({title, content, userId, privateStatus: status });
        res.sendStatus(200)
        } catch (error) {
        console.log('ERROR IN addPost')
            console.log(error)
            res.sendStatus(400)
        }},
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {privateStatus: 'false'},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`],
                },],
            });
            res.status(200).send(posts)
        } catch (error) {
                console.log('ERROR IN getAllPosts:', error.message);
                res.status(400).send({ error: error.message });            
        }   
    },    
    getCurrentUserPosts: async (req, res) => {
        try {
            const {userId} = req.params
            const posts = await Post.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]})
            res.status(200).send(posts)
        } catch (error) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(error)
            res.sendStatus(400)
        }
    },
    editPost: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.body
            await Post.update({privateStatus: status}, {where: {id: +id}
            })
            console.log('editPost')
            res.sendStatus(200)  
        }
        catch(error) {
            console.log('ERROR IN editPost')
            console.log(error)
            res.sendStatus(400)
        }
    },
    deletePost: async (req, res) => {
        try {
            const {id} = req.params
            await Post.destroy({where: {id: +id}})
        console.log('deletePost')
        res.sendStatus(200)     
    }
    catch(error) {
        console.log('ERROR IN deletePost')
        console.log(error)
        res.sendStatus(400)
}
    }
}