/**
 * Get days remaining until a deadline
 * @param {string|Date} dateString - The deadline date
 * @returns {number|null} Number of days (positive for future, negative for past, 0 for today)
 */
const getDaysUntil = (dateString) => {
  if (!dateString) return null;

  const deadline = new Date(dateString);
  const today = new Date();

  // Reset time to midnight for accurate day comparison
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export default getDaysUntil;
