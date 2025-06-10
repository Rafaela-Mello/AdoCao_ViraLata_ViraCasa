CREATE DATABASE viralataViracasa;
USE viralataViracasa;

#DROP DATABASE viralataViracasa;

CREATE TABLE adotante(
	adotante_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(160),
    email VARCHAR(350) NOT NULL,
    senha VARCHAR(12) NOT NULL
);

CREATE TABLE cachorro (
	cachorro_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    porte VARCHAR(50) NOT NULL,
    idade VARCHAR(10) NOT NULL,
    sexo ENUM('Macho', 'Fêmea')
);
 
CREATE TABLE vacina (
    vacina_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_vacina VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL
);

CREATE TABLE historicoMedico (
    historico_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cirurgia VARCHAR(100) NOT NULL,
    descricao_cirurgia TEXT NOT NULL,
    cachorro_id INT NOT NULL,
    vacina_id INT NOT NULL,
    FOREIGN KEY (cachorro_id) REFERENCES cachorro(cachorro_id),
    FOREIGN KEY (vacina_id) REFERENCES vacina(vacina_id)
);

CREATE TABLE cachorro_adotado(
    cachorro_id INT NOT NULL,
    adotante_id INT NOT NULL,
    PRIMARY KEY (cachorro_id, adotante_id),
    FOREIGN KEY(cachorro_id) REFERENCES cachorro(cachorro_id),
    FOREIGN KEY(adotante_id) REFERENCES adotante(adotante_id)
);

INSERT INTO adotante (nome, email, senha) VALUES
('Ana Beatriz Lima', 'ana.lima@email.com', 'senha123'),
('Carlos Henrique Souza', 'carlos.h@email.com', '12345678'),
('Fernanda Gomes', 'fernanda.gomes@email.com', 'gomes789'),
('Rafael Almeida', 'rafael.a@email.com', 'almeidax'),
('Juliana Pires', 'juliana.p@email.com', 'juliana1');

INSERT INTO cachorro (nome, porte, idade, sexo) VALUES
('Bidu', 'Pequeno', '2 anos', 'Macho'),
('Luna', 'Médio', '1 ano', 'Fêmea'),
('Thor', 'Grande', '3 anos', 'Macho'),
('Mel', 'Pequeno', '4 meses', 'Fêmea'),
('Rex', 'Grande', '5 anos', 'Macho'),
('Bela', 'Médio', '2 anos', 'Fêmea'),
('Toby', 'Pequeno', '1 ano', 'Macho'),
('Nina', 'Pequeno', '6 meses', 'Fêmea'),
('Max', 'Grande', '3 anos', 'Macho'),
('Sol', 'Médio', '2 anos', 'Fêmea'),
('Zeus', 'Grande', '4 anos', 'Macho'),
('Cacau', 'Pequeno', '8 meses', 'Fêmea'),
('Fred', 'Médio', '2 anos', 'Macho'),
('Amora', 'Pequeno', '1 ano', 'Fêmea'),
('Bob', 'Grande', '6 anos', 'Macho'),
('Lili', 'Pequeno', '3 anos', 'Fêmea'),
('Duke', 'Grande', '2 anos', 'Macho'),
('Maya', 'Médio', '5 meses', 'Fêmea'),
('Jake', 'Grande', '4 anos', 'Macho'),
('Lola', 'Médio', '2 anos', 'Fêmea');

INSERT INTO vacina (nome_vacina, descricao) VALUES
('V10', 'Protege contra 10 doenças virais caninas.'),
('Antirrábica', 'Previne a raiva.'),
('V8', 'Protege contra 8 doenças caninas.'),
('Antirrábica', 'Previne a raiva.'),
('V10', 'Protege contra 10 doenças virais caninas.'),
('Gripe Canina', 'Previne a tosse dos canis.'),
('Antirrábica', 'Previne a raiva.'),
('Giárdia', 'Previne infecção por giárdia.'),
('V10', 'Protege contra 10 doenças virais caninas.'),
('Antirrábica', 'Previne a raiva.');

INSERT INTO historicoMedico (nome_cirurgia, descricao_cirurgia, cachorro_id, vacina_id) VALUES
('Castrado', 'Castrado aos 6 meses.', 1, 1),
('Retirada de tumor', 'Remoção de tumor benigno.', 2, 3),
('Castrado', 'Castrado aos 8 meses.', 3, 5),
('Fratura', 'Cirurgia de reparo de pata quebrada.', 4, 7),
('Castrado', 'Castrado aos 7 meses.', 5, 9);

INSERT INTO cachorro_adotado (cachorro_id, adotante_id) VALUES
(1, 1),
(3, 2),
(5, 3),
(7, 4),
(9, 5);