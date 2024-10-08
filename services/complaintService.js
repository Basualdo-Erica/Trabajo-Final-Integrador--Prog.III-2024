const db = require('../config/db');

class Complaints {
    //obtener todos los reclamos
    static async getAll() {
        const query = 'SELECT * FROM complaints';
        const [results] = await db.query(query);
        return results; 
    }

    //obtener reclamo por id
    static async getById(id) {
        const query = 'SELECT * FROM complaints WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.length ? result[0] : null; 
    }

    //eliminar reclamo por id
    static async deleteById(id) {
        const query = 'DELETE FROM complaints WHERE id = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0; 
    }

}

module.exports = Complaints;
