export const isMoreThan24h = (timestampNumber) => {
  const now = new Date();
  const date = new Date(timestampNumber);

  const difference = now - date;

  const hours = difference / (1000 * 60 * 60);

  return hours > 24;
};
