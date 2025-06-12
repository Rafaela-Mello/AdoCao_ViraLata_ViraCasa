## Transaction ##

START TRANSACTION;

INSERT INTO cachorro_adotado (cachorro_id, adotante_id, data_adocao) 
VALUES (10, 2, NOW());

UPDATE cachorro SET disponivel = FALSE WHERE cachorro_id = 10;

COMMIT;

##----------------------------------------------------------------------------------##