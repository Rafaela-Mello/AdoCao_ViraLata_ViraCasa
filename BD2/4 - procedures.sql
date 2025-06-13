## Procedures ##

# Procedure para já inserir um cachorro adotado com a data de adoção para a atual
DELIMITER //
CREATE PROCEDURE registrar_adocao (IN p_cachorro_id INT, IN p_adotante_id INT)
BEGIN
    INSERT INTO cachorro_adotado (cachorro_id, adotante_id, data_adocao)
    VALUES (p_cachorro_id, p_adotante_id, CURDATE());
END//
DELIMITER ;

CALL registrar_adocao(2, 3); ## Terá um aviso, por conta do trigger limitando a adoção de um cachorro já adotado
CALL registrar_adocao(4, 5); ## Deu certo


# Procedure para inserir um cachorro na tabela com o status "disponivel" ja definido
DELIMITER //
CREATE PROCEDURE cadastrar_cachorro (IN p_nome VARCHAR(100), IN p_porte VARCHAR(50), IN p_idade VARCHAR(10),
	IN p_sexo ENUM('Macho', 'Fêmea'), IN disponivel_adocao BOOLEAN)
BEGIN
    INSERT INTO cachorro (nome, porte, idade, sexo, disponivel_adocao) VALUES (p_nome, p_porte, p_idade, p_sexo, TRUE);
END//
DELIMITER ;

# Chamando a procedure cadastrar_cachorro() para o cachorro Chico (id
CALL cadastrar_cachorro('Chico', 'Médio', '2 anos', 'Macho');


#  Procedure para inserir historico medico em um cachorro com restrição de verificar se o cachorro existe
# e se a vacina existe, antes de inserir
DELIMITER //
CREATE PROCEDURE inserir_historico (IN p_cachorro_id INT, IN p_vacina_id INT, IN p_nome_cirurgia VARCHAR(100),
	IN p_descricao TEXT)
BEGIN
    IF EXISTS (SELECT 1 FROM cachorro WHERE cachorro_id = p_cachorro_id) AND
       EXISTS (SELECT 1 FROM vacina WHERE vacina_id = p_vacina_id) THEN
			INSERT INTO historicoMedico (cachorro_id, vacina_id, nome_cirurgia, descricao_cirurgia)
				VALUES (p_cachorro_id, p_vacina_id, p_nome_cirurgia, p_descricao);
    END IF;
END//
DELIMITER ;

# Chamando a procedure inserir_historico() para o cachorro de id 2 (Luna), com a vacina 3 (Vacina V8) 
CALL inserir_historico(2, 3, 'Extração dentária', 'Remoção de dente infectado após exame odontológico.');

##----------------------------------------------------------------------------------##