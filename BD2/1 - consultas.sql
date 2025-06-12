## Selects ##

# Consulta mostrando o vinculo entre adotante e cachorro, dentre os cachorros adotados, além de mostrar a data de adoção
SELECT a.nome AS 'Adotante', c.nome AS 'Cachorro', ca.data_adocao AS 'Data de Adoção'
FROM adotante AS a
  JOIN cachorro_adotado ca ON a.adotante_id = ca.adotante_id
  JOIN cachorro c ON c.cachorro_id = ca.cachorro_id
WHERE ca.data_volta IS NULL;

# Consulta para mostrar o nome, porte e sexo de um cachorro, além da vacina que ele possui e seu histórico médico
SELECT c.nome AS 'Nome do Cachorro', c.porte AS 'Porte', c.sexo AS 'Sexo', v.nome_vacina AS 'Vacina', 
his.nome_cirurgia AS 'Cirurgia', his.descricao_cirurgia AS 'Descrição da Cirurgia'
FROM cachorro c
  JOIN historicoMedico his ON his.cachorro_id = c.cachorro_id
  JOIN vacina v ON his.vacina_id = v.vacina_id
ORDER BY c.nome ASC;
  
## Consulta para mostrar o nome do adotante e quantos cachorros eles adotaram
SELECT a.nome AS 'Adotante', COUNT(c.cachorro_id) AS 'Quantidade cachorros'
	FROM adotante a
JOIN cachorro_adotado ca ON ca.adotante_id = a.adotante_id
JOIN cachorro c ON c.cachorro_id = ca.cachorro_id
	GROUP BY a.adotante_id;
    
# Consulta para mostrar os cachorros que foram devolvidos
SELECT c.nome AS 'Cachorro devolvido', ca.data_volta as 'Data Devolução'
	FROM cachorro c
JOIN cachorro_adotado ca ON ca.cachorro_id = c.cachorro_id
WHERE data_volta IS NOT NULL;

# Consulta para mostrar todos os cachorros adotados em 2024
SELECT c.nome AS 'Cachorro adotado', ca.data_adocao AS 'Data Adoção'
	FROM cachorro c
JOIN cachorro_adotado ca ON ca.cachorro_id = c.cachorro_id
WHERE YEAR(ca.data_adocao) = 2024;

# Consulta para mostrar todos os cachorros idade maior ou igual a 3 anos que realizaram cirurgias
SELECT c.nome AS 'Nome do Cachorro', c.idade AS 'Idade' , his.nome_cirurgia AS 'Cirurgia', 
	his.descricao_cirurgia AS 'Descrição da Cirurgia'
FROM cachorro c
  JOIN historicoMedico his ON his.cachorro_id = c.cachorro_id
WHERE c.idade LIKE '%3 anos%';

# Consulta para mostrar todos os cachorros que foram vacinados com V10
SELECT c.nome AS 'Nome cachorro'
	FROM cachorro c
JOIN historicoMedico his ON his.cachorro_id = c.cachorro_id
JOIN vacina v ON v.vacina_id = his.vacina_id
	WHERE nome_vacina = 'V10';
    
# Consulta para mostrar a quantidade de cachorros por tipo de cirurgia
SELECT nome_cirurgia, COUNT(*) AS quantidade
	FROM historicoMedico
GROUP BY nome_cirurgia
ORDER BY quantidade DESC;

# Consulta para mostrar histórico médico completo dos cachorros mesmo que não tenham vacina registrada
SELECT c.nome AS 'Cachorro', his.nome_cirurgia AS 'Cirurgia', v.nome_vacina AS 'Vacina'
	FROM cachorro c
  LEFT JOIN historicoMedico his ON c.cachorro_id = his.cachorro_id
  LEFT JOIN vacina v ON his.vacina_id = v.vacina_id;
  
# Consulta para mostrar cachorros não adotados ainda
SELECT c.nome AS 'Cachorro disponível', c.cachorro_id
	FROM cachorro c
  LEFT JOIN cachorro_adotado ca ON c.cachorro_id = ca.cachorro_id AND ca.data_volta IS NULL
WHERE ca.cachorro_id IS NULL;

#Consulta para exibir nome de todas as vacinas associadas a cada cachorro
SELECT c.nome AS 'Cachorro', GROUP_CONCAT(DISTINCT v.nome_vacina SEPARATOR ', ') AS 'Vacinas Aplicadas'
	FROM cachorro c
  LEFT JOIN historicoMedico his ON c.cachorro_id = his.cachorro_id
  LEFT JOIN vacina v ON v.vacina_id = his.vacina_id
GROUP BY c.cachorro_id, c.nome
ORDER BY c.nome;

##----------------------------------------------------------------------------------##