import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() { 
  let navigate = useNavigate();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 16,
      alignItems: 'center',
    },
    main_view: {
      margin: '10px',
      width: '250px',
    },
  });

  const renderForm = (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.main_view}>
          <Button
            title="Criar Conta"
            onPress={() => navigate('/criarconta')}
            style={styles.button}
          />
        </View>
        <View style={styles.main_view}>
          <Button
            title="Entrar"
            onPress={() => navigate('/entrar')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );

  return renderForm;
}

export default Home;
