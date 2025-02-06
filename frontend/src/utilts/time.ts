export const formatDate = (date: string) =>
  new Date(parseInt(date)).toLocaleString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatTime = (date: string) =>
  new Date(parseInt(date)).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
