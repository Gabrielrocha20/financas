import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

const Saidas = ({ visible, onClose, onAddSaida, paymentMethods }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [entryName, setEntryName] = useState('');
  const [entryValue, setEntryValue] = useState('');

  const handleAddSaida = () => {
    if (!paymentMethod) {
      alert('Por favor, selecione um meio de pagamento.');
      return;
    }
    const newSaida = {
      label: entryName,
      value: entryValue,
      data: getCurrentDate(), // Obtém a data atual
      meio_pagamento: paymentMethod,
      entrada_ou_saida: 1
    };

    onAddSaida(newSaida);
    setPaymentMethod('');
    setEntryName('');
    setEntryValue('');
    onClose();
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date
  };

  const handleTeste = (value) => {
    setPaymentMethod(value)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Adicionar Nova Saída</Text>
          <RNPickerSelect
            onValueChange={(value) => handleTeste(value)}
            items={paymentMethods.map(method => ({ label: method.label, value: method.id }))}
            placeholder={{ label: 'Selecione um meio de pagamento', value: null }}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={entryName}
            onChangeText={text => setEntryName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={entryValue}
            onChangeText={text => setEntryValue(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSaida}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#8000ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#8000b8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Saidas;
