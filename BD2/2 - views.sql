## Views ##

#View para ver os status dos cachorros de disponibilidade para adoção e dias com o adotante (caso seja adotado)
CREATE VIEW view_status_cachorros AS
	SELECT c.cachorro_id AS 'ID', c.nome AS 'Nome Cachorro', c.porte AS 'Porte', c.idade AS 'Idade', c.sexo AS 'Sexo',
    IF(
        EXISTS (
            SELECT 1 FROM cachorro_adotado ca 
            WHERE ca.cachorro_id = c.cachorro_id AND ca.data_volta IS NULL
        ),
        'Indisponível', 'Disponível'
    ) AS status,
    (   SELECT DATEDIFF(CURDATE(), ca.data_adocao)
			FROM cachorro_adotado ca
        WHERE ca.cachorro_id = c.cachorro_id AND ca.data_volta IS NULL
        LIMIT 1
    ) AS dias_com_adotante
FROM cachorro c;

# Mostrar view
SELECT * FROM view_status_cachorros;

#View para mostrar todos os cachorros com vacinas ativadas, agrupadas por nome
CREATE VIEW view_vacinas_por_cachorro AS
	SELECT c.cachorro_id AS 'ID', c.nome AS 'Nome Cachorro', 
	  GROUP_CONCAT(DISTINCT v.nome_vacina SEPARATOR ', ') AS 'Vacinas'
		FROM cachorro c
	  LEFT JOIN historicoMedico h ON c.cachorro_id = h.cachorro_id
	  LEFT JOIN vacina v ON v.vacina_id = h.vacina_id
	GROUP BY c.cachorro_id, c.nome;

# Mostrar a view
SELECT * FROM view_vacinas_por_cachorro;

# View para mostrar as adoções ativas (contando apenas os cachorros que estão com o adotante ainda)
CREATE VIEW view_adocoes_ativas AS
	SELECT a.nome AS 'Nome Adotante', a.email AS 'E-mail', c.nome AS 'Nome Cachorro', ca.data_adocao as 'Data de Adoção'
		  FROM cachorro_adotado ca
	  JOIN adotante a ON a.adotante_id = ca.adotante_id
	  JOIN cachorro c ON c.cachorro_id = ca.cachorro_id
    WHERE ca.data_volta IS NULL;
    
#Mostrar a view
SELECT * FROM view_adocoes_ativas;

#  View para mostrar o historico completo do cachorro com seu nome, nome de cirurgia, descrição da cirurgia,
# nome da vacina associada a ele, data de adoção mais recente e nome do adotante (caso esteja adotado no momento)
CREATE VIEW view_historico_completo AS
	SELECT c.cachorro_id AS 'ID', c.nome AS 'Nome Cachorro', hist.nome_cirurgia AS 'Cirurgia', 
      hist.descricao_cirurgia AS 'Descrição Cirurgia', v.nome_vacina AS 'Vacina',
      a.nome AS 'Nome Adotante', ca.data_adocao AS 'Data de Adoção'
		FROM cachorro c
	LEFT JOIN historicoMedico hist ON c.cachorro_id = hist.cachorro_id
	LEFT JOIN vacina v ON hist.vacina_id = v.vacina_id
	LEFT JOIN cachorro_adotado ca ON c.cachorro_id = ca.cachorro_id AND ca.data_volta IS NULL
	LEFT JOIN adotante a ON ca.adotante_id = a.adotante_id;

# Mostrar view
SELECT * FROM view_historico_completo;

##----------------------------------------------------------------------------------##