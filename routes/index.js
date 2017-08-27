
var rp = require('request-promise').defaults({ simple: false })

// Define Tokens da Agillitas
var CLIENT_ID_AGILLITAS = '9dbdbd34-56f6-3cd2-8e3a-5c245a54ccf8'              // ID para conceder autorizacao ao aplicativo
var CLIENT_SECRET_AGILLITAS = 'dd3b043e-4b1a-3166-a980-bb3de5fdcc57'          // ID para conceder autorizacao para request http
var ACCESS_TOKEN_AGILLITAS = '64b932c2-4f6c-3625-846d-1376348abb73'           // ID de user para conceder autorizacao para request http a um usuario

module.exports = function(app){

  // Importa modulos nativos
  var rp = require('request-promise');
  var request = require('request');

  // Custom Modules
  var db = require('./../libs/connectdb.js')()

  app.get("/", function(req, res){
    res.send('aeee man');
  })

  // Associa o proxy de um cartão para um portador

  app.get("/assoc_proxy_cartao/:proxy", (req, res) => {

    return new Promise(function(resolve, reject){

      var proxy = req.params.proxy

      var url = 'https://api-visa.sensedia.com/sandbox/visa/agillitas/v1/cartoes/'

      // Configura o request
      var requestOptions = {
        uri : url,
        method: 'POST',
        resolveWithFullResponse : true,
        timeout: 120000,
        headers: {
          access_token:   ACCESS_TOKEN_AGILLITAS,
          client_id:      CLIENT_ID_AGILLITAS
        },
        body: {
          "cartao": {
            "idCartao": proxy,
            "valor": 80.5,
            "contrasenha": "12345",
            "portador": {
              "nome": "Braulio",
              "sobrenome": "Almeida",
              "dataNascimento": "1985-09-24",
              "cpf": "08723232773",
              "contato": {
                "email": "braulio.jorge@gmail.com",
                "telResidencial": "01130987600",
                "telCelular": "011998767654"
              },
              "endereco": {
                "logradouro": "Rua do Frango Atropelado, 1548",
                "complemento": "Número 8501",
                "cidade": "Campinas",
                "estado": "SP",
                "pais": "Brasil",
                "codigoPostal": "05425070"
              }
            }
          }
        },
        json: true
      }

      console.log(requestOptions)

      // Envia o request
      rp(requestOptions).then(function(response){

        var body = response.body

        console.log('statusCode: ' + response.statusCode)
        console.log('====================================')
        console.log(body)

        resolve(body)

        res.send('Cartão adicionado com sucesso')

      })


    })

  })

  // Executa uma operacao de credito/debito
  app.get("/add_saldo/:idCartao/:valor", (req, res) => {

    return new Promise(function(resolve, reject){

      var idCartao = req.params.idCartao
      var valor = req.params.valor

      var url = 'https://api-visa.sensedia.com/sandbox/visa/agillitas/v1/cartoes/' + idCartao + "/saldo"

      // Configura o request
      var requestOptions = {
        uri : url,
        method: 'PUT',
        resolveWithFullResponse : true,
        timeout: 120000,
        headers: {
          access_token:   ACCESS_TOKEN_AGILLITAS,
          client_id:      CLIENT_ID_AGILLITAS
        },
        body: {
          "saldo" : {
            "valor": valor
          }
        },
        json: true
      }

      console.log(requestOptions)
      console.log('Enviando valor ' + valor)
      console.log('====================================')

      // Envia o request
      rp(requestOptions).then(function(response){

        var body = response.body

        console.log('Operacao finalizada !')
        console.log('statusCode: ' + response.statusCode)
        console.log('====================================')
        console.log(body)

        resolve(body)

        res.send('Operacao realizada com sucesso')

      })

    })

  })

  // Recupera o saldo da conta
  app.get("/get_saldo/:idCartao", (req, res) => {

    return new Promise(function(resolve, reject){

      var idCartao = req.params.idCartao

      var url = 'https://api-visa.sensedia.com/sandbox/visa/agillitas/v1/cartoes/' + idCartao + "/saldo"

      // Configura o request
      var requestOptions = {
        uri : url,
        method: 'GET',
        resolveWithFullResponse : true,
        timeout: 120000,
        headers: {
          access_token:   ACCESS_TOKEN_AGILLITAS,
          client_id:      CLIENT_ID_AGILLITAS
        },
        json: true
      }

      console.log(requestOptions)
      console.log('consultando saldo da conta ')
      console.log('====================================')

      // Envia o request
      rp(requestOptions).then(function(response){

        var body = response.body

        console.log('Operacao finalizada !')
        console.log('statusCode: ' + response.statusCode)
        console.log('====================================')
        console.log(body)

        resolve(body)
        res.send(body)

      })

    })

  })


  // Devolve o extrato de um cartão
  app.get("/get_extrato/:idCartao/:dataInicial/:dataFinal", (req, res) => {

    return new Promise(function(resolve, reject){

      var idCartao = req.params.idCartao
      var dataInicial = req.params.dataInicial
      var dataFinal = req.params.dataFinal

      var url = 'https://api-visa.sensedia.com/sandbox/visa/agillitas/v1/cartoes/' + idCartao + "/extrato"

      // Configura o request
      var requestOptions = {
        uri : url,
        method: 'GET',
        resolveWithFullResponse : true,
        timeout: 120000,
        headers: {
          access_token:   ACCESS_TOKEN_AGILLITAS,
          client_id:      CLIENT_ID_AGILLITAS
        },
        qs: {
          'dataInicial' : dataInicial,
          'dataFinal'   : dataFinal
        },
        json: true
      }

      console.log(requestOptions)
      console.log('Consultando extrado da conta ...')
      console.log('====================================')

      // Envia o request
      rp(requestOptions).then(function(response){

        var body = response.body

        console.log('Operacao finalizada !')
        console.log('statusCode: ' + response.statusCode)
        console.log('====================================')
        console.log(body)

        resolve(body)

        res.send(body)

      })

    })

  })

  // app.get('/facebook_auth', function(req, res){
  //   res.render('facebook_auth')
  // })

  // app.get('/mercado', function(req, res){
  //   res.render('mercado')
  // })

  // app.get('/preco', function(req, res){
  //   res.render('preco')
  // })

  // app.get('/receita', function(req, res){
  //   res.render('receita')
  // })

  // app.get('/pesquisa', function(req, res){
  //   res.render('pesquisa')
  // })



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
