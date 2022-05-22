import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ativacao() {
  let navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const chave = params.get('chave');
  var data = new URLSearchParams();
  data.append('tipo', 'ativacao');
  data.append('chave', chave);

  if (chave && chave !== null && chave.startsWith('MyTest_')) {
    axios.post('http://localhost/mytest_server_php/index.php', data)
    //axios.post('http://localhost:8089', data)
      .then(function (response) {
        if (response.data && response.data !== null) {
          document.getElementById('resultado_ativacao').innerText = 'Usuário Ativado - redirecionando...'; 
          setTimeout(() => {
            navigate('/entrar'); 
          }, 5000);
        }
        else {
          document.getElementById('resultado_ativacao').innerText = 'Erro na Ativação';      
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  }

  return (
    <div>
      <span id="resultado_ativacao">Verificando</span>
    </div>
  );
}

export default Ativacao;
