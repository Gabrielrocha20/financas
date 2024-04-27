import axios from 'axios';

const BASE_URL = 'https://gabrielrochadev.pythonanywhere.com/api/';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}login/`, {
      username: username,
      password: password,
    });

    // Extrair o token do corpo da resposta
    const token = response.data.access;

    // Salvar o token no armazenamento local (ou AsyncStorage)
    // AsyncStorage.setItem('token', token);

    return token;
  } catch (error) {
    throw error;
  }
};

export const logon = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}logon/`, {
      username: username,
      password: password,
    });

    // Extrair o token do corpo da resposta
    const token = response.data.access;

    // Salvar o token no armazenamento local (ou AsyncStorage)
    // AsyncStorage.setItem('token', token);

    return token;
  } catch (error) {
    throw error;
  }
};
