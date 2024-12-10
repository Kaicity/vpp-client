export const numericToMoney = (value: number): string => {
  if (isNaN(value)) return '0 đ';
  return `${value.toLocaleString('vi-VN')} đ`;
};
