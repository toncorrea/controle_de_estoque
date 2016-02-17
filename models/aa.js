select materia_prima.*, produto.* from materia_prima
inner join produtoMateria on materia_prima.id=produtoMateria.idMateria 
inner join produto on produto.id=produtoMateria.idProduto 
where produtoMateria.idProduto=6;

// exemplo de sql com join