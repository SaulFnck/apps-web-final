USE db_biblioteca;

CREATE TABLE Autores(
idAutor INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR( 50),
apellido VARCHAR(50),
nacionalidad VARCHAR(25),
fechaNacimiento DATE
);
INSERT INTO Autores (nombre, apellido, nacionalidad, fechaNacimiento) VALUES
('Gabriel', 'García Márquez', 'Colombiana', '1927-03-06'),
('Isabel', 'Allende', 'Chilena', '1942-08-02'),
('Julio', 'Cortázar', 'Argentina', '1914-08-26'),
('Mario', 'Vargas Llosa', 'Peruana', '1936-03-28'),
('Laura', 'Esquivel', 'Mexicana', '1950-09-30'),
('Jorge Luis', 'Borges', 'Argentina', '1899-08-24'),
('Carlos', 'Fuentes', 'Mexicana', '1928-11-11'),
('Pablo', 'Neruda', 'Chilena', '1904-07-12'),
('Juan', 'Rulfo', 'Mexicana', '1917-05-16'),
('Elena', 'Poniatowska', 'Mexicana', '1932-05-19');


CREATE TABLE Editoriales(
idEditorial INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR( 50),
pais VARCHAR(25),
direccion VARCHAR(50),
telefono VARCHAR( 25),
correo VARCHAR(50)
);

INSERT INTO Editoriales (nombre, pais, direccion, telefono, correo) VALUES
('Alfaguara', 'España', 'Calle de los Editores 123, Madrid', '+34 910000111', 'contacto@alfaguara.com'),
('Planeta', 'España', 'Av. Diagonal 450, Barcelona', '+34 935000222', 'info@planeta.es'),
('Penguin Random House', 'Estados Unidos', '1745 Broadway, New York', '+1 2127829000', 'support@penguinrandomhouse.com'),
('Fondo de Cultura Económica', 'México', 'Carretera Picacho-Ajusco 227, CDMX', '+52 5554403000', 'servicios@fce.com.mx'),
('Anagrama', 'España', 'Carrer de Pau Claris 172, Barcelona', '+34 934873000', 'editorial@anagrama-ed.es'),
('Siglo XXI Editores', 'México', 'Av. Universidad 1026, CDMX', '+52 5556657000', 'contacto@sigloxxieditores.com.mx'),
('Debolsillo', 'España', 'Calle de Juan Ignacio Luca 15, Madrid', '+34 917800345', 'info@debolsillo.es'),
('HarperCollins', 'Estados Unidos', '195 Broadway, New York', '+1 2122077000', 'info@harpercollins.com'),
('Tusquets Editores', 'España', 'Travessera de Gràcia 47, Barcelona', '+34 934870556', 'contacto@tusquetseditores.com'),
('Ediciones SM', 'México', 'Av. Benito Juárez 240, CDMX', '+52 5555004020', 'sm@ediciones-sm.com');

CREATE TABLE Clientes(
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR( 50),
apellido VARCHAR(50),
correo VARCHAR ( 50),
telefono VARCHAR(25),
direccion VARCHAR(50),
fechaNacimiento DATE
);

INSERT INTO Clientes (nombre, apellido, correo, telefono, direccion, fechaNacimiento) VALUES
('Saúl', 'Ramírez', 'saul.ramirez@example.com', '5543219087', 'Av. Reforma 120, CDMX', '1999-04-15'),
('María', 'Lozano', 'maria.lozano@example.com', '5538764421', 'Calle Hidalgo 45, Monterrey', '1987-11-02'),
('José', 'Gómez', 'jose.gomez@example.com', '5549123344', 'Col. Americana 77, Guadalajara', '1995-06-30'),
('Ana', 'Torres', 'ana.torres@example.com', '5522109876', 'Calle Morelos 300, Puebla', '2001-02-10'),
('Carlos', 'Santos', 'carlos.santos@example.com', '5577992211', 'Av. Universidad 1700, CDMX', '1992-09-27'),
('Fernanda', 'Martínez', 'fernanda.mtz@example.com', '5544889912', 'Col. Centro 10, Querétaro', '1998-12-04'),
('Roberto', 'Pérez', 'roberto.perez@example.com', '5511223344', 'Calle Palma 12, Mérida', '1985-03-19'),
('Valeria', 'Castro', 'valeria.castro@example.com', '5533001122', 'Calle Arbolada 56, Toluca', '2000-07-08'),
('Javier', 'Luna', 'javier.luna@example.com', '5588997766', 'Blvd. Belisario 220, Tijuana', '1993-01-25'),
('Lucía', 'Herrera', 'lucia.herrera@example.com', '5522557788', 'Calle Jardines 89, León', '1997-05-17');

CREATE TABLE Libros(
idLibro INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(50),
anioLanzamiento VARCHAR(10),
ISBN VARCHAR(13),
numeroPaginas INT,
stock INT,
sinopsis VARCHAR(150),
idAutor INT,
idEditorial INT,
FOREIGN KEY (idAutor) REFERENCES Autores(idAutor),
FOREIGN KEY (idEditorial) REFERENCES Editoriales(idEditorial)
);
INSERT INTO Libros (titulo, anioLanzamiento, ISBN, numeroPaginas, stock, sinopsis, idAutor, idEditorial) VALUES
('Cien años de soledad', '1967', '9780307474728', 417, 5, 'La historia de la familia Buendía en Macondo.', 1, 1),
('La casa de los espíritus', '1982', '9780553383805', 433, 7, 'Saga familiar marcada por el realismo mágico.', 2, 2),
('Rayuela', '1963', '9788437604183', 600, 4, 'Novela icónica del boom latinoamericano.', 3, 3),
('La ciudad y los perros', '1963', '9788439720775', 410, 6, 'Crítica a la violencia militar en un colegio.', 4, 4),
('Como agua para chocolate', '1989', '9780385420174', 256, 10, 'Historia de amor acompañada de recetas mexicanas.', 5, 5),
('El Aleph', '1949', '9789871138156', 190, 8, 'Relatos filosóficos sobre el infinito y el tiempo.', 6, 6),
('La región más transparente', '1958', '9786073133107', 346, 4, 'Retrato crítico de la sociedad mexicana moderna.', 7, 7),
('Veinte poemas de amor', '1924', '9789561224301', 120, 12, 'Colección poética romántica latinoamericana.', 8, 8),
('Pedro Páramo', '1955', '9788437603586', 124, 9, 'Un viaje surrealista al pueblo de Comala.', 9, 9),
('La noche de Tlatelolco', '1971', '9789684113627', 300, 3, 'Testimonio del movimiento estudiantil del 68.', 10, 10);

CREATE TABLE Rentas(
idRenta INT PRIMARY KEY AUTO_INCREMENT,
idCliente INT,
idLibro INT,
fechaRenta DATE,
fechaEstimadaDevolucion DATE,
fechaRealDevolucion DATE,
estado BOOLEAN,

FOREIGN KEY (idCliente) REFERENCES Clientes(idCliente),
FOREIGN KEY (idLibro) REFERENCES Libros(idLibro)
);
INSERT INTO Rentas (idCliente, idLibro, fechaRenta, fechaEstimadaDevolucion, fechaRealDevolucion, estado) VALUES
(1, 3, '2025-01-05', '2025-01-10', '2025-01-09', 1),
(2, 7, '2025-01-08', '2025-01-15', NULL, 0),
(3, 1, '2025-01-12', '2025-01-18', '2025-01-17', 1),
(4, 5, '2025-01-15', '2025-01-20', NULL, 0),
(5, 9, '2025-01-18', '2025-01-23', '2025-01-23', 1),
(6, 2, '2025-01-20', '2025-01-25', NULL, 0),
(7, 4, '2025-01-22', '2025-01-28', '2025-01-27', 1),
(8, 10, '2025-01-25', '2025-01-30', NULL, 0),
(9, 6, '2025-01-27', '2025-02-01', '2025-01-31', 1),
(10, 8, '2025-01-29', '2025-02-04', NULL, 0);


SELECT * FROM Autores;

SELECT * FROM Editoriales;

SELECT * FROM Clientes;

SELECT * FROM Libros;

SELECT * FROM Rentas;




