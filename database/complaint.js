const db = require('../config/db');

class ComplaintRepository {
    //obtener todos los reclamos
    async getAll() {
        const query = 'SELECT * FROM reclamo';
        const [results] = await db.query(query);
        return results;
    }

    //obtener reclamo por id
    async getById(id) {
        const query = 'SELECT * FROM reclamo WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.length ? result[0] : null;
    }

    //obtener reclamos por cliente
    async getComplaintsByClient(clientId) {
        const query = 'SELECT * FROM reclamo WHERE idUsuarioCreador = ?';
        const [results] = await db.query(query, [clientId]);
        return results;
    }

    //cancelar reclamo creado
    async cancelComplaint(id) {
        const query = 'UPDATE reclamo SET idReclamoEstado = 3, fechaCancelado = NOW() WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }

    //agregar un reclamo
    async add(complaint) {
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
    async deleteById(id) {
        const query = 'DELETE FROM reclamo WHERE idReclamo = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }

    //actualizar un reclamo
    async updateComplaint(id, complaint) {
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

module.exports = ComplaintRepository;
