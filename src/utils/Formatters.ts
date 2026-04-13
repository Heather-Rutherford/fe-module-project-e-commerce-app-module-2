// src/utils/formatters.ts
export const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
