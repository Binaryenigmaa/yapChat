// Takes date-time string as arg returns Date if updatedAt is today otherwise returns the time.
// eg updatedAt = "2025-04-19T12:15:34.470Z" today = "2025-04-19". return : 2025/04/19

export const formatDate = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  const today = new Date();

  // Check if updatedDate is today
  const isToday =
    updatedDate.getDate() === today.getDate() &&
    updatedDate.getMonth() === today.getMonth() &&
    updatedDate.getFullYear() === today.getFullYear();

  if (isToday) {
    // Display only the time
    return updatedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    // Display the date
    return updatedDate.toLocaleDateString();
  }
};

export const formatTime = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  return updatedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
