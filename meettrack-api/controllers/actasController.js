const actasService = require('../services/actasService');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generar(req, res) {
    // 1. Recibimos SOLO texto (JSON), no archivos
    const { contenido, id_alumno, id_profesor } = req.body;

    if (!contenido) {
        return res.status(400).json({ error: 'El contenido del acta es obligatorio' });
    }

    try {
        // 2. Configurar nombre y ruta del archivo
        const nombreArchivo = `acta-${Date.now()}.pdf`;
        // Usamos path.join para que funcione bien en Windows y Linux
        const rutaCompleta = path.join('uploads', nombreArchivo);

        // 3. Crear el PDF en memoria
        const doc = new PDFDocument();

        // Conectar el PDF con el archivo en el disco duro
        doc.pipe(fs.createWriteStream(rutaCompleta));

        // 4. Escribir el contenido en el PDF
        doc.fontSize(20).text('ACTA DE REUNIÓN', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.text(`Profesor ID: ${id_profesor}`);
        doc.text(`Alumno ID: ${id_alumno}`);
        doc.moveDown();
        doc.text('CONTENIDO:', { underline: true });
        doc.moveDown();
        doc.text(contenido, {
            align: 'justify'
        });

        // Finalizar el PDF (esto lo guarda en el disco)
        doc.end();

        // 5. Guardar la ruta en la Base de Datos
        const rutaParaBD = `uploads/${nombreArchivo}`;
        const { id_reunion } = req.body;

        const resultado = await actasService.crearActa(contenido, id_alumno, id_profesor, rutaParaBD, id_reunion);

        res.status(201).json(resultado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al generar el acta' });
    }
}

async function listar(req, res) {
    const { id_alumno } = req.params;
    try {
        const lista = await actasService.obtenerPorAlumno(id_alumno);
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
}

async function listarPorProfesor(req, res) {
    const { id_profesor } = req.params;
    try {
        const lista = await actasService.obtenerPorProfesor(id_profesor);
        res.json(lista);
    } catch (error) {
        console.error('Error al listar actas por profesor:', error);
        res.status(500).json({ error: 'Error interno' });
    }
}

module.exports = { generar, listar, listarPorProfesor };