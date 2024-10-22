// services/buyService.ts
export const buy = async () => {
    // Simulación de una compra
    return new Promise((resolve) => {
      setTimeout(() => resolve('Transaction complete'), 2000);
    });
  };
  