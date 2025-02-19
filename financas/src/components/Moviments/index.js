import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView, MotiText, AnimatePresence } from 'moti';
import moment from 'moment';

export default function Moviments({ data, paymentMethods }) {
  const [showValue, setShowValue] = useState(false);
  const [paymentMethodName, setPaymentMethodName] = useState('');

  useEffect(() => {
    // Encontra o nome do meio de pagamento pelo ID
    if (paymentMethods) {
      setPaymentMethodName(paymentMethods.label);
    }
  }, [data.meio_pagamento, paymentMethods]);

  const formattedDate = moment(data.data).format('DD/MM/YYYY'); // Formata a data

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShowValue(!showValue)}>
      <MotiText
        style={styles.date}
        from={{ translateX: -300 }}
        animate={{ translateX: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 300 }}
      >
        {formattedDate} {/* Mostra a data formatada */}
      </MotiText>
      <MotiView
        style={styles.content}
        from={{ translateY: -150, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: 'timing', duration: 800, delay: 300 }}
      >
        <Text style={styles.label}>{data.label}</Text>

        {showValue ? (
          <AnimatePresence exitBeforeEnter>
            <MotiText
              style={data.entrada_ou_saida === 0 ? styles.value : styles.expenses}
              from={{ translateX: 100 }}
              animate={{ translateX: 0 }}
              transition={{ type: 'timing', duration: 500 }}
            >
              {data.entrada_ou_saida === 0 ? `R$ ${data.value}` : `R$ -${data.value}`}
            </MotiText>
          </AnimatePresence>
        ) : (
          <AnimatePresence exitBeforeEnter>
            <MotiView
              style={styles.skeleton}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing' }}
            />
          </AnimatePresence>
        )}
      </MotiView>
      {showValue ? (
        <AnimatePresence exitBeforeEnter>
          <MotiText
            style={styles.meioPagamento}
            from={{ translateX: 100 }}
            animate={{ translateX: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            {paymentMethodName}
          </MotiText>
        </AnimatePresence>
      ) : (
        <AnimatePresence exitBeforeEnter>
          <MotiView
            style={styles.meioPagamentoOff}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing' }}
          />
        </AnimatePresence>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8,
  },
  date: {
    color: '#dadada',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  meioPagamento: {
    fontWeight: 'bold',
    fontSize: 13,
    top: -10,
    marginLeft: 10,
  },
  meioPagamentoOff: {
    display: 'none',
  },
  value: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  expenses: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  skeleton: {
    marginTop: 6,
    width: 80,
    height: 10,
    backgroundColor: '#dadada',
    borderRadius: 8,
  },
});
