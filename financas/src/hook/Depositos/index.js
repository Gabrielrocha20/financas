import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://gabrielrochadev.pythonanywhere.com/api/deposito/';

const useDeposits = (token) => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDeposits = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Invertendo a ordem da lista antes de definir o estado deposits
      setDeposits(response.data.reverse());
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const filterDeposits = async (start_date, end_date) => {
    try {
      // Formatando as datas para o formato "YYYY-MM-DD"
      const formattedStartDate = start_date.toISOString().split('T')[0];
      const formattedEndDate = end_date.toISOString().split('T')[0];
  
      // Corpo da solicitação JSON
      const requestData = {
        start_date: formattedStartDate,
        end_date: formattedEndDate
      };
  
      const response = await axios.get(BASE_URL, {
        params: requestData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Invertendo a ordem da lista antes de definir o estado deposits
      setDeposits(response.data.reverse());
      return deposits
    } catch (error) {
      console.error('Erro ao filtrar depósitos:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    // Chamar loadDeposits apenas uma vez, quando o componente for montado
    loadDeposits();
  }, []); // Vazio para executar apenas uma vez

  const addDeposit = async (depositData) => {
    try {
      const response = await axios.post(BASE_URL, depositData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        const newDeposit = response.data;
        // Adicionando o novo depósito no início da lista
        setDeposits([newDeposit, ...deposits]);
        return newDeposit;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao adicionar depósito:', error.message);
      return null;
    }
  };

  return { deposits, loading, error, addDeposit, loadDeposits, filterDeposits };
};

export default useDeposits;
