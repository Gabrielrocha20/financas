import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://gabrielrochadev.pythonanywhere.com/api/meiopagamento/';

const usePaymentMethods = (token) => {
  const [paymentMethodsData, setPaymentMethodsData] = useState([]);

  const loadMethods = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPaymentMethodsData(response.data);
    } catch (error) {
      console.error('Erro ao carregar os meios de pagamento:', error.message);
    }
  };

  useEffect(() => {
    // Chamar loadMethods apenas uma vez, quando o componente for montado
    loadMethods();
  }, []); // Vazio para executar apenas uma vez

  const addPaymentMethod = async (label) => {
    try {
      const response = await axios.post(BASE_URL, { label }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        const newMethod = response.data;
        setPaymentMethodsData([...paymentMethodsData, newMethod]);
        return newMethod;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao adicionar o meio de pagamento:', error.message);
      return null;
    }
  };

  const deletePaymentMethod = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPaymentMethodsData(paymentMethodsData.filter(method => method.id !== id));
      return true;
    } catch (error) {
      console.error('Erro ao excluir o meio de pagamento:', error.message);
      return false;
    }
  };

  return { paymentMethodsData, addPaymentMethod, deletePaymentMethod, loadMethods };
};

export default usePaymentMethods;
