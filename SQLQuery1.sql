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
where i.Loja = '1001 Festas'
order by i.Data;

update Items set Valor = '4.99'
where Id = 'D5F7A6DD-769D-4D31-D75B-08D9F0EA4CAF';

update Items set TipoPagamentoId = '5EB7D8F9-3701-43C1-3C1D-08D9DAF6C0A1'
where Id = 'D5F7A6DD-769D-4D31-D75B-08D9F0EA4CAF';

select * from TiposPagamentos;