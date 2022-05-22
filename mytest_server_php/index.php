<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'MyTest.php';

if ($_POST['tipo'] == "criarconta") {
  if (strlen($_POST["senha"]) < 6) {
    print_r(json_encode('Senha deve conter no mínimo 6 caracteres'));
  }
  elseif (!preg_match('/[0-9]/', $_POST["senha"])){
    print_r(json_encode('Senha deve conter números'));
  }
  elseif (preg_match_all("/[0-9]/", $_POST["senha"]) <= 1) {
    print_r(json_encode('Senha deve conter pelo menos 2 números'));
  }
  elseif (!preg_match('/[a-z]/', $_POST["senha"])){
    print_r(json_encode('Senha deve conter pelo menos uma letra minúscula'));
  }
  elseif (!preg_match('/[A-Z]/', $_POST["senha"])){
    print_r(json_encode('Senha deve conter pelo menos uma letra maiúscula'));
  }
  elseif (!filter_var($_POST["e_mail"], FILTER_VALIDATE_EMAIL)){
    print_r(json_encode('E-mail inválido'));
  }
  else {
    $auth = new MyTest();
    $data = $auth->CriarConta($_POST["nome"], $_POST["usuario"], $_POST["e_mail"], $_POST["senha"], $_SERVER["REMOTE_ADDR"]);
    print_r(json_encode($data));
	}
}
else if ($_POST['tipo'] == "entrar") {	  
  $auth = new MyTest();
  $data = $auth->Entrar($_POST["usuario"], $_POST["senha"], $_SERVER["REMOTE_ADDR"]);
  print_r(json_encode($data));
}
else if ($_POST['tipo'] == "ativacao") {
  $auth = new MyTest();
  $data = $auth->Ativacao($_POST["chave"], $_SERVER["REMOTE_ADDR"]);
  print_r(json_encode($data));
}
else if ($_POST['tipo'] == "perfil") {
  $auth = new MyTest();
  $data = $auth->Perfil($_POST["usuario"], $_SERVER["REMOTE_ADDR"]);
  print_r(json_encode($data));
}
else if ($_POST['tipo'] == "checartoken") {
  $auth = new MyTest();
  $data = $auth->ChecarToken($_POST["token"], $_SERVER["REMOTE_ADDR"]);
  print_r(json_encode($data));
}

?>