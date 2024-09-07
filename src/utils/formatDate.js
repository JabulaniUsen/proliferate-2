export const formatDate = (unixTimestamp) => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  // Extract time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Format the date and time in the desired format
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
