const userRepository = require('../database/user');

class UserService {
    //buscar un usuario por correo 
    async findUserByEmail(email) {
        return await userRepository.findUserByEmail(email);
    }

    //actualizar informacion de usuario
    async updateUser(userId, updatedData) {
        return await userRepository.updateUser(userId, updatedData);
    }

    //obtener tareas de un empleado
    async getTasksForEmployee(userId) {
        return await userRepository.getTasksForEmployee(userId);
    }

    //obtener estadisticas
    async getStatistics() {
        return await userRepository.getStatistics();
    }

    // Verificar contraseña 
    async verifyPassword(inputPassword, userPassword) {
        return inputPassword === userPassword; 
    }
}

module.exports = UserService;
