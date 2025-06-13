## Functions ##

# Function para verificar se o cachorro esta disponivel ou não para adoção
DELIMITER //
CREATE FUNCTION status_disponibilidade(p_cachorro_id INT)
	RETURNS VARCHAR(20) DETERMINISTIC
BEGIN
    DECLARE adotado INT;
    
    SELECT COUNT(*) INTO adotado
		FROM cachorro_adotado
    WHERE cachorro_id = p_cachorro_id AND data_volta IS NULL;

    RETURN IF(adotado = 0, 'Disponível', 'Indisponível');
END//
DELIMITER ;

# Chamando a function
SELECT nome AS 'Nome do Cachorro', status_disponibilidade(cachorro_id) AS 'Status' FROM cachorro;


# Function para ver quantas vezes um cachorro foi devolvido
DELIMITER //
CREATE FUNCTION total_devolucoes(p_cachorro_id INT)
	RETURNS INT DETERMINISTIC
BEGIN
    DECLARE total INT;

    SELECT COUNT(*) INTO total
    FROM cachorro_adotado
    WHERE cachorro_id = p_cachorro_id AND data_volta IS NOT NULL;

    RETURN total;
END//
DELIMITER ;

# Chamando a function
SELECT nome, total_devolucoes(cachorro_id) AS 'Devoluções' FROM cachorro;


# Function para calcular quantos dias o cachorro está com o adotante, caso ele ainda não tenha sido devolvido
DELIMITER //
CREATE FUNCTION dias_com_adotante(p_cachorro_id INT)
	RETURNS INT DETERMINISTIC
BEGIN
    DECLARE dias INT;

    SELECT DATEDIFF(NOW(), data_adocao) INTO dias
    FROM cachorro_adotado
    WHERE cachorro_id = p_cachorro_id AND data_volta IS NULL
    LIMIT 1;

    RETURN IFNULL(dias, 0);
END//
DELIMITER ;

# Chamando a function
SELECT nome, dias_com_adotante(cachorro_id) AS 'Dias com adotante' FROM cachorro;

##----------------------------------------------------------------------------------##