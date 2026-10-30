-- Esquema de JOBMAP SP (MySQL 8.x). Se ejecuta con: npm run db:init
-- No contiene datos: no se inventan empresas, aspirantes ni ofertas.

CREATE TABLE IF NOT EXISTS empresas (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(150) NOT NULL,
  descripcion TEXT NULL,
  ubicacion   VARCHAR(150) NULL,
  sitio_web   VARCHAR(255) NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_empresas_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profesiones (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(120) NOT NULL,
  area        VARCHAR(120) NULL,
  descripcion TEXT NULL,
  requisitos  TEXT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_profesiones_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS aspirantes (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(120) NOT NULL,
  titulo      VARCHAR(150) NULL,
  ubicacion   VARCHAR(150) NULL,
  resumen     TEXT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_aspirantes_ubicacion (ubicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ofertas (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  empresa_id   INT UNSIGNED NOT NULL,
  profesion_id INT UNSIGNED NULL,
  titulo       VARCHAR(150) NOT NULL,
  descripcion  TEXT NULL,
  habilidades  VARCHAR(255) NULL,
  ubicacion    VARCHAR(150) NULL,
  activa       TINYINT(1) NOT NULL DEFAULT 1,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_ofertas_titulo (titulo),
  KEY idx_ofertas_ubicacion (ubicacion),
  CONSTRAINT fk_ofertas_empresa
    FOREIGN KEY (empresa_id) REFERENCES empresas (id) ON DELETE CASCADE,
  CONSTRAINT fk_ofertas_profesion
    FOREIGN KEY (profesion_id) REFERENCES profesiones (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
