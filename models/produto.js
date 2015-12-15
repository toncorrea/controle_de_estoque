require('../db/conection')
var Produto = function(){
	this.id;
	this.nome;
	this.descricao;

	this.salvar = function(callback){
		db.cnn.exec("insert into produto(nome, descricao) values ('"+this.nome+"', '"+this.descricao+"')", callback);
	}

	this.alterar = function(callback){
		db.cnn.exec("update produto set nome='"+this.nome+"', descricao='"+this.descricao+"' where id="+this.id, callback);
	}

	this.adicionarMaterias = function(materias, callback){
		for(i=0; i<materias.length; i++){
			db.cnn.exec("insert into produtoMateria(idProduto, idMateria) values("+this.id+","+materias[i].id+")",callback);
		}
	}

	this.materias = function(callback){
		db.cnn.exec("select m.* from materia_prima m inner join produtoMateria pm on m.id=pm.idProduto where pm.idProduto="+this.id, callback);
	}
}
//inner join faz o vinculo de duas ou mais tables;

Produto.todos = function(callback){
	db.cnn.exec("select * from produto", callback);
}

Produto.excluir = function(id, callback){
	db.cnn.exec("delete from produto where id="+id, callback);
}

Produto.buscarPorId = function(id, callback){
	db.cnn.exec("select * from produto where id="+id, callback);
}

module.exports = Produto;