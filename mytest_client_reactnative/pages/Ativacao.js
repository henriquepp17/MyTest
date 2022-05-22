import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Ativacao() {
  let navigate = useNavigate();
  const [resultado, setResultado] = useState("");

  const params = new URLSearchParams(window.location.search);
  const chave = params.get('chave');
  var data = new URLSearchParams();
  data.append('tipo', 'ativacao');
  data.append('chave', chave);

  if (chave && chave !== null && chave.startsWith('MyTest_')) {
    axios.post('http://localhost/mytest_server_php/index.php', data)
    //axios.post('http://localhost:8089', data)
      .then(function (response) {
        //console.log(response.data);
        if (response.data && response.data !== null) {
          setResultado('Usuário Ativado - redirecionando...'); 
          setTimeout(() => {
            navigate('/entrar'); 
          }, 5000);
        }
        else {
          setResultado('Erro na Ativação');      
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 16,
      alignItems: 'center',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'280px'}}>
        <Text name="resultado_ativacao">{resultado}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Ativacao;
