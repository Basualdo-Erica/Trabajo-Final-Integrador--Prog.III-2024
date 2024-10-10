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

    //cancelar reclamo creado
    static async cancelComplaint(id, clientId) {
        //revisa que el reclamo sea del cliente y este en estado creado
        const checkQuery = 'SELECT * FROM reclamo WHERE idReclamo = ? AND idUsuarioCreador = ? AND idReclamoEstado = 1';
        const [results] = await db.query(checkQuery, [id, clientId]);

        if (results.length === 0) {
            return false;
        }

        //se actualiza el estado cancelado si este es igual a idReclamoEstado = 3
        const updateQuery = 'UPDATE reclamo SET idReclamoEstado = 3, fechaCancelado = NOW() WHERE idReclamo = ?';
        const [updateResult] = await db.query(updateQuery, [id]);

        return updateResult.affectedRows > 0;
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

    //actualizar un reclamo
    static async updateComplaint(id, complaint) {
        const query = 'UPDATE reclamo SET asunto = ?, descripcion = ?, idReclamoEstado = ?, idReclamoTipo = ? WHERE idReclamo = ?';
        const [result] = await db.query(query, [
            complaint.asunto,
            complaint.descripcion || null,
            complaint.idReclamoEstado,
            complaint.idReclamoTipo,
            id 
        ]);
        
        return result.affectedRows > 0; 
    }

}

module.exports = Complaints;
