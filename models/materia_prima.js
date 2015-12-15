require('../db/conection')
var MateriaPrima = function(){
	this.nome;
	this.preco;
	this.descricao;

	this.salvar = function(callback){
		db.cnn.exec("insert into materia_prima(nome, preco, descricao) values ('"+this.nome+"', "+this.preco+", '"+this.descricao+"')", callback);
	}

	this.alterar = function(callback){
		db.cnn.exec("update materia_prima set nome='"+this.nome+"', preco="+this.preco+", descricao='"+this.descricao+"' where id="+this.id, callback);
	}
}

MateriaPrima.todos = function(callback){
	db.cnn.exec("select * from materia_prima", callback);
}

MateriaPrima.excluir = function(id, callback){
	db.cnn.exec("delete from materia_prima where id="+id, callback);
}

MateriaPrima.buscarPorId = function(id, callback){
	db.cnn.exec("select * from materia_prima where id="+id, callback);
}

module.exports = MateriaPrima;