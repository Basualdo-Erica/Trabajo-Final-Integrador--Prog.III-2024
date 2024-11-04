const express = require('express');
const router = express.Router();
const authenticateJWT = require('../../middlewares/authenticateJWT');
const authorizeRole = require('../../middlewares/authorizeRole');
const userController = require('../../controllers/userController');

//rutas de autenticacion
router.post('/login', userController.login); 

//rutas de clientes 
router.post('/complaints', authenticateJWT, authorizeRole('cliente'), userController.createComplaint);
router.get('/complaints', authenticateJWT, authorizeRole('cliente'), userController.getComplaints);

//rutas de empleados
router.put('/complaints/:id/attend', authenticateJWT, authorizeRole('empleado'), userController.updateComplaintStatus);
router.get('/complaints/assigned', authenticateJWT, authorizeRole('empleado'), userController.getEmployeeTasks);

//rutas de administradores
router.post('/complaint-types', authenticateJWT, authorizeRole('administrador'), userController.manageComplaintTypes);
router.get('/stats', authenticateJWT, authorizeRole('administrador'), userController.getAdminStats);
router.get('/report/:format', authenticateJWT, authorizeRole('administrador'), userController.downloadReport);

module.exports = router;
