import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import Header from '../../components/Header';
import usePaymentMethods from '../../hook/MeiosPagamento/apiMethodsPagament'; // Importando o hook

const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const MeiosPagamento = ({ navigation, route  }) => {
  const { token } = route.params;
  const [paymentMethods, setPaymentMethods] = useState('');
  const { paymentMethodsData, addPaymentMethod, deletePaymentMethod, loadMethods } = usePaymentMethods(token); // Utilizando o hook

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMethods(); // Carrega os meios de pagamento quando a tela for exibida
    });
    return unsubscribe;
  }, [navigation, loadMethods]);

  const handleAddPaymentMethod = () => {
    if (paymentMethods.trim() !== '') {
      addPaymentMethod(paymentMethods)
        .then(() => {
          setPaymentMethods(''); // Limpa o campo de entrada após adicionar o método de pagamento
        });
    }
  };

  const handleDeletePaymentMethod = (id) => {
    deletePaymentMethod(id);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Meios de Pagamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Novo Meio de Pagamento"
          value={paymentMethods}
          onChangeText={text => setPaymentMethods(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddPaymentMethod}>
          <Text style={styles.label}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {paymentMethodsData.map((method, index) => (
          <View key={method.id} style={[styles.paymentMethod, styles.paymentMethodContainer]}>
            <Text>{method.label}</Text>
            <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDeletePaymentMethod(method.id)}>
              <Text style={styles.label}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -30,
    marginStart: 14,
    marginEnd: 14,
    paddingTop: 22,
    paddingBottom: 22,
    maxHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#cacaca',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 0,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentMethodContainer: {
    padding: 20,
    borderRadius: 22,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada',
  },
  buttonAdd: {
    backgroundColor: '#8000ff',
    padding: 10,
    borderRadius: 22,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDelete: {
    backgroundColor: '#8000ff',
    padding: 10,
    borderRadius: 22,
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingStart: 18,
    paddingEnd: 18,
  },
});

export default MeiosPagamento;
