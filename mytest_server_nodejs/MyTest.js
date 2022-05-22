var mysql = require('mysql');
var MD5 = require('crypto-js/md5');

class MyTest  { 

  Connect(){
    var conn = mysql.createConnection({
      host     : '',
      database : '',
      user     : '',
      password : '',
    });
    conn.connect(function(err) {
      if (err) {
        //console.error('Error connecting: ' + err.stack);
        return 'error';
      }
      console.log('Connected as id ' + conn.threadId);
    });
    return conn;
  }

  CriarConta(nome, usuario, e_mail, senha, user_ip, callback) {
    var conn = this.Connect();
    var account_recovery_token = 'MyTest_'+MD5(e_mail).toString(); 
    senha = MD5(senha).toString();
    var query = " SELECT * FROM `cadastro` WHERE `usuario` = '"+usuario+"' ; "; 
    conn.query(query, function (error, results, fields) {
      if (!results[0]) { 
        var query = " SELECT * FROM `cadastro` WHERE `e_mail` = '"+e_mail+"' ; "; 
        conn.query(query, function (error, results, fields) {
          if (!results[0]) { 
            var query = " INSERT INTO `cadastro` (`cadastro_status`, `nome`, `usuario`, `e_mail`, `senha`, `token`) VALUES (0, '"+nome+"','"+usuario+"','"+e_mail+"','"+senha+"','"+account_recovery_token+"'); "; 
            conn.query(query, function (error, results, fields) {
              var query = " SELECT * FROM `cadastro` WHERE `cadastro_id` = '"+results.insertId+"' ; "; 
              conn.query(query, function (error, results, fields) { 

                /* MAIL GUN 
                var api_key = '';
                var domain = '';
                var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
                var data = {
                  from: 'MyTest <YOUR@MAIL>',
                  to: results[0].e_mail,
                  subject: 'MyTest - Ativar Usuário!',
                  text: 'Link para ativar: http://localhost:3000/ativacao?chave='+account_recovery_token
                };
                mailgun.messages().send(data, function (error, body) {
                  //console.log(body);
                });
                */

                return callback(results[0]);
              });
            });
          }
          else {
            return callback("E-mail Existente");
          }
        });
      }
      else {
        return callback("Usuário Existente");
      }
    });
  }

  Entrar(usuario, senha, user_ip, callback) {
    var conn = this.Connect();
    senha = MD5(senha).toString();
    var query = " SELECT * FROM `cadastro` WHERE `usuario` = '"+usuario+"' ; ";  
    conn.query(query, function (error, results, fields) { 
      if (results[0]) {
        if (results.length === 1 && senha == results[0].senha) { 
          if (results[0].cadastro_status == 1) {
            //console.log(results[0]);
            return callback(results[0]);
          }
          else {
            return callback('Usuário Inativo');
          }
        }
        else {
          return callback('Senha Inválida');
        }
      }
      else {
        return callback("Usuário Inválido");
      }
    });
  }

  Ativacao(chave, user_ip, callback) {
    var conn = this.Connect();
    var query = " SELECT * FROM `cadastro` WHERE `token` = '"+chave+"' ; ";  
    conn.query(query, function (error, results, fields) { 
      if (results[0]) {
        var query = " UPDATE `cadastro` SET `cadastro_status` = '1', `token` = '' WHERE `token` = '"+chave+"' ; "; 
        conn.query(query, function (error, results_update, fields) {
          results[0].cadastro_status = 1;
          results[0].token = chave;
          return callback(results[0]);
        });
      }
      else {
        return callback("Usuário Inválido");
      }
    });
  }

  Perfil(usuario, user_ip, callback) {
    var conn = this.Connect();
    var query = " SELECT * FROM `cadastro` WHERE `usuario` = '"+usuario+"' ; ";
    conn.query(query, function (error, results, fields) { 
      if (results[0]) {
        return callback(results[0]);
      }
      else {
        return callback("Usuário Inexistente");
      }
    });
  }

}

module.exports = MyTest 