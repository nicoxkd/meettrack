CREATE TABLE ASIGNATURA (
    id_asignatura VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255)
);

CREATE TABLE ALUMNO (
    dni VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    apellidos VARCHAR(255),
    email VARCHAR(255),
    contrasenia_cifrada VARCHAR(255) NOT NULL,
    id_asignatura VARCHAR(255),
    FOREIGN KEY (id_asignatura) REFERENCES ASIGNATURA(id_asignatura)
);

CREATE TABLE PROFESOR (
    dni VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    apellidos VARCHAR(255),
    email VARCHAR(255),
    contrasenia_cifrada VARCHAR(255) NOT NULL,
    id_asignatura VARCHAR(255),
    FOREIGN KEY (id_asignatura) REFERENCES ASIGNATURA(id_asignatura)
);

CREATE TABLE DISPONIBILIDAD (
    id_disponibilidad VARCHAR(255) PRIMARY KEY,
    fecha DATE,
    hora TIME,
    estado VARCHAR(255),
    id_profesor VARCHAR(255),
    FOREIGN KEY (id_profesor) REFERENCES PROFESOR(dni)
);

CREATE TABLE REUNION (
    id_reunion VARCHAR(255) PRIMARY KEY,
    fecha DATE,
    hora TIME,
    estado VARCHAR(255),
    dni_alumno VARCHAR(255),
    dni_profesor VARCHAR(255),
    FOREIGN KEY (dni_alumno) REFERENCES ALUMNO(dni),
    FOREIGN KEY (dni_profesor) REFERENCES PROFESOR(dni)
);

CREATE TABLE ACTA (
    id_acta VARCHAR(255) PRIMARY KEY,
    contenido TEXT,
    fecha_creacion DATETIME,
    estado VARCHAR(255),
    id_alumno VARCHAR(255),
    id_profesor VARCHAR(255),
    ruta_archivo VARCHAR(255),
    id_reunion VARCHAR(255),
    FOREIGN KEY (id_alumno) REFERENCES ALUMNO(dni),
    FOREIGN KEY (id_profesor) REFERENCES PROFESOR(dni)
);

CREATE TABLE NOTIFICACION (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni_usuario VARCHAR(255),
    tipo VARCHAR(50),
    mensaje TEXT,
    fecha DATETIME,
    leida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (dni_usuario) REFERENCES PROFESOR(dni)
);