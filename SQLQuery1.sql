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
--where i.Loja = 'Posto Del Rey'
order by i.DataCriacao desc;

update Items set Observacao = 'Eu + Sheila - Diamantina - (Dia dos namorados)'
where Id = '039DFAD8-660A-4110-DC2A-08DA4D419A9D';

update Items set TipoPagamentoId = '5EB7D8F9-3701-43C1-3C1D-08D9DAF6C0A1'
where Id = '12AA6E53-3F78-4034-DC24-08DA4D419A9D';

select * from TiposPagamentos;