-- Crear la base de datos
CREATE DATABASE pura_php;

-- Usar la base de datos
USE pura_php;

-- Crear la tabla productos
CREATE TABLE productos (
  id_producto INT(11) NOT NULL AUTO_INCREMENT,
  categoria VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  disponibilidad VARCHAR(255) NOT NULL,
  precio VARCHAR(20) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_producto)
);

-- Insertar datos en la tabla productos
INSERT INTO productos (categoria, nombre, disponibilidad, precio, descripcion, imagen) VALUES
('Frutos Secos', 'Almendras', 'Disponible', '15.00', 'Almendras crudas sin sal', 'almendras.jpg'),
('Frutos Secos', 'Nueces', 'Disponible', '12.50', 'Nueces peladas naturales', 'nueces.jpg'),
('Frutos Secos', 'Avellanas', 'Disponible', '14.00', 'Avellanas tostadas sin sal', 'avellanas.jpg'),
('Semillas', 'Chía', 'Disponible', '5.00', 'Semillas de chía orgánicas', 'chia.jpg'),
('Semillas', 'Lino', 'No disponible', '3.50', 'Semillas de lino dorado', 'lino.jpg'),
('Semillas', 'Sésamo', 'Disponible', '4.00', 'Semillas de sésamo integral', 'sesamo.jpg'),
('Snacks', 'Barrita de cereal', 'Disponible', '1.20', 'Barrita de cereal con frutos secos', 'barrita_cereal.jpg'),
('Snacks', 'Granola', 'Disponible', '6.00', 'Granola con miel y almendras', 'granola.jpg'),
('Snacks', 'Mix de frutos secos', 'Disponible', '10.00', 'Mix de frutos secos y semillas', 'mix_frutos_secos.jpg'),
('Harinas', 'Harina de almendra', 'No disponible', '20.00', 'Harina de almendra sin gluten', 'harina_almendra.jpg'),
('Harinas', 'Harina de coco', 'Disponible', '8.00', 'Harina de coco orgánica', 'harina_coco.jpg'),
('Harinas', 'Harina de avena', 'Disponible', '3.00', 'Harina de avena integral', 'harina_avena.jpg'),
('Aceites', 'Aceite de coco', 'Disponible', '7.00', 'Aceite de coco virgen extra', 'aceite_coco.jpg'),
('Aceites', 'Aceite de oliva', 'No disponible', '9.00', 'Aceite de oliva extra virgen', 'aceite_oliva.jpg'),
('Infusiones', 'Té verde', 'Disponible', '4.50', 'Té verde orgánico', 'te_verde.jpg'),
('Infusiones', 'Té de manzanilla', 'Disponible', '3.00', 'Té de manzanilla natural', 'te_manzanilla.jpg'),
('Infusiones', 'Infusión de jengibre', 'Disponible', '5.50', 'Infusión de jengibre y limón', 'te_jengibre.jpg'),
('Endulzantes', 'Stevia', 'Disponible', '6.00', 'Stevia en polvo', 'stevia.jpg'),
('Endulzantes', 'Miel', 'No disponible', '7.50', 'Miel orgánica', 'miel.jpg'),
('Bebidas', 'Leche de almendras', 'Disponible', '2.00', 'Leche de almendras sin azúcar', 'leche_almendras.jpg');