// Stockage en mémoire des utilisateurs
let users = [];

module.exports = {
    async createUser(user) {
        users.push(user);
        return user;
    },

    async findByEmail(email) {
        return users.find(user => user.email === email);
    },

    async findById(id) {
        return users.find(user => user.id === id);
    },

    async findAll() {
        return users;
    },

    async updateUser(id, updatedUser) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = {...users[index], ...updatedUser };
            return users[index];
        }
        return null;
    },

    async deleteUser(id) {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    },

    // Exportation de la liste des utilisateurs pour les tests
    _users: users
};