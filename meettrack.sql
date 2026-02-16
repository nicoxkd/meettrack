-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2026 a las 19:25:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `meettrack`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acta`
--

DROP TABLE IF EXISTS `acta`;
CREATE TABLE IF NOT EXISTS `acta` (
  `id_acta` varchar(255) NOT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `id_alumno` varchar(255) DEFAULT NULL,
  `id_profesor` varchar(255) DEFAULT NULL,
  `ruta_archivo` varchar(500) DEFAULT NULL,
  `id_reunion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_acta`),
  KEY `id_alumno` (`id_alumno`),
  KEY `id_profesor` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `acta`
--

INSERT INTO `acta` (`id_acta`, `contenido`, `fecha_creacion`, `estado`, `id_alumno`, `id_profesor`, `ruta_archivo`, `id_reunion`) VALUES
('acta_1764704170526', 'En esta reunión hemos hablado sobre el progreso del alumno en matemáticas. Se compromete a estudiar más álgebra y el profesor le enviará ejercicios de refuerzo para la semana que viene.', '2025-12-02 20:36:10', 'publicada', '12345678Z', '55555555K', 'uploads/acta-1764704170450.pdf', NULL),
('acta_1769873805207', 'hola', '2026-01-31 16:36:45', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769873805159.pdf', NULL),
('acta_1769876185775', 'Todo bien y correcto', '2026-01-31 17:16:25', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769876185745.pdf', NULL),
('acta_1769876198559', 'Todo bien', '2026-01-31 17:16:38', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769876198555.pdf', NULL),
('acta_1769876493360', 'Bien', '2026-01-31 17:21:33', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769876493355.pdf', NULL),
('acta_1769876547163', 'Biena', '2026-01-31 17:22:27', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769876547159.pdf', NULL),
('acta_1769876745444', 'qweasd', '2026-01-31 17:25:45', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769876745439.pdf', NULL),
('acta_1769876753537', 'asdasfa', '2026-01-31 17:25:53', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769876753534.pdf', NULL),
('acta_1769877046406', 'zasd', '2026-01-31 17:30:46', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769877046401.pdf', NULL),
('acta_1769877181302', 'sad', '2026-01-31 17:33:01', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769877181299.pdf', NULL),
('acta_1769877228246', 'sad', '2026-01-31 17:33:48', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769877228217.pdf', NULL),
('acta_1769877400409', 'bienaaaa', '2026-01-31 17:36:40', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769877400401.pdf', NULL),
('acta_1769878644370', 'hola', '2026-01-31 17:57:24', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769878644356.pdf', NULL),
('acta_1769878652085', 'dgfh', '2026-01-31 17:57:32', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769878652079.pdf', NULL),
('acta_1769878655913', 'dgh', '2026-01-31 17:57:35', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769878655909.pdf', NULL),
('acta_1769878774381', 'sadsf', '2026-01-31 17:59:34', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769878774377.pdf', NULL),
('acta_1769879881387', 'prueba', '2026-01-31 18:18:01', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769879881357.pdf', 'reunion_1769878569338'),
('acta_1769879919068', 'hola', '2026-01-31 18:18:39', 'publicada', '29500505S', '99887766P', 'uploads/acta-1769879919064.pdf', 'reunion_1769879907958');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `dni` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasenia_cifrada` varchar(255) NOT NULL,
  `id_asignatura` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dni`),
  KEY `id_asignatura` (`id_asignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`dni`, `nombre`, `apellidos`, `email`, `contrasenia_cifrada`, `id_asignatura`) VALUES
('12345678Z', 'Nico', 'Cabello', 'nico@meettrack.com', '$2b$10$BsbvlN5s7k6aDeSBi0YaD.lSCgMz16o8OgzeSPq9bGEPpegvSwUja', NULL),
('29500505S', 'Nico', 'Segundo', 'nicocaro1022@gmail.com', '$2b$10$JKtOGf4f.7GLTXuAvZTST.BZOcgIsoVfbVq6oSEz7tgoRItJ2sACq', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
CREATE TABLE IF NOT EXISTS `asignatura` (
  `id_asignatura` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_asignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`id_asignatura`, `nombre`, `descripcion`) VALUES
('MAT101', 'Matemáticas', 'Álgebra y Cálculo básico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad`
--

DROP TABLE IF EXISTS `disponibilidad`;
CREATE TABLE IF NOT EXISTS `disponibilidad` (
  `id_disponibilidad` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `id_profesor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_disponibilidad`),
  KEY `id_profesor` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disponibilidad`
--

INSERT INTO `disponibilidad` (`id_disponibilidad`, `fecha`, `hora`, `estado`, `id_profesor`) VALUES
('disp_1764701469737', '2024-11-20', '10:30:00', 'ocupada', '55555555K'),
('disp_1769873776444', '2026-01-01', '13:20:00', 'libre', '99887766P'),
('disp_1769873856749', '2026-01-31', '23:20:00', 'libre', '99887766P'),
('disp_1769875256487', '2026-03-02', '08:30:00', 'libre', '99887766P'),
('disp_1769875256489', '2026-03-02', '09:30:00', 'libre', '99887766P'),
('disp_1769875256490', '2026-03-02', '11:00:00', 'libre', '99887766P'),
('disp_1769875256492', '2026-03-02', '12:00:00', 'libre', '99887766P'),
('disp_1769875902442', '2026-01-31', '17:15:00', 'libre', '99887766P'),
('disp_1769877317399', '2026-01-31', '09:30:00', 'libre', '99887766P'),
('disp_1769877791264', '2026-01-31', '17:45:00', 'libre', '99887766P'),
('disp_1769877955640', '2026-01-31', '08:30:00', 'libre', '99887766P'),
('disp_1769878483521', '2026-01-31', '11:00:00', 'libre', '99887766P'),
('disp_1769878483523', '2026-01-31', '14:00:00', 'libre', '99887766P'),
('disp_1769878483524', '2026-01-31', '12:00:00', 'libre', '99887766P'),
('disp_1769878483526', '2026-01-31', '13:00:00', 'libre', '99887766P'),
('disp_1770291789891', '2026-02-21', '08:30:00', 'ocupada', '99887766P'),
('disp_1770292359355', '2026-02-05', '08:30:00', 'ocupada', '99887766P'),
('disp_1770292359356', '2026-02-05', '09:30:00', 'libre', '99887766P'),
('disp_1770292359357', '2026-02-05', '12:00:00', 'libre', '99887766P'),
('disp_1770292359358', '2026-02-05', '11:00:00', 'libre', '99887766P'),
('disp_1770292359361', '2026-02-05', '13:00:00', 'libre', '99887766P'),
('disp_1770292359362', '2026-02-05', '14:00:00', 'libre', '99887766P'),
('disp_1770292361547', '2026-02-05', '08:30:00', 'libre', '99887766P'),
('disp_1770292361549', '2026-02-05', '09:30:00', 'libre', '99887766P'),
('disp_1770292361550', '2026-02-05', '12:00:00', 'libre', '99887766P'),
('disp_1770292361551', '2026-02-05', '13:00:00', 'libre', '99887766P'),
('disp_1770292361552', '2026-02-05', '14:00:00', 'libre', '99887766P'),
('disp_1770292609150', '2026-02-21', '09:30:00', 'libre', '24065433G'),
('disp_1770292609151', '2026-02-21', '08:30:00', 'libre', '24065433G'),
('disp_1770292609152', '2026-02-21', '13:00:00', 'libre', '24065433G'),
('disp_1770292609153', '2026-02-21', '12:00:00', 'libre', '24065433G'),
('disp_1770292609154', '2026-02-21', '14:00:00', 'libre', '24065433G'),
('disp_1770292611629', '2026-02-21', '09:30:00', 'libre', '24065433G'),
('disp_1770292611630', '2026-02-21', '08:30:00', 'libre', '24065433G'),
('disp_1770292611631', '2026-02-21', '11:00:00', 'libre', '24065433G'),
('disp_1770292611632', '2026-02-21', '14:00:00', 'libre', '24065433G'),
('disp_1770292618003', '2026-02-05', '14:00:00', 'libre', '24065433G'),
('disp_1770292618006', '2026-02-05', '09:30:00', 'libre', '24065433G'),
('disp_1770292618007', '2026-02-05', '11:00:00', 'libre', '24065433G'),
('disp_1770292618008', '2026-02-05', '08:30:00', 'libre', '24065433G'),
('disp_1770292633552', '2026-02-11', '14:00:00', 'libre', '24065433G'),
('disp_1770292633553', '2026-02-11', '13:00:00', 'libre', '24065433G'),
('disp_1770292633554', '2026-02-11', '12:00:00', 'libre', '24065433G'),
('disp_1770292633555', '2026-02-11', '11:00:00', 'libre', '24065433G'),
('disp_1770292638395', '2026-02-17', '14:00:00', 'libre', '24065433G'),
('disp_1770292638398', '2026-02-17', '13:00:00', 'libre', '24065433G'),
('disp_1770292638399', '2026-02-17', '12:00:00', 'libre', '24065433G'),
('disp_1770292638400', '2026-02-17', '11:00:00', 'libre', '24065433G'),
('disp_1770292638401', '2026-02-17', '08:30:00', 'libre', '24065433G'),
('disp_1770292640942', '2026-02-17', '14:00:00', 'libre', '24065433G'),
('disp_1770292640943', '2026-02-17', '13:00:00', 'libre', '24065433G'),
('disp_1770292640944', '2026-02-17', '12:00:00', 'libre', '24065433G'),
('disp_1770292640945', '2026-02-17', '11:00:00', 'libre', '24065433G'),
('disp_1770292640946', '2026-02-17', '09:30:00', 'libre', '24065433G'),
('disp_1770292644247', '2026-02-17', '14:00:00', 'libre', '24065433G'),
('disp_1770292644248', '2026-02-17', '13:00:00', 'libre', '24065433G'),
('disp_1770292644249', '2026-02-17', '11:00:00', 'libre', '24065433G'),
('disp_1770292644251', '2026-02-17', '08:30:00', 'libre', '24065433G'),
('disp_1770292649862', '2026-02-28', '14:00:00', 'libre', '24065433G'),
('disp_1770292649863', '2026-02-28', '13:00:00', 'libre', '24065433G'),
('disp_1770292649864', '2026-02-28', '11:00:00', 'libre', '24065433G'),
('disp_1770292649865', '2026-02-28', '08:30:00', 'libre', '24065433G'),
('disp_1770292674001', '2026-02-28', '09:30:00', 'libre', '24065433G'),
('disp_1770292674002', '2026-02-28', '12:00:00', 'libre', '24065433G'),
('disp_1770293638155', '2026-02-25', '08:30:00', 'ocupada', '24065433G'),
('disp_1770293638156', '2026-02-25', '09:30:00', 'libre', '24065433G'),
('disp_1770293638158', '2026-02-25', '13:00:00', 'libre', '24065433G'),
('disp_1770293638159', '2026-02-25', '14:00:00', 'libre', '24065433G'),
('disp_1770293638160', '2026-02-25', '12:00:00', 'libre', '24065433G'),
('disp_1770293659422', '2026-02-25', '11:00:00', 'libre', '24065433G'),
('disp_1770296489397', '2026-02-14', '11:00:00', 'libre', '99887766P'),
('disp_1770297492850', '2026-02-13', '11:00:00', 'libre', '99887766P');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
CREATE TABLE IF NOT EXISTS `notificacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dni_usuario` varchar(255) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `leida` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `dni_usuario` (`dni_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificacion`
--

INSERT INTO `notificacion` (`id`, `dni_usuario`, `tipo`, `mensaje`, `fecha`, `leida`) VALUES
(9, '99887766P', 'accepted', 'Nico ha solicitado una reunión para el 02 de marzo de 2026 a las 12:00:00.', '2026-01-31 17:58:49', 0),
(10, '99887766P', 'accepted', 'Nico ha solicitado una reunión para el 02 de marzo de 2026 a las 08:30:00.', '2026-01-31 17:58:55', 0),
(12, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 12:00:00 ha sido cancelada.', '2026-02-05 12:47:52', 0),
(13, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 13:00:00 ha sido cancelada.', '2026-02-05 12:47:54', 0),
(14, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 17:15:00 ha sido cancelada.', '2026-02-05 12:47:56', 0),
(15, '99887766P', 'cancelled', 'La reunión del 02 de marzo de 2026 a las 12:00:00 ha sido cancelada.', '2026-02-05 12:48:00', 0),
(16, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 23:20:00 ha sido cancelada.', '2026-02-05 12:48:01', 0),
(17, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 17:45:00 ha sido cancelada.', '2026-02-05 12:48:05', 0),
(18, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 11:00:00 ha sido cancelada.', '2026-02-05 12:48:07', 0),
(19, '99887766P', 'cancelled', 'La reunión del 31 de enero de 2026 a las 09:30:00 ha sido cancelada.', '2026-02-05 12:48:12', 0),
(20, '99887766P', 'cancelled', 'La reunión del 02 de marzo de 2026 a las 08:30:00 ha sido cancelada.', '2026-02-05 12:48:16', 0),
(23, '24065433G', 'accepted', 'Nico ha solicitado una reunión para el 25 de febrero de 2026 a las 08:30:00.', '2026-02-05 13:29:14', 0),
(24, '99887766P', 'accepted', 'Nico ha solicitado una reunión para el 05 de febrero de 2026 a las 08:30:00.', '2026-02-05 14:26:10', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `dni` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasenia_cifrada` varchar(255) NOT NULL,
  `id_asignatura` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`dni`),
  KEY `id_asignatura` (`id_asignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`dni`, `nombre`, `apellidos`, `email`, `contrasenia_cifrada`, `id_asignatura`) VALUES
('15229112F', 'Wilman', 'Acosta', 'wilman@gmail.com', '$2b$10$/77hZeiWR1JtVZNRYdo4BupGDcJ0YE5an5wbOCwY8sqezmBK44yuS', NULL),
('24065433G', 'Nuria', 'Fuentes', 'nfuentes@gmail.com', '$2b$10$HnkpQMs6rhFIhAxJ2O7eWeobsyLxBr6QIkh92cjBfyHyfgAbD1Boe', NULL),
('55555555K', 'Minerva', 'McGonagall', 'minerva@hogwarts.com', '$2b$10$NIC9eC/zJGq8iv16/rnMdelL2fTLN8HKRk.tO1dH3zNhx2i0KDjoy', NULL),
('99887766P', 'Carlos', 'Basulto', 'profesor@gmail.com', '$2b$10$9Jksb3KH99k14gEuDWsND.FQoMP2pnAV5yMDxyl7aKOMTrUCTOotK', NULL),
('99999999R', 'Severus', 'Snape', 'snape@meettrack.com', 'hola', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reunion`
--

DROP TABLE IF EXISTS `reunion`;
CREATE TABLE IF NOT EXISTS `reunion` (
  `id_reunion` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `dni_alumno` varchar(255) DEFAULT NULL,
  `dni_profesor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_reunion`),
  KEY `dni_alumno` (`dni_alumno`),
  KEY `dni_profesor` (`dni_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reunion`
--

INSERT INTO `reunion` (`id_reunion`, `fecha`, `hora`, `estado`, `dni_alumno`, `dni_profesor`) VALUES
('reunion_1764702529668', '2024-11-20', '10:30:00', 'pendiente', '12345678Z', '55555555K'),
('reunion_1770292124799', '2026-02-21', '08:30:00', 'pendiente', '29500505S', '99887766P'),
('reunion_1770294554573', '2026-02-25', '08:30:00', 'pendiente', '29500505S', '24065433G'),
('reunion_1770297970682', '2026-02-05', '08:30:00', 'pendiente', '29500505S', '99887766P');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acta`
--
ALTER TABLE `acta`
  ADD CONSTRAINT `acta_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`dni`),
  ADD CONSTRAINT `acta_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`dni`);

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`);

--
-- Filtros para la tabla `disponibilidad`
--
ALTER TABLE `disponibilidad`
  ADD CONSTRAINT `disponibilidad_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`dni`);

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`dni_usuario`) REFERENCES `profesor` (`dni`);

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`);

--
-- Filtros para la tabla `reunion`
--
ALTER TABLE `reunion`
  ADD CONSTRAINT `reunion_ibfk_1` FOREIGN KEY (`dni_alumno`) REFERENCES `alumno` (`dni`),
  ADD CONSTRAINT `reunion_ibfk_2` FOREIGN KEY (`dni_profesor`) REFERENCES `profesor` (`dni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
