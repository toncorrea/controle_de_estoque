var express = require('express');
var router = express.Router();
var MateriaPrima = require('../models/materia_prima');
var Produto = require('../models/produto');
var ProdutoVenda = require('../models/produto_venda');

// Rotas INDEX =================================

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Controle de Estoque' });
});
//redirecionar para materia prima
router.get('/materia', function(req, res, next) {
  res.render('materiaPrima/materia_prima');
});

//redirecionar para produtos
router.get('/produto', function(req, res, next) {
  res.render('produto/produtos');
});

//redirecionar para produtos a venda
router.get('/produtoVenda', function(req, res, next) {
  res.render('produtoVenda/produto_venda');
});

// Rotas INDEX =================================



// Rotas de materia prima
router.post('/materia/salvar', function(req, res, next) {
  var materiaPrima = new MateriaPrima();
  materiaPrima.nome = req.body.nome;
  materiaPrima.preco = req.body.preco;
  materiaPrima.descricao = req.body.descricao;
  materiaPrima.salvar(function(rows, err){
    if(err){
      req.send("Erro ao salvar", 500);
    }
    else{
      res.redirect('/materia');
    };
  });
});

router.get('/materia/lista', function(req, res, next){
	MateriaPrima.todos(function(rows, err){
		if(err) res.send("Erro ao buscar", 500);
		else{
			res.render('materiaPrima/lista',{
				materias: rows,
        quantidade: rows.length
			});
		}
	});
});

router.get('/materia/buscar', function(req, res, next){
  console.log("-----req.query.id-------");
  console.log(req.query.id);
  MateriaPrima.buscarPorId(req.query.id, function(rows, err){
    if(err) res.send("Erro ao buscar", 500);
    else{
      if(rows.length > 0){
        var c = rows;
        res.render('materiaPrima/editar',{
          title: 'Alterar Materia',
          materia: c[0]
        });
      }
    }
  });
});

router.post('/materia/alterar', function(req, res, next){
  var materiaPrima = new MateriaPrima();
  materiaPrima.id = req.body.id;
  materiaPrima.nome = req.body.nome;
  materiaPrima.preco = req.body.preco;
  materiaPrima.descricao = req.body.descricao;
  materiaPrima.alterar(function(rows, err){
    if(err){
      req.send("Erro ao alterar", 500);
    }
    else{
      res.redirect('/materia/lista');
    }
  });
});

router.get('/materia/excluir', function(req, res, next){
  console.log(req.query.id)
  MateriaPrima.excluir(req.query.id, function(rows, err){
    if(err){
      req.send("Erro ao alterar", 500);
    }
    else{
      res.redirect('/materia/lista');
    }
  });
});

// FIM DAS ROTAS PARA MATERIA PRIMA -------------------------------------

// Rotas de Produto
router.post('/produto/salvar', function(req, res, next) {
  var produto = new Produto();
  produto.nome = req.body.nome;
  produto.descricao = req.body.descricao;
  produto.salvar(function(rows, err){
    if(err){
      req.send("Erro ao salvar", 500);
    }
    else{
      res.redirect('/produto');
    };
  });
});

router.get('/produto/lista', function(req, res, next){
  Produto.todos(function(rows, err){
    if(err) res.send("Erro ao buscar", 500);
    else{
      res.render('produto/lista',{
        produtos: rows,
        quantidade: rows.length
      });
    }
  });
});

router.get('/produto/buscar', function(req, res, next){
  console.log("-----req.query.id-------");
  console.log(req.query.id);
  Produto.buscarPorId(req.query.id, function(rows, err){
    if(err) res.send("Erro ao buscar", 500);
    else{
      if(rows.length > 0){
        var c = rows;
        res.render('produto/editar',{
          title: 'Alterar produto',
          produto: c[0]
        });
      }
    }
  });
});

router.post('/produto/alterar', function(req, res, next){
  var produto = new Produto();
  produto.id = req.body.id;
  produto.nome = req.body.nome;
  produto.descricao = req.body.descricao;
  produto.alterar(function(rows, err){
    if(err){
      req.send("Erro ao alterar", 500);
    }
    else{
      res.redirect('/produto/lista');
    }
  });
});

router.get('/produto/excluir', function(req, res, next){
  console.log(req.query.id)
  Produto.excluir(req.query.id, function(rows, err){
    if(err){
      req.send("Erro ao alterar", 500);
    }
    else{
      res.redirect('/produto/lista');
    }
  });
});

// Fim das rotas para Produtos; ------------------------

// Rotas de produto venda
router.post('/produtoVenda/salvar', function(req, res, next) {
  var produtoVenda = new ProdutoVenda();
  produtoVenda.nome = req.body.nome;
  produtoVenda.descricao = req.body.descricao;
  produtoVenda.precoVenda = req.body.precoVenda;
  produtoVenda.salvar(function(rows, err){
    if(err){
      req.send("Erro ao salvar", 500);
    }
    else{
      res.redirect('/produtoVenda');
    };
  });
});

router.get('/produtoVenda/lista', function(req, res, next){
  ProdutoVenda.todos(function(rows, err){
    if(err) res.send("Erro ao buscar", 500);
    else{
      res.render('produtoVenda/lista',{
        produtosVenda: rows,
        quantidade: rows.length
      });
    }
  });
});

router.get('/produtoVenda/buscar', function(req, res, next){
  ProdutoVenda.buscarPorId(req.query.id, function(rows, err){
    if(err) res.send("Erro ao buscar", 500);
    else{
      if(rows.length > 0){
        var c = rows;
        res.render('produtoVenda/editar',{
          title: 'Alterar produto a venda',
          produtoVenda: c[0]
        });
      }
    }
  });
});

router.post('/produtoVenda/alterar', function(req, res, next){
  var produtoVenda = new ProdutoVenda();
  produtoVenda.id = req.body.id;
  produtoVenda.nome = req.body.nome;
  produtoVenda.descricao = req.body.descricao;
  produtoVenda.precoVenda = req.body.precoVenda;
  produtoVenda.alterar(function(rows, err){
    if(err){
      req.send("Erro ao alterar", 500);
    }
    else{
      res.redirect('/produtoVenda/lista');
    }
  });
});

router.get('/produtoVenda/excluir', function(req, res, next){
  ProdutoVenda.excluir(req.query.id, function(rows, err){
    if(err){
      req.send("Erro ao alterar", 500);
    }
    else{
      res.redirect('/produtoVenda/lista');
    }
  });
});

module.exports = router;
