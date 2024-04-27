import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Moviments from '../../components/Moviments';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import usePaymentMethods from '../../hook/MeiosPagamento/apiMethodsPagament';
import useDeposits from '../../hook/Depositos/index';

const Movimentos = ({ route }) => {
  const { token } = route.params;
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [showDateInitialPicker, setShowDateInitialPicker] = useState(false);
  const [showDateEndPicker, setShowDateEndPicker] = useState(false);

  const { paymentMethodsData, loadMethods } = usePaymentMethods(token);
  const { deposits, loadDeposits, filterDeposits } = useDeposits(token);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const fetchFilteredDeposits = async () => {
      try {
        const depositsFiltered = await filterDeposits(selectedDate, selectedEndDate);
        setFilteredMovements(depositsFiltered);
      } catch (error) {
        console.error('Erro ao filtrar depósitos:', error);
      }
    };
  
    fetchFilteredDeposits();
  }, [selectedDate, selectedEndDate]);

  useEffect(() => {
    calculateBalance();
  }, [filteredMovements]);

  const loadInitialData = async () => {
    await loadMethods();
    await loadDeposits();
    setLoading(false);
  };

  const DateInitialPicker = () => setShowDateInitialPicker(true);
  const hideDateInitialPickerModal = () => setShowDateInitialPicker(false);
  const handleDateInitialChange = (event, selectedDate) => {
    hideDateInitialPickerModal();
    setSelectedDate(selectedDate || selectedDate);
  };

  const DateEndPicker = () => setShowDateEndPicker(true);
  const hideDateEndPickerModal = () => setShowDateEndPicker(false);
  const handleDateEndChange = (event, selectedDate) => {
    hideDateEndPickerModal();
    setSelectedEndDate(selectedDate || selectedDate);
  };

  const calculateBalance = () => {
    let saldoAtual = 0;
    let gastosAtual = 0;

    filteredMovements.forEach(item => {
      const valorNumerico = parseFloat(item.value);
      if (item.entrada_ou_saida === 0) {
        saldoAtual += valorNumerico;
      } else {
        gastosAtual += valorNumerico;
      }
    });

    const saldoFinal = saldoAtual - gastosAtual;
    setSaldo(saldoFinal.toFixed(2));
    setGastos(gastosAtual.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Header name="Movimentos" />
      <Balance saldo={saldo.toString()} gastos={gastos.toString()} />
      <View style={styles.filterContainer}>
        {showDateInitialPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateInitialChange}
          />
        )}
        {showDateEndPicker && (
          <DateTimePicker
            value={selectedEndDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateEndChange}
          />
        )}
        <TouchableOpacity style={styles.filterButton} onPress={DateInitialPicker}>
          <Text style={styles.filterText}>Data Inicial</Text>
          <Text style={styles.selectedDateText}>{selectedDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={DateEndPicker}>
          <Text style={styles.filterText}>Data Final</Text>
          <Text style={styles.selectedDateText}>{selectedEndDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={filteredMovements}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {
          const paymentMethod = paymentMethodsData.find(method => method.id === item.meio_pagamento);
          return <Moviments data={item} paymentMethods={paymentMethod} />;
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum movimento encontrado para este período.</Text>
        }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  filterText: {
    fontSize: 16,
  },
});

export default Movimentos;
