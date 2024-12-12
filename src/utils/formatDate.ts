// Format Date Function
export const formatDate = (date: Date): Date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = new Date(`${year}-${month}-${day}T00:00:00`);
  return formattedDate;
};
