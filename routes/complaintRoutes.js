const express = require('express');
const ComplaintController = require('../controllers/complaintController'); 

const router = express.Router();
const complaintController = new ComplaintController();

//ruta para agregar un reclamo
router.post('/complaints', complaintController.addComplaint);

//ruta para obtener todos los reclamos
router.get('/complaints', complaintController.getAllComplaints);

//ruta para obtener un reclamo por id
router.get('/complaints/:id', complaintController.getComplaintById);

//ruta para que el cliente obtenga su reclamo
router.get('/clients/:clientId/complaints', complaintController.getClientComplaints.bind(complaintController));

//ruta para que el cliente cancele un reclamo
router.patch('/complaints/:id/cancel', complaintController.cancelComplaint);

//ruta para eliminar un reclamo por id
router.delete('/complaints/:id', complaintController.delete);

//ruta para actualizar un reclamo existente
router.put('/complaints/:id', complaintController.updateComplaint);

module.exports = router;
