require('../db/conection')
var ProdutoVenda = function(){
	this.id;
	this.nome;
	this.descricao;
	this.precoVenda;

	this.salvar = function(callback){
		db.cnn.exec("insert into produto_venda(nome, descricao, precoVenda) values ('"+this.nome+"', '"+this.descricao+"', "+this.precoVenda+")", callback);
	}

	this.alterar = function(callback){
		db.cnn.exec("update produto_venda set nome='"+this.nome+"', descricao='"+this.descricao+"', precoVenda="+this.precoVenda+" where id="+this.id, callback);
	}
}

ProdutoVenda.todos = function(callback){
	db.cnn.exec("select * from produto_venda", callback);
}

ProdutoVenda.excluir = function(id, callback){
	db.cnn.exec("delete from produto_venda where id="+id, callback);
}

ProdutoVenda.buscarPorId = function(id, callback){
	db.cnn.exec("select * from produto_venda where id="+id, callback);
}
module.exports = ProdutoVenda;