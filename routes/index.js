
module.exports = function(app){

  // Importa modulos nativos
  var rp = require('request-promise');
  var request = require('request');

  // Custom Modules
  var db = require('./../libs/connectdb.js')()

  app.get("/", function(req, res){
    res.send('aeee man');
  })

  app.get('/facebook_auth', function(req, res){
    res.render('facebook_auth')
  })

  app.get('/mercado', function(req, res){
    res.render('mercado')
  })

  app.get('/preco', function(req, res){
    res.render('preco')
  })

  app.get('/receita', function(req, res){
    res.render('receita')
  })

  app.get('/pesquisa', function(req, res){
    res.render('pesquisa')
  })

  app.get('/get_beer/:beerName', function(req, res){

    var beerName = req.params.beerName

    var m_Brejas = require('../crowler/brejas.js')

    m_Brejas.getBeersByName(beerName).then(function(result){

      res.send(result)

    })

  })

  app.get('/get_beer_static/stella', function(req, res){

    var renanzinho = {
      nome: 'Stella',
      preco: '6,50'
    }

    res.send(renanzinho)

  })

}
