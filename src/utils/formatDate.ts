// Format Date Function
export const formatDate = (date: Date): Date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate;
};

//Hiển thị format ngày tháng
export const formatDateDisplay = (date: Date) => {
  return (
    new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }) || 'Không xác định'
  );
};
