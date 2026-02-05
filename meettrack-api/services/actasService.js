const db = require('../config/db');

async function crearActa(contenido, id_alumno, id_profesor, ruta_archivo, id_reunion) {
    const id_acta = 'acta_' + Date.now();
    const fecha_creacion = new Date();
    const estado = 'publicada';

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Insertar el acta
        await connection.execute(
            'INSERT INTO ACTA (id_acta, contenido, fecha_creacion, estado, id_alumno, id_profesor, ruta_archivo, id_reunion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id_acta, contenido, fecha_creacion, estado, id_alumno, id_profesor, ruta_archivo, id_reunion]
        );

        // 2. Si hay id_reunion, marcar la reunión como finalizada
        if (id_reunion) {
            await connection.execute(
                'UPDATE REUNION SET estado = "finalizada" WHERE id_reunion = ?',
                [id_reunion]
            );
        }

        await connection.commit();
        return { message: 'Acta guardada y reunión finalizada', id_acta, url: ruta_archivo };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// Listar actas de un alumno
async function obtenerPorAlumno(id_alumno) {
    const query = `
        SELECT A.*, P.nombre AS nombre_profesor, P.apellidos AS apellidos_profesor 
        FROM ACTA A
        JOIN PROFESOR P ON A.id_profesor = P.dni
        WHERE A.id_alumno = ?
        ORDER BY A.fecha_creacion DESC
    `;
    const [rows] = await db.execute(query, [id_alumno]);
    return rows;
}

// Listar actas de un profesor
async function obtenerPorProfesor(id_profesor) {
    const query = `
        SELECT A.*, AL.nombre AS nombre_alumno, AL.apellidos AS apellidos_alumno 
        FROM ACTA A
        JOIN ALUMNO AL ON A.id_alumno = AL.dni
        WHERE A.id_profesor = ?
        ORDER BY A.fecha_creacion DESC
    `;
    const [rows] = await db.execute(query, [id_profesor]);
    return rows;
}

module.exports = { crearActa, obtenerPorAlumno, obtenerPorProfesor };