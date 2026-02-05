require('dotenv').config();
const express = require('express');
const cors = require('cors');
const alumnosRoutes = require('./routes/alumnosRoutes');
const authRoutes = require('./routes/authRoutes');
const profesoresRoutes = require('./routes/profesoresRoutes');
const asignaturasRoutes = require('./routes/asignaturasRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');
const reunionesRoutes = require('./routes/reunionesRoutes');
const actasRoutes = require('./routes/actasRoutes');
const notificacionesRoutes = require('./routes/notificacionesRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Log middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static('uploads'));
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profesores', profesoresRoutes);
app.use('/api/asignaturas', asignaturasRoutes);
app.use('/api/disponibilidad', disponibilidadRoutes);
app.use('/api/reuniones', reunionesRoutes);
app.use('/api/actas', actasRoutes);
app.use('/api/notificaciones', notificacionesRoutes);

app.listen(3000, () => console.log('Servidor organizado por capas listo en localhost:3000'));