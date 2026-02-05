const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificacionesController');

router.get('/:dni', notificacionesController.listar);
router.delete('/:id', notificacionesController.eliminar);
router.delete('/limpiar/:dni', notificacionesController.limpiar);

module.exports = router;
