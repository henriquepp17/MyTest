<?php 

require 'jwt_helper.php';
require 'vendor/autoload.php';
use Mailgun\Mailgun;

class MyTest  { 

  private $host = "";
  private $database_name = "";
  private $username = "";
  private $password = "";
  private $conn;

  public function Connect(){
    $this->conn = null;
    try {
      $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
      $this->conn->exec("set names utf8");
    }
    catch (PDOException $exception) {
      echo "Database could not be connected: " . $exception->getMessage();
    }
    return $this->conn;
  }

  public function CriarConta($nome, $usuario, $e_mail, $senha, $user_ip) {
    $conn = $this->Connect();
    $senha = md5($senha);
    $account_recovery_token = 'MyTest_'.md5($e_mail);

    $query = " SELECT * FROM `cadastro` WHERE `usuario` = '".$usuario."' ; "; 
    $stmt = $conn->prepare($query);
    try {
      $stmt->execute();
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if ($rows[0]["usuario"] == null) {

        $query = " SELECT * FROM `cadastro` WHERE `e_mail` = '".$e_mail."' ; "; 
        $stmt = $conn->prepare($query);
        try {
          $stmt->execute();
          $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
          if ($rows[0]["usuario"] == null) {

            $query = " INSERT INTO `cadastro` (`cadastro_status`, `nome`, `usuario`, `e_mail`, `senha`, `token`) VALUES (0, '$nome','$usuario','$e_mail','$senha','$account_recovery_token'); ";
            $stmt = $conn->prepare($query);
            try {
              $stmt->execute();
              $id = $conn->lastInsertId();
              if (!empty($id)){
                $query = " SELECT * FROM `cadastro` WHERE `cadastro_id` = '".$id."' ; "; 
                $stmt = $conn->prepare($query);
                try {
                  $stmt->execute();
                  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                  
                  /* MAIL GUN 
                  $mg = Mailgun::create('');
                  $mg->messages()->send('sandbox561639de7e6d49e2b22a87f2b7b56abe.mailgun.org', [
                    'from'    => 'YOUR@MAIL',
                    'to'      => $rows[0]["e_mail"],
                    'subject' => 'MyTest - Ativar Usuário!',
                    'text'    => 'Link para ativar: http://localhost:3000/ativacao?chave='.$account_recovery_token
                  ]);
                  */
                  
                  return $rows[0];
                } 
                catch(PDOExecption $e) {
                  $conn->rollback();
                  return 'server error - query error';
                }
              }
              else {
                return 'error - insert';
              }
            } 
            catch(PDOExecption $e) {
              $conn->rollback();
              return 'server error - query error';
            }
          }
          else {
            return 'E-mail Existente';
          }
        }
        catch(PDOExecption $e) {
          $conn->rollback();
          return 'server error - query error';
        }    
      }
      else {
        return 'Usuário Existente';
      }
    }
    catch(PDOExecption $e) {
      $conn->rollback();
      return 'server error - query error';
    }    
  }

  public function Entrar($usuario, $senha, $user_ip) {
    $conn = $this->Connect();
    $query = " SELECT * FROM `cadastro` WHERE `usuario` = '".$usuario."' ; ";
    $stmt = $conn->prepare($query);
    try {
      $stmt->execute();
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if($rows[0]){
        if (count($rows) == 1 && md5($senha) == $rows[0]["senha"]) {
          if ($rows[0]["cadastro_status"] == 1) {
            //unset($rows[0]["senha"]);
            date_default_timezone_set('America/Sao_Paulo');
            $rows["data"] = date('Y-m-d\TH:i:sP', time());

            if ($rows[0]["token"] == null) { 
              $token = JWT::encode($rows[0], 'cifra_secreta'); 
              $query = " UPDATE `cadastro` SET `token`='$token' WHERE `usuario` = '".$usuario."' ; "; 
              $stmt = $conn->prepare($query);
              try {
                $stmt->execute();
                $id = $conn->lastInsertId();
              } 
              catch(PDOExecption $e) {
                $conn->rollback();
                return 'server error - query error';
              }
            }
            else { 
              $token = $rows[0]["token"]; 
            }
            $rows[0]["imagem"] = 'https://www.gravatar.com/avatar/'.$rows[0]["senha"];
            $rows[0]["token"] = $token;
            return $rows[0];
          }
          else {
            return 'Usuário Inativo';
          }              
        }
        else {
          return 'Senha Inválida';
        }
      }
      else {
        return 'Usuário Inválido';
      }
    } 
    catch(PDOExecption $e) {
      $conn->rollback();
      return 'server error - query error';
    }

  }

  public function Ativacao($chave, $user_ip) {
    $conn = $this->Connect();
    $query = " SELECT * FROM `cadastro` WHERE `token` = '".$chave."' ; "; 
    $stmt = $conn->prepare($query);
    try {
      $stmt->execute();
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if($rows[0]){
        $query = " UPDATE `cadastro` SET `cadastro_status` = '1', `token` = '' WHERE `token` = '".$chave."' ; "; 
        $stmt = $conn->prepare($query);
        try {
          $stmt->execute();
          $id = $conn->lastInsertId();
          $rows[0]["cadastro_status"] = 1;
          $rows[0]["token"] = $chave;
          return $rows[0];
        } 
        catch( PDOExecption $e ) {
          return 'server error - PDO error';
        } 
      } 
      else {
        return 'Chave Inválida';
      }
    }
    catch(PDOExecption $e) {
      $conn->rollback();
      return 'server error - query error';
    }
  }


  public function Perfil($usuario, $user_ip) {
    $conn = $this->Connect();
    $query = " SELECT * FROM `cadastro` WHERE `usuario` = '".$usuario."' ; ";
    $stmt = $conn->prepare($query);
    try {
      $stmt->execute();
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if($rows[0]){
        //$rows[0]["senha"] = md5(strtolower(trim($rows[0]["e_mail"])));
        return $rows[0];
      }
    }
    catch(PDOExecption $e) {
      $conn->rollback();
      return 'server error - query error';
    }      
  }


  public function ChecarToken($token, $user_ip) {
    $conn = $this->Connect();
    $query = " SELECT * FROM `cadastro` WHERE `token` = '".$token."' ; "; 
    $stmt = $conn->prepare($query);
    try {
      $stmt->execute();
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if($rows[0]){
        //$rows[0]["senha"] = md5(strtolower(trim($rows[0]["e_mail"])));
        return $rows[0];
      }
    }
    catch(PDOExecption $e) {
      $conn->rollback();
      return 'server error - query error';
    }  
  }

}


?>