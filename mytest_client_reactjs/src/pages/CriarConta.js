import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';

function CriarConta() {
  let navigate = useNavigate();
  const [resultado, setResultado] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var { nome, e_mail, usuario, senha } = document.forms[0];

    if (senha.value.length < 6) {
      setResultado(JSON.stringify('Senha deve conter no mínimo 6 caracteres'));
    }
    else if (!/\d/.test(senha.value)){
      setResultado(JSON.stringify('Senha deve conter números'));
    }
    else if ((senha.value.match(/\d/g) || []).length <= 1) {
      setResultado(JSON.stringify('Senha deve conter pelo menos 2 números'));
    }
    else if (!/[a-z]/.test(senha.value)){
      setResultado(JSON.stringify('Senha deve conter pelo menos uma letra minúscula'));
    }
    else if (!/[A-Z]/.test(senha.value)){
      setResultado(JSON.stringify('Senha deve conter pelo menos uma letra maiúscula'));
    }
    else if (!validator.isEmail(e_mail.value)){
      setResultado(JSON.stringify('E-mail inválido'));
    }
    else {
      var data = new URLSearchParams();
      data.append('tipo', 'criarconta');
      data.append('nome', nome.value);
      data.append('e_mail', e_mail.value);
      data.append('usuario', usuario.value);
      data.append('senha', senha.value);
      
      axios.post('http://localhost/mytest_server_php/index.php', data)
      //axios.post('http://localhost:8089', data)
        .then(function (response) {
          if (typeof response.data !== 'string') {
            setResultado('');
            navigate('/entrar');
          }
          else {
            setResultado(JSON.stringify(response.data));
          }
        })
        .catch(function (error) {
          //console.log(error);
        });
    }
  };

  const renderForm = (
    <div className="d-flex justify-content-center">
      <div className="form">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <p>Nome Completo </p>
                <input className="form control" type="text" name="nome" id="nome" required />
              </div>
              <div className="mb-3">
                <p>E-mail </p>
                <input className="form control" type="email" name="e_mail" id="e_mail" required />
              </div>
              <div className="mb-3">
                <p>Usuário </p>
                <input className="form control" type="text" name="usuario" id="usuario" required />
              </div>
              <div className="mb-3">
                <p>Senha </p>
                <input className="form control" type="password" name="senha" id="senha" required />
              </div>
              <div className="button-container">
                <button className="btn btn-info" type="submit">Criar Conta</button>
              </div>
              <div>
                <span id="resultado_criarconta">{resultado}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return renderForm;
}

export default CriarConta;