const MyTest = require('./MyTest.js');
const http = require('http');
var qs = require('querystring');
var validator = require("validator");

let app = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin',  "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    if (req.method == 'POST') {
      req.on('data', buffer => {
        const data_json = qs.parse(buffer.toString());
        //console.log(data_json);
        //res.end(JSON.stringify(data_json));

        if (data_json.tipo == "criarconta") {
          if (data_json.senha.length < 6) {
            document.getElementById('resultado_criarconta').innerText = JSON.stringify('Senha deve conter no mínimo 6 caracteres');
          }
          else if (!/\d/.test(data_json.senha)){
            document.getElementById('resultado_criarconta').innerText = JSON.stringify('Senha deve conter números');
          }
          else if ((data_json.senha.match(/\d/g) || []).length <= 1) {
            document.getElementById('resultado_criarconta').innerText = JSON.stringify('Senha deve conter pelo menos 2 números');
          }
          else if (!/[a-z]/.test(data_json.senha)){
            document.getElementById('resultado_criarconta').innerText = JSON.stringify('Senha deve conter pelo menos uma letra minúscula');
          }
          else if (!/[A-Z]/.test(data_json.senha)){
            document.getElementById('resultado_criarconta').innerText = JSON.stringify('Senha deve conter pelo menos uma letra maiúscula');
          }
          else if (!validator.isEmail(data_json.e_mail)){
            document.getElementById('resultado_criarconta').innerText = JSON.stringify('E-mail inválido');
          }
          else {
            var data = new MyTest();
            data.CriarConta(data_json.nome, data_json.usuario, data_json.e_mail, data_json.senha, '', function(response){
              res.end(JSON.stringify(response));
            });
          }
        }
        else if (data_json.tipo == "entrar") {
          var data = new MyTest();
          data.Entrar(data_json.usuario, data_json.senha, '', function(response){
            res.end(JSON.stringify(response));
          }); 
        }
        else if (data_json.tipo == "ativacao") {
          var data = new MyTest();
          data.Ativacao(data_json.chave, '', function(response){
            res.end(JSON.stringify(response));
          });
        }
        else if (data_json.tipo == "perfil") {
          var data = new MyTest();
          data.Perfil(data_json.usuario, '', function(response){
            res.end(JSON.stringify(response));
          });
        }
      });
    }    
});

app.listen(8089, '127.0.0.1');
console.log('Node server running on port 8089');