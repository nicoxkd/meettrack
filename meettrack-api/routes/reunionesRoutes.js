const express = require('express');
const router = express.Router();
const reunionesController = require('../controllers/reunionesController');

// POST http://localhost:3000/api/reuniones
router.post('/', reunionesController.crear);

// GET http://localhost:3000/api/reuniones/alumno/:dni
router.get('/alumno/:dni', reunionesController.listarAlumno);

// GET http://localhost:3000/api/reuniones/profesor/:dni
router.get('/profesor/:dni', reunionesController.listarProfesor);

// DELETE http://localhost:3000/api/reuniones/:id
router.delete('/:id', reunionesController.eliminar);

module.exports = router;