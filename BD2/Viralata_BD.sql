#DROP DATABASE IF EXISTS viralataViracasa;

# Participantes:
# - Ashmide JN Baptise, CP3025501
# - Melissa Batista Junqueira, CP3029832
# - Rafaela Laryssa Mello Neto, CP303061X
# - Sophia Ferreira Boonen, CP3031756

CREATE DATABASE viralataViracasa;
USE viralataViracasa;

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
    descricao TEXT NOT NULL,
    disponivel_adocao BOOLEAN DEFAULT TRUE
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
    data_adocao DATE NOT NULL,
    data_volta DATE,
    PRIMARY KEY (cachorro_id, adotante_id),
    FOREIGN KEY(cachorro_id) REFERENCES cachorro(cachorro_id),
    FOREIGN KEY(adotante_id) REFERENCES adotante(adotante_id)
);

##----------------------------------------------------------------------------------##

## Inserts ##

# - abrir o arquivo "0 - inserts.sql"

##----------------------------------------------------------------------------------##

## Selects ##

# - abrir o arquivo "1 - consultas.sql"

##----------------------------------------------------------------------------------##

## Views ##

# - abrir o arquivo "2 - views.sql"

##----------------------------------------------------------------------------------##

## Triggers ##

# - abrir o arquivo "3 - triggers.sql"

##----------------------------------------------------------------------------------##

## Procedures ##

# - abrir o arquivo "4 - procedures.sql"

##----------------------------------------------------------------------------------##

## Functions ##

# - abrir o arquivo "5 - functions.sql"

##----------------------------------------------------------------------------------##

## Transaction ##

# - abrir o arquivo "6 - transaction.sql"
