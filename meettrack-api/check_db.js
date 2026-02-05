const mysql = require('mysql2/promise');
async function check() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'meettrack'
    });
    try {
        const [reuniones] = await pool.execute('SELECT * FROM REUNION');
        console.log('--- REUNIONES ---');
        console.log(JSON.stringify(reuniones, null, 2));
        
        const [alumnos] = await pool.execute('SELECT * FROM ALUMNO');
        console.log('--- ALUMNOS ---');
        console.log(JSON.stringify(alumnos, null, 2));

        const [profesores] = await pool.execute('SELECT * FROM PROFESOR');
        console.log('--- PROFESORES ---');
        console.log(JSON.stringify(profesores, null, 2));
    } catch(e) {
        console.error('ERROR:', e);
    } finally {
        await pool.end();
    }
}
check();
