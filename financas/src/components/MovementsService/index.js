// movementsService.js
const addMovement = (movementData) => {
    return new Promise((resolve, reject) => {
      // Simulando uma requisição assíncrona que adiciona a nova movimentação à lista
      setTimeout(() => {
        resolve({ success: true });
      }, 1000); // Simulando um tempo de resposta de 1 segundo
    });
  };
  
  export { addMovement };
  