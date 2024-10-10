const Complaints = require("../services/complaintService");

class ComplaintController {
    //obtener todos los reclamos
    async getAllComplaints(req, res) {
        try {
            const results = await Complaints.getAll();
            res.status(200).json({
                status: 'exito',
                data: results,
            });
        } catch (error) {
            console.error('Error al recuperar reclamos:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al recuperar reclamos',
            });
        }
    }

    //obtener un reclamo por id
    async getComplaintById(req, res) {
        const { id } = req.params;

        try {
            const result = await Complaints.getById(id);
            if (!result) {
                return res.status(404).json({
                    status: 'error',
                    message: 'eeclamo no encontrado',
                });
            }

            res.status(200).json({
                status: 'exito',
                data: result,
            });
        } catch (error) {
            console.error('error al recuperar reclamo por ID:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al recuperar el reclamo',
            });
        }
    }

    async addComplaint(req, res) {
        try {
            const newComplaint = req.body; 
            const createdComplaint = await Complaints.add(newComplaint);
            
            res.status(201).json({
                status: 'exito',
                message: 'reclamo creado con éxito',
                data: createdComplaint
            });
        } catch (error) {
            console.error('error al crear reclamo:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al crear el reclamo'
            });
        }
    }
 
    //eliminar un reclamo por id
    async delete(req, res) {
        const { id } = req.params;

        try {
            const deleted = await Complaints.deleteById(id);
            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'reclamo no encontrado',
                });
            }

            res.status(200).json({
                status: 'exito',
                message: 'reclamo eliminado con éxito',
            });
        } catch (error) {
            console.error('error al eliminar reclamo:', error);
            res.status(500).json({
                status: 'error',
                message: 'error al eliminar reclamo',
            });
        }
    }
}

module.exports = ComplaintController;
