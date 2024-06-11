-- Crear la base de datos
CREATE DATABASE pura_php;
-- Usar la base de datos
USE pura_php;
-- Crear la tabla categorias
CREATE TABLE categorias (
  id_categoria INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(30) NOT NULL,
  descripcion VARCHAR(255),
  PRIMARY KEY (id_categoria)
);
-- Crear la tabla productos con referencia a categorias
CREATE TABLE productos (
  id_producto INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(64) NOT NULL,
  en_stock TINYINT(1) NOT NULL DEFAULT 1,
  precio DECIMAL(8, 2),
  descripcion VARCHAR(800) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  id_categoria INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_producto),
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);
-- Insertar datos en la tabla categorias
INSERT INTO categorias (nombre, descripcion)
VALUES (
    'Frutos Secos',
    'Semillas comestibles, como almendras, nueces y avellanas, que se consumen por su alto valor nutricional.'
  ),
  (
    'Semillas',
    'Semillas comestibles, como chía, lino y sésamo, que son ricas en nutrientes y se usan en diversas preparaciones culinarias.'
  ),
  (
    'Snacks',
    'Snacks saludables que incluyen barritas de cereal, granola y mezclas de frutos secos y semillas para picar entre comidas.'
  ),
  (
    'Harinas',
    'Harinas especiales utilizadas en la preparación de productos sin gluten y saludables.'
  ),
  (
    'Aceites',
    'Aceites naturales conocidos por sus propiedades beneficiosas y su uso en la cocina saludable.'
  ),
  (
    'Infusiones',
    'Infusiones naturales apreciadas por sus propiedades relajantes y beneficios para la salud.'
  ),
  (
    'Endulzantes',
    'Endulzantes naturales utilizados como alternativas saludables al azúcar refinado.'
  ),
  (
    'Bebidas',
    'Bebidas saludables que se utilizan como sustitutos de la leche de vaca y otras bebidas tradicionales.'
  );
-- Insertar datos en la tabla productos optimizada
INSERT INTO productos (
    nombre,
    en_stock,
    precio,
    descripcion,
    imagen,
    id_categoria
  )
VALUES (
    'Almendras',
    1,
    15.00,
    'Almendras crudas sin sal, una excelente fuente de proteínas y grasas saludables. Son perfectas para snacks o como ingrediente en diversas recetas.',
    'almendras.jpg',
    1
  ),
  (
    'Nueces',
    1,
    12.50,
    'Nueces peladas naturales, ricas en ácidos grasos omega-3 y antioxidantes. Ideales para consumir solas o añadir a ensaladas y postres.',
    'nueces.jpg',
    1
  ),
  (
    'Avellanas',
    1,
    14.00,
    'Avellanas tostadas sin sal, con un sabor delicioso y una textura crujiente. Perfectas para consumir como snack o en repostería.',
    'avellanas.jpg',
    1
  ),
  (
    'Chía',
    1,
    5.00,
    'Semillas de chía orgánicas, una fuente excelente de fibra, proteínas y omega-3. Ideales para agregar a batidos, yogures y postres.',
    'chia.jpg',
    2
  ),
  (
    'Lino',
    0,
    3.50,
    'Semillas de lino dorado, ricas en fibra y ácidos grasos esenciales. Se pueden agregar a panes, batidos y productos horneados.',
    'lino.jpg',
    2
  ),
  (
    'Sésamo',
    1,
    4.00,
    'Semillas de sésamo integral, ideales para espolvorear en ensaladas, panes y platos asiáticos, aportando un sabor y textura únicos.',
    'sesamo.jpg',
    2
  ),
  (
    'Barrita de cereal',
    1,
    1.20,
    'Barrita de cereal con frutos secos, una opción perfecta para un snack rápido y nutritivo. Rica en fibra y proteínas.',
    'barrita_cereal.jpg',
    3
  ),
  (
    'Granola',
    1,
    6.00,
    'Granola con miel y almendras, una mezcla deliciosa y saludable que es perfecta para desayunos o meriendas. Rica en fibra y nutrientes.',
    'granola.jpg',
    3
  ),
  (
    'Mix de frutos secos',
    1,
    10.00,
    'Mix de frutos secos y semillas, una combinación perfecta de sabores y texturas. Ideal para snacks o añadir a yogures y ensaladas.',
    'mix_frutos_secos.jpg',
    3
  ),
  (
    'Harina de almendra',
    0,
    20.00,
    'Harina de almendra sin gluten, perfecta para la repostería saludable. Rica en proteínas y baja en carbohidratos.',
    'harina_almendra.jpg',
    4
  ),
  (
    'Harina de coco',
    1,
    8.00,
    'Harina de coco orgánica, ideal para recetas sin gluten. Aporta un ligero sabor a coco y es rica en fibra y grasas saludables.',
    'harina_coco.jpg',
    4
  ),
  (
    'Harina de avena',
    1,
    3.00,
    'Harina de avena integral, perfecta para preparar panes, pasteles y galletas. Rica en fibra y proteínas.',
    'harina_avena.jpg',
    4
  ),
  (
    'Aceite de coco',
    1,
    7.00,
    'Aceite de coco virgen extra, es un aceite vegetal derivado de la pulpa del coco maduro. Se extrae mediante métodos de prensado en frío o en caliente que conservan perfectamente sus nutrientes y propiedades.',
    'aceite_coco.jpg',
    5
  ),
  (
    'Aceite de oliva',
    0,
    9.00,
    'Aceite de oliva extra virgen, conocido por sus propiedades saludables y su sabor inigualable. Ideal para aderezos y cocina en general.',
    'aceite_oliva.jpg',
    5
  ),
  (
    'Té verde',
    1,
    4.50,
    'Té verde orgánico, apreciado por sus propiedades antioxidantes y beneficios para la salud. Perfecto para disfrutar en cualquier momento del día.',
    'te_verde.jpg',
    6
  ),
  (
    'Té de manzanilla',
    1,
    3.00,
    'Té de manzanilla natural, conocido por sus efectos relajantes y su sabor suave. Ideal para consumir antes de dormir.',
    'te_manzanilla.jpg',
    6
  ),
  (
    'Infusión de jengibre',
    1,
    5.50,
    'Infusión de jengibre y limón, una bebida refrescante y saludable que combina las propiedades del jengibre con el sabor cítrico del limón.',
    'te_jengibre.jpg',
    6
  ),
  (
    'Stevia',
    1,
    6.00,
    'Stevia en polvo, un endulzante natural y sin calorías. Ideal para quienes buscan una alternativa saludable al azúcar.',
    'stevia.jpg',
    7
  ),
  (
    'Miel',
    0,
    7.50,
    'Miel orgánica, un endulzante natural y nutritivo. Perfecta para endulzar bebidas, postres y como remedio natural.',
    'miel.jpg',
    7
  ),
  (
    'Leche de almendras',
    1,
    2.00,
    'Leche de almendras sin azúcar, una bebida saludable y deliciosa. Ideal para quienes buscan una alternativa a la leche de vaca.',
    'leche_almendras.jpg',
    8
  );