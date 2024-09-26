const express = require('express')
const Users = require('./user-model')
const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.json({errorMessage: 'Server is up and running'})
})

server.get('/api/users', (req, res) => {
    Users.findAll()
        .then( user => {
            res.status(200).json(user)
        })
        .catch( err => {
            res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
        })
})

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    Users.findById(id)
        .then(user => {
            !user ? res.status(404).json({errorMessage: `user with id: ${id} does not exist`}) : res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
        })
})

server.post('/api/users', async (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else {
        try {
            const newUser = await Users.create(user)
            res.status(201).json(newUser)
        } catch (err){
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'})
        }
    }
})

server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params
    const updates = req.body
   
    if (!updates.name || !updates.bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else {
        try {
            const updatedUser = await Users.update(id, updates)
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json({errorMessage: 'The user information could not be modified.'})
        }
    }
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    Users.delete(id)
        .then(deleted => {
            if (!deleted) {
                res.status(404).json({errorMessage:'The user with the specified ID does not exist.'})
            } else {
                res.status(200).json(deleted)
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'The user could not be removed'})
        })
})


module.exports = server