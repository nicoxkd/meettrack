const db = require('../config/db');
const notificacionesService = require('./notificacionesService');

async function crearReunion(dni_alumno, id_disponibilidad) {
    const connection = await db.getConnection(); // Pedimos una conexión dedicada para hacer varias cosas seguidas

    try {
        await connection.beginTransaction(); // Iniciamos "modo seguro" (Transacción)

        // 1. Obtener datos de la disponibilidad (fecha, hora, profesor)
        const [rows] = await connection.execute(
            'SELECT D.*, A.nombre as nombre_alumno FROM DISPONIBILIDAD D LEFT JOIN ALUMNO A ON A.dni = ? WHERE D.id_disponibilidad = ? AND D.estado = "libre"',
            [dni_alumno, id_disponibilidad]
        );

        if (rows.length === 0) {
            throw new Error('DISPONIBILIDAD_NO_VALIDA'); // O no existe o ya está ocupada
        }

        const disp = rows[0]; // Datos del hueco (fecha, hora, id_profesor)

        // 2. Crear la Reunión
        const id_reunion = 'reunion_' + Date.now();
        await connection.execute(
            'INSERT INTO REUNION (id_reunion, fecha, hora, estado, dni_alumno, dni_profesor) VALUES (?, ?, ?, ?, ?, ?)',
            [id_reunion, disp.fecha, disp.hora, 'pendiente', dni_alumno, disp.id_profesor]
        );

        // 3. Marcar Disponibilidad como OCUPADA
        await connection.execute(
            'UPDATE DISPONIBILIDAD SET estado = "ocupada" WHERE id_disponibilidad = ?',
            [id_disponibilidad]
        );

        // 4. Crear Notificación para el profesor
        const fechaFormateada = new Date(disp.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
        const mensaje = `${disp.nombre_alumno || 'Un alumno'} ha solicitado una reunión para el ${fechaFormateada} a las ${disp.hora}.`;
        await notificacionesService.crearNotificacion(disp.id_profesor, 'accepted', mensaje);

        await connection.commit(); // Confirmamos los cambios
        return { message: 'Reunión reservada con éxito', id_reunion };

    } catch (error) {
        await connection.rollback(); // Si algo falla, deshacemos todo
        throw error;
    } finally {
        connection.release(); // Soltamos la conexión
    }
}

// Listar reuniones de un alumno
async function obtenerPorAlumno(dni_alumno) {
    const query = `
        SELECT R.*, P.nombre AS nombre_profesor, P.apellidos AS apellidos_profesor 
        FROM REUNION R
        JOIN PROFESOR P ON R.dni_profesor = P.dni
        WHERE R.dni_alumno = ?
    `;
    const [rows] = await db.execute(query, [dni_alumno]);
    return rows;
}

// Listar reuniones de un profesor
async function obtenerPorProfesor(dni_profesor) {
    const query = `
        SELECT R.*, A.nombre AS nombre_alumno 
        FROM REUNION R
        JOIN ALUMNO A ON R.dni_alumno = A.dni
        WHERE R.dni_profesor = ?
        ORDER BY R.fecha ASC, R.hora ASC
    `;
    const [rows] = await db.execute(query, [dni_profesor]);
    return rows;
}

// Cancelar reunión
async function eliminarReunion(id_reunion) {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Obtener datos de la reunión para liberar el hueco
        const [rows] = await connection.execute(
            'SELECT fecha, hora, dni_profesor FROM REUNION WHERE id_reunion = ?',
            [id_reunion]
        );

        if (rows.length === 0) {
            throw new Error('REUNION_NO_ENCONTRADA');
        }

        const { fecha, hora, dni_profesor } = rows[0];

        // 2. Borrar la reunión
        await connection.execute('DELETE FROM REUNION WHERE id_reunion = ?', [id_reunion]);

        // 3. Liberar el hueco en DISPONIBILIDAD
        await connection.execute(
            'UPDATE DISPONIBILIDAD SET estado = "libre" WHERE id_profesor = ? AND fecha = ? AND hora = ?',
            [dni_profesor, fecha, hora]
        );

        // 4. Crear Notificación para el profesor
        const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
        const mensajeNotif = `La reunión del ${fechaFormateada} a las ${hora} ha sido cancelada.`;
        await notificacionesService.crearNotificacion(dni_profesor, 'cancelled', mensajeNotif);

        await connection.commit();
        return { message: 'Reunión eliminada' };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { crearReunion, obtenerPorAlumno, obtenerPorProfesor, eliminarReunion };