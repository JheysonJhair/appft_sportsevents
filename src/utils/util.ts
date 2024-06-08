export function formatHour(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDate(dateString: string): string {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = dateParts[1].padStart(2, "0");
  const day = dateParts[2].padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate2(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const formatDate3 = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
