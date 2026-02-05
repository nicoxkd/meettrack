const notificacionesService = require('../services/notificacionesService');

async function listar(req, res) {
    const { dni } = req.params;
    try {
        const notificaciones = await notificacionesService.obtenerPorUsuario(dni);
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al listar notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
}

async function eliminar(req, res) {
    const { id } = req.params;
    try {
        await notificacionesService.eliminarNotificacion(id);
        res.json({ message: 'Notificación eliminada' });
    } catch (error) {
        console.error('Error al eliminar notificación:', error);
        res.status(500).json({ error: 'Error al eliminar notificación' });
    }
}

async function limpiar(req, res) {
    const { dni } = req.params;
    try {
        await notificacionesService.limpiarNotificaciones(dni);
        res.json({ message: 'Notificaciones limpiadas' });
    } catch (error) {
        console.error('Error al limpiar notificaciones:', error);
        res.status(500).json({ error: 'Error al limpiar notificaciones' });
    }
}

module.exports = {
    listar,
    eliminar,
    limpiar
};
