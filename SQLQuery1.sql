select i.id,
	   i.Data,
	   f.Observacao, 
	   tp.Descricao,
	   i.Produto,
	   i.Observacao,
	   i.Valor
from dbo.items i
	 inner join dbo.TiposPagamentos tp 
	  on tp.id = i.TipoPagamentoId
	 inner join dbo.Faturas f 
	  on f.id = i.FaturaId
order by i.Data;

update Items set Data = CAST('2022-02-10' as date)
where Id = 'B53C8A56-9347-4B88-C78A-08D9ED0EC374';