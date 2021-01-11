const shortid = require('shortid')

let users = [
    { id: shortid.generate(), name: 'Juan', bio: 'A Lambda student.'}
]

module.exports = {
    findAll() {
        return Promise.resolve(users)
    },

    findById(id) {
        const users = users.find(u => u.id === id)
        return Promise.resolve(users)
    },

    create({name, weight}) {
        const newUser = { id: shortid.generate(), name, bio}
        users.push(newUser)
        return Promise.resolve(newUser)
    },

    update(id, changes) {
        const user = users.find(user => user.id === id)
        if (!user) return Promise.resolve(null)

        const updatedUser = {...changes, id}
        users = users.map(u => (u.id === id) ? updatedUser : u)
        return Promise.resolve(updatedUser)
    },

    delete(id) {
        const user = users.find(user => user.id === id)
        if (!user) return Promise.resolve(null)

        users = users.filter(u => u.id !== id)
        return Promise.resolve(user)
    }
}