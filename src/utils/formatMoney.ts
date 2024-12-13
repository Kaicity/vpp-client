// Hàm chuyển số nguyên thành tiền tệ
export const numericToMoney = (value: number): string => {
  if (isNaN(value)) return '0 đ';
  return `${value.toLocaleString('vi-VN')} đ`;
};

export const formatCurrency = (value: string | number) => {
  if (!value) return '';
  return new Intl.NumberFormat('vi-VN').format(Number(value)); // Định dạng theo VND
};
