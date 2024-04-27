import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Moviments from '../../components/Moviments';
import Actions from '../../components/Actions';
import Entradas from '../../components/Entradas';
import Saidas from '../../components/Saidas';
import usePaymentMethods from '../../hook/MeiosPagamento/apiMethodsPagament';
import useDeposits from '../../hook/Depositos/index';

const Home = ({ navigation, route }) => {
  const { nome, token } = route.params;
  const [entryModalVisible, setEntryModalVisible] = useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [movementsList, setMovementsList] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [gastos, setGastos] = useState(0);
  const { paymentMethodsData, loadMethods } = usePaymentMethods(token);
  const { deposits, loading, loadDeposits, addDeposit } = useDeposits(token); // Observe a adição de addDepositAPI
  const ITEMS_PER_PAGE = 10;
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const flatListRef = useRef();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [movementsList]);

  useEffect(() => {
    if (!loading) {
      loadMovements();
    }
  }, [loading]);

  const loadInitialData = async () => {
    await loadMethods();
    await loadDeposits()
  };

  const loadMovements = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    const newMovements = deposits.slice(startIndex, endIndex);
    setMovementsList(prevMovements => [...prevMovements, ...newMovements]);
  };

  const handleOpenEntryModal = () => {
    setEntryModalVisible(true);
  };

  const handleOpenExpenseModal = () => {
    setExpenseModalVisible(true);
  };

  const handleEntry = async (entryData) => {
    try {
      const newEntry = await addDeposit(entryData); // Chama a função addDepositAPI do hook useDeposits
      if (newEntry) {
        // Atualiza o estado local com a nova entrada
        setMovementsList(prevList => [newEntry, ...prevList ]);
      }
    } catch (error) {
      console.error('Erro ao adicionar entrada:', error);
    }
  };

  const handleAddExpense = async(expenseData) => {
    try {
      const newExpense = await addDeposit(expenseData); // Chama a função addDepositAPI do hook useDeposits
      if (newExpense) {
        // Atualiza o estado local com a nova Saida
        setMovementsList(prevList => [newExpense, ...prevList ]);
      }
    } catch (error) {
      console.error('Erro ao adicionar Saida:', error);
    }
  };

  const handlePressPaymentMethods = () => {
    navigation.navigate('MeiosPagamento', { token:token });
  };
  const handlePressMoviments = () => {
    navigation.navigate('Movimentos', { token:token });
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const calculateBalance = () => {
    let saldoAtual = 0;
    let gastosAtual = 0;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Mês atual (0-11)

    // Filtrar os depósitos para incluir apenas os do mês atual
    const depositsThisMonth = deposits.filter(item => {
      const depositDate = new Date(item.data);
      return depositDate.getMonth() === currentMonth;
    });

    depositsThisMonth.forEach((item) => {
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

  useEffect(() => {
    if (page > 1) {
      loadMovements();
      setLoadingMore(false);
    }
  }, [page]);

  return (
    <View style={styles.container}>
      <Header name={nome} />
      <Balance saldo={saldo} gastos={gastos} />
      <Actions
        onPressAddEntry={handleOpenEntryModal}
        onPressAddSaida={handleOpenExpenseModal}
        onPressPaymentMethods={handlePressPaymentMethods}
        onPressMoviments={handlePressMoviments}
      />
      <Entradas
        visible={entryModalVisible}
        onClose={() => setEntryModalVisible(false)}
        onAddEntry={handleEntry} // Aqui está conectado ao handleEntry
        paymentMethods={paymentMethodsData}
      />
      <Saidas
        visible={expenseModalVisible}
        onClose={() => setExpenseModalVisible(false)}
        onAddSaida={handleAddExpense}
        paymentMethods={paymentMethodsData}
      />
      <Text style={styles.title}>Ultimas Movimentações</Text>
      <FlatList
        ref={flatListRef}
        style={styles.list}
        data={movementsList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          // Encontra o método de pagamento com o mesmo nome
          const paymentMethod = paymentMethodsData.find(method => method.id === item.meio_pagamento);
          // Passa apenas o id do método de pagamento correspondente para o componente Moviments
          return <Moviments data={item} paymentMethods={paymentMethod} />;
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  }
});

export default Home;
