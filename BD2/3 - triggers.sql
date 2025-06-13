## Triggers ##

# Log para registrar todos os dados de cachorros adotados como forma de manter os dados seguros
CREATE TABLE log_adocao (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    cachorro_id INT,
    adotante_id INT,
    data_adocao DATETIME,
    data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#  Trigger para adicionar os dados de cachorro adotado para o log como forma de manter os dados salvos em um "backup"
# de uma forma mais segura e sem perder os dados registrados de adoção
DELIMITER //
CREATE TRIGGER after_adocao_insert
	AFTER INSERT ON cachorro_adotado
		FOR EACH ROW
BEGIN
    INSERT INTO log_adocao (cachorro_id, adotante_id, data_adocao) 
		VALUES (NEW.cachorro_id, NEW.adotante_id, NEW.data_adocao);
END//
DELIMITER ;


# Trigger para evitar a adoção de um mesmo cachorro por outras pessoas ao mesmo tempo
DELIMITER //
CREATE TRIGGER before_adocao_insert
	BEFORE INSERT ON cachorro_adotado
		FOR EACH ROW
BEGIN
    DECLARE ja_adotado INT;

    SELECT COUNT(*) INTO ja_adotado
		FROM cachorro_adotado
    WHERE cachorro_id = NEW.cachorro_id AND data_volta IS NULL;

    IF ja_adotado > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Este cachorro já está adotado e ainda não foi devolvido.';
    END IF;
END//
DELIMITER ;


# Trigger para adicionar a data de adoção, caso não seja informada
DELIMITER //
CREATE TRIGGER before_adocao_default_data
	BEFORE INSERT ON cachorro_adotado
		FOR EACH ROW
BEGIN
    IF NEW.data_adocao IS NULL THEN
        SET NEW.data_adocao = CURDATE();
    END IF;
END//
DELIMITER ;


#Log para registrar alterações no historico medico dos cachorros
CREATE TABLE log_historico_medico (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    cachorro_id INT,
    vacina_id INT,
    nome_cirurgia VARCHAR(100),
    data_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    acao VARCHAR(20)
);


#Trigger para todas as adições novas no histórico médico
DELIMITER //
CREATE TRIGGER after_historico_insert
	AFTER INSERT ON historicoMedico
		FOR EACH ROW
BEGIN
    INSERT INTO log_historico_medico (
        cachorro_id, vacina_id, nome_cirurgia, acao
    )
    VALUES (
        NEW.cachorro_id, NEW.vacina_id, NEW.nome_cirurgia, 'INSERÇÃO'
    );
END//
DELIMITER ;

# Trigger para alterar o estado de disponível de adoção, caso seja adotado
DELIMITER //
CREATE TRIGGER after_adocao_cachorro_indisponivel
	AFTER INSERT ON cachorro_adotado
		FOR EACH ROW
BEGIN
    UPDATE cachorro
    SET disponivel_adocao = FALSE
    WHERE cachorro_id = NEW.cachorro_id;
END//
DELIMITER ;

# Trigger para caso o cachorro retorne
DELIMITER //
CREATE TRIGGER after_devolucao_cachorro_disponivel
	AFTER UPDATE ON cachorro_adotado
		FOR EACH ROW
BEGIN
    IF 
		NEW.data_volta IS NOT NULL 
			AND OLD.data_volta IS NULL 
	THEN
        UPDATE cachorro
        SET disponivel = TRUE
        WHERE cachorro_id = NEW.cachorro_id;
    END IF;
END//
DELIMITER ;

##----------------------------------------------------------------------------------##