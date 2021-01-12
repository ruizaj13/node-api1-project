const shortid = require('shortid')

let userList = [
    { id: shortid.generate(), name: 'Juan', bio: 'A Lambda student.'}
]

module.exports = {
    findAll() {
        return Promise.resolve(userList)
    },

    findById(id) {
        const users = userList.find(u => u.id === id)
        return Promise.resolve(users)
    },

    create({name, bio}) {
        const newUser = { id: shortid.generate(), name, bio}
        userList.push(newUser)
        return Promise.resolve(newUser)
    },

    update(id, updates) {
        const user = userList.find(user => user.id === id)
        if (!user) return Promise.resolve(null)

        const updatedUser = {...updates, id}
        userList = userList.map(u => (u.id === id) ? updatedUser : u)
        return Promise.resolve(updatedUser)
    },

    delete(id) {
        const user = userList.find(user => user.id === id)
        if (!user) return Promise.resolve(null)

        userList = userList.filter(u => u.id !== id)
        return Promise.resolve(user)
    }
}