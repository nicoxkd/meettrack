const db = require('../config/db');

async function crearNotificacion(dni_usuario, tipo, mensaje) {
    const fecha = new Date();
    const query = 'INSERT INTO NOTIFICACION (dni_usuario, tipo, mensaje, fecha, leida) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(query, [dni_usuario, tipo, mensaje, fecha, false]);
    return result;
}

async function obtenerPorUsuario(dni_usuario) {
    const query = 'SELECT * FROM NOTIFICACION WHERE dni_usuario = ? ORDER BY fecha DESC';
    const [rows] = await db.execute(query, [dni_usuario]);
    return rows;
}

async function eliminarNotificacion(id) {
    const query = 'DELETE FROM NOTIFICACION WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result;
}

async function limpiarNotificaciones(dni_usuario) {
    const query = 'DELETE FROM NOTIFICACION WHERE dni_usuario = ?';
    const [result] = await db.execute(query, [dni_usuario]);
    return result;
}

module.exports = {
    crearNotificacion,
    obtenerPorUsuario,
    eliminarNotificacion,
    limpiarNotificaciones
};
