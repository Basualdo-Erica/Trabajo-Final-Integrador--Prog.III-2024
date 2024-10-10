const db = require('../config/db');

class Complaints {
    //obtener todos los reclamos
    static async getAll() {
        const query = 'SELECT * FROM reclamo';
        const [results] = await db.query(query);
        return results; 
    }

    //obtener reclamo por id
    static async getById(id) {
        const query = 'SELECT * FROM reclamo WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.length ? result[0] : null; 
    }

    //obtener reclamos por cliente
    static async getComplaintsByClient(clientId) {
        const query = 'SELECT * FROM reclamo WHERE idUsuarioCreador = ?';
        const [results] = await db.query(query, [clientId]);
        return results;
    }

    //agregar un reclamo
    static async add(complaint) {
        const query = `INSERT INTO reclamo (asunto, descripcion, fechaCreado, idReclamoEstado, idReclamoTipo, idUsuarioCreador, idUsuarioFinalizador)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [
            complaint.asunto,
            complaint.descripcion || null,
            complaint.fechaCreado,
            complaint.idReclamoEstado,
            complaint.idReclamoTipo,
            complaint.idUsuarioCreador,
            complaint.idUsuarioFinalizador || null
        ]);
        
        return { idReclamo: result.insertId, ...complaint };
    }


    //eliminar reclamo por id
    static async deleteById(id) {
        const query = 'DELETE FROM reclamo WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0; 
    }

}

module.exports = Complaints;
